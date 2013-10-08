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

    requires: [
        'Savanna.controller.Factory'
    ],

    items: [
        {
            xtype: 'label',
            itemId: 'displayLabelItem',
            text: '',
            width: '100%'
        },
        {
            xtype: 'label',
            itemId: 'displayValue',
            width: '100%'
        }
    ],

    initComponent: function () {
        this.callParent(arguments);
        Savanna.controller.Factory.getController('Savanna.metadata.controller.FieldTypes');
        var config = this.initialConfig || {};
        this.initValues(config);
        var me = this;

        this.on('beforerender', Ext.bind(function() {
            me.down('#displayLabelItem').text = me.displayLabel;
            // TODO: This conversion is probably not correct.  Need to decode it properly.
            // If you change this, check UriList.js for similar.
            if(me.value)    {
                me.down('#displayValue').text = me.value.replace('%2F', '/', 'g');
            }


        }, this));
    }

});