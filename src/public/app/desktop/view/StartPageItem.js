Ext.define('Savanna.desktop.view.StartPageItem', {
    extend: 'Ext.container.Container',
    alias: 'widget.startpageitem',
    text: '',
    subtext: '',
    image: '',
    style: {backgroundColor:'#AAAAAA'},
    layout: {
        type: 'hbox'
    },
    initComponent: function () {
        this.items = this.setupItems();
        this.callParent(arguments);
    },
    setupItems: function () {
        return [
            {
                xtype: 'image',
                src: this.image
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
                        text: this.text
                    },
                    {
                        width: '90%',
                        xtype: 'label',
                        text: this.subtext
                    }
                ]
            }
        ]
    }
});