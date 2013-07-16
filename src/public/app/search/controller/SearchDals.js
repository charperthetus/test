Ext.define('Savanna.search.controller.SearchDals', {
    extend: 'Ext.app.Controller',

    models: [
        'Savanna.search.model.DalSource'
    ],

    stores: [
        'Savanna.search.store.DalSources'
    ],

    views: [
        'Savanna.search.view.SearchDals',
        'Savanna.search.view.searchDals.SearchOptions',
        'Savanna.search.view.searchDals.CustomSearchGroupForm'
    ],

    layout: 'hbox',

    addDalDetailText: 'Show Search Options',
    removeDalDetailText: 'Hide Search Options',

    createPanel: function(myRecord) {
        return Ext.create('Savanna.search.view.searchDals.SearchOptions', {
            itemId: myRecord.data.id,
            checkboxLabel: myRecord.data.displayName,
            label: myRecord.data.textDescription,
            showButton: myRecord.customSearchGroups().data.length
        });
    },

    createCustomSearchGroupPanel: function(store) {
        return Ext.create('Savanna.search.view.searchDals.CustomSearchGroupForm', {
            store: store
        });
    },

    init: function (app) {
        this.getStore('Savanna.search.store.DalSources').loadRawData(this.data);

        this.control({
            'search_searchdals': {
                render: function (body) {
                    var me = this;
                    this.getStore('Savanna.search.store.DalSources').each(function (record) {
                        var myPanel = me.createPanel(record);
                        body.add(myPanel);
                    });
                }
            },
            'search_searchDals_searchoptions > #searchOptionsToggle': {
                click: this.renderCustomOptions
            }
        });
    },

    renderCustomOptions: function(button, evt) {
        // NOTE: I'm not sure this is the correct way to do this since the controller is a singleton
        //       (if we can have more than one search, this will break...)
        var parentView = button.up('search_searchDals_searchoptions');
        var childSearchDalsPanel = parentView.down('search_searchDals_custom-search-group-form');
        console.log('parentView', parentView);
        console.log('childSearchDalsPanel',childSearchDalsPanel);
        if (!childSearchDalsPanel) {
            var parentViewId = parentView.itemId;
            var store = this.getStore('Savanna.search.store.DalSources');
            var record = store.getById(parentViewId);

            var dalPanel = this.createCustomSearchGroupPanel(record.customSearchGroups());

            parentView.add(dalPanel);

            childSearchDalsPanel = parentView.down('search_searchDals_custom-search-group-form');
            console.log('childSearchDalsPanel',childSearchDalsPanel);
        }

        if (button.text == this.addDalDetailText) {
            button.setText(this.removeDalDetailText);
            childSearchDalsPanel.show();
        }
        else {
            button.setText(this.addDalDetailText);
            childSearchDalsPanel.hide();
        }

        parentView.doLayout();
    },

    data: {
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

                /* WARNING, WARNING, WARNING!!!!!!
                 We restructured the data to get rid of the parent "customSearchDescription" data-member since it
                 only has "customSearchGroups" and we do not really want to create a has-a relationship for a model
                 that is just a wrapper for a has-many....
                 */
                "customSearchGroups":  null
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

                /* WARNING, WARNING, WARNING!!!!!!
                 We restructured the data to get rid of the parent "customSearchDescription" data-member since it
                 only has "customSearchGroups" and we do not really want to create a has-a relationship for a model
                 that is just a wrapper for a has-many....
                 */
                "customSearchGroups": null
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

                /* WARNING, WARNING, WARNING!!!!!!
                 We restructured the data to get rid of the parent "customSearchDescription" data-member since it
                 only has "customSearchGroups" and we do not really want to create a has-a relationship for a model
                 that is just a wrapper for a has-many....
                 */
                "customSearchGroups": null
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

                /* WARNING, WARNING, WARNING!!!!!!
                 We restructured the data to get rid of the parent "customSearchDescription" data-member since it
                 only has "customSearchGroups" and we do not really want to create a has-a relationship for a model
                 that is just a wrapper for a has-many....
                 */
                "customSearchGroups": null
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

                /* WARNING, WARNING, WARNING!!!!!!
                 We restructured the data to get rid of the parent "customSearchDescription" data-member since it
                 only has "customSearchGroups" and we do not really want to create a has-a relationship for a model
                 that is just a wrapper for a has-many....
                 */
                "customSearchGroups": null
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

                /* WARNING, WARNING, WARNING!!!!!!
                    We restructured the data to get rid of the parent "customSearchDescription" data-member since it
                    only has "customSearchGroups" and we do not really want to create a has-a relationship for a model
                    that is just a wrapper for a has-many....
                 */
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
            },
            {
                "id": "MOCK2",
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
                "displayName": "MOCK2",
                "facetDescriptions": [ ],
                "timeoutMillis": 5000,
                "sortOrderVOs": null,
                "searchGeoTypes": null,
                "supportsHyperDynamicFacets": false,
                "textDescription": "A MOCK Dal For Testing Custom Search Options",

                /* WARNING, WARNING, WARNING!!!!!!
                 We restructured the data to get rid of the parent "customSearchDescription" data-member since it
                 only has "customSearchGroups" and we do not really want to create a has-a relationship for a model
                 that is just a wrapper for a has-many....
                 */
                "customSearchGroups": [
                    {
                        "id": "group1a",
                        "customSearchParameters": [
                            {
                                "list": [ "a good option", "a bad option", "a so-so option" ],
                                "id": "dropdown1a",
                                "displayLabel": "It's a dropdown"
                            },
                            {
                                "defaultValue": "",
                                "id": "field1a",
                                "displayLabel": "How are you feeling today?"
                            },
                            {
                                "date": 1340895610082,
                                "id": "date1a",
                                "displayLabel": "When it started"
                            },
                            {
                                "date": 1372431610082,
                                "id": "date2a",
                                "displayLabel": "When it ended"
                            }
                        ],
                        "displayLabel": "Group 1a"
                    },
                    {
                        "id": "group2a",
                        "customSearchParameters": [
                            {
                                "defaultValue": true,
                                "id": "check1a",
                                "displayLabel": "Make it good"
                            },
                            {
                                "defaultValue": false,
                                "id": "check2a",
                                "displayLabel": "Make it better than that"
                            },
                            {
                                "radioOptions": [
                                    {
                                        "id": "chickena",
                                        "displayLabel": "Chicken"
                                    },
                                    {
                                        "id": "turkeya",
                                        "displayLabel": "Turkey"
                                    },
                                    {
                                        "id": "roastbeefa",
                                        "displayLabel": "Roast Beef"
                                    }
                                ],
                                "id": "radio1a",
                                "displayLabel": "Which do you prefer?"
                            },
                            {
                                "list": [ "score", "coolness", "price", "length" ],
                                "id": "savannaSortOrdera",
                                "displayLabel": "How do you want to sort it?"
                            }
                        ],
                        "displayLabel": "Group 2a"
                    },
                    {
                        "id": "group3a",
                        "customSearchParameters": [
                            {
                                "list": [ "name", "country", "company", "type" ],
                                "id": "keyvalues1a",
                                "displayLabel": "Set some filters"
                            }
                        ],
                        "displayLabel": "Group 3a"
                    }
                ]
            }
        ]
    },
    data2:{
        "defaultId" : "mockDAL",
        'sources' : [ {
            id: 'Ted DAL',
            "inputTypes" : [ {
                "type" : "sav_searchInputType_Text"
            }, {
                "type" : "sav_searchInputType_FacetFilter"
            } ],
            "outputTypes" : [ {
                "type" : "sav_searchOutputFlagType_ReturnResults"
            }, {
                "type" : "sav_searchOutputFlagType_ReturnFacets"
            } ],
            "displayName" : "Ted DAL",
            "facetDescriptions" : [ ],
            "timeoutMillis" : 5000,
            "sortOrderVOs" : null,
            "searchGeoTypes" : null,
            "supportsHyperDynamicFacets" : false,
            "textDescription" : "",
            "customSearchGroups" : [ {
                "id" : "group1",
                "customSearchParameters" : [ {
                    "list" : [ "a good option", "a bad option", "a so-so option" ],
                    "id" : "dropdown1",
                    "displayLabel" : "It's a dropdown"
                }, {
                    "defaultValue" : "",
                    "id" : "field1",
                    "displayLabel" : "How are you feeling today?"
                }, {
                    "date" : 1340895610082,
                    "id" : "date1",
                    "displayLabel" : "When it started"
                }, {
                    "date" : 1372431610082,
                    "id" : "date2",
                    "displayLabel" : "When it ended"
                } ],
                "displayLabel" : "Group 1"
            }, {
                "id" : "group2",
                "customSearchParameters" : [ {
                    "defaultValue" : true,
                    "id" : "check1",
                    "displayLabel" : "Make it good"
                }, {
                    "defaultValue" : false,
                    "id" : "check2",
                    "displayLabel" : "Make it better than that"
                }, {
                    "radioOptions" : [ {
                        "id" : "chicken",
                        "displayLabel" : "Chicken"
                    }, {
                        "id" : "turkey",
                        "displayLabel" : "Turkey"
                    }, {
                        "id" : "roastbeef",
                        "displayLabel" : "Roast Beef"
                    } ],
                    "id" : "radio1",
                    "displayLabel" : "Which do you prefer?"
                }, {
                    "list" : [ "score", "coolness", "price", "length" ],
                    "id" : "savannaSortOrder",
                    "displayLabel" : "How do you want to sort it?"
                } ],
                "displayLabel" : "Group 2"
            }, {
                "id" : "group3",
                "customSearchParameters" : [ {
                    "list" : [ "name", "country", "company", "type" ],
                    "id" : "keyvalues1",
                    "displayLabel" : "Set some filters"
                } ],
                "displayLabel" : "Group 3"
            } ]

        },{
            id: 'Steve DAL',
            "inputTypes" : [ {
                "type" : "sav_searchInputType_Text"
            }, {
                "type" : "sav_searchInputType_FacetFilter"
            } ],
            "outputTypes" : [ {
                "type" : "sav_searchOutputFlagType_ReturnResults"
            }, {
                "type" : "sav_searchOutputFlagType_ReturnFacets"
            } ],
            "displayName" : "Steve DAL",
            "facetDescriptions" : [ ],
            "timeoutMillis" : 5000,
            "sortOrderVOs" : null,
            "searchGeoTypes" : null,
            "supportsHyperDynamicFacets" : false,
            "textDescription" : "",
            "customSearchGroups" : [ ]

        }
    ]
    }
});