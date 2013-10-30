Ext.define('Savanna.process.controller.MetadataController', {
    extend: 'Deft.mvc.ViewController',

    requires: [
        'Savanna.process.view.metadata.MetadataTabPanel'
    ],

    control: {
        view: {
            uriChange: 'onUriChange'
        }
     },

    constructor: function (options) {
        this.opts = options || {};
        this.callParent(arguments);
    },

    init: function() {
        return this.callParent(arguments);
    },

    onUriChange: function() {
        console.log('onUriChange');
    }
});