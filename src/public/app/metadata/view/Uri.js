/**
 * Created with IntelliJ IDEA.
 * User: mfawver
 * Date: 9/25/13
 * Time: 1:09 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.metadata.view.Uri', {
    extend: 'Savanna.metadata.view.MetadataItemView',
    alias: 'widget.metadata_uri',

    items: [
    ],

    initComponent: function () {
        this.callParent(arguments);
        var me = this;

        this.on('beforerender', Ext.bind(function() {
            if(me.getEditable() && me.getEditMode()) {
                 me.setTitle(me.getDisplayLabel() + ':');
                 
                if(me.down('#displayValueEdit')) {
                    me.down('#displayValueEdit').setValue(me.getValue());
                }
            } else {
                me.setTitle(me.getDisplayLabel() + ':&nbsp;&nbsp;');
                if(me.down('#displayValue')) {
                    // TODO: This conversion is probably not correct.  Need to decode it properly.
                    // If you change this, check UriList.js for similar.
                    var uriValue = (null === me.getValue()) ? '&nbsp;' : me.value.replace('%2F', '/', 'g');
                    me.down('#displayValue').setValue(uriValue);
                }
            }

        }, this));
    }
});