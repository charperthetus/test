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
        'Savanna.controller.Factory',
        'Ext.form.field.Date'
    ],

    items: [
    ],

    initComponent: function () {
        this.callParent(arguments);
        var me = this;

        this.on('beforerender', Ext.bind(function() {
            var displayValue = '&nbsp;';
            var myDate = null;
            if(null !== me.value) {
                myDate = new Date(me.getValue());
                displayValue = Ext.Date.format(myDate,'Y-m-d\\TH:i:s.m\\Z')
            }

            if(me.getEditable() && me.getEditMode()) {
                if(me.down('#displayValueEdit')) {
                    me.down('#displayValueEdit').setValue(myDate);
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
    },

    makeEditViewItems: function() {
        var me = this;
        this.add(Ext.create('Ext.form.field.Date', {
            fieldLabel: '',
            itemId: 'displayValueEdit',
            allowBlank: true,
            width: '100%',
            labelWidth: 200,
            dateFormat: 'Y-m-d\\TH:i:s.m\\Z',
            listeners: {
                blur: function(d) {
                    //console.log('Item Blur');
                    var newVal = d.getValue();
                    me.setValue(newVal);
                }
            }
        }));
    }



});