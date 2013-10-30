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
        'Savanna.component.DatePicker'
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
                if(me.down('#editLabelItem')) {
                    me.down('#editLabelItem').html = me.getDisplayLabel() + ':&nbsp;&nbsp;';
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
        this.layout = 'vbox';
        this.add(Ext.create('Ext.form.Label', {
            itemId: 'editLabelItem',
            width: 180,
            minWidth: 180,
            height: 25
        }));

        this.add(Ext.create('Savanna.component.DatePicker', {
            itemId: 'displayValueEdit',
            jsDate: new Date(me.getValue()),
            renderTo: Ext.getBody(),
            listeners: {
                focusLost: function(picker) {
                    if(picker.isDateValid()) {
                        me.setValue(picker.getJsDate().getTime());
                    }
                }
            }

         }));
    },

    makeViewViewItems: function() {
        this.layout = 'hbox';
        this.callParent(arguments);
    }



});