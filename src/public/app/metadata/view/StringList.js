/**
 * Created with IntelliJ IDEA.
 * User: mfawver
 * Date: 9/26/13
 * Time: 9:32 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.metadata.view.StringList', {
    extend: 'Savanna.metadata.view.MetadataItemView',
    alias: 'widget.metadata_stringlist',

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
//            if(null !== me.value && 0 != me.value.length) {
//                Ext.Array.each(me.value, function(stringElement) {
//                    var theLabel = Ext.create('Ext.form.Label', {
//                        text: '',
//                        width: "100%"
//                    });
//                    theLabel.setText( stringElement );
//                    me.add( theLabel );
//                });
//            } else {
//                me.add( Ext.create('Ext.form.Label', {
//                                    html: '&nbsp;',
//                                    width: "100%"
//                                })
//                );
//            }
        }, this));
    },

    makeEditViewItems: function() {
        //this.makeViewViewItems(); // for now, until we get the edit mode figured out.

        var me = this;
        if(null !== me.value && 0 != me.value.length) {
            var fieldLabelValue = me.displayLabel;
            //console.log('me.value',me.value);
            var contains = Ext.create('Ext.container.Container', {
               layout: 'vbox',
               width: "100%",
               border: false
            });
            Ext.Array.each(me.value, function(stringElement) {
                //console.log('in loop', stringElement);
                var textField = Ext.create('Ext.form.field.Text', {
                    allowBlank: true,
                    width: '100%',
                    labelWidth: 200,
                    value: stringElement,
                    listeners: {
                        blur: function(d) {
                            //console.log('Item Blur');

//                            var newVal = d.getValue().trim();
//                            me.setValue(newVal);
                        }
                    }
                });
                textField.fieldLabel = fieldLabelValue;
                contains.add(textField);
                if(fieldLabelValue == '&nbsp;') {
                    textField.labelSeparator = '';
                }
                fieldLabelValue = '&nbsp;';
            });
            me.add(contains);
        }
    },

    makeViewViewItems: function() {
        var me = this;
        this.add(Ext.create('Ext.form.Label', {
            itemId: 'displayLabelItem',
            width: 200,
            minWidth: 200,
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
                theLabel.setText( stringElement );
                contains.add( theLabel );
            });
        }
        me.add(contains);

    }

});