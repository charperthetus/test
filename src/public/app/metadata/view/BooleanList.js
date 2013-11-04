/**
 * Created with IntelliJ IDEA.
 * User: mfawver
 * Date: 9/26/13
 * Time: 1:01 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.metadata.view.BooleanList', {
    extend: 'Savanna.metadata.view.MetadataItemView',
    alias: 'widget.metadata_booleanlist',

    items: [
    ],

    initComponent: function () {
        this.callParent(arguments);
        var me = this;

        me.on('beforerender', Ext.bind(function() {
            me.setTitle(me.displayLabel + ':');
        }, this));
    },

    makeEditViewItems: function() {
        this.makeViewViewItems(); // for now, until we get the edit mode figured out.
    },

    makeViewViewItems: function() {
        var me = this;
        
        if(null !== me.value && 0 != me.value.length) {
            Ext.Array.each(me.value, function(stringElement) {
                var theLabel = Ext.create('Ext.form.field.Display', {
                });
                theLabel.setValue( stringElement.toString() );
                me.add( theLabel );
            });
        }
    }

});