/* global Ext: false*/
Ext.define('Savanna.modelSearch.view.searchComponent.SearchBar', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.model_search_searchbar',

    requires: [
        'Ext.ux.layout.Center',
        'Ext.form.field.Text',
        'Savanna.controller.Factory',
        'Savanna.modelSearch.view.searchComponent.searchBar.SearchForm'
    ],

    border: false,
    frame: false,
    layout: 'ux.center',
    ui: 'search-prime',

    items: [
        {
            xtype: 'panel',
            border: false,
            width: '30%',
            minWidth: 422,
            itemId: 'main_panel',
            ui: 'search-prime',
            items: [
                {
                    xtype: 'model_searchbar_form',
                    itemId: 'search_form'
                },
                {
                    xtype: 'panel',
                    border: false,
                    bodyPadding: 0,
                    itemId:'search_reset',
                    minHeight:25,
                    ui: 'search-prime',
                    items: [
                        {
                            hidden: true,
                            xtype: 'button',
                            itemId:'search_reset_button',
                            text: 'Start New Search' ,
                            ui: 'white'
                        }
                    ]
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
