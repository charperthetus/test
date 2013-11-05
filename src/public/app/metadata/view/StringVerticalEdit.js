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

    initComponent: function () {
        this.callParent(arguments);
        var me = this;

        me.on('beforerender', Ext.bind(function() {
            if(me.getEditable() && me.getEditMode()) {
                me.setTitle(me.getDisplayLabel() + ':&nbsp;&nbsp;');

                if(me.down('#displayValueEdit')) {
                    me.down('#displayValueEdit').setValue(me.getValue());
                    me.down('#displayValueEdit').autoSize();
                }
            } else {
                me.setTitle(me.getDisplayLabel() + ':&nbsp;&nbsp;');
                
                if(me.down('#displayValue')) {

                    var displayValue = me.getValue();
                    
                    me.down('#displayValue').setValue((null === me.getValue()) ? '' : me.getValue());
                }
            }

        }, this));
    },

    makeEditViewItems: function() {
        var me = this;
        this.add(Ext.create('Ext.form.field.TextArea', {
            itemId: 'displayValueEdit',
            allowBlank: true,
            width: '100%',
            grow: true,
            listeners: {
                blur: function(d) {
                    var newVal = d.getValue().trim();
                    me.setValue(newVal);
                }
            }
        }));
    },

    makeViewViewItems: function() {
        this.add(Ext.create('Ext.form.field.Display', {
            itemId: 'displayValue'
        }));
    }


});