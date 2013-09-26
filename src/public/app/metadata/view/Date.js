/**
 * Created with IntelliJ IDEA.
 * User: swatson
 * Date: 9/24/13
 * Time: 9:13 AM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.metadata.view.Date', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.metadata_date',

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

            var myDate = new Date(config.value);
            this.down('#displayValue').text = Ext.Date.format(myDate,'F j, Y, g:i a');

        }, this));
    }

});