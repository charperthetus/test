/**
 * Created with IntelliJ IDEA.
 * User: mfawver
 * Date: 9/25/13
 * Time: 1:09 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.metadata.view.Uri', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.metadata_uri',

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

        },
        {
            xtype: 'label',
            itemId: 'displayValue'
        }
    ],
    initComponent: function () {
        this.callParent(arguments);
        Savanna.controller.Factory.getController('Savanna.metadata.controller.FieldTypes');

        this.on('beforerender', Ext.bind(function() {
            var config = this.initialConfig || {};

            this.down('#displayLabel').text = config.displayLabel;
//            console.log('config.value', config.value);
//            var temp = Ext.Object.fromQueryString(config.value);
//            var temp2 =  Ext.Object.toQueryString(temp);
//            var temp3 = decodeURI(config.value);
//            var temp4 = encodeURI(config.value);
            var temp4 = config.value.replace('%2F', '/', 'g');
//
//            console.log('temp', temp);
//            console.log('temp2', temp2);
//            console.log('temp3', temp3);
//            console.log('temp4', temp4);

            this.down('#displayValue').text = temp4;

        }, this));
    }

});