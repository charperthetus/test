/* global Ext: false */
Ext.define('Savanna.view.PrintModal', {
    extend: 'Ext.window.Window',
    alias: 'widget.print-modal',

    height: '90%',
    width: '90%',
    layout: 'fit',
    modal: true,
        cls: 'print-modal',

    title: 'Print',

    tbar: [
        {
            type: 'print',
            text: 'Print'
        },
        {
            type: 'cancel',
            text: 'Cancel'
        }
    ],

    items: [],

    initComponent: function() {
        this.items = this.setupItems();

        this.callParent(arguments);

        this.on('afterrender', function() {
            if (this.initialConfig.html) {
                this.setPrintContent(this.initialConfig.html);
            }
        }, this);
    },

    // CUSTOM METHODS

    setupItems: function() {
        return [
            {
                xtype: 'component',
                itemId: 'printContent'
            }
        ];
    },

    setPrintContent: function(html) {
        var printContent = this.down('#printContent');

        if (html.outerHTML) {
            html = html.outerHTML;
        }
        else if (html.getHTML) {
            html = html.getHTML();
        }
console.log('html', html);
        printContent.getEl().setHTML(html);
    },

    getPrintContent: function() {
        return this.down('#printContent').getEl().getHTML();
    }
});