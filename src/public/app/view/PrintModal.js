/* global Ext: false */
Ext.define('Savanna.view.PrintModal', {
    extend: 'Ext.window.Window',
    alias: 'widget.print-modal',

    height: 200,
    width: 400,
    layout: 'fit',
    modal: true,

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

        this.on('render', function() {
            this.setIframeContent(this.initialConfig.html || '');
        }, this);
    },

    // CUSTOM METHODS

    setupItems: function() {
        return [
            {
                xtype: 'uxiframe'
            }
        ];
    },

    getIframe: function() {
        var dom = this.getEl().dom,
            iframe = Ext.dom.Query.selectNode('iframe', dom);

        if (iframe) {
            var iframeId = iframe.getAttribute('name');

            if (iframeId) {
                return window.frames[iframeId].document;
            }
            else {
                Ext.Error.raise('Unable to find id for iframe');
            }
        }
        else {
            Ext.Error.raise('Unable to find iframe');
        }

        return null;
    },

    getIframeContent: function() {
        var iframe = this.getIframe();

        return iframe.innerHTML;
    },

    setIframeContent: function(content) {
        var iframe = this.getIframe();

        iframe.innerHTML = content;
    }
});