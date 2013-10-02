var ThetusTestHelpers;

(function (ThetusHelpers) {
    'use strict';

    var searchResults = {
    "defaultId": "mockDAL",
    "sources": [
    {
        "id": "Ted_DAL",
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
        "displayName": "Ted DAL",
        "facetDescriptions": [ ],
        "timeoutMillis": 5000,
        "sortOrderVOs": null,
        "searchGeoTypes": null,
        "supportsHyperDynamicFacets": false,
        "textDescription": "",
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

    },
    {
        "id": "Steve_DAL",
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
        "displayName": "Steve DAL",
        "facetDescriptions": [ ],
        "timeoutMillis": 5000,
        "sortOrderVOs": null,
        "searchGeoTypes": null,
        "supportsHyperDynamicFacets": false,
        "textDescription": "",
        "customSearchDescription": {
            "customSearchGroups": [ ]
        }
    }
]
};
    ThetusHelpers.Fixtures = ThetusHelpers.Fixtures || {};
    ThetusHelpers.Fixtures.SearchDalsWithFormData = ThetusHelpers.Fixtures.SearchDalsWithFormData || {};
    ThetusHelpers.Fixtures.SearchDalsWithFormData.searchResults = searchResults;
    ThetusHelpers.Fixtures.SearchDalsWithFormData.json = searchResults;

})(ThetusTestHelpers || (ThetusTestHelpers = {}));
