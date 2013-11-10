/**
 * Created with IntelliJ IDEA.
 * User: swatson
 * Date: 9/24/13
 * Time: 9:13 AM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.metadata.view.String', {
    extend: 'Savanna.metadata.view.MetadataItemView',
    alias: 'widget.metadata_string',

    items: [
    ],

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
                me.setTitle(me.getDisplayLabel() + ':&nbsp;&nbsp;');
                
                if(me.down('#displayValue')) {
                    var displayValue = (null === me.getValue()) ? '' : me.getValue();
                    me.down('#displayValue').setValue(displayValue);
                }
            }
        }, this));
    }

});