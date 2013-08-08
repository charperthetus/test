/**
 * TODO: Document what events we may emit...
 */
Ext.define('Savanna.search.view.SearchBar', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.search_searchbar',
    cls: 'search-prime',
    requires: [
        'Ext.ux.layout.Center',
        'Ext.form.field.Text',
        'Savanna.controller.Factory',
        'Savanna.search.view.SearchBarTools'
    ],
    mixins: {
        storeable: 'Savanna.mixin.Storeable'
    },
    store:"Savanna.search.store.SearchResults",
    border: false,
    frame: false,
    layout: "ux.center",
    items: [
        {
            xtype: 'panel',
            border: false,
            width: '30%',
            minWidth: 520,
            itemId: "main_panel",
            items: [
                {
                    xtype: "searchbar_tools",
                    itemId: "search_toolbar"
                },
                {
                    xtype: 'panel',
                    border: false,
                    bodyPadding: 0,
                    items: [
                        {
                            xtype: 'button',
                            text: 'Start New Search'
                        }
                    ]
                }
            ]
        }
    ],
    initComponent: function () {
        this.callParent(arguments);
        // instantiate the controller for this view
        Savanna.controller.Factory.getController('Savanna.search.controller.SearchComponent');
        this.initStore();
    },
    onStoreLoad: function() {
        // do any magic you need to your container when the store is reloaded
    },
    buildSearchString: function () {
        var alls, exacts, anys, nones, final_string,
            from_bar = '',
            str_all = '',
            view = this,
            toolbar = view.queryById("search_toolbar");
        Ext.each(toolbar.queryById("form_container").items.items, function (field, index) {
            if (field.xtype == "searchadvanced_textfield" && toolbar.queryById(field.itemId).getValue() != "" && toolbar.queryById(field.itemId).getValue() != undefined) {
                toolbar.queryById(field.itemId).setValue(toolbar.queryById(field.itemId).getValue().trim())
                var join = field.configs.join;
                if (str_all == '') {
                    join = '';
                }
                str_all = str_all + join + toolbar.queryById(field.itemId).getBooleanValue();
            }
        });
        from_bar = toolbar.queryById("search_terms").getValue().trim();
        str_all = str_all.replace(/\s+/g, ' ');
        final_string = from_bar;
        if (final_string == "") {
            final_string = str_all;
        } else {
            if (str_all.trim() != "") {
                final_string = from_bar + " AND " + str_all;
            } else {
                final_string = from_bar;
            }
        };
        return final_string;
    }
});