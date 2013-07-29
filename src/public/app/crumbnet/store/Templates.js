/**
 * Created with IntelliJ IDEA.
 * User: thille
 * Date: 7/25/13
 * Time: 5:17 PM
 * To change this template use File | Settings | File Templates.
 */
/* global Ext: false */
Ext.define('Savanna.crumbnet.store.Templates', {
    extend: 'Ext.data.JsonStore',

    storeId: 'templateStore',

    model: 'Savanna.crumbnet.model.Template',

    autoLoad: false,

    constructor: function() {
        this.callParent(arguments);

        // NOTE: this is all a hack to try to troubleshoot search issues....
        var savannaUrl = Savanna.Config.savannaUrlRoot;

        // HACK: we have to set the proxy manually because for some reason the config is not read by default
        this.setProxy({
            type: 'rest',
            actionMethods: { create: 'POST', read: 'POST', update: 'POST', destroy: 'POST' },
            url: savannaUrl + 'rest/search/',
            buildUrl: function (request) {
                console.log(Savanna.jsessionid, Savanna);
                return this.getUrl(request) + ';jsessionid=' + Savanna.jsessionid;
            },
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            doRequest: function (operation, callback, scope) {
                var writer = this.getWriter(),
                    request = this.buildRequest(operation, callback, scope);

                if (operation.allowWrite()) {
                    request = writer.write(request);
                }

                Ext.apply(request, {
                    headers: this.headers,
                    timeout: this.timeout,
                    scope: this,
                    callback: this.createRequestCallback(request, operation, callback, scope),
                    method: this.getMethod(request),
                    jsonData: this.jsonData,
                    disableCaching: false // explicitly set it to false, ServerProxy handles caching
                });

                Ext.Ajax.request(request);
                return request;
            },
            reader: {
                type: 'json',
                root: 'modelItems',
                totalProperty: 'totalResults'
            },
            writer: {
                type: 'json'
            }
        });
    },
    listeners: {
        beforeload: function(store, operation) {
            store.proxy.jsonData = {
                "_type": "com.thetus.platforms.savanna.mdks.search.objects.SearchParamVO",
                "documentSource": null,
                "distinguishedName": null,
                "contentDataSource": "SolrJdbc",
                "textInputs": [],
                "textInputString": "cats",
                "searchTargets": [
                    {
                        "results": [],
                        "targetName": "Document",
                        "resultsStartIndex": 0,
                        "totalResults": 0
                    }
                ],
                "resultsPerPage": 100000,
                "abacCredentials": null,
                "queryNumber": 0,
                "filterHelpDocs": true,
                "heatmap": {
                    "South": -90,
                    "North": 90,
                    "West": -180,
                    "East": 180,
                    "X": 60,
                    "Y": 30
                },
                "dateTimeBucket": null,
                "dateTimeRanges": [
                    {
                        "Startdate": 1375029686567,
                        "Enddate": 1375116086567,
                        "DateFieldName": "published-date",
                        "dateRangeName": "Sun Jul 28 09:41:26 GMT-0700 2013 - Mon Jul 29 09:41:26 GMT-0700 2013"
                    }
                ],
                "geospatialRange": {
                    "south": -90,
                    "north": 90,
                    "west": -180,
                    "east": 180
                },
                "resultsStartIndex": 0,
                "returnResults": false,
                "returnQuery": false,
                "returnQueryText": false,
                "returnMetrics": false,
                "returnTagCloud": false,
                "returnLatLonPairs": true,
                "desiredFacets": null,
                "keywords": [
                    "*"
                ],
                "proximities": null,
                "facetFilterCriteria": null,
                "sortOrder": null,
                "searchHelpDocsOnly": false,
                "polygonVo": null,
                "searchPreferencesVOs": [],
                "id": 0,
                "displayLabel": "cats",
                "uri": "0%2FSearch"
            };
        }
    },

    buildData: function() {
        this.data = [
            {
                title: 'TEST PALETTE GROUP ONE',
                items: [
                    { label: 'Concept label', category: 'Concept' },
                    { label: 'Hypothesis label', category: 'Hypothesis' },
                    { label: 'Question label', category: 'Question' }
                ]
            },
            {
                title: 'TEST PALETTE GROUP TWO',
                items: [
                    { label: 'Problem label', category: 'Problem' },
                    { label: 'Conclusion label', category: 'Conclusion' },
                    { label: 'Assumption label', category: 'Assumption' },
                    { label: 'Fact label', category: 'Fact' }
                ]
            }
        ];
    }
});