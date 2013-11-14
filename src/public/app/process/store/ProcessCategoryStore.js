/**
 * Created with IntelliJ IDEA.
 * Date: 10/28/13
 * Time: 9:06 AM
 * To change this template use File | Settings | File Templates.
 */

/* global Ext: false, Savanna: false */
Ext.define('Savanna.process.store.ProcessCategoryStore', {
    extend: 'Ext.data.TreeStore',

    requires: [
        'Savanna.proxy.Cors',
        'Savanna.process.model.ProcessCategoryModel'
    ],

    storeId: 'parentItemsTreeStore',

    model: 'Savanna.process.model.ProcessCategoryModel',

    autoLoad: false,

    rootId: null,

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

        }),
            me = this;

        this.setProxy({
            type: 'savanna-cors',
            url: SavannaConfig.processCategoryPerspective + me.rootId,
            noCache: false,
            startParam: undefined,
            limitParam: undefined,
            pageParam: undefined,
            reader: new ReaderClass(),
            writer: {
                type: 'json'
            }
        });
    }
});

