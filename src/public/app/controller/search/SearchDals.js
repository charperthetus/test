/**
 * Created with IntelliJ IDEA.
 * User: swatson
 * Date: 7/3/13
 * Time: 3:18 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('sources',{
    extend: 'Ext.data.Model',
    fields: [
        { name: 'id', type: 'string' },
        { name: 'displayName', type: 'string' },
        { name: 'textDescription', type: 'string' },
        { name: 'customSearchDescription' },

        // These are fields that currently are not used
        { name: 'timeoutMillis', type: 'int' },
        { name: 'inputTypes' },
        { name: 'outputTypes' }
    ],
    hasMany: { model: 'facets', name: 'facetDescriptions' }
});

Ext.define("facets", {
    extend: 'Ext.data.Model',
    fields: [
        { name: "facetId", type: 'string' },
        { name: "facetDataType", type: 'string' },
        { name: "providesAggregateData", type: 'boolean' },
        { name: "canFilterOn", type: 'boolean' },
        { name: "enumValuesType", type: 'string' },
        { name: "enumValues" }, // null,
        { name: "displayValue", type: 'string' }
    ],

    belongsTo: 'sources'
});

Ext.define('Savanna.controller.search.SearchDals', {
    extend: 'Ext.app.Controller',

    models: [
        'DalSource'
    ],
    stores: [
        'DalSources'
    ],

    views: [
        'search.SearchDals'
    ],
    layout: 'hbox',

    createPanel: function(myRecord) {
        var myPanel = Ext.create("Ext.panel.Panel",
            {

                header: false,

                width: '100%',
                height: 100,
                itemId: myRecord.data.id,
                items: [{
                    xtype: 'checkbox',
                    boxLabel: myRecord.data.displayName

                }, {
                    xtype: 'label',
                    text: myRecord.data.textDescription
                },{
                    xtype: 'button',
                    text: 'Show Search Options',
                    handler: function() {
                        alert(myRecord.data.id);
                    }
                }]

            }
        );
        return myPanel;
    },

    init: function (app) {
        var me = this;
        var data = {
            defaultId: 'mockDAL',
            sources: [
                {
                    "id": "MediaWiki",
                    "inputTypes": [
                        {
                            "type": "sav_searchInputType_Text"
                        },
                        {
                            "type": "sav_searchInputType_ContentDocUri"
                        }
                    ],
                    "outputTypes": [
                        {
                            "type": "sav_searchOutputFlagType_ReturnResults"
                        }
                    ],
                    "displayName": "Wikipedia",
                    "facetDescriptions": [ ],
                    "timeoutMillis": 5000,
                    "sortOrderVOs": null,
                    "searchGeoTypes": null,
                    "supportsHyperDynamicFacets": false,
                    "textDescription": "Pages on Wikipedia",
                    "customSearchDescription": {
                        "customSearchGroups": null
                    }
                }, {
                    "id": "Linkedin",
                    "inputTypes": [
                        {
                            "type": "sav_searchInputType_GetFacetNames"
                        },
                        {
                            "type": "sav_searchInputType_Text"
                        },
                        {
                            "type": "sav_searchInputType_FacetFilter"
                        },
                        {
                            "type": "sav_searchInputType_FacetName"
                        }
                    ],
                    "outputTypes": [
                        {
                            "type": "sav_searchOutputFlagType_ReturnResults"
                        },
                        {
                            "type": "sav_searchOutputFlagType_ReturnFacets"
                        },
                        {
                            "type": "sav_searchOutputFlagType_Buckets"
                        }
                    ],
                    "displayName": "Linkedin",
                    "facetDescriptions": [
                        {
                            "facetId": "location",
                            "facetDataType": "STRING",
                            "providesAggregateData": true,
                            "canFilterOn": true,
                            "enumValuesType": "sav_facetEnumType_None",
                            "enumValues": null,
                            "displayValue": "Location"
                        },
                        {
                            "facetId": "current-company",
                            "facetDataType": "STRING",
                            "providesAggregateData": true,
                            "canFilterOn": true,
                            "enumValuesType": "sav_facetEnumType_None",
                            "enumValues": null,
                            "displayValue": "Current-Company"
                        },
                        {
                            "facetId": "past-company",
                            "facetDataType": "STRING",
                            "providesAggregateData": true,
                            "canFilterOn": true,
                            "enumValuesType": "sav_facetEnumType_None",
                            "enumValues": null,
                            "displayValue": "Past-Company"
                        },
                        {
                            "facetId": "school",
                            "facetDataType": "STRING",
                            "providesAggregateData": true,
                            "canFilterOn": true,
                            "enumValuesType": "sav_facetEnumType_None",
                            "enumValues": null,
                            "displayValue": "School"
                        },
                        {
                            "facetId": "industry",
                            "facetDataType": "STRING",
                            "providesAggregateData": true,
                            "canFilterOn": false,
                            "enumValuesType": "sav_facetEnumType_None",
                            "enumValues": null,
                            "displayValue": "Industry"
                        },
                        {
                            "facetId": "network",
                            "facetDataType": "STRING",
                            "providesAggregateData": true,
                            "canFilterOn": false,
                            "enumValuesType": "sav_facetEnumType_None",
                            "enumValues": [
                                {
                                    "id": "F",
                                    "displayValue": "FirstDegreeConnection"
                                },
                                {
                                    "id": "S",
                                    "displayValue": "SecondDegreeConnection"
                                },
                                {
                                    "id": "A",
                                    "displayValue": "InsideOneOfYourGroup"
                                },
                                {
                                    "id": "O",
                                    "displayValue": "OutOfNetWorkConnection"
                                }
                            ],
                            "displayValue": "Network"
                        },
                        {
                            "facetId": "language",
                            "facetDataType": "STRING",
                            "providesAggregateData": true,
                            "canFilterOn": true,
                            "enumValuesType": "String",
                            "enumValues": [
                                {
                                    "id": "en",
                                    "displayValue": "English"
                                },
                                {
                                    "id": "es",
                                    "displayValue": "Spanish"
                                },
                                {
                                    "id": "fr",
                                    "displayValue": "French"
                                },
                                {
                                    "id": "de",
                                    "displayValue": "German"
                                },
                                {
                                    "id": "it",
                                    "displayValue": "Italian"
                                },
                                {
                                    "id": "pt",
                                    "displayValue": "Portuguese"
                                },
                                {
                                    "id": "_o",
                                    "displayValue": "Others"
                                }
                            ],
                            "displayValue": "Language"
                        }
                    ],
                    "timeoutMillis": 5000,
                    "sortOrderVOs": null,
                    "searchGeoTypes": null,
                    "supportsHyperDynamicFacets": false,
                    "textDescription": "Users on Linkedin",
                    "customSearchDescription": {
                        "customSearchGroups": null
                    }
                }, {
                    "id": "Flickr",
                    "inputTypes": [
                        {
                            "type": "sav_searchInputType_GeoBox"
                        },
                        {
                            "type": "sav_searchInputType_Text"
                        },
                        {
                            "type": "sav_searchInputType_FacetFilter"
                        }
                    ],
                    "outputTypes": [
                        {
                            "type": "sav_searchOutputFlagType_ReturnResults"
                        }
                    ],
                    "displayName": "Flickr",
                    "facetDescriptions": [
                        {
                            "facetId": "locations-string",
                            "facetDataType": "STRING",
                            "providesAggregateData": true,
                            "canFilterOn": true,
                            "enumValuesType": "sav_facetEnumType_None",
                            "enumValues": null,
                            "displayValue": "Locations"
                        }
                    ],
                    "timeoutMillis": 5000,
                    "sortOrderVOs": null,
                    "searchGeoTypes": null,
                    "supportsHyperDynamicFacets": false,
                    "textDescription": "Photos on Flickr",
                    "customSearchDescription": {
                        "customSearchGroups": null
                    }
                }, {
                    "id": "Twitter",
                    "inputTypes": [
                        {
                            "type": "sav_searchInputType_Text"
                        }
                    ],
                    "outputTypes": [
                        {
                            "type": "sav_searchOutputFlagType_ReturnResults"
                        }
                    ],
                    "displayName": "Twitter",
                    "facetDescriptions": [ ],
                    "timeoutMillis": 5000,
                    "sortOrderVOs": null,
                    "searchGeoTypes": null,
                    "supportsHyperDynamicFacets": false,
                    "textDescription": "Twitter tweets",
                    "customSearchDescription": {
                        "customSearchGroups": null
                    }
                }, {
                    "id": "EBSCO",
                    "inputTypes": [
                        {
                            "type": "sav_searchInputType_DateRange"
                        },
                        {
                            "type": "sav_searchInputType_GetFacetNames"
                        },
                        {
                            "type": "sav_searchInputType_Text"
                        },
                        {
                            "type": "sav_searchInputType_FacetFilter"
                        },
                        {
                            "type": "sav_searchInputType_FacetName"
                        }
                    ],
                    "outputTypes": [
                        {
                            "type": "sav_searchOutputFlagType_ReturnResults"
                        },
                        {
                            "type": "sav_searchOutputFlagType_ReturnFacets"
                        },
                        {
                            "type": "sav_searchOutputFlagType_Buckets"
                        }
                    ],
                    "displayName": "EBSCO",
                    "facetDescriptions": [
                        {
                            "facetId": "published-date",
                            "facetDataType": "DATE",
                            "providesAggregateData": true,
                            "canFilterOn": true,
                            "enumValuesType": "sav_facetEnumType_None",
                            "enumValues": null,
                            "displayValue": "Publish Date"
                        },
                        {
                            "facetId": "SubjectEDS",
                            "facetDataType": "STRING",
                            "providesAggregateData": true,
                            "canFilterOn": false,
                            "enumValuesType": "String",
                            "enumValues": null,
                            "displayValue": "Subject EDS"
                        },
                        {
                            "facetId": "SourceType",
                            "facetDataType": "STRING",
                            "providesAggregateData": true,
                            "canFilterOn": true,
                            "enumValuesType": "String",
                            "enumValues": null,
                            "displayValue": "Source Type"
                        },
                        {
                            "facetId": "Language",
                            "facetDataType": "STRING",
                            "providesAggregateData": true,
                            "canFilterOn": true,
                            "enumValuesType": "String",
                            "enumValues": null,
                            "displayValue": "Language"
                        },
                        {
                            "facetId": "ContentProvider",
                            "facetDataType": "STRING",
                            "providesAggregateData": true,
                            "canFilterOn": true,
                            "enumValuesType": "String",
                            "enumValues": null,
                            "displayValue": "Content Provider"
                        },
                        {
                            "facetId": "Publisher",
                            "facetDataType": "STRING",
                            "providesAggregateData": true,
                            "canFilterOn": true,
                            "enumValuesType": "String",
                            "enumValues": null,
                            "displayValue": "Publisher"
                        },
                        {
                            "facetId": "Journal",
                            "facetDataType": "STRING",
                            "providesAggregateData": true,
                            "canFilterOn": true,
                            "enumValuesType": "String",
                            "enumValues": null,
                            "displayValue": "Journal"
                        },
                        {
                            "facetId": "SubjectGeographic",
                            "facetDataType": "STRING",
                            "providesAggregateData": true,
                            "canFilterOn": true,
                            "enumValuesType": "String",
                            "enumValues": null,
                            "displayValue": "Geography"
                        }
                    ],
                    "timeoutMillis": 5000,
                    "sortOrderVOs": null,
                    "searchGeoTypes": null,
                    "supportsHyperDynamicFacets": false,
                    "textDescription": "Documents on EBSCO",
                    "customSearchDescription": {
                        "customSearchGroups": null
                    }
                }, {
                    "id": "MOCK",
                    "inputTypes": [
                        {
                            "type": "sav_searchInputType_Text"
                        },
                        {
                            "type": "sav_searchInputType_FacetFilter"
                        }
                    ],
                    "outputTypes": [
                        {
                            "type": "sav_searchOutputFlagType_ReturnResults"
                        },
                        {
                            "type": "sav_searchOutputFlagType_ReturnFacets"
                        }
                    ],
                    "displayName": "MOCK",
                    "facetDescriptions": [ ],
                    "timeoutMillis": 5000,
                    "sortOrderVOs": null,
                    "searchGeoTypes": null,
                    "supportsHyperDynamicFacets": false,
                    "textDescription": "A MOCK Dal For Testing Custom Search Options",
                    "customSearchDescription": {
                        "customSearchGroups": [
                            {
                                "id": "group1",
                                "customSearchParameters": [
                                    {
                                        "list": [ "a good option", "a bad option", "a so-so option" ],
                                        "id": "dropdown1",
                                        "displayLabel": "It's a dropdown"
                                    },
                                    {
                                        "defaultValue": "",
                                        "id": "field1",
                                        "displayLabel": "How are you feeling today?"
                                    },
                                    {
                                        "date": 1340895610082,
                                        "id": "date1",
                                        "displayLabel": "When it started"
                                    },
                                    {
                                        "date": 1372431610082,
                                        "id": "date2",
                                        "displayLabel": "When it ended"
                                    }
                                ],
                                "displayLabel": "Group 1"
                            },
                            {
                                "id": "group2",
                                "customSearchParameters": [
                                    {
                                        "defaultValue": true,
                                        "id": "check1",
                                        "displayLabel": "Make it good"
                                    },
                                    {
                                        "defaultValue": false,
                                        "id": "check2",
                                        "displayLabel": "Make it better than that"
                                    },
                                    {
                                        "radioOptions": [
                                            {
                                                "id": "chicken",
                                                "displayLabel": "Chicken"
                                            },
                                            {
                                                "id": "turkey",
                                                "displayLabel": "Turkey"
                                            },
                                            {
                                                "id": "roastbeef",
                                                "displayLabel": "Roast Beef"
                                            }
                                        ],
                                        "id": "radio1",
                                        "displayLabel": "Which do you prefer?"
                                    },
                                    {
                                        "list": [ "score", "coolness", "price", "length" ],
                                        "id": "savannaSortOrder",
                                        "displayLabel": "How do you want to sort it?"
                                    }
                                ],
                                "displayLabel": "Group 2"
                            },
                            {
                                "id": "group3",
                                "customSearchParameters": [
                                    {
                                        "list": [ "name", "country", "company", "type" ],
                                        "id": "keyvalues1",
                                        "displayLabel": "Set some filters"
                                    }
                                ],
                                "displayLabel": "Group 3"
                            }
                        ]
                    }
                }
            ]
        };

        var mySources = Ext.create('Ext.data.Store', {
           autoLoad: true,
           data : data,
           model: 'sources',
           proxy: {
               type: 'memory',
               reader: {
                   type: 'json',
                   root: 'sources'
               }
           }
        });

        me.control({
                'search_searchdals': {
                    render: function(body){
                        mySources.each(function(record){
                            var myPanel = me.createPanel(record);
                            body.add(myPanel);
                        })
                    }
                }
        });
    }
});