/* global Ext: false, Savanna: false */
Ext.define('Savanna.modelSearch.store.SearchResults', {
 extend: 'Ext.data.Store',

 requires: [
 'Savanna.modelSearch.model.SearchResult',
 'Savanna.proxy.Cors'
 ],

 storeId: 'searchResults',

 //   model: 'Savanna.modelSearch.model.SearchResult',

 autoLoad: false,

 pageSize: 20,

 facetValueSummaries:null,

 facetFilterCriteria:[],

 dateTimeRanges:[],





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

 data:    [
 {
 uri: "uid:sadflkajsdf",
 label: "Nitric Acid",
 type: "Item",  // Process
 modifiedBy: "cmason",
 modifiedDate: '12-Dec-2012',
 preview: "blah blah <b>search term</b> blah blah",  // may not have bold.  may be blank
 primaryImageUrl: "",
 workflowState: "DRAFT",  //one of "DRAFT", "SUBMITTED", "APPROVED", "REJECTED"
 classification: "U//FOUO"
 },
 {
 uri: "uid:sadflkajsdf",
 label: "Boric Acid",
 type: "Item",  // Process
 modifiedBy: "cmason",
 modifiedDate: '12-Dec-2012',
 preview: "blah blah <b>search term</b> blah blah",  // may not have bold.  may be blank
 primaryImageUrl: "http://bioland-sci.com/index.php?main_page=product_info&cPath=4_140&products_id=744&zenid=bde1gn7obfd2il99mg26455dk4",
 workflowState: "DRAFT",  //one of "DRAFT", "SUBMITTED", "APPROVED", "REJECTED"
 classification: "U//FOUO"
 },
 {
 uri: "uid:sadflkajsdf",
 label: "Brown Acid",
 type: "Item",  // Process
 modifiedBy: "cmason",
 modifiedDate: '12-Dec-2012',
 preview: "blah blah <b>search term</b> blah blah",  // may not have bold.  may be blank
 primaryImageUrl: "http://www.the-fifth-hope.org/art/acid.jpeg",
 workflowState: "DRAFT",  //one of "DRAFT", "SUBMITTED", "APPROVED", "REJECTED"
 classification: "U//FOUO"
 }

 ]
 });

/*


//global Ext: false, Savanna: false
Ext.define('Savanna.modelSearch.store.SearchResults', {
    extend: 'Ext.data.JsonStore',

    requires: [
        'Savanna.modelSearch.model.SearchResult',
        'Savanna.proxy.Cors'
    ],

    storeId: 'searchResults',

    //model: 'Savanna.modelSearch.model.SearchResult',

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

    constructor: function () {

        var ReaderClass = null,
            me = this;

        this.callParent(arguments);


        */
/*
         Must set totalProperty on the reader for our paging toolbar to work.  Because
         base elements are all on the same level in a json object with no key, the only way
         appears to be to modify the json object in readRecords to have a key value,
         which is set to 'data' in this case.  Allows then for 'data.totalResults', etc...
         *//*


        ReaderClass = Ext.extend(Ext.data.JsonReader, {
            type:'json',
            root: 'results',
            totalProperty:'maxResults',
            readRecords: function(data) {
                me.facetValueSummaries = data.facetValueSummaries;
                return this.callParent([data]);
            }

        });

        this.setProxy({
            type: 'savanna-cors',
            url: SavannaConfig.modelSearchUrl,
            reader: new ReaderClass(),
            pageParam: false, //to remove param "page"
            startParam: false, //to remove param "start"
            limitParam: false, //to remove param "limit"
            modifyRequest:function(request) {
                Ext.apply(request, {
                    jsonData: this.jsonData,
                    method:'POST'
                });

                return request;
            }
        });
    }
});
*/
