/**
 * Created with IntelliJ IDEA.
 * User: ksonger
 * Date: 10/24/13
 * Time: 1:34 PM
 * To change this template use File | Settings | File Templates.
 */

/* global Ext: false, Savanna: false */
Ext.define('Savanna.itemView.store.ParentItemStore', {
    extend: 'Ext.data.JsonStore',

    requires: [
        'Savanna.itemView.model.ParentItem',
        'Savanna.proxy.Cors'
    ],

    storeId: 'parentModelStore',

    model: 'Savanna.itemView.model.ParentItem',

    autoLoad: false,

    pageStart:0,

    pageSize: 20,

    keyword:'',

    excludeUri:'',

    facets:[],

    queryId:'',

    constructor: function () {

        var ReaderClass = null,
            me = this;

        this.callParent(arguments);

        ReaderClass = Ext.extend(Ext.data.JsonReader, {
            type:'json',
            root: 'results',
            totalProperty:'totalResults',
            readRecords: function(data) {
                me.facets = data.facets;
                me.queryId = data.queryId;
                return this.callParent([data]);
            }

        });

        this.setProxy({
            type: 'savanna-cors',
            url: SavannaConfig.mockModelSearch,
            params: {
                keyword: me.keyword,
                pageStart:me.pageStart,
                pageSize:me.pageSize,
                excludeUri:me.excludeUri
            },
            reader: new ReaderClass()
        });
    }
});
