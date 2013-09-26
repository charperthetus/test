/**
 * Created with IntelliJ IDEA.
 * User: mfawver
 * Date: 9/25/13
 * Time: 8:49 AM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.metadata.view.LongString', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.metadata_longstring',

    requires: [
        'Savanna.controller.Factory'
    ],

    layout: 'vbox',

    border: false,

    items: [
        {
            xtype: 'label',
            itemId: 'displayLabel',
            text: ''

        },
        {
            xtype: 'label',
            itemId: 'displayValue',
            text: ''
        }
    ],
    initComponent: function () {
        this.allResultSets = [];
        this.callParent(arguments);
        Savanna.controller.Factory.getController('Savanna.metadata.controller.FieldTypes');

        this.on('beforerender', Ext.bind(function() {
            var config = this.initialConfig || {};

            this.down('#displayLabel').text = config.displayLabel;
            this.down('#displayValue').text = config.value;

        }, this));
    }

});