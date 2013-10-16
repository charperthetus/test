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
        {
            xtype: 'label',
            itemId: 'displayLabelItem',
            text: '',
            width: '100%'
        }
    ],

    initComponent: function () {
        this.callParent(arguments);
        var me = this;

        me.on('beforerender', Ext.bind(function() {
//            me.down('#displayLabelItem').text = me.displayLabel;
//            if(null !== me.value && 0 != me.value.length) {
//                Ext.Array.each(me.value, function(stringElement) {
//                    var theLabel = Ext.create('Ext.form.Label', {
//                        text: '',
//                        width: "100%"
//                    });
//                    theLabel.setText( stringElement.toLocaleString() );
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

    makeItems: function () {
        this.removeAll();
        if(this.getEditable() && this.getEditMode()) {
            this.add(Ext.create('Ext.form.field.Text', {
                fieldLabel: '',
                itemId: 'displayValueEdit',
                allowBlank: true,
                width: '100%',
                labelWidth: 200
            }));
        } else {
            this.add(Ext.create('Ext.form.Label', {
                itemId: 'displayLabelItem',
                width: 200,
                minWidth: 200,
                height: 25
            }));
            this.add(Ext.create('Ext.form.Label', {
                itemId: 'displayValue',
                width: '100%'

            }));
        }
    }

});