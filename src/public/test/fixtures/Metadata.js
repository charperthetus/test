var ThetusTestHelpers;

(function (ThetusHelpers) {
    'use strict';

    var testMetadataResponse = [
            {
                "value": "FragglePDF",
                "key": "docTitle",
                "type": "String",
                "visible": false,
                "editable": false,
                "displayLabel": "Document Title"
            },
            {
                "value": ["Bob Writer", "Sally Poet"],
                "key": "authors",
                "type": "String_List",
                "visible": true,
                "editable": true,
                "displayLabel": "Authors"
            },
            {
                "value": 1,
                "key": "pageCount",
                "type": "Integer",
                "visible": true,
                "editable": true,
                "displayLabel": "Pages"
            },
            {
                "value": 1360960609102,
                "key": "published-date",
                "type": "Date",
                "visible": true,
                "editable": true,
                "displayLabel": "Publication Date"
            },
            {
                "value": [],
                "key": "relatedDocs",
                "type": "Uri_List",
                "visible": true,
                "editable": true,
                "displayLabel": "Related Documents"
            },
            {
                "value": "The first-ever American Special series Mustang model is a stripped-down blast, with a roaring HH pickup configuration, streamlined controls and a cool sonic trick up its sleeve in the form of a push/pull master volume knob that splits the atom, so to speak—splitting both Atomic humbucking pickups for great single-coil tone (inner coil of neck pickup and outer coil of bridge pickup). Further, the Adjusto-Matic™ bridge and anchored tail piece provide rock-solid intonation and tuning stability.",
                "key": "document-description",
                "type": "LongString",
                "visible": true,
                "editable": true,
                "displayLabel": "Description"
            },
            {
                "value": "Fender",
                "key": "publisher",
                "type": "String",
                "visible": true,
                "editable": true,
                "displayLabel": "Publisher"
            },
            {
                "value": null,
                "key": "pubName",
                "type": "String",
                "visible": true,
                "editable": true,
                "displayLabel": "Publication Name"
            },
            {
                "value": "Unknown",
                "key": "producer",
                "type": "String",
                "visible": true,
                "editable": true,
                "displayLabel": "Producer"
            },
            {
                "value": "Analyst Document",
                "key": "distributor",
                "type": "String",
                "visible": true,
                "editable": true,
                "displayLabel": "Distributor"
            },
            {
                "value": null,
                "key": "document-organization",
                "type": "String",
                "visible": true,
                "editable": true,
                "displayLabel": "Source Organization"
            },
            {
                "value": null,
                "key": "document-language",
                "type": "String",
                "visible": true,
                "editable": true,
                "displayLabel": "Source Language"
            },
            {
                "value": null,
                "key": "document-country",
                "type": "String",
                "visible": true,
                "editable": true,
                "displayLabel": "Source Country"
            },
            {
                "value": 1360960788447,
                "key": "ingest-date",
                "type": "Date",
                "visible": true,
                "editable": true,
                "displayLabel": "Ingest Date"
            },
            {
                "value": "PDF (Portable Document Format)",
                "key": "document-type",
                "type": "String",
                "visible": true,
                "editable": true,
                "displayLabel": "File Format"
            },
            {
                "value": "FragglePDF.pdf",
                "key": "document-original-name",
                "type": "String",
                "visible": true,
                "editable": true,
                "displayLabel": "Original File Name"
            },
            {
                "value": false,
                "key": "document_interesting",
                "type": "Boolean",
                "visible": true,
                "editable": true,
                "displayLabel": "Document is interesting"
            },
            {
                "value": "Complete",
                "key": "ingest-state",
                "type": "String",
                "visible": false,
                "editable": false,
                "displayLabel": "Ingestion State"
            },
            {
                "value": "SolrJdbc%2FRich%2Fca1035f5-8ede-4415-ab75-e58956121819",
                "key": "retrieval-url",
                "type": "Uri",
                "visible": true,
                "editable": true,
                "displayLabel": "URL"
            },
            {
                "value": "${authors}. (${published-date;DDJJNNZ MMM YY}) ${title}. ${pubName}\n                            (${document-country}). ${classification}",
                "key": "keyCitationPlain",
                "type": "String",
                "visible": false,
                "editable": false,
                "displayLabel": "Citation Plain"
            },
            {
                "value": "${authors}. (${published-date;DDJJNNZ MMM YY}) ${title}. <i>${pubName}</i> (${document-country}). <b>${classification}</b>",
                "key": "keyCitationHtml",
                "type": "String",
                "visible": false,
                "editable": false,
                "displayLabel": "Citation Html"
            },
            {
                "value": "U",
                "key": "classification",
                "type": "String",
                "visible": true,
                "editable": false,
                "displayLabel": "Classification"
            },
            {
                "value": "Other",
                "key": "producer-category",
                "type": "String",
                "visible": true,
                "editable": true,
                "displayLabel": "producer-category"
            },
            {
                "value": [true, false, false, true],
                "key": "survey-answers",
                "type": "Boolean_List",
                "visible": true,
                "editable": true,
                "displayLabel": "Survey answers"
            },
            {
                "value": [1360960788447, 1361960788447, 1362960788447],
                "key": "important_dates",
                "type": "Date_List",
                "visible": true,
                "editable": true,
                "displayLabel": "Important dates"
            },
            {
                "value": [13609.60788447, 0, 1362960788.447],
                "key": "important_numbers",
                "type": "Double_List",
                "visible": true,
                "editable": true,
                "displayLabel": "Big numbers"
            },
            {
                "value": [1360960788447, 0, 1362960788447],
                "key": "important_values",
                "type": "Integer_List",
                "visible": true,
                "editable": true,
                "displayLabel": "Values"
            },
            {
                "value": 1360960788447,
                "key": "important_value",
                "type": "Integer",
                "visible": true,
                "editable": true,
                "displayLabel": "Sales volume"
            },
            {
                "value": 13609607884.47,
                "key": "important_values",
                "type": "Double",
                "visible": true,
                "editable": true,
                "displayLabel": "Sales amount"
            }

        ];

    var noMetadataResponse = [];

    ThetusHelpers.Fixtures = ThetusHelpers.Fixtures || {};
    ThetusHelpers.Fixtures.Metadata = ThetusHelpers.Fixtures.Metadata || {};

    ThetusHelpers.Fixtures.Metadata.json = testMetadataResponse;
    ThetusHelpers.Fixtures.Metadata.noTemplatesResponse = noMetadataResponse;

})(ThetusTestHelpers || (ThetusTestHelpers = {}));