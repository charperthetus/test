/**
 * Created with IntelliJ IDEA.
 * User: ksonger
 * Date: 10/26/13
 * Time: 9:55 AM
 * To change this template use File | Settings | File Templates.
 */

/**
 * Created with IntelliJ IDEA.
 * User: ksonger
 * Date: 10/24/13
 * Time: 3:26 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.itemView.view.createItem.ParentDetails', {
    extend: 'Ext.panel.Panel',

    alias: 'widget.itemview_parentdetails',

    requires: [

    ],

    title: 'Selection',

    layout:'hbox',

    items:[],

    initComponent: function () {
        this.items = this.setupItems();
        this.callParent(arguments);
    },

    setupItems: function () {

        var content = [
            {
                xtype:'panel',
                itemId:'parentdetails_imagepanel',
                flex:1
            },
            {
                xtype:'panel',
                itemId:'parentdetails_textpanel',
                flex:2
            }

        ];
        return content;
    }
});

