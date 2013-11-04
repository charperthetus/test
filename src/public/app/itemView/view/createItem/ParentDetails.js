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
        'Ext.Img'
    ],

    title: 'Selection',
    header: {
        xtype: 'header',
        cls: 'item-header-font',
        style: {
            "background": '#FFFFFF'
        }
    },
    layout: 'fit',

    items: [],

    initComponent: function () {
        this.items = this.setupItems();

        this.callParent(arguments);

        Savanna.app.on('itemview:treepanel:itemclick', this.onTreeItemClick, this);
    },

    onTreeItemClick: function (view, record, item, index, e, eOpts) {

        if(this.queryById('parentdetails_textpanel') === null)  {
            this.add({
                xtype: 'panel',
                itemId: 'parentdetails_textpanel',
                padding:    {
                    left:10
                },

                tpl: Ext.create('Ext.XTemplate',
                    '<b>{label}</b><br /><br />',
                    '{description}'
                )
            })
        }
        this.queryById('parentdetails_textpanel').update(record.data);
    },

    setupItems: function () {

        var content = [
            {
                xtype: 'panel',
                itemId: 'parentdetails_textpanel',
                padding:    {
                    left:10
                },

                tpl: Ext.create('Ext.XTemplate',
                    '<b>{label}</b><br /><br />',
                    '{description}'
                )
            }

        ];
        return content;
    }
});

