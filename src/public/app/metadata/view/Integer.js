/**
 * Created with IntelliJ IDEA.
 * User: mfawver
 * Date: 9/26/13
 * Time: 8:15 AM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.metadata.view.Integer', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.metadata_integer',

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
            itemId: 'displayValue',
            text: ''
        }
    ],
    initComponent: function () {
        this.callParent(arguments);
        Savanna.controller.Factory.getController('Savanna.metadata.controller.FieldTypes');

        this.on('beforerender', Ext.bind(function() {
            var config = this.initialConfig || {};

            this.down('#displayLabel').text = config.displayLabel;

            this.down('#displayValue').text = config.value.toLocaleString();

        }, this));
    }

});