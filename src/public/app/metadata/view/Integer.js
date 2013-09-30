/**
 * Created with IntelliJ IDEA.
 * User: mfawver
 * Date: 9/26/13
 * Time: 8:15 AM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.metadata.view.Integer', {
    extend: 'Savanna.metadata.view.MetadataItemView',
    alias: 'widget.metadata_integer',

    requires: [
        'Savanna.controller.Factory'
    ],

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
            text: '',
            width: '100%'
        }
    ],

    initComponent: function () {
        this.callParent(arguments);
        Savanna.controller.Factory.getController('Savanna.metadata.controller.FieldTypes');
        var config = this.initialConfig || {};
        this.initValues(config);
        var me = this;

        this.on('beforerender', Ext.bind(function() {
            me.down('#displayLabel').text = me.displayLabel;
            me.down('#displayValue').text = me.value.toLocaleString();

        }, this));
    }

});