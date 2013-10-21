/**
 * Created with IntelliJ IDEA.
 * User: mfawver
 * Date: 9/26/13
 * Time: 12:29 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.metadata.view.Boolean', {
    extend: 'Savanna.metadata.view.MetadataItemView',
    alias: 'widget.metadata_boolean',

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
            text: ''
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
            //this.down('#displayValue').text = me.value.toString();
            this.down('#displayValue').html = (null === me.value) ? '&nbsp;' : me.value.toString();
        }, this));
    }

});