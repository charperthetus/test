/**
 * Created with IntelliJ IDEA.
 * User: ksonger
 * Date: 10/23/13
 * Time: 12:34 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.itemView.view.relatedItems.EditRelatedItems', {
    extend: 'Ext.panel.Panel',

    alias: 'widget.itemview_edit_related_items',

    requires: [
        'Savanna.itemView.controller.EditRelatedItemsController',
        'Savanna.itemView.view.relatedItems.AddRelationships'
    ],

    controller: 'Savanna.itemView.controller.EditRelatedItemsController',


    layout:{
        type:'vbox',
        align:'center'
    },

    tools:[{
        xtype: 'button',
        itemId: 'addRelationshipType',
        text: '+Add'
    }]



});