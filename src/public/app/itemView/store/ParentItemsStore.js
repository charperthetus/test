/**
 * Created with IntelliJ IDEA.
 * User: ksonger
 * Date: 10/28/13
 * Time: 9:06 AM
 * To change this template use File | Settings | File Templates.
 */

/* global Ext: false, Savanna: false */
Ext.define('Savanna.itemView.store.ParentItemsStore', {
    extend: 'Ext.data.TreeStore',

    requires: [
        'Savanna.proxy.Cors',
        'Savanna.itemView.model.ParentItemsTreeModel'
    ],

    storeId: 'parentItemsTreeStore',

    model: 'Savanna.itemView.model.ParentItemsTreeModel',

    autoLoad: false,

    constructor: function () {

        this.callParent(arguments);

        this.setProxy({
            type: 'savanna-cors',
            url: SavannaConfig.itemViewPerspective,
            reader: {
                type: 'json',
                root: 'results',
                totalProperty: 'size'
            },
            writer: {
                type: 'json'
            }
        });
    }
});

