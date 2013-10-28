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

    items: [
    ],

    initComponent: function () {
        this.callParent(arguments);
        var me = this;

        me.on('beforerender', Ext.bind(function() {
            if(me.getEditable() && me.getEditMode()) {
                if(me.down('#displayValueEdit')) {
                    me.down('#displayValueEdit').setValue(me.getValue().toString());
                    me.down('#displayValueEdit').fieldLabel = me.getDisplayLabel();
                    me.down('#displayValueEdit').regex = /^[0-9]*$/;
                    me.down('#displayValueEdit').maskRe = /\d/i;
                    me.down('#displayValueEdit').listeners = {
                        blur: function(d) {
                            var newVal = parseInt(d.getValue(), 10);
                            me.setValue(newVal);
                        }
                    };
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