/* global Ext: false*/
Ext.define('Savanna.modelSearch.view.searchComponent.SearchBar', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.model_search_searchbar',

    requires: [
        'Ext.layout.container.HBox',
        'Ext.form.field.Text',
        'Savanna.controller.Factory',
        'Savanna.search.view.searchComponent.searchBar.SearchForm'  //We are now using a shared component
    ],

    border: false,
    frame: false,
    layout: {
        type: 'hbox',
        align: 'bottom',
        pack: 'center'
    },
    height: 60,
    width: '100%',
    ui: 'search-prime',

    items: [
        {
            xtype: 'container',
            border: false,
            width: '20%',
            minWidth: 520,
            itemId: 'main_panel',
            height: 50,
            layout: {
                type: 'vbox',
                align: 'left'
            },
            items: [
                {
                    xtype: 'searchbar_form',  //Used the shared one in the Search folder
                    itemId: 'search_form',
                    width: '100%',
                    hideAdvancedLink: true,
                    height: 28
                },
                {
                    xtype: 'button',
                    itemId:'search_reset_button',
                    ui: 'white',
                    text: 'Start New Search'
                }
            ]
        }
    ],

    initComponent: function () {
        this.callParent(arguments);
    },

    buildSearchString: function () {
        var searchString,
            advancedBooleanString = '',
            formQueryString,
            form = this.queryById('search_form'),
            formContainer = form.queryById('searchadvanced_menu').queryById('form_container');

        Ext.Array.each(formContainer.query('model_searchadvanced_textfield'), function (field) {
            var value = field.getValue().trim();

            if (field.xtype === 'model_searchadvanced_textfield' && value !== '' && value !== undefined) {
                field.setValue(value);

                var joinString = field.configs.join;

                if (advancedBooleanString === '') {
                    joinString = '';
                }

                advancedBooleanString += joinString + field.getBooleanValue();
            }
        });

        formQueryString = form.queryById('search_terms').getValue().trim();
        advancedBooleanString = advancedBooleanString.replace(/\s+/g, ' ');
        searchString = '' + formQueryString;

        if (searchString === '') {
            searchString = advancedBooleanString;
        } else {
            if (advancedBooleanString.trim() !== '') {
                searchString = formQueryString + ' AND ' + advancedBooleanString;
            } else {
                searchString = formQueryString;
            }
        }

        /*
        lastly, if the user has specified terms to refine the search in the results screen,
        add them to the beginning of the searchString
         */
        searchString  =  this.findParentByType('model_search_searchcomponent').refineSearchString + searchString;

        return searchString;
    }
});
