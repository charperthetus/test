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
        {
            xtype: 'label',
            itemId: 'displayLabelItem',
            text: '',
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
            this.down('#displayLabelItem').text = me.displayLabel;
            Ext.Array.each(me.value, function(stringElement) {
                var theLabel = Ext.create('Ext.form.Label', {
                    text: '',
                    width: "100%"
                });
                theLabel.setText( stringElement );
                me.add( theLabel );
            });

        }, this));
    }

});