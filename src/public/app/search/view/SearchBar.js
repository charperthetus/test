/* global Ext: false, Savanna: false */
Ext.define('Savanna.search.view.SearchBar', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.search_searchbar',

    requires: [
        'Ext.ux.layout.Center',
        'Ext.form.field.Text',
        'Savanna.controller.Factory',
        'Savanna.search.view.SearchForm'
    ],

    mixins: {
        storeable: 'Savanna.mixin.Storeable'
    },

    store:'Savanna.search.store.SearchResults',

    border: false,
    frame: false,
    layout: 'ux.center',
    cls: 'search-prime',

    items: [
        {
            xtype: 'panel',
            border: false,
            width: '30%',
            minWidth: 520,
            itemId: 'main_panel',
            items: [
                {
                    xtype: 'searchbar_tools',
                    itemId: 'search_toolbar'
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
        var searchString = '',
            advancedBooleanString = '',
            formQueryString = '',
            toolbar = this.queryById('search_toolbar'),
            form = toolbar.queryById('form_container');

        form.items.each(function (field) {
            var value = field.getValue().trim();

            if (field.xtype === 'searchadvanced_textfield' && value !== '' && value !== undefined) {
                field.setValue(value);

                var joinString = field.configs.join;

                if (advancedBooleanString === '') {
                    joinString = '';
                }

                advancedBooleanString += joinString + field.getBooleanValue();
            }
        });

        formQueryString = toolbar.queryById('search_terms').getValue().trim();
        advancedBooleanString = advancedBooleanString.replace(/\s+/g, ' ');
        searchString = formQueryString;

        if (searchString === '') {
            searchString = advancedBooleanString;
        } else {
            if (advancedBooleanString.trim() !== '') {
                searchString = formQueryString + ' AND ' + advancedBooleanString;
            } else {
                searchString = formQueryString;
            }
        }

        return searchString;
    }
});