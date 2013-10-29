/* global Ext: false, Savanna: false */


Ext.define('Savanna.modelSearch.store.SearchResults', {
    extend: 'Ext.data.JsonStore',

    requires: [
        'Savanna.modelSearch.model.SearchResult',
        'Savanna.proxy.Cors'
    ],

    storeId: 'searchResults',

    fields: [
        {name: 'uri', type: 'string'},
        {name: 'label', type: 'string'},
        {name: 'type', type: 'string'},   //possible values: "Item", "Process"
        {name: 'modifiedBy', type: 'string'},
        {name: 'modifiedDate', type: 'string'},
        {name: 'preview', type: 'string'},
        {name: 'primaryImageUrl', type: 'string'},
        {name: 'workflowState', type: 'string'},
        {name: 'classification', type: 'string'}
    ],

    autoLoad: false,

    pageSize: 20,

    facetValueSummaries:null,

    facetFilterCriteria:[],

    dateTimeRanges:[],

    searchParamVO: null,


    updateJson: function () {
        //Hallelujah! This lets us change page size and start index
        if (this.searchParamVO) {
            this.searchParamVO.pageStart = (this.currentPage - 1) * this.pageSize;
            this.searchParamVO.pageSize = this.pageSize;
            this.jsonData = Ext.JSON.encode(this.searchParamVO);
        }
        return this.jsonData;
    },

    constructor: function () {

        var ReaderClass,
            me = this;

        this.callParent(arguments);



        ReaderClass = Ext.extend(Ext.data.JsonReader, {
            type:'json',
            root: 'results',
            totalProperty:'totalResults',
            readRecords: function(data) {
                me.facetValueSummaries = data.facets;

                //This is the correct usage of this.  Follow IDEA's warning at your own peril:
                return this.callParent([data]);
            }

        });


        this.setProxy({
            type: 'savanna-cors',
            url: SavannaConfig.modelSearchUrl,
            reader: new ReaderClass(),
            enablePagingParams: false,

            //gaaah.  Undefined used to work.  setEnablePagingParams(false) is supposed to work "soon".
            // null works as of Tuesday Oct. 22, 2013.
            pageParam: null,
            startParam: null,
            limitParam: null,

            modifyRequest:function(request) {

                Ext.apply(request, {
                    jsonData: me.updateJson(),
                    method: 'POST'
                });

                return request;
            }
        });
    }
});


