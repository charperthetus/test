/**
 * Created with IntelliJ IDEA.
 * User: mfawver
 * Date: 9/26/13
 * Time: 1:33 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.metadata.view.UriList', {
    extend: 'Savanna.metadata.view.MetadataItemView',
    alias: 'widget.metadata_urilist',

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

        this.on('beforerender', Ext.bind(function() {
//            me.down('#displayLabelItem').text = me.displayLabel;
//            if(null !== me.value && 0 != me.value.length) {
//                Ext.Array.each(me.value, function(stringElement) {
//                    var theLabel = Ext.create('Ext.form.Label', {
//                        text: '',
//                        width: "100%"
//                    });
//
//                    // TODO: This conversion is probably not correct.  Need to decode it properly.
//                    // If you change this, check Uri.js for similar.
//                    var decoded = stringElement.replace('%2F', '/', 'g');
//                    theLabel.setText( decoded );
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