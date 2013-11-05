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

    requires: ['Ext.layout.container.HBox'],

    initComponent: function () {
        this.callParent(arguments);
        var me = this;

        me.on('beforerender', Ext.bind(function() {
            if(me.getEditable() && me.getEditMode()) {
                me.setTitle(me.getDisplayLabel() + ':');
                
                if(me.down('#displayValueEdit')) {
                    me.down('#displayValueEdit').setValue(me.getValue());
                }
            } else {
                if(me.down('#displayValue')) {
                    me.down('#displayValue').setValue((null === me.getValue()) ? '&nbsp;' : me.getValue());
                }
            }

        }, this));
    },

    makeViewViewItems: function() {
        this.layout = 'hbox';
        this.pack = 'center';
        this.align = 'middle';
        this.add(Ext.create('Ext.form.field.Display', {
            itemId: 'displayValue'
        }));
    }
});