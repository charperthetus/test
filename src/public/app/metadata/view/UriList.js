/**
 * Created with IntelliJ IDEA.
 * User: mfawver
 * Date: 9/26/13
 * Time: 1:33 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.metadata.view.UriList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.metadata_urilist',

    requires: [
        'Savanna.controller.Factory'
    ],

    layout: 'vbox',
    width: "100%",

    border: false,

    items: [
        {
            xtype: 'label',
            itemId: 'displayLabel',
            text: '',
            width: '100%'
        }
    ],
    initComponent: function () {
        this.callParent(arguments);
        Savanna.controller.Factory.getController('Savanna.metadata.controller.FieldTypes');

        this.on('beforerender', Ext.bind(function() {
            var config = this.initialConfig || {};

            this.down('#displayLabel').text = config.displayLabel;

            var me = this;

            Ext.Array.each(config.value, function(stringElement) {
                var theLabel = Ext.create('Ext.form.Label', {
                    text: '',
                    width: "100%"
                });

                // TODO: This conversion is probably not correct.  Need to decode it properly.
                // If you change this, check Uri.js for similar.
                var decoded = stringElement.replace('%2F', '/', 'g');
                theLabel.setText( decoded );

                me.add( theLabel );
            });

        }, this));
    }

});