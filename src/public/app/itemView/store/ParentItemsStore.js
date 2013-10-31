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

        var ReaderClass = Ext.extend(Ext.data.JsonReader, {
            type:'json',
            root: 'results',

            readRecords: function(data) {
                var i = 0, records = data.results, l = records.length;
                for (i; i < l; i++){
                    records[i].leaf = !records[i].hasChildren;
                }
                return this.callParent([data]);
            }

        });

        this.setProxy({
            type: 'savanna-cors',
            url: SavannaConfig.itemViewPerspective + '/183710',
            reader: new ReaderClass(),
            writer: {
                type: 'json'
            }
        });
    }
});

