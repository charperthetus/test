/**
 * Created with IntelliJ IDEA.
 * User: sseely
 * Date: 11/11/13
 * Time: 12:53 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.map.view.part.DataCard', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.map_popup_datacard',

    requires: 'Savanna.map.controller.DataCardController',

    controller: 'Savanna.map.controller.DataCardController',

//    requires: 'Savanna.map.view.part.DataCardGrid',

    height: 175,
    width: 375,
    style: {
        'overflow': "visible"
    },
    columns: [],
    layout: 'vbox',
    autoScroll: true,
    sortableColumns: false,
    floating: true,
    toFrontOnShow: false,
    hidden: true,
//    defaults: {
//        // applied to each contained panel
//        border: false
//    },

    bbar: [
        {
            xtype: 'button',
            itemId: 'removeSelectedFeature',
            text: 'Remove Feature'
        },
        '->',
        {
            xtype: 'button',
            itemId: 'editFeatureData',
            text: 'Edit Data'
        }
    ],

    onRender: function() {
        this.callParent(arguments);
        Ext.DomHelper.append(this.getEl().dom, '<div class="popUpAnchor"></div>');


    }
});