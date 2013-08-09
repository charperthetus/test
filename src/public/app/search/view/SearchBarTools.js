/* global Ext: false */
Ext.define('Savanna.search.view.SearchBarTools', {

    extend: 'Ext.toolbar.Toolbar',
    alias:'widget.searchbar_tools',
    border: false,
    requires:   [
        'Savanna.search.view.SearchAdvancedTextfield'
    ],

    items: [
        {
            xtype: 'textfield',
            width: 400,
            fieldLabel: '',
            name: 'search_terms',
            itemId: 'search_terms',
            enableKeyEvents: true,
            emptyText: 'Search'
        },
        {
            xtype: 'button',
            itemId: 'search_submit',
            glyph: 61808
        },
        {
            text: 'Advanced',
            itemId: 'searchadvanced_btn',
            menu: {
                xtype: 'panel',
                floating: true,
                plain: true,
                itemId: 'searchadvanced_menu',
                minWidth: 428,
                enableKeyNav:false,
                items: [
                    {
                        xtype: 'button',
                        text: 'Close',
                        itemId: 'close_panel',
                        'float': 'right'
                    },
                    {
                        xtype: 'box',
                        html: 'Enter advanced keyword searches.<br /><i>Note: Not all search sources may support all advanced options.</i><br />&nbsp;'
                    },
                    {
                        xtype: 'container',
                        itemId:'form_container',
                        items: [
                            {
                                xtype: 'searchadvanced_textfield',
                                fieldLabel: 'All of these words:',
                                name: 'all_words',
                                itemId: 'all_words',
                                tabIndex: 1,
                                configs:{ join: '', booleanType: 'all' }
                            },
                            {
                                xtype: 'searchadvanced_textfield',
                                fieldLabel: 'This exact phrase:',
                                name: 'exact_phrase',
                                itemId: 'exact_phrase',
                                tabIndex: 2,
                                configs:{ join: ' AND ', booleanType: 'exact' }
                            },
                            {
                                xtype: 'searchadvanced_textfield',
                                fieldLabel: 'Any of these words:',
                                name: 'any_words',
                                itemId: 'any_words',
                                tabIndex: 3,
                                configs:{ join: ' AND ', booleanType: 'any' }
                            },
                            {
                                xtype: 'searchadvanced_textfield',
                                fieldLabel: 'None of these words:',
                                name: 'none_words',
                                itemId: 'none_words',
                                tabIndex: 4,
                                configs:{ join: ' NOT ', booleanType: 'none' }
                            },
                            {
                                xtype: 'panel',
                                width: 380,
                                layout: 'absolute',
                                itemId: 'submit_panel',
                                bodyStyle: {
                                    background: 'transparent',
                                    border: 'none'
                                },
                                items: [
                                    {
                                        xtype: 'button',
                                        itemId: 'advancedsearch_submit',
                                        text: 'Search',
                                        width: 80,
                                        x: 300,
                                        tabIndex: 5
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        }
    ]
});