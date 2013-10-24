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
                //me.down('#displayLabelItem').text = me.displayLabel + ':';
            } else {
                me.down('#displayLabelItem').text = me.displayLabel + ':';
            }
        }, this));
    },

    makeEditViewItems: function() {
        var me = this;
        if(null !== me.value && 0 != me.value.length) {
            var fieldLabelValue = me.displayLabel;
            var container = Ext.create('Ext.container.Container', {
               layout: 'vbox',
               width: "100%",
               border: false
            });
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
                container.add(textField);
                if(fieldLabelValue == '&nbsp;') {
                    textField.labelSeparator = '';
                }
                fieldLabelValue = '&nbsp;';
            });
            me.add(container);
        }
    },

    makeViewViewItems: function() {
        var me = this;
        this.add(Ext.create('Ext.form.Label', {
            itemId: 'displayLabelItem',
            width: 180,
            minWidth: 180,
            height: 25
        }));

        var contains = Ext.create('Ext.container.Container', {
            layout: 'vbox',
            width: "100%",
            border: false
        });
        if(null !== me.value && 0 != me.value.length) {
            Ext.Array.each(me.value, function(stringElement) {
                var theLabel = Ext.create('Ext.form.Label', {
                    text: '',
                    width: "100%",
                    height: 25
                });
                theLabel.setText( stringElement.toLocaleString() );
                contains.add( theLabel );
            });
        }
        me.add(contains);

    }

});