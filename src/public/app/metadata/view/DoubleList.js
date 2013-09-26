/**
 * Created with IntelliJ IDEA.
 * User: mfawver
 * Date: 9/26/13
 * Time: 1:23 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.metadata.view.DoubleList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.metadata_doublelist',

    requires: [
        'Savanna.controller.Factory'
    ],

    layout: 'vbox',
    width: "100%",

    border: false,

    items: [
        {
            xtype: 'label',
            itemId: 'displayLabel',
            text: ''
        }
    ],
    initComponent: function () {
        this.callParent(arguments);
        Savanna.controller.Factory.getController('Savanna.metadata.controller.FieldTypes');

        this.on('beforerender', Ext.bind(function() {
            var config = this.initialConfig || {};

            this.down('#displayLabel').text = config.displayLabel;

            var me = this;

            Ext.Array.each(config.value, function(stringElement) {
                var theLabel = Ext.create('Ext.form.Label', {
                    text: '',
                    width: "100%"
                });
                theLabel.setText( stringElement.toLocaleString() );

                me.add( theLabel );
            });

        }, this));
    }

});