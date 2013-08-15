/**
 * Created with IntelliJ IDEA.
 * User: swatson
 * Date: 7/19/13
 * Time: 1:48 PM
 * To change this template use File | Settings | File Templates.
 */
/**
 * TODO: Document what events we may emit...
 */
Ext.define('Savanna.search.view.SearchMap', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.search_searchmap',

    requires: [
        'Savanna.controller.Factory',
        'Savanna.leaflet.Leafletmap'
    ],

    layout: 'fit',

    items: [
        {
            xtype: 'leafletmap',
            itemId: 'leafletMap',
            flex: 1,
            lat: 45.3003,
            lng: -122.9719,
            width: '100%',
            height: '100%'
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            itemId: 'searchLocationDockedItems',
            border: false,
            width: '100%',
            dock: 'top',
            layout: 'vbox',
            items: [
                {
                    xtype: 'label',
                    html: 'Mark an area of interest. <i>Note: Not all search sources support location filtering.</i>'
                },
                {
                    xtype: 'toolbar',
                    width: '100%',
                    border: false,
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'textfield',
                            width: 200,
                            fieldLabel: '',
                            name: 'search_location',
                            enableKeyEvents: true,
                            emptyText: 'Find Location'

                        },
                        {
                            xtype: 'button',
                            itemId: 'findLocation',
                            ui: 'small-search-button',
                            glyph: 61808

                        },
                        {
                            itemId: 'mapZoomTo',
                            text: 'Zoom To',
                            ui: 'flat-toolbar-button',
                            menu: [{
                                text: 'Cancel'
                            }]
                        },
                        '->',
                        {
                            xtype: 'button',
                            itemId: 'clearLocationSearch',
                            ui: 'link',
                            text: 'Clear Location Search'
                        }
                    ]
                }
            ]

        }
     ]
});