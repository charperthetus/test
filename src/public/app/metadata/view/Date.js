/**
 * Created with IntelliJ IDEA.
 * User: swatson
 * Date: 9/24/13
 * Time: 9:13 AM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.metadata.view.Date', {
    extend: 'Savanna.metadata.view.MetadataItemView',
    alias: 'widget.metadata_date',

    requires: [
        'Savanna.controller.Factory'
    ],

    items: [
    ],

    initComponent: function () {
        this.callParent(arguments);
        var me = this;

        this.on('beforerender', Ext.bind(function() {
            var displayValue = '&nbsp;';
            if(null !== me.value) {
                var myDate = new Date(me.getValue());
                displayValue = Ext.Date.format(myDate,'F j, Y, g:i a')
            }

            if(me.getEditable() && me.getEditMode()) {
                if(me.down('#displayValueEdit')) {
                    me.down('#displayValueEdit').setValue(displayValue);
                    me.down('#displayValueEdit').fieldLabel = me.getDisplayLabel();
                }
            } else {
                if(me.down('#displayLabelItem')) {
                    me.down('#displayLabelItem').html = me.getDisplayLabel() + ':&nbsp;&nbsp;';
                }
                if(me.down('#displayValue')) {
                    me.down('#displayValue').html = displayValue;
                }
            }

        }, this));
    }

});