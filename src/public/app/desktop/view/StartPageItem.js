Ext.define('Savanna.desktop.view.StartPageItem', {
    extend: 'Ext.container.Container',
    alias: 'widget.startpageitem',
    cls:'startpageitem',
    text: '',
    subtext: '',
    glyph: '',
    layout: {
        type: 'hbox'
    },
    padding:15,
    initComponent: function () {
        this.items = this.setupItems();
        this.callParent(arguments);
    },
    setupItems: function () {
        return [
            {
                xtype:'container',
                html:'<i class="glyph">' +  this.glyph + '</i>',
                width: 64,         //This needed to be set explicitly otherwise on the first draw it doesn't show
                height:64,
                margin:"5 10 5 5"
            },
            {
                xtype: 'container',
                width: '100%',
                layout: {
                    type: 'vbox'
                },

                items:[
                    {
                        xtype: 'button',
                        itemId: 'openButton',
                        text: this.text,
                        ui: 'white',
                        cls:'openButton'
                    },
                    {
                        width: 160,
                        xtype: 'label',
                        flex:1,
                        text: this.subtext,
                    }
                ]
            }
        ]
    }
});