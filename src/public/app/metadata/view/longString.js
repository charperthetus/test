/**
 * Created with IntelliJ IDEA.
 * User: mfawver
 * Date: 9/25/13
 * Time: 8:49 AM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.metadata.view.LongString', {
    extend: 'Savanna.metadata.view.MetadataItemView',
    alias: 'widget.metadata_longstring',

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
            me.down('#displayValue').html = (null === me.value) ? '&nbsp;' : me.value;
        }, this));
    }

});