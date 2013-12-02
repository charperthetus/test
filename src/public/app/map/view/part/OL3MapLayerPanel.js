Ext.define('Savanna.map.view.part.OL3MapLayerPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.ol3maplayerpanel',
    requires: [
        'Savanna.map.view.part.OL3MapLayerList'
    ],

    title: 'Layer List',
    header: {
        ui: 'off-white'
    },
    collapsible: true,
    width: '100%',

    initComponent: function() {
        this.items = this.setupItems();
        this.callParent(arguments);
    },

    setupItems: function() {
        return [
            {
                xtype: 'container',
                layout: 'hbox',
                items: [
                    {
                        xtype: 'tbfill'
                    },
                    {
                        xtype: 'button',
                        itemId: 'addLayerButton',
                        glyph: 'addLayer',
                        cls: 'toolbarButtonFramework',
                        width:40,
                        height:25,
                        menu: {
                            plain: true,
                            items: [
                                {
                                    text: 'Add Vector Layer',
                                    handler: this.vectorHandler,
                                    scope: this
                                },
                                {
                                    text: 'Add WMS Layer',
                                    handler: this.wmsHandler,
                                    scope: this
                                },
                                {
                                    text: 'Add Layer via Upload',
                                    handler: this.uploadHandler,
                                    scope: this
                                }
                            ]
                        }
                    }
                ]
            },
            {
                xtype: 'ol3maplayerlist',
                itemId: 'ol3MapLayerList',
                width: '100%'
            }
        ]
    },

    vectorHandler: function() {
        this.fireEvent('addvector', this);
    },

    wmsHandler: function() {
        this.fireEvent('addwms', this);
    },

    uploadHandler: function() {
        this.fireEvent('upload', this);
    }
});