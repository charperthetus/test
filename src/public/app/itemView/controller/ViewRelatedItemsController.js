/**
 * Created with IntelliJ IDEA.
 * User: bjohnson
 * Date: 10/24/13
 * Time: 3:31 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.itemView.controller.ViewRelatedItemsController', {
    extend: 'Deft.mvc.ViewController',

    views: [
        'Savanna.itemView.view.relatedItems.ViewRelatedItems'
    ],

    control: {
        view: {
            'ViewRelatedItems:SetupData': 'setupData',
            'ViewRelatedItems:AddRelationshipGrid': 'addRelationshipGrid'
        }
    },

    setupData: function (items) {
        Ext.each(items, function (relatedItemsGroup) {
            this.addRelationshipGrid(relatedItemsGroup);
        }, this);
        this.updateHeader(items.length || 0);
    },

    updateHeader: function (number) {
        console.debug('running');
        var titlePre = 'Related Items (',
            titlePost = ')',
            title = this.getView();

        if (title) {
            title.setTitle(titlePre + number + titlePost);
        }
    },

    addRelationshipGrid: function (relationship) {
        var grid = Ext.create('Ext.grid.Panel', {
            itemId: 'relatedItemGrid_' + relationship.get('label').replace(/\s/g,''),
            store: relationship.valuesStore,
            columns: [
                {
                    xtype: 'templatecolumn',
                    tpl: Ext.create('Ext.XTemplate',
                        '<input type="button" name="{value}" value="{label}" id="openRelatedItem" />'
                    ),
                    text: relationship.get('label'),
                    flex: 1,
                    sortable: false
                }
            ],
            listeners: {
                itemclick: this.onRelatedItemClick
            }
        });

        this.getView().add(grid);
        this.getView().up('itemview_itemviewer').fireEvent('ItemView:SaveEnable');
    },

    onRelatedItemClick: function (grid, record, item, index, e, eOpts) {
        if (e.target.id == "openRelatedItem") {
            grid.up('itemview_view_related_items').fireEvent('ItemView:OpenItem', e.target.value, e.target.name);
        }
    }
});