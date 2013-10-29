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
            'ViewRelatedItems:SetupData': 'setupData'
        }
    },

    setupData: function (items) {
        var me = this;

        Ext.each(items, function (relatedItemsGroup) {

            var grid = Ext.create('Ext.grid.Panel', {
                itemId: 'relatedItemGrid_' + relatedItemsGroup.get('label').replace(/\s/g,''),
                store: relatedItemsGroup.valuesStore,
                columns: [
                    {
                        xtype: 'templatecolumn',
                        tpl: Ext.create('Ext.XTemplate',
                            '<input type="button" name="{value}" value="{label}" id="openRelatedItem" />'
                        ),
                        text: relatedItemsGroup.get('label'),
                        flex: 1,
                        sortable: false
                    }
                ],
                listeners: {
                    itemclick: me.onRelatedItemClick
                }
            });

            me.getView().add(grid);
        });
    },

    onRelatedItemClick: function (grid, record, item, index, e, eOpts) {
        if (e.target.id == "openRelatedItem") {
            grid.up('itemview_view_related_items').fireEvent('ItemView:OpenItem', e.target.value, e.target.name);
        }
    }
});