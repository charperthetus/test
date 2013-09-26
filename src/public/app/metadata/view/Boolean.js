/**
 * Created with IntelliJ IDEA.
 * User: mfawver
 * Date: 9/26/13
 * Time: 12:29 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.metadata.view.Boolean', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.metadata_boolean',

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

            this.down('#displayValue').text = config.value.toString();

        }, this));
    }

});