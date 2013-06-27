/**
 * TODO: Document what events we may emit...
 */
Ext.define('Savanna.view.search.SearchBar', {
    extend: 'Ext.panel.Panel',
    alias:  'widget.search.searchbar',

    requires: [
        'Ext.ux.layout.Center',
        'Ext.form.field.Text'
    ],

    bodyPadding: 5,
    border: false,
    frame:false,

    items: [
        {
            xtype:  'panel',
            layout: 'ux.center',
            border: false,
            items: [
                {
                    xtype:  'panel',
                    layout: 'vbox',
                    border: false,
                    width: '30%',
                    minWidth: 420,
                    items: [
                        {
                            xtype:  'panel',
                            layout: 'hbox',
                            border: false,
                            items: [
                                {
                                    xtype: 'textfield',
                                    width: 300,
                                    fieldLabel: '',
                                    name: 'search_terms',
                                    enableKeyEvents: true,
                                    emptyText: 'Search'
                                },
                                {
                                    xtype: 'button',
                                    text:  'Search'
                                },
                                {
                                    xtype: 'button',
                                    text:  'Advanced',
                                    style: {
                                        background: 'transparent',
                                        border: 'none'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            border: false,
                            bodyPadding: 0,
                            items: [
                                {
                                    xtype: 'button',
                                    text: 'Start New Search',
                                    style: {
                                        background: 'transparent',
                                        border: 'none',
                                        margin: '0px',
                                        padding: '0px'
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],

    initComponent: function() {
        this.callParent(arguments);
        
        // instantiate the controller for this view
        Savanna.controller.Factory.getController('search.SearchBar');
    }
});