/**
 * Created with IntelliJ IDEA.
 * User: ksonger
 * Date: 7/25/13
 * Time: 1:19 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.search.model.SearchRequest', {
    extend: 'Ext.data.Model',

    requires:[
        'Savanna.Config'
    ],

    fields: [
        {name: "_type", type: "string", defaultValue: "com.thetus.platforms.savanna.mdks.search.objects.SearchParamVO"},
        {name: "contentDataSource", type: "string", defaultValue: "SolrJdbc"},
        {name: "desiredFacets", type: "array", defaultValue: [
            "published-date",
            "ingest-date",
            "producer",
            "producer-category",
            "distributor",
            "composite",
            "isf-source-type"
        ]},
        {name: "displayLabel", type: "string", defaultValue: ""},
        {name: "resultsPerPage", type: "int", defaultValue: 100},
        {name: "resultsStartIndex", type: "int", defaultValue: 0},
        {name: "returnLatLonPairs", type: "boolean", defaultValue: true},
        {name: "returnResults", type: "boolean", defaultValue: true},
        {name: "returnTagCloud", type: "boolean", defaultValue: false},
        {name: "searchPreferencesVOs", type: "array", defaultValue: Savanna.Config.defaultSearchDal},
        {name: "searchTargets", type: "array", defaultValue: [
            {
                "targetName": "Document",
                "resultsStartIndex": 0
            }
        ]},
        {name: "textInputString", type: "string", defaultValue: ""}
    ]
});
