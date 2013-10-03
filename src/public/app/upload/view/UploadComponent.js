/* global Ext: false */
Ext.define('Savanna.upload.view.UploadComponent', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.upload_uploadcomponent',

    requires: [
        'Ext.layout.container.VBox',
        'Savanna.upload.view.part.NewUploadView',
        'Savanna.upload.view.part.CurrentUploadsView'
    ],

    layout: {
        type: 'vbox'
    },

    overview: null,

    initComponent: function() {
        Savanna.controller.Factory.getController('Savanna.upload.controller.UploadController');
        this.items = this.setupItems();
        this.width = '100%';
        this.height = '100%';
        this.callParent(arguments);
    },

    // CUSTOM METHODS

    setupItems: function() {
        return [
            {
                xtype: 'upload_part_newupload',
                itemId: 'newUploadView',
                flex:1,
                width: '100%'
            },
            {
                xtype: 'upload_part_currentuploads',
                itemId: 'currentUploadsView',
                width: '100%',
                maxHeight: 300,
                hidden:true
            }
        ];
    }
});
