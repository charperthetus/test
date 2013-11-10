/**
 * Created with IntelliJ IDEA.
 * User: mfawver
 * Date: 9/26/13
 * Time: 1:16 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.metadata.view.IntegerList', {
    extend: 'Savanna.metadata.view.MetadataItemView',
    alias: 'widget.metadata_integerlist',

    initComponent: function () {
        this.callParent(arguments);
        var me = this;

        me.on('beforerender', Ext.bind(function() {
            if(me.getEditable() && me.getEditMode()) {
                me.setTitle(me.displayLabel + ':');
            } else {
                me.setTitle(me.displayLabel + ':');
            }
        }, this));
    },

    makeEditViewItems: function() {
        var me = this;
        if(null !== me.value && 0 != me.value.length) {
            var fieldLabelValue = me.displayLabel;
            
            var cloneArray = Ext.Array.clone(me.value);
            Ext.Array.each(cloneArray, function(stringElement, index, allItems) {
                var textField = Ext.create('Ext.form.field.Text', {
                    allowBlank: true,
                    width: '100%',
                    labelWidth: 180,
                    value: stringElement,
                    regex: /^[0-9]*$/,
                    maskRe: /\d/i,
                    listeners: {
                        blur: function(d) {
                            allItems[index] = parseInt(d.getValue(), 10);
                            me.setValue(allItems);
                        }
                    }
                });
                textField.fieldLabel = fieldLabelValue;
                if('&nbsp;' === fieldLabelValue) {
                    textField.labelSeparator = '';
                }
                fieldLabelValue = '&nbsp;';
                me.add(textField);
            });
        }
    },

    makeViewViewItems: function() {
        var me = this;
        
        if(null !== me.value && 0 !== me.value.length) {
            Ext.Array.each(me.value, function(stringElement) {
                var theLabel = Ext.create('Ext.form.field.Display', {});
                theLabel.setValue( stringElement.toLocaleString() );
                me.add( theLabel );
            });
        }
    }

});