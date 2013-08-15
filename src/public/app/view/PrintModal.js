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
            try {
                this.setIframeContent(this.initialConfig.html || '');
            }
            catch(e) {
                console.log('ERROR', e);
                this.close();
            }

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

    getIframeWindow: function() {
        var dom = this.getEl().dom,
            iframe = Ext.dom.Query.selectNode('iframe', dom);

        if (iframe) {
            var iframeId = iframe.getAttribute('name');

            if (iframeId) {
                return window.frames[iframeId];
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

    getIframeDocument: function() {
        var iframe = this.getIframeWindow();

        if (iframe) {
            return iframe.document;
        }

        return null;
    },

    getIframeContent: function() {
        var iframeDoc = this.getIframeDocument();

        if (iframeDoc) {
            return iframeDoc.body.innerHTML;
        }

        return '';
    },

    setIframeContent: function(content) {
        var iframeDoc = this.getIframeDocument();

        // TODO: need remove/replace iframe when writing content (since IE10 only lets us doc.write() and that is additive)
        if (iframeDoc) {
            iframeDoc.write('<body>' + content + '</body>');
        }
        else {
            Ext.Error.raise('Unable to set content on iframe');
        }
    }
});