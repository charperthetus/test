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
Ext.define('Savanna.modelSearch.view.searchComponent.searchBody.SearchMap', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.model_search_searchmap',

    requires: [
        'Savanna.controller.Factory',
        'Savanna.modelSearch.view.searchComponent.searchBody.searchMap.Canvas',
        'Savanna.modelSearch.view.searchComponent.searchBody.searchMap.SearchLocationComboBox'
    ],

    layout: 'absolute',

    items: [
        {
            xtype: 'model_search_map_canvas',
            height: '100%',
            width: '100%',
            itemId: 'searchMapCanvas',
            flex: 1
        },
        {
            xtype: 'button',
            itemId: 'drawLocationSearch',
            glyph: 61772
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
                            xtype: 'model_search_searchlocationcombobox',
                            itemId: 'searchcombobox'
                        },
                        {
                            xtype: 'button',
                            itemId: 'mapZoomToMenu',
                            text: 'Zoom To',
                            menu: [
                                {
                                    itemId: 'zoomToWholeWorld',
                                    text: 'Whole World',
                                    disabled: false
                                },
                                {
                                    itemId: 'zoomToSelectedArea',
                                    text: 'Selected Area',
                                    disabled: true
                                }
                            ]
                        },
                        '->',
                        {
                            xtype: 'button',
                            itemId: 'clearLocationSearch',
                            text: 'Clear Location Search'
                        }
                    ]
                }
            ]
        }
     ]
});
