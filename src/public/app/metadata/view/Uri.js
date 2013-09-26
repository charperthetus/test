/**
 * Created with IntelliJ IDEA.
 * User: mfawver
 * Date: 9/25/13
 * Time: 1:09 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.metadata.view.Uri', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.metadata_uri',

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
            text: ''

        },
        {
            xtype: 'label',
            itemId: 'displayValue'
        }
    ],
    initComponent: function () {
        this.callParent(arguments);
        Savanna.controller.Factory.getController('Savanna.metadata.controller.FieldTypes');

        this.on('beforerender', Ext.bind(function() {
            var config = this.initialConfig || {};

            this.down('#displayLabel').text = config.displayLabel;
            // TODO: This conversion is probably not correct.  Need to decode it properly.
            // If you change this, check UriList.js for similar.
            this.down('#displayValue').text = config.value.replace('%2F', '/', 'g');

        }, this));
    }

});