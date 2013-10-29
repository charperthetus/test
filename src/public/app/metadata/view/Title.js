/**
 * Created with IntelliJ IDEA.
 * User: mfawver
 * Date: 10/29/13
 * Time: 10:17 AM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.metadata.view.Title', {
    extend: 'Savanna.metadata.view.MetadataItemView',
    alias: 'widget.metadata_title',

    items: [
    ],

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
                    //me.down('#displayValueEdit').fieldLabel = me.getDisplayLabel();
                }
            } else {
                if(me.down('#displayValue')) {
                    me.down('#displayValue').html = (null === me.getValue()) ? '&nbsp;' : me.getValue();
                }
            }

        }, this));
    },

    makeViewViewItems: function() {
        this.layout = 'hbox';
        this.pack = 'center';
        this.align = 'middle';
        this.add(Ext.create('Ext.form.Label', {
            itemId: 'displayValue',
            border: 5
            //width: '100%'

        }));
    }




});