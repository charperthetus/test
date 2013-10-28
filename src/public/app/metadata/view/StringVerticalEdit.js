/**
 * Created with IntelliJ IDEA.
 * User: mfawver
 * Date: 10/24/13
 * Time: 2:42 AM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.metadata.view.StringVerticalEdit', {
    extend: 'Savanna.metadata.view.MetadataItemView',
    alias: 'widget.metadata_string_vertical_edit',

    items: [
    ],
    layout: 'vbox',

    initComponent: function () {
        this.callParent(arguments);
        var me = this;

        me.on('beforerender', Ext.bind(function() {
            if(me.getEditable() && me.getEditMode()) {
                if(me.down('#editLabelItem')) {
                    me.down('#editLabelItem').html = me.getDisplayLabel() + ':';
                }
                if(me.down('#displayValueEdit')) {
                    me.down('#displayValueEdit').setValue(me.getValue());
                    me.down('#displayValueEdit').autoSize();

                    //me.down('#displayValueEdit').fieldLabel = me.getDisplayLabel();
                }
            } else {
                if(me.down('#displayLabelItem')) {
                    me.down('#displayLabelItem').html = me.getDisplayLabel() + ':';
                }
                if(me.down('#displayValue')) {
                    me.down('#displayValue').html = (null === me.getValue()) ? '&nbsp;' : me.getValue();
                }
            }

        }, this));
    },

    makeEditViewItems: function() {
        var me = this;
        this.add(Ext.create('Ext.form.Label', {
            itemId: 'editLabelItem',
            width: '100%',
            //minWidth: 180,
            height: 25
        }));

        this.add(Ext.create('Ext.form.field.TextArea', {
            //fieldLabel: '',
            itemId: 'displayValueEdit',
            allowBlank: true,
            width: '100%',
            //labelWidth: 180,
            grow: true,
            //growAppend: '',
            //rows: 0,
            //growMin: 22,
            //growMax: 200,
            listeners: {
                blur: function(d) {
                    //console.log('Item Blur');
                    var newVal = d.getValue().trim();
                    me.setValue(newVal);
                }
            }
        }));
    },

    makeViewViewItems: function() {
        this.add(Ext.create('Ext.form.Label', {
            itemId: 'displayLabelItem',
            //width: 180,
            //minWidth: 180,
            height: 25
        }));
        this.add(Ext.create('Ext.form.Label', {
            itemId: 'displayValue',
            width: '100%'

        }));
    }


});