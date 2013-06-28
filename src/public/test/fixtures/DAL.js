var ThetusTestHelpers;

(function (ThetusHelpers) {
    'use strict';

    var defaultDal = {
        "displayName": "Savanna",
        "id": "SolrJdbc",
        "outputTypes": [
            {
                "type": "sav_searchOutputFlagType_ReturnResults"
            },
            {
                "type": "sav_searchOutputFlagType_ReturnTagCloud"
            },
            {
                "type": "sav_searchOutputFlagType_ReturnFacets"
            },
            {
                "type": "sav_searchOutputFlagType_ReturnTermCloud"
            },
            {
                "type": "sav_searchOutputFlagType_Buckets"
            }
        ],
        "inputTypes": [
            {
                "type": "sav_searchInputType_DateRange"
            },
            {
                "type": "sav_searchInputType_TagCloud"
            },
            {
                "type": "sav_searchInputType_NounVerbPhrase"
            },
            {
                "type": "sav_searchInputType_PosProximity"
            },
            {
                "type": "sav_searchInputType_TextWithinDoc"
            },
            {
                "type": "sav_searchInputType_Text"
            },
            {
                "type": "sav_searchInputType_NumberRange"
            },
            {
                "type": "sav_searchInputType_QuerySuggest"
            },
            {
                "type": "sav_searchInputType_FacetFilter"
            },
            {
                "type": "sav_searchInputType_TermCloud"
            },
            {
                "type": "sav_searchInputType_BucketedRange"
            },
            {
                "type": "sav_searchInputType_Heatmap"
            },
            {
                "type": "sav_searchInputType_Proximity"
            },
            {
                "type": "sav_searchInputType_Geo"
            },
            {
                "type": "sav_searchInputType_AbacFilter"
            },
            {
                "type": "sav_searchInputType_GetFacetNames"
            },
            {
                "type": "sav_searchInputType_SortOrder"
            },
            {
                "type": "sav_searchInputType_ContentDocUri"
            },
            {
                "type": "sav_searchInputType_PublisherId"
            },
            {
                "type": "sav_searchInputType_FacetName"
            }
        ],
        "facetDescriptions": [
            {
                "enumValues": null,
                "facetId": "published-date",
                "facetDataType": "DATE",
                "providesAggregateData": true,
                "canFilterOn": true,
                "displayValue": "Publish Date",
                "enumValuesType": "sav_facetEnumType_None"
            },
            {
                "enumValues": null,
                "facetId": "ingest-date",
                "facetDataType": "DATE",
                "providesAggregateData": true,
                "canFilterOn": true,
                "displayValue": "Ingest Date",
                "enumValuesType": "sav_facetEnumType_None"
            },
            {
                "enumValues": null,
                "facetId": "producer",
                "facetDataType": "STRING",
                "providesAggregateData": true,
                "canFilterOn": true,
                "displayValue": "Producer",
                "enumValuesType": "sav_facetEnumType_None"
            },
            {
                "enumValues": null,
                "facetId": "producer-category",
                "facetDataType": "STRING",
                "providesAggregateData": true,
                "canFilterOn": true,
                "displayValue": "Category",
                "enumValuesType": "sav_facetEnumType_None"
            },
            {
                "enumValues": null,
                "facetId": "distributor",
                "facetDataType": "STRING",
                "providesAggregateData": true,
                "canFilterOn": true,
                "displayValue": "Distributor",
                "enumValuesType": "sav_facetEnumType_None"
            },
            {
                "enumValues": null,
                "facetId": "composite",
                "facetDataType": "STRING",
                "providesAggregateData": true,
                "canFilterOn": true,
                "displayValue": "Classification",
                "enumValuesType": "sav_facetEnumType_None"
            },
            {
                "enumValues": null,
                "facetId": "isf-source-type",
                "facetDataType": "STRING",
                "providesAggregateData": true,
                "canFilterOn": true,
                "displayValue": "ISF Source Type",
                "enumValuesType": "sav_facetEnumType_None"
            }
        ],
        "timeoutMillis": 5000,
        "sortOrderVOs": null,
        "searchGeoTypes": [ "sav_searchInputType_Geo" ],
        "supportsHyperDynamicFacets": false,
        "textDescription": "",
        "customSearchDescription": null
    };

    var allDals = [
        defaultDal,
        {
            "displayName": "MediaWiki",
            "id": "MediaWiki",
            "outputTypes": [
                {
                    "type": "sav_searchOutputFlagType_ReturnResults"
                }
            ],
            "inputTypes": [
                {
                    "type": "sav_searchInputType_Text"
                },
                {
                    "type": "sav_searchInputType_ContentDocUri"
                }
            ],
            "facetDescriptions": [ ],
            "timeoutMillis": 5000,
            "sortOrderVOs": null,
            "searchGeoTypes": null,
            "supportsHyperDynamicFacets": false,
            "textDescription": "",
            "customSearchDescription": {
                "customSearchGroups": null
            }
        }, {
            "displayName": "ORION",
            "id": "ORION",
            "outputTypes": [
                {
                    "type": "sav_searchOutputFlagType_ReturnResults"
                },
                {
                    "type": "sav_searchOutputFlagType_ReturnFacets"
                }
            ],
            "inputTypes": [
                {
                    "type": "sav_searchInputType_DateRange"
                },
                {
                    "type": "sav_searchInputType_BucketedRange"
                },
                {
                    "type": "sav_searchInputType_GetFacetNames"
                },
                {
                    "type": "sav_searchInputType_Text"
                },
                {
                    "type": "sav_searchInputType_ContentDocUri"
                },
                {
                    "type": "sav_searchInputType_FacetFilter"
                },
                {
                    "type": "sav_searchInputType_FacetName"
                },
                {
                    "type": "sav_searchInputType_DistinguishedName"
                }
            ],
            "facetDescriptions": [
                {
                    "enumValues": null,
                    "facetId": "odl_ingest_dt",
                    "facetDataType": "DATE",
                    "providesAggregateData": true,
                    "canFilterOn": true,
                    "displayValue": "Publish Date",
                    "enumValuesType": "sav_facetEnumType_None"
                },
                {
                    "enumValues": null,
                    "facetId": "hce_created_dt",
                    "facetDataType": "DATE",
                    "providesAggregateData": true,
                    "canFilterOn": true,
                    "displayValue": "Ingest Date",
                    "enumValuesType": "sav_facetEnumType_None"
                },
                {
                    "enumValues": null,
                    "facetId": "composite",
                    "facetDataType": "STRING",
                    "providesAggregateData": true,
                    "canFilterOn": true,
                    "displayValue": "Classification",
                    "enumValuesType": "sav_facetEnumType_None"
                }
            ],
            "timeoutMillis": 5000,
            "sortOrderVOs": null,
            "searchGeoTypes": null,
            "supportsHyperDynamicFacets": false,
            "textDescription": "",
            "customSearchDescription": {
                "customSearchGroups": null
            }
        } ];

    ThetusHelpers.Fixtures = ThetusHelpers.Fixtures || {};

    ThetusHelpers.Fixtures.defaultDal = defaultDal;
    ThetusHelpers.Fixtures.allDals = allDals;

})(ThetusTestHelpers || (ThetusTestHelpers = {}));