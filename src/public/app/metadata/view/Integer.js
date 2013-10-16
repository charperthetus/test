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
    ],

    initComponent: function () {
        this.callParent(arguments);
        var me = this;

        me.on('beforerender', Ext.bind(function() {
            if(me.getEditable() && me.getEditMode()) {
                if(me.down('#displayValueEdit')) {
                    me.down('#displayValueEdit').setValue(me.getValue());
                    me.down('#displayValueEdit').fieldLabel = me.getDisplayLabel();
                }
            } else {
                if(me.down('#displayLabelItem')) {
                    me.down('#displayLabelItem').html = me.getDisplayLabel() + ':&nbsp;&nbsp;';
                }
                if(me.down('#displayValue')) {
                    me.down('#displayValue').html = (null === me.getValue()) ? '&nbsp;' : me.getValue().toLocaleString();
                }
            }
        }, this));
    }

});