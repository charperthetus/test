/**
 * Created with IntelliJ IDEA.
 * User: swatson
 * Date: 9/24/13
 * Time: 9:13 AM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.metadata.view.String', {
    extend: 'Savanna.metadata.view.MetadataItemView',
    alias: 'widget.metadata_string',

    requires: [
        'Savanna.controller.Factory'
    ],

    items: [
        {
            xtype: 'label',
            itemId: 'displayLabelItem',
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
            me.down('#displayLabelItem').text = me.displayLabel;
            me.down('#displayValue').text = me.value;
        }, this));
    }

});