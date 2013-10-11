var ThetusTestHelpers;

(function (ThetusHelpers) {
    'use strict';

    var resultsMetadataResponse = {
        "SolrJdbc%2FText%2Fb963c8e9-a45e-4fd3-b4b7-5c3cf099195e" : [ {
            "value" : "SolrJdbc%2FText%2Fb963c8e9-a45e-4fd3-b4b7-5c3cf099195e",
            "key" : "uri_DEBUG",
            "type" : "Uri",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "URI (debug)"
        }, {
            "value" : "Cat - Wikipedia, the free encyclopedia",
            "key" : "docTitle",
            "type" : "String",
            "visible" : false,
            "editable" : true,
            "displayLabel" : "Document Title"
        }, {
            "value" : [ ],
            "key" : "authors",
            "type" : "String_List",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Authors"
        }, {
            "value" : null,
            "key" : "modifiedDate",
            "type" : "Date",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Last Edited Date"
        }, {
            "value" : 16,
            "key" : "pageCount",
            "type" : "Integer",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Pages"
        }, {
            "value" : 1365198566634,
            "key" : "published-date",
            "type" : "Date",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Publication Date"
        }, {
            "value" : [ ],
            "key" : "relatedDocs",
            "type" : "Uri_List",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Related Documents"
        }, {
            "value" : null,
            "key" : "document-description",
            "type" : "LongString",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Description"
        }, {
            "value" : null,
            "key" : "publisher",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Publisher"
        }, {
            "value" : null,
            "key" : "pubName",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Publication Name"
        }, {
            "value" : "Unknown",
            "key" : "producer",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Producer"
        }, {
            "value" : "Unknown",
            "key" : "distributor",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Distributor"
        }, {
            "value" : null,
            "key" : "document-organization",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Source Organization"
        }, {
            "value" : null,
            "key" : "document-language",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Source Language"
        }, {
            "value" : null,
            "key" : "document-country",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Source Country"
        }, {
            "value" : 1365198568608,
            "key" : "ingest-date",
            "type" : "Date",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Ingest Date"
        }, {
            "value" : "Plain Text",
            "key" : "document-type",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "File Format"
        }, {
            "value" : "Cat - Wikipedia, the free encyclopedia.txt",
            "key" : "document-original-name",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Original File Name"
        }, {
            "value" : [ ],
            "key" : "document_comments",
            "type" : "Object_List",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Comments"
        }, {
            "value" : null,
            "key" : "ingest-state",
            "type" : "String",
            "visible" : false,
            "editable" : false,
            "displayLabel" : "Ingestion State"
        }, {
            "value" : "http:%2F%2Fen.wikipedia.org%2Fwiki%2FCats",
            "key" : "retrieval-url",
            "type" : "Uri",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "URL"
        }, {
            "value" : "${authors}. (${published-date;DDJJNNZ MMM YY}) ${title}. ${pubName}\n                            (${document-country}). ${classification}",
            "key" : "keyCitationPlain",
            "type" : "String",
            "visible" : false,
            "editable" : false,
            "displayLabel" : "Citation Plain"
        }, {
            "value" : "${authors}. (${published-date;DDJJNNZ MMM YY}) ${title}. <i>${pubName}</i> (${document-country}). <b>${classification}</b>",
            "key" : "keyCitationHtml",
            "type" : "String",
            "visible" : false,
            "editable" : false,
            "displayLabel" : "Citation Html"
        }, {
            "value" : "U",
            "key" : "classification",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Classification"
        } ],
        "SolrJdbc%2FImage%2F4203ac5d-d13e-4e2e-8029-46f8e0cbe13e" : [ {
            "value" : "SolrJdbc%2FImage%2F4203ac5d-d13e-4e2e-8029-46f8e0cbe13e",
            "key" : "uri_DEBUG",
            "type" : "Uri",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "URI (debug)"
        }, {
            "value" : "?v=3",
            "key" : "docTitle",
            "type" : "String",
            "visible" : false,
            "editable" : true,
            "displayLabel" : "Document Title"
        }, {
            "value" : [ ],
            "key" : "authors",
            "type" : "String_List",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Authors"
        }, {
            "value" : null,
            "key" : "modifiedDate",
            "type" : "Date",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Last Edited Date"
        }, {
            "value" : 0,
            "key" : "pageCount",
            "type" : "Integer",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Pages"
        }, {
            "value" : 1367365434452,
            "key" : "published-date",
            "type" : "Date",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Publication Date"
        }, {
            "value" : [ ],
            "key" : "relatedDocs",
            "type" : "Uri_List",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Related Documents"
        }, {
            "value" : null,
            "key" : "document-description",
            "type" : "LongString",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Description"
        }, {
            "value" : null,
            "key" : "publisher",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Publisher"
        }, {
            "value" : null,
            "key" : "pubName",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Publication Name"
        }, {
            "value" : "Unknown",
            "key" : "producer",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Producer"
        }, {
            "value" : "Unknown",
            "key" : "distributor",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Distributor"
        }, {
            "value" : null,
            "key" : "document-organization",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Source Organization"
        }, {
            "value" : null,
            "key" : "document-language",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Source Language"
        }, {
            "value" : null,
            "key" : "document-country",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Source Country"
        }, {
            "value" : 1367365435250,
            "key" : "ingest-date",
            "type" : "Date",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Ingest Date"
        }, {
            "value" : "Image File",
            "key" : "document-type",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "File Format"
        }, {
            "value" : "?v=3.png",
            "key" : "document-original-name",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Original File Name"
        }, {
            "value" : [ ],
            "key" : "document_comments",
            "type" : "Object_List",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Comments"
        }, {
            "value" : "Complete",
            "key" : "ingest-state",
            "type" : "String",
            "visible" : false,
            "editable" : false,
            "displayLabel" : "Ingestion State"
        }, {
            "value" : "https:%2F%2Fthetus.bamboohr.com%2Fdashboard%2F",
            "key" : "retrieval-url",
            "type" : "Uri",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "URL"
        }, {
            "value" : "${authors}. (${published-date;DDJJNNZ MMM YY}) ${title}. ${pubName}\n                            (${document-country}). ${classification}",
            "key" : "keyCitationPlain",
            "type" : "String",
            "visible" : false,
            "editable" : false,
            "displayLabel" : "Citation Plain"
        }, {
            "value" : "${authors}. (${published-date;DDJJNNZ MMM YY}) ${title}. <i>${pubName}</i> (${document-country}). <b>${classification}</b>",
            "key" : "keyCitationHtml",
            "type" : "String",
            "visible" : false,
            "editable" : false,
            "displayLabel" : "Citation Html"
        }, {
            "value" : "U",
            "key" : "classification",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Classification"
        }, {
            "value" : "Unknown",
            "key" : "producer-category",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "producer-category"
        }, {
            "value" : "cats and puppies",
            "key" : "docTitle",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "docTitle"
        } ],
        "SolrJdbc%2FImage%2Faa7fd90f-2722-4408-8097-6fcd37176be7" : [ {
            "value" : "SolrJdbc%2FImage%2Faa7fd90f-2722-4408-8097-6fcd37176be7",
            "key" : "uri_DEBUG",
            "type" : "Uri",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "URI (debug)"
        }, {
            "value" : "220px-Gato_enervado_pola_presencia_dun_can",
            "key" : "docTitle",
            "type" : "String",
            "visible" : false,
            "editable" : true,
            "displayLabel" : "Document Title"
        }, {
            "value" : [ ],
            "key" : "authors",
            "type" : "String_List",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Authors"
        }, {
            "value" : null,
            "key" : "modifiedDate",
            "type" : "Date",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Last Edited Date"
        }, {
            "value" : 0,
            "key" : "pageCount",
            "type" : "Integer",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Pages"
        }, {
            "value" : 1365198566634,
            "key" : "published-date",
            "type" : "Date",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Publication Date"
        }, {
            "value" : [ ],
            "key" : "relatedDocs",
            "type" : "Uri_List",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Related Documents"
        }, {
            "value" : null,
            "key" : "document-description",
            "type" : "LongString",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Description"
        }, {
            "value" : null,
            "key" : "publisher",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Publisher"
        }, {
            "value" : null,
            "key" : "pubName",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Publication Name"
        }, {
            "value" : "Unknown",
            "key" : "producer",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Producer"
        }, {
            "value" : "Unknown",
            "key" : "distributor",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Distributor"
        }, {
            "value" : null,
            "key" : "document-organization",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Source Organization"
        }, {
            "value" : null,
            "key" : "document-language",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Source Language"
        }, {
            "value" : null,
            "key" : "document-country",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Source Country"
        }, {
            "value" : 1365198595249,
            "key" : "ingest-date",
            "type" : "Date",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Ingest Date"
        }, {
            "value" : "Image File",
            "key" : "document-type",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "File Format"
        }, {
            "value" : "220px-Gato_enervado_pola_presencia_dun_can.jpg",
            "key" : "document-original-name",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Original File Name"
        }, {
            "value" : [ ],
            "key" : "document_comments",
            "type" : "Object_List",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Comments"
        }, {
            "value" : "Complete",
            "key" : "ingest-state",
            "type" : "String",
            "visible" : false,
            "editable" : false,
            "displayLabel" : "Ingestion State"
        }, {
            "value" : "http:%2F%2Fen.wikipedia.org%2Fwiki%2FCats",
            "key" : "retrieval-url",
            "type" : "Uri",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "URL"
        }, {
            "value" : "${authors}. (${published-date;DDJJNNZ MMM YY}) ${title}. ${pubName}\n                            (${document-country}). ${classification}",
            "key" : "keyCitationPlain",
            "type" : "String",
            "visible" : false,
            "editable" : false,
            "displayLabel" : "Citation Plain"
        }, {
            "value" : "${authors}. (${published-date;DDJJNNZ MMM YY}) ${title}. <i>${pubName}</i> (${document-country}). <b>${classification}</b>",
            "key" : "keyCitationHtml",
            "type" : "String",
            "visible" : false,
            "editable" : false,
            "displayLabel" : "Citation Html"
        }, {
            "value" : "U",
            "key" : "classification",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Classification"
        }, {
            "value" : "Unknown",
            "key" : "producer-category",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "producer-category"
        }, {
            "value" : "Cat - Wikipedia, the free encyclopedia",
            "key" : "docTitle",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "docTitle"
        } ],
        "SolrJdbc%2FImage%2F0395faef-befe-45b1-aa5c-ddaf332ed636" : [ {
            "value" : "SolrJdbc%2FImage%2F0395faef-befe-45b1-aa5c-ddaf332ed636",
            "key" : "uri_DEBUG",
            "type" : "Uri",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "URI (debug)"
        }, {
            "value" : "220px-Cat_skull",
            "key" : "docTitle",
            "type" : "String",
            "visible" : false,
            "editable" : true,
            "displayLabel" : "Document Title"
        }, {
            "value" : [ ],
            "key" : "authors",
            "type" : "String_List",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Authors"
        }, {
            "value" : null,
            "key" : "modifiedDate",
            "type" : "Date",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Last Edited Date"
        }, {
            "value" : 0,
            "key" : "pageCount",
            "type" : "Integer",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Pages"
        }, {
            "value" : 1365198566634,
            "key" : "published-date",
            "type" : "Date",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Publication Date"
        }, {
            "value" : [ ],
            "key" : "relatedDocs",
            "type" : "Uri_List",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Related Documents"
        }, {
            "value" : null,
            "key" : "document-description",
            "type" : "LongString",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Description"
        }, {
            "value" : null,
            "key" : "publisher",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Publisher"
        }, {
            "value" : null,
            "key" : "pubName",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Publication Name"
        }, {
            "value" : "Unknown",
            "key" : "producer",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Producer"
        }, {
            "value" : "Unknown",
            "key" : "distributor",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Distributor"
        }, {
            "value" : null,
            "key" : "document-organization",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Source Organization"
        }, {
            "value" : null,
            "key" : "document-language",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Source Language"
        }, {
            "value" : null,
            "key" : "document-country",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Source Country"
        }, {
            "value" : 1365198594521,
            "key" : "ingest-date",
            "type" : "Date",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Ingest Date"
        }, {
            "value" : "Image File",
            "key" : "document-type",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "File Format"
        }, {
            "value" : "220px-Cat_skull.jpg",
            "key" : "document-original-name",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Original File Name"
        }, {
            "value" : [ ],
            "key" : "document_comments",
            "type" : "Object_List",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Comments"
        }, {
            "value" : "Complete",
            "key" : "ingest-state",
            "type" : "String",
            "visible" : false,
            "editable" : false,
            "displayLabel" : "Ingestion State"
        }, {
            "value" : "http:%2F%2Fen.wikipedia.org%2Fwiki%2FCats",
            "key" : "retrieval-url",
            "type" : "Uri",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "URL"
        }, {
            "value" : "${authors}. (${published-date;DDJJNNZ MMM YY}) ${title}. ${pubName}\n                            (${document-country}). ${classification}",
            "key" : "keyCitationPlain",
            "type" : "String",
            "visible" : false,
            "editable" : false,
            "displayLabel" : "Citation Plain"
        }, {
            "value" : "${authors}. (${published-date;DDJJNNZ MMM YY}) ${title}. <i>${pubName}</i> (${document-country}). <b>${classification}</b>",
            "key" : "keyCitationHtml",
            "type" : "String",
            "visible" : false,
            "editable" : false,
            "displayLabel" : "Citation Html"
        }, {
            "value" : "U",
            "key" : "classification",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Classification"
        }, {
            "value" : "Unknown",
            "key" : "producer-category",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "producer-category"
        }, {
            "value" : "Cat - Wikipedia, the free encyclopedia",
            "key" : "docTitle",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "docTitle"
        } ],
        "SolrJdbc%2FText%2F92a551b5-f37b-487c-b7eb-57e4169770b0" : [ {
            "value" : "SolrJdbc%2FText%2F92a551b5-f37b-487c-b7eb-57e4169770b0",
            "key" : "uri_DEBUG",
            "type" : "Uri",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "URI (debug)"
        }, {
            "value" : "Alice's Adventures in Wonderland (single-paragraph)",
            "key" : "docTitle",
            "type" : "String",
            "visible" : false,
            "editable" : true,
            "displayLabel" : "Document Title"
        }, {
            "value" : [ ],
            "key" : "authors",
            "type" : "String_List",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Authors"
        }, {
            "value" : null,
            "key" : "modifiedDate",
            "type" : "Date",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Last Edited Date"
        }, {
            "value" : 48,
            "key" : "pageCount",
            "type" : "Integer",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Pages"
        }, {
            "value" : 1365632744510,
            "key" : "published-date",
            "type" : "Date",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Publication Date"
        }, {
            "value" : [ ],
            "key" : "relatedDocs",
            "type" : "Uri_List",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Related Documents"
        }, {
            "value" : null,
            "key" : "document-description",
            "type" : "LongString",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Description"
        }, {
            "value" : null,
            "key" : "publisher",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Publisher"
        }, {
            "value" : null,
            "key" : "pubName",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Publication Name"
        }, {
            "value" : "Unknown",
            "key" : "producer",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Producer"
        }, {
            "value" : "Unknown",
            "key" : "distributor",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Distributor"
        }, {
            "value" : null,
            "key" : "document-organization",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Source Organization"
        }, {
            "value" : null,
            "key" : "document-language",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Source Language"
        }, {
            "value" : null,
            "key" : "document-country",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Source Country"
        }, {
            "value" : 1365632745181,
            "key" : "ingest-date",
            "type" : "Date",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Ingest Date"
        }, {
            "value" : "Plain Text",
            "key" : "document-type",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "File Format"
        }, {
            "value" : "Alice's Adventures in Wonderland (single-paragraph).txt",
            "key" : "document-original-name",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Original File Name"
        }, {
            "value" : [ ],
            "key" : "document_comments",
            "type" : "Object_List",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Comments"
        }, {
            "value" : "Complete",
            "key" : "ingest-state",
            "type" : "String",
            "visible" : false,
            "editable" : false,
            "displayLabel" : "Ingestion State"
        }, {
            "value" : "file:%2F%2F%2FC:%2FUsers%2Flhill%2FDownloads%2Falice-single-paragraph.html",
            "key" : "retrieval-url",
            "type" : "Uri",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "URL"
        }, {
            "value" : "${authors}. (${published-date;DDJJNNZ MMM YY}) ${title}. ${pubName}\n                            (${document-country}). ${classification}",
            "key" : "keyCitationPlain",
            "type" : "String",
            "visible" : false,
            "editable" : false,
            "displayLabel" : "Citation Plain"
        }, {
            "value" : "${authors}. (${published-date;DDJJNNZ MMM YY}) ${title}. <i>${pubName}</i> (${document-country}). <b>${classification}</b>",
            "key" : "keyCitationHtml",
            "type" : "String",
            "visible" : false,
            "editable" : false,
            "displayLabel" : "Citation Html"
        }, {
            "value" : "U",
            "key" : "classification",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Classification"
        }, {
            "value" : "Unknown",
            "key" : "producer-category",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "producer-category"
        }, {
            "value" : "Alice's Adventures in Wonderland (single-paragraph)",
            "key" : "docTitle",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "docTitle"
        } ],
        "SolrJdbc%2FImage%2Ffc4d3970-4c1c-4cc3-9ca7-8694d3376da7" : [ {
            "value" : "SolrJdbc%2FImage%2Ffc4d3970-4c1c-4cc3-9ca7-8694d3376da7",
            "key" : "uri_DEBUG",
            "type" : "Uri",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "URI (debug)"
        }, {
            "value" : "CATS",
            "key" : "docTitle",
            "type" : "String",
            "visible" : false,
            "editable" : true,
            "displayLabel" : "Document Title"
        }, {
            "value" : [ ],
            "key" : "authors",
            "type" : "String_List",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Authors"
        }, {
            "value" : null,
            "key" : "modifiedDate",
            "type" : "Date",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Last Edited Date"
        }, {
            "value" : 0,
            "key" : "pageCount",
            "type" : "Integer",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Pages"
        }, {
            "value" : 1362684568399,
            "key" : "published-date",
            "type" : "Date",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Publication Date"
        }, {
            "value" : [ ],
            "key" : "relatedDocs",
            "type" : "Uri_List",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Related Documents"
        }, {
            "value" : null,
            "key" : "document-description",
            "type" : "LongString",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Description"
        }, {
            "value" : null,
            "key" : "publisher",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Publisher"
        }, {
            "value" : null,
            "key" : "pubName",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Publication Name"
        }, {
            "value" : "Unknown",
            "key" : "producer",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Producer"
        }, {
            "value" : "Analyst Document",
            "key" : "distributor",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Distributor"
        }, {
            "value" : null,
            "key" : "document-organization",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Source Organization"
        }, {
            "value" : null,
            "key" : "document-language",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Source Language"
        }, {
            "value" : null,
            "key" : "document-country",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Source Country"
        }, {
            "value" : 1362684631088,
            "key" : "ingest-date",
            "type" : "Date",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Ingest Date"
        }, {
            "value" : "Image File",
            "key" : "document-type",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "File Format"
        }, {
            "value" : "handsome-fluff.jpg",
            "key" : "document-original-name",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Original File Name"
        }, {
            "value" : [ ],
            "key" : "document_comments",
            "type" : "Object_List",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Comments"
        }, {
            "value" : "Complete",
            "key" : "ingest-state",
            "type" : "String",
            "visible" : false,
            "editable" : false,
            "displayLabel" : "Ingestion State"
        }, {
            "value" : null,
            "key" : "retrieval-url",
            "type" : "Uri",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "URL"
        }, {
            "value" : "${authors}. (${published-date;DDJJNNZ MMM YY}) ${title}. ${pubName}\n                            (${document-country}). ${classification}",
            "key" : "keyCitationPlain",
            "type" : "String",
            "visible" : false,
            "editable" : false,
            "displayLabel" : "Citation Plain"
        }, {
            "value" : "${authors}. (${published-date;DDJJNNZ MMM YY}) ${title}. <i>${pubName}</i> (${document-country}). <b>${classification}</b>",
            "key" : "keyCitationHtml",
            "type" : "String",
            "visible" : false,
            "editable" : false,
            "displayLabel" : "Citation Html"
        }, {
            "value" : "U",
            "key" : "classification",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Classification"
        }, {
            "value" : "Other",
            "key" : "producer-category",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "producer-category"
        } ],
        "SolrJdbc%2FText%2Fc84c1d8e-2b96-4aba-9fd4-1d63ef9d2104" : [ {
            "value" : "SolrJdbc%2FText%2Fc84c1d8e-2b96-4aba-9fd4-1d63ef9d2104",
            "key" : "uri_DEBUG",
            "type" : "Uri",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "URI (debug)"
        }, {
            "value" : "Alice's Adventures in Wonderland (single-paragraph)",
            "key" : "docTitle",
            "type" : "String",
            "visible" : false,
            "editable" : true,
            "displayLabel" : "Document Title"
        }, {
            "value" : [ ],
            "key" : "authors",
            "type" : "String_List",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Authors"
        }, {
            "value" : null,
            "key" : "modifiedDate",
            "type" : "Date",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Last Edited Date"
        }, {
            "value" : 48,
            "key" : "pageCount",
            "type" : "Integer",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Pages"
        }, {
            "value" : 1365793884381,
            "key" : "published-date",
            "type" : "Date",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Publication Date"
        }, {
            "value" : [ ],
            "key" : "relatedDocs",
            "type" : "Uri_List",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Related Documents"
        }, {
            "value" : null,
            "key" : "document-description",
            "type" : "LongString",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Description"
        }, {
            "value" : null,
            "key" : "publisher",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Publisher"
        }, {
            "value" : null,
            "key" : "pubName",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Publication Name"
        }, {
            "value" : "Unknown",
            "key" : "producer",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Producer"
        }, {
            "value" : "Unknown",
            "key" : "distributor",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Distributor"
        }, {
            "value" : null,
            "key" : "document-organization",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Source Organization"
        }, {
            "value" : null,
            "key" : "document-language",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Source Language"
        }, {
            "value" : null,
            "key" : "document-country",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Source Country"
        }, {
            "value" : 1365793884716,
            "key" : "ingest-date",
            "type" : "Date",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Ingest Date"
        }, {
            "value" : "Plain Text",
            "key" : "document-type",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "File Format"
        }, {
            "value" : "Alice's Adventures in Wonderland (single-paragraph).txt",
            "key" : "document-original-name",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Original File Name"
        }, {
            "value" : [ ],
            "key" : "document_comments",
            "type" : "Object_List",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Comments"
        }, {
            "value" : "Complete",
            "key" : "ingest-state",
            "type" : "String",
            "visible" : false,
            "editable" : false,
            "displayLabel" : "Ingestion State"
        }, {
            "value" : "file:%2F%2F%2FC:%2FDocuments%20and%20Settings%2FXPMUser%2FMy%20Documents%2FDownloads%2Falice-single-paragraph.html",
            "key" : "retrieval-url",
            "type" : "Uri",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "URL"
        }, {
            "value" : "${authors}. (${published-date;DDJJNNZ MMM YY}) ${title}. ${pubName}\n                            (${document-country}). ${classification}",
            "key" : "keyCitationPlain",
            "type" : "String",
            "visible" : false,
            "editable" : false,
            "displayLabel" : "Citation Plain"
        }, {
            "value" : "${authors}. (${published-date;DDJJNNZ MMM YY}) ${title}. <i>${pubName}</i> (${document-country}). <b>${classification}</b>",
            "key" : "keyCitationHtml",
            "type" : "String",
            "visible" : false,
            "editable" : false,
            "displayLabel" : "Citation Html"
        }, {
            "value" : "U",
            "key" : "classification",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Classification"
        }, {
            "value" : "Unknown",
            "key" : "producer-category",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "producer-category"
        }, {
            "value" : "Alice's Adventures in Wonderland (single-paragraph)",
            "key" : "docTitle",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "docTitle"
        } ],
        "SolrJdbc%2FImage%2Fab3c1e5f-730b-4e4c-8e66-894c3aaaee49" : [ {
            "value" : "SolrJdbc%2FImage%2Fab3c1e5f-730b-4e4c-8e66-894c3aaaee49",
            "key" : "uri_DEBUG",
            "type" : "Uri",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "URI (debug)"
        }, {
            "value" : "220px-Three-hour-old-kitten",
            "key" : "docTitle",
            "type" : "String",
            "visible" : false,
            "editable" : true,
            "displayLabel" : "Document Title"
        }, {
            "value" : [ ],
            "key" : "authors",
            "type" : "String_List",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Authors"
        }, {
            "value" : null,
            "key" : "modifiedDate",
            "type" : "Date",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Last Edited Date"
        }, {
            "value" : 0,
            "key" : "pageCount",
            "type" : "Integer",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Pages"
        }, {
            "value" : 1365198566634,
            "key" : "published-date",
            "type" : "Date",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Publication Date"
        }, {
            "value" : [ ],
            "key" : "relatedDocs",
            "type" : "Uri_List",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Related Documents"
        }, {
            "value" : null,
            "key" : "document-description",
            "type" : "LongString",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Description"
        }, {
            "value" : null,
            "key" : "publisher",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Publisher"
        }, {
            "value" : null,
            "key" : "pubName",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Publication Name"
        }, {
            "value" : "Unknown",
            "key" : "producer",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Producer"
        }, {
            "value" : "Unknown",
            "key" : "distributor",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Distributor"
        }, {
            "value" : null,
            "key" : "document-organization",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Source Organization"
        }, {
            "value" : null,
            "key" : "document-language",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Source Language"
        }, {
            "value" : null,
            "key" : "document-country",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Source Country"
        }, {
            "value" : 1365198596714,
            "key" : "ingest-date",
            "type" : "Date",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Ingest Date"
        }, {
            "value" : "Image File",
            "key" : "document-type",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "File Format"
        }, {
            "value" : "220px-Three-hour-old-kitten.jpg",
            "key" : "document-original-name",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Original File Name"
        }, {
            "value" : [ ],
            "key" : "document_comments",
            "type" : "Object_List",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Comments"
        }, {
            "value" : "Complete",
            "key" : "ingest-state",
            "type" : "String",
            "visible" : false,
            "editable" : false,
            "displayLabel" : "Ingestion State"
        }, {
            "value" : "http:%2F%2Fen.wikipedia.org%2Fwiki%2FCats",
            "key" : "retrieval-url",
            "type" : "Uri",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "URL"
        }, {
            "value" : "${authors}. (${published-date;DDJJNNZ MMM YY}) ${title}. ${pubName}\n                            (${document-country}). ${classification}",
            "key" : "keyCitationPlain",
            "type" : "String",
            "visible" : false,
            "editable" : false,
            "displayLabel" : "Citation Plain"
        }, {
            "value" : "${authors}. (${published-date;DDJJNNZ MMM YY}) ${title}. <i>${pubName}</i> (${document-country}). <b>${classification}</b>",
            "key" : "keyCitationHtml",
            "type" : "String",
            "visible" : false,
            "editable" : false,
            "displayLabel" : "Citation Html"
        }, {
            "value" : "U",
            "key" : "classification",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Classification"
        }, {
            "value" : "Unknown",
            "key" : "producer-category",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "producer-category"
        }, {
            "value" : "Cat - Wikipedia, the free encyclopedia",
            "key" : "docTitle",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "docTitle"
        } ],
        "SolrJdbc%2FText%2F91cd24bb-2f62-4545-b42f-853d5c83c55b" : [ {
            "value" : "SolrJdbc%2FText%2F91cd24bb-2f62-4545-b42f-853d5c83c55b",
            "key" : "uri_DEBUG",
            "type" : "Uri",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "URI (debug)"
        }, {
            "value" : "FF3.6AliceSingle",
            "key" : "docTitle",
            "type" : "String",
            "visible" : false,
            "editable" : true,
            "displayLabel" : "Document Title"
        }, {
            "value" : [ ],
            "key" : "authors",
            "type" : "String_List",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Authors"
        }, {
            "value" : null,
            "key" : "modifiedDate",
            "type" : "Date",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Last Edited Date"
        }, {
            "value" : 48,
            "key" : "pageCount",
            "type" : "Integer",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Pages"
        }, {
            "value" : 1365792799501,
            "key" : "published-date",
            "type" : "Date",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Publication Date"
        }, {
            "value" : [ ],
            "key" : "relatedDocs",
            "type" : "Uri_List",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Related Documents"
        }, {
            "value" : null,
            "key" : "document-description",
            "type" : "LongString",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Description"
        }, {
            "value" : null,
            "key" : "publisher",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Publisher"
        }, {
            "value" : null,
            "key" : "pubName",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Publication Name"
        }, {
            "value" : "Unknown",
            "key" : "producer",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Producer"
        }, {
            "value" : "Unknown",
            "key" : "distributor",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Distributor"
        }, {
            "value" : null,
            "key" : "document-organization",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Source Organization"
        }, {
            "value" : null,
            "key" : "document-language",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Source Language"
        }, {
            "value" : null,
            "key" : "document-country",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Source Country"
        }, {
            "value" : 1365792801080,
            "key" : "ingest-date",
            "type" : "Date",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Ingest Date"
        }, {
            "value" : "Plain Text",
            "key" : "document-type",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "File Format"
        }, {
            "value" : "FF3.6AliceSingle.txt",
            "key" : "document-original-name",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Original File Name"
        }, {
            "value" : [ ],
            "key" : "document_comments",
            "type" : "Object_List",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Comments"
        }, {
            "value" : "Complete",
            "key" : "ingest-state",
            "type" : "String",
            "visible" : false,
            "editable" : false,
            "displayLabel" : "Ingestion State"
        }, {
            "value" : "file:%2F%2F%2FC:%2FDocuments%20and%20Settings%2FXPMUser%2FMy%20Documents%2FDownloads%2Falice-single-paragraph.html",
            "key" : "retrieval-url",
            "type" : "Uri",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "URL"
        }, {
            "value" : "${authors}. (${published-date;DDJJNNZ MMM YY}) ${title}. ${pubName}\n                            (${document-country}). ${classification}",
            "key" : "keyCitationPlain",
            "type" : "String",
            "visible" : false,
            "editable" : false,
            "displayLabel" : "Citation Plain"
        }, {
            "value" : "${authors}. (${published-date;DDJJNNZ MMM YY}) ${title}. <i>${pubName}</i> (${document-country}). <b>${classification}</b>",
            "key" : "keyCitationHtml",
            "type" : "String",
            "visible" : false,
            "editable" : false,
            "displayLabel" : "Citation Html"
        }, {
            "value" : "U",
            "key" : "classification",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Classification"
        }, {
            "value" : "Unknown",
            "key" : "producer-category",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "producer-category"
        }, {
            "value" : "FF3.6AliceSingle",
            "key" : "docTitle",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "docTitle"
        } ],
        "SolrJdbc%2FImage%2F931479fe-02f9-4011-9601-6d2c7a4b020f" : [ {
            "value" : "SolrJdbc%2FImage%2F931479fe-02f9-4011-9601-6d2c7a4b020f",
            "key" : "uri_DEBUG",
            "type" : "Uri",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "URI (debug)"
        }, {
            "value" : "220px-Girl_and_cat",
            "key" : "docTitle",
            "type" : "String",
            "visible" : false,
            "editable" : true,
            "displayLabel" : "Document Title"
        }, {
            "value" : [ ],
            "key" : "authors",
            "type" : "String_List",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Authors"
        }, {
            "value" : null,
            "key" : "modifiedDate",
            "type" : "Date",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Last Edited Date"
        }, {
            "value" : 0,
            "key" : "pageCount",
            "type" : "Integer",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Pages"
        }, {
            "value" : 1365198566634,
            "key" : "published-date",
            "type" : "Date",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Publication Date"
        }, {
            "value" : [ ],
            "key" : "relatedDocs",
            "type" : "Uri_List",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Related Documents"
        }, {
            "value" : null,
            "key" : "document-description",
            "type" : "LongString",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Description"
        }, {
            "value" : null,
            "key" : "publisher",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Publisher"
        }, {
            "value" : null,
            "key" : "pubName",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Publication Name"
        }, {
            "value" : "Unknown",
            "key" : "producer",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Producer"
        }, {
            "value" : "Unknown",
            "key" : "distributor",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Distributor"
        }, {
            "value" : null,
            "key" : "document-organization",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Source Organization"
        }, {
            "value" : null,
            "key" : "document-language",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Source Language"
        }, {
            "value" : null,
            "key" : "document-country",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Source Country"
        }, {
            "value" : 1365198599027,
            "key" : "ingest-date",
            "type" : "Date",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Ingest Date"
        }, {
            "value" : "Image File",
            "key" : "document-type",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "File Format"
        }, {
            "value" : "220px-Girl_and_cat.jpg",
            "key" : "document-original-name",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Original File Name"
        }, {
            "value" : [ ],
            "key" : "document_comments",
            "type" : "Object_List",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Comments"
        }, {
            "value" : "Complete",
            "key" : "ingest-state",
            "type" : "String",
            "visible" : false,
            "editable" : false,
            "displayLabel" : "Ingestion State"
        }, {
            "value" : "http:%2F%2Fen.wikipedia.org%2Fwiki%2FCats",
            "key" : "retrieval-url",
            "type" : "Uri",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "URL"
        }, {
            "value" : "${authors}. (${published-date;DDJJNNZ MMM YY}) ${title}. ${pubName}\n                            (${document-country}). ${classification}",
            "key" : "keyCitationPlain",
            "type" : "String",
            "visible" : false,
            "editable" : false,
            "displayLabel" : "Citation Plain"
        }, {
            "value" : "${authors}. (${published-date;DDJJNNZ MMM YY}) ${title}. <i>${pubName}</i> (${document-country}). <b>${classification}</b>",
            "key" : "keyCitationHtml",
            "type" : "String",
            "visible" : false,
            "editable" : false,
            "displayLabel" : "Citation Html"
        }, {
            "value" : "U",
            "key" : "classification",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Classification"
        }, {
            "value" : "Unknown",
            "key" : "producer-category",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "producer-category"
        }, {
            "value" : "Cat - Wikipedia, the free encyclopedia",
            "key" : "docTitle",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "docTitle"
        } ],
        "SolrJdbc%2FImage%2F42ffc8bd-8fcd-4236-8b93-820829e0a739" : [ {
            "value" : "SolrJdbc%2FImage%2F42ffc8bd-8fcd-4236-8b93-820829e0a739",
            "key" : "uri_DEBUG",
            "type" : "Uri",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "URI (debug)"
        }, {
            "value" : "170px-Feral_cat_Virginia_crop",
            "key" : "docTitle",
            "type" : "String",
            "visible" : false,
            "editable" : true,
            "displayLabel" : "Document Title"
        }, {
            "value" : [ ],
            "key" : "authors",
            "type" : "String_List",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Authors"
        }, {
            "value" : null,
            "key" : "modifiedDate",
            "type" : "Date",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Last Edited Date"
        }, {
            "value" : 0,
            "key" : "pageCount",
            "type" : "Integer",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Pages"
        }, {
            "value" : 1365198566634,
            "key" : "published-date",
            "type" : "Date",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Publication Date"
        }, {
            "value" : [ ],
            "key" : "relatedDocs",
            "type" : "Uri_List",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Related Documents"
        }, {
            "value" : null,
            "key" : "document-description",
            "type" : "LongString",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Description"
        }, {
            "value" : null,
            "key" : "publisher",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Publisher"
        }, {
            "value" : null,
            "key" : "pubName",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Publication Name"
        }, {
            "value" : "Unknown",
            "key" : "producer",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Producer"
        }, {
            "value" : "Unknown",
            "key" : "distributor",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Distributor"
        }, {
            "value" : null,
            "key" : "document-organization",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Source Organization"
        }, {
            "value" : null,
            "key" : "document-language",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Source Language"
        }, {
            "value" : null,
            "key" : "document-country",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Source Country"
        }, {
            "value" : 1365198599690,
            "key" : "ingest-date",
            "type" : "Date",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Ingest Date"
        }, {
            "value" : "Image File",
            "key" : "document-type",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "File Format"
        }, {
            "value" : "170px-Feral_cat_Virginia_crop.jpg",
            "key" : "document-original-name",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Original File Name"
        }, {
            "value" : [ ],
            "key" : "document_comments",
            "type" : "Object_List",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Comments"
        }, {
            "value" : "Complete",
            "key" : "ingest-state",
            "type" : "String",
            "visible" : false,
            "editable" : false,
            "displayLabel" : "Ingestion State"
        }, {
            "value" : "http:%2F%2Fen.wikipedia.org%2Fwiki%2FCats",
            "key" : "retrieval-url",
            "type" : "Uri",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "URL"
        }, {
            "value" : "${authors}. (${published-date;DDJJNNZ MMM YY}) ${title}. ${pubName}\n                            (${document-country}). ${classification}",
            "key" : "keyCitationPlain",
            "type" : "String",
            "visible" : false,
            "editable" : false,
            "displayLabel" : "Citation Plain"
        }, {
            "value" : "${authors}. (${published-date;DDJJNNZ MMM YY}) ${title}. <i>${pubName}</i> (${document-country}). <b>${classification}</b>",
            "key" : "keyCitationHtml",
            "type" : "String",
            "visible" : false,
            "editable" : false,
            "displayLabel" : "Citation Html"
        }, {
            "value" : "U",
            "key" : "classification",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Classification"
        }, {
            "value" : "Unknown",
            "key" : "producer-category",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "producer-category"
        }, {
            "value" : "Cat - Wikipedia, the free encyclopedia",
            "key" : "docTitle",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "docTitle"
        } ],
        "SolrJdbc%2FText%2F001f4020-26c8-4155-9e37-4ea153553a49" : [ {
            "value" : "SolrJdbc%2FText%2F001f4020-26c8-4155-9e37-4ea153553a49",
            "key" : "uri_DEBUG",
            "type" : "Uri",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "URI (debug)"
        }, {
            "value" : "Alice's Adventures in Wonderland (multi-paragraph)",
            "key" : "docTitle",
            "type" : "String",
            "visible" : false,
            "editable" : true,
            "displayLabel" : "Document Title"
        }, {
            "value" : [ ],
            "key" : "authors",
            "type" : "String_List",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Authors"
        }, {
            "value" : null,
            "key" : "modifiedDate",
            "type" : "Date",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Last Edited Date"
        }, {
            "value" : 46,
            "key" : "pageCount",
            "type" : "Integer",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Pages"
        }, {
            "value" : 1365618870216,
            "key" : "published-date",
            "type" : "Date",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Publication Date"
        }, {
            "value" : [ ],
            "key" : "relatedDocs",
            "type" : "Uri_List",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Related Documents"
        }, {
            "value" : null,
            "key" : "document-description",
            "type" : "LongString",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Description"
        }, {
            "value" : null,
            "key" : "publisher",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Publisher"
        }, {
            "value" : null,
            "key" : "pubName",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Publication Name"
        }, {
            "value" : "Unknown",
            "key" : "producer",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Producer"
        }, {
            "value" : "Unknown",
            "key" : "distributor",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Distributor"
        }, {
            "value" : null,
            "key" : "document-organization",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Source Organization"
        }, {
            "value" : null,
            "key" : "document-language",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Source Language"
        }, {
            "value" : null,
            "key" : "document-country",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Source Country"
        }, {
            "value" : 1365620993141,
            "key" : "ingest-date",
            "type" : "Date",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Ingest Date"
        }, {
            "value" : "Plain Text",
            "key" : "document-type",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "File Format"
        }, {
            "value" : "Alice's Adventures in Wonderland (multi-paragraph).txt",
            "key" : "document-original-name",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Original File Name"
        }, {
            "value" : [ ],
            "key" : "document_comments",
            "type" : "Object_List",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Comments"
        }, {
            "value" : "Enriching",
            "key" : "ingest-state",
            "type" : "String",
            "visible" : false,
            "editable" : false,
            "displayLabel" : "Ingestion State"
        }, {
            "value" : "http:%2F%2Flocalhost:8888%2Falice-multiple-paragraph.html",
            "key" : "retrieval-url",
            "type" : "Uri",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "URL"
        }, {
            "value" : "${authors}. (${published-date;DDJJNNZ MMM YY}) ${title}. ${pubName}\n                            (${document-country}). ${classification}",
            "key" : "keyCitationPlain",
            "type" : "String",
            "visible" : false,
            "editable" : false,
            "displayLabel" : "Citation Plain"
        }, {
            "value" : "${authors}. (${published-date;DDJJNNZ MMM YY}) ${title}. <i>${pubName}</i> (${document-country}). <b>${classification}</b>",
            "key" : "keyCitationHtml",
            "type" : "String",
            "visible" : false,
            "editable" : false,
            "displayLabel" : "Citation Html"
        }, {
            "value" : "U",
            "key" : "classification",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Classification"
        }, {
            "value" : "Unknown",
            "key" : "producer-category",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "producer-category"
        }, {
            "value" : "Alice's Adventures in Wonderland (multi-paragraph)",
            "key" : "docTitle",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "docTitle"
        } ],
        "SolrJdbc%2FImage%2F4cbf7553-6b3a-4438-857d-1ed23be25e90" : [ {
            "value" : "SolrJdbc%2FImage%2F4cbf7553-6b3a-4438-857d-1ed23be25e90",
            "key" : "uri_DEBUG",
            "type" : "Uri",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "URI (debug)"
        }, {
            "value" : "220px-AfricanWildCat",
            "key" : "docTitle",
            "type" : "String",
            "visible" : false,
            "editable" : true,
            "displayLabel" : "Document Title"
        }, {
            "value" : [ ],
            "key" : "authors",
            "type" : "String_List",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Authors"
        }, {
            "value" : null,
            "key" : "modifiedDate",
            "type" : "Date",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Last Edited Date"
        }, {
            "value" : 0,
            "key" : "pageCount",
            "type" : "Integer",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Pages"
        }, {
            "value" : 1365198566634,
            "key" : "published-date",
            "type" : "Date",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Publication Date"
        }, {
            "value" : [ ],
            "key" : "relatedDocs",
            "type" : "Uri_List",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Related Documents"
        }, {
            "value" : null,
            "key" : "document-description",
            "type" : "LongString",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Description"
        }, {
            "value" : null,
            "key" : "publisher",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Publisher"
        }, {
            "value" : null,
            "key" : "pubName",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Publication Name"
        }, {
            "value" : "Unknown",
            "key" : "producer",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Producer"
        }, {
            "value" : "Unknown",
            "key" : "distributor",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Distributor"
        }, {
            "value" : null,
            "key" : "document-organization",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Source Organization"
        }, {
            "value" : null,
            "key" : "document-language",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Source Language"
        }, {
            "value" : null,
            "key" : "document-country",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Source Country"
        }, {
            "value" : 1365198593797,
            "key" : "ingest-date",
            "type" : "Date",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Ingest Date"
        }, {
            "value" : "Image File",
            "key" : "document-type",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "File Format"
        }, {
            "value" : "220px-AfricanWildCat.jpg",
            "key" : "document-original-name",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Original File Name"
        }, {
            "value" : [ ],
            "key" : "document_comments",
            "type" : "Object_List",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Comments"
        }, {
            "value" : "Complete",
            "key" : "ingest-state",
            "type" : "String",
            "visible" : false,
            "editable" : false,
            "displayLabel" : "Ingestion State"
        }, {
            "value" : "http:%2F%2Fen.wikipedia.org%2Fwiki%2FCats",
            "key" : "retrieval-url",
            "type" : "Uri",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "URL"
        }, {
            "value" : "${authors}. (${published-date;DDJJNNZ MMM YY}) ${title}. ${pubName}\n                            (${document-country}). ${classification}",
            "key" : "keyCitationPlain",
            "type" : "String",
            "visible" : false,
            "editable" : false,
            "displayLabel" : "Citation Plain"
        }, {
            "value" : "${authors}. (${published-date;DDJJNNZ MMM YY}) ${title}. <i>${pubName}</i> (${document-country}). <b>${classification}</b>",
            "key" : "keyCitationHtml",
            "type" : "String",
            "visible" : false,
            "editable" : false,
            "displayLabel" : "Citation Html"
        }, {
            "value" : "U",
            "key" : "classification",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Classification"
        }, {
            "value" : "Unknown",
            "key" : "producer-category",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "producer-category"
        }, {
            "value" : "Cat - Wikipedia, the free encyclopedia",
            "key" : "docTitle",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "docTitle"
        } ],
        "SolrJdbc%2FImage%2Fc4d8b86c-7bc5-408c-9db9-85a4ec866ebb" : [ {
            "value" : "SolrJdbc%2FImage%2Fc4d8b86c-7bc5-408c-9db9-85a4ec866ebb",
            "key" : "uri_DEBUG",
            "type" : "Uri",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "URI (debug)"
        }, {
            "value" : "220px-Black_cat_being_snowed_on",
            "key" : "docTitle",
            "type" : "String",
            "visible" : false,
            "editable" : true,
            "displayLabel" : "Document Title"
        }, {
            "value" : [ ],
            "key" : "authors",
            "type" : "String_List",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Authors"
        }, {
            "value" : null,
            "key" : "modifiedDate",
            "type" : "Date",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Last Edited Date"
        }, {
            "value" : 0,
            "key" : "pageCount",
            "type" : "Integer",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Pages"
        }, {
            "value" : 1365198566634,
            "key" : "published-date",
            "type" : "Date",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Publication Date"
        }, {
            "value" : [ ],
            "key" : "relatedDocs",
            "type" : "Uri_List",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Related Documents"
        }, {
            "value" : null,
            "key" : "document-description",
            "type" : "LongString",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Description"
        }, {
            "value" : null,
            "key" : "publisher",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Publisher"
        }, {
            "value" : null,
            "key" : "pubName",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Publication Name"
        }, {
            "value" : "Unknown",
            "key" : "producer",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Producer"
        }, {
            "value" : "Unknown",
            "key" : "distributor",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Distributor"
        }, {
            "value" : null,
            "key" : "document-organization",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Source Organization"
        }, {
            "value" : null,
            "key" : "document-language",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Source Language"
        }, {
            "value" : null,
            "key" : "document-country",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Source Country"
        }, {
            "value" : 1365198597497,
            "key" : "ingest-date",
            "type" : "Date",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Ingest Date"
        }, {
            "value" : "Image File",
            "key" : "document-type",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "File Format"
        }, {
            "value" : "220px-Black_cat_being_snowed_on.jpg",
            "key" : "document-original-name",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Original File Name"
        }, {
            "value" : [ ],
            "key" : "document_comments",
            "type" : "Object_List",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Comments"
        }, {
            "value" : "Complete",
            "key" : "ingest-state",
            "type" : "String",
            "visible" : false,
            "editable" : false,
            "displayLabel" : "Ingestion State"
        }, {
            "value" : "http:%2F%2Fen.wikipedia.org%2Fwiki%2FCats",
            "key" : "retrieval-url",
            "type" : "Uri",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "URL"
        }, {
            "value" : "${authors}. (${published-date;DDJJNNZ MMM YY}) ${title}. ${pubName}\n                            (${document-country}). ${classification}",
            "key" : "keyCitationPlain",
            "type" : "String",
            "visible" : false,
            "editable" : false,
            "displayLabel" : "Citation Plain"
        }, {
            "value" : "${authors}. (${published-date;DDJJNNZ MMM YY}) ${title}. <i>${pubName}</i> (${document-country}). <b>${classification}</b>",
            "key" : "keyCitationHtml",
            "type" : "String",
            "visible" : false,
            "editable" : false,
            "displayLabel" : "Citation Html"
        }, {
            "value" : "U",
            "key" : "classification",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Classification"
        }, {
            "value" : "Unknown",
            "key" : "producer-category",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "producer-category"
        }, {
            "value" : "Cat - Wikipedia, the free encyclopedia",
            "key" : "docTitle",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "docTitle"
        } ],
        "SolrJdbc%2FImage%2F86891463-d94a-4333-a97b-18de8cab04f0" : [ {
            "value" : "SolrJdbc%2FImage%2F86891463-d94a-4333-a97b-18de8cab04f0",
            "key" : "uri_DEBUG",
            "type" : "Uri",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "URI (debug)"
        }, {
            "value" : "220px-Feral-kitten-eating-adult-cottontail-rabbit",
            "key" : "docTitle",
            "type" : "String",
            "visible" : false,
            "editable" : true,
            "displayLabel" : "Document Title"
        }, {
            "value" : [ ],
            "key" : "authors",
            "type" : "String_List",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Authors"
        }, {
            "value" : null,
            "key" : "modifiedDate",
            "type" : "Date",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Last Edited Date"
        }, {
            "value" : 0,
            "key" : "pageCount",
            "type" : "Integer",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Pages"
        }, {
            "value" : 1365198566634,
            "key" : "published-date",
            "type" : "Date",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Publication Date"
        }, {
            "value" : [ ],
            "key" : "relatedDocs",
            "type" : "Uri_List",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Related Documents"
        }, {
            "value" : null,
            "key" : "document-description",
            "type" : "LongString",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Description"
        }, {
            "value" : null,
            "key" : "publisher",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Publisher"
        }, {
            "value" : null,
            "key" : "pubName",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Publication Name"
        }, {
            "value" : "Unknown",
            "key" : "producer",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Producer"
        }, {
            "value" : "Unknown",
            "key" : "distributor",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Distributor"
        }, {
            "value" : null,
            "key" : "document-organization",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Source Organization"
        }, {
            "value" : null,
            "key" : "document-language",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Source Language"
        }, {
            "value" : null,
            "key" : "document-country",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Source Country"
        }, {
            "value" : 1365198598297,
            "key" : "ingest-date",
            "type" : "Date",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Ingest Date"
        }, {
            "value" : "Image File",
            "key" : "document-type",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "File Format"
        }, {
            "value" : "220px-Feral-kitten-eating-adult-cottontail-rabbit.jpg",
            "key" : "document-original-name",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Original File Name"
        }, {
            "value" : [ ],
            "key" : "document_comments",
            "type" : "Object_List",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Comments"
        }, {
            "value" : "Complete",
            "key" : "ingest-state",
            "type" : "String",
            "visible" : false,
            "editable" : false,
            "displayLabel" : "Ingestion State"
        }, {
            "value" : "http:%2F%2Fen.wikipedia.org%2Fwiki%2FCats",
            "key" : "retrieval-url",
            "type" : "Uri",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "URL"
        }, {
            "value" : "${authors}. (${published-date;DDJJNNZ MMM YY}) ${title}. ${pubName}\n                            (${document-country}). ${classification}",
            "key" : "keyCitationPlain",
            "type" : "String",
            "visible" : false,
            "editable" : false,
            "displayLabel" : "Citation Plain"
        }, {
            "value" : "${authors}. (${published-date;DDJJNNZ MMM YY}) ${title}. <i>${pubName}</i> (${document-country}). <b>${classification}</b>",
            "key" : "keyCitationHtml",
            "type" : "String",
            "visible" : false,
            "editable" : false,
            "displayLabel" : "Citation Html"
        }, {
            "value" : "U",
            "key" : "classification",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Classification"
        }, {
            "value" : "Unknown",
            "key" : "producer-category",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "producer-category"
        }, {
            "value" : "Cat - Wikipedia, the free encyclopedia",
            "key" : "docTitle",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "docTitle"
        } ],
        "SolrJdbc%2FRich%2Fc1e77731-e4ff-4b62-846f-51500c1739dd" : [ {
            "value" : "SolrJdbc%2FRich%2Fc1e77731-e4ff-4b62-846f-51500c1739dd",
            "key" : "uri_DEBUG",
            "type" : "Uri",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "URI (debug)"
        }, {
            "value" : "Grammars and the Syntax-Semantics",
            "key" : "docTitle",
            "type" : "String",
            "visible" : false,
            "editable" : true,
            "displayLabel" : "Document Title"
        }, {
            "value" : [ ],
            "key" : "authors",
            "type" : "String_List",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Authors"
        }, {
            "value" : null,
            "key" : "modifiedDate",
            "type" : "Date",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Last Edited Date"
        }, {
            "value" : 10,
            "key" : "pageCount",
            "type" : "Integer",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Pages"
        }, {
            "value" : 1365625580842,
            "key" : "published-date",
            "type" : "Date",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Publication Date"
        }, {
            "value" : [ ],
            "key" : "relatedDocs",
            "type" : "Uri_List",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Related Documents"
        }, {
            "value" : null,
            "key" : "document-description",
            "type" : "LongString",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Description"
        }, {
            "value" : null,
            "key" : "publisher",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Publisher"
        }, {
            "value" : null,
            "key" : "pubName",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Publication Name"
        }, {
            "value" : "Unknown",
            "key" : "producer",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Producer"
        }, {
            "value" : "Analyst Document",
            "key" : "distributor",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Distributor"
        }, {
            "value" : null,
            "key" : "document-organization",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Source Organization"
        }, {
            "value" : null,
            "key" : "document-language",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Source Language"
        }, {
            "value" : null,
            "key" : "document-country",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Source Country"
        }, {
            "value" : 1365626517679,
            "key" : "ingest-date",
            "type" : "Date",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Ingest Date"
        }, {
            "value" : "PDF (Portable Document Format)",
            "key" : "document-type",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "File Format"
        }, {
            "value" : "Grammars and the Syntax-Semantics.pdf",
            "key" : "document-original-name",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Original File Name"
        }, {
            "value" : [ ],
            "key" : "document_comments",
            "type" : "Object_List",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Comments"
        }, {
            "value" : "Complete",
            "key" : "ingest-state",
            "type" : "String",
            "visible" : false,
            "editable" : false,
            "displayLabel" : "Ingestion State"
        }, {
            "value" : null,
            "key" : "retrieval-url",
            "type" : "Uri",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "URL"
        }, {
            "value" : "${authors}. (${published-date;DDJJNNZ MMM YY}) ${title}. ${pubName}\n                            (${document-country}). ${classification}",
            "key" : "keyCitationPlain",
            "type" : "String",
            "visible" : false,
            "editable" : false,
            "displayLabel" : "Citation Plain"
        }, {
            "value" : "${authors}. (${published-date;DDJJNNZ MMM YY}) ${title}. <i>${pubName}</i> (${document-country}). <b>${classification}</b>",
            "key" : "keyCitationHtml",
            "type" : "String",
            "visible" : false,
            "editable" : false,
            "displayLabel" : "Citation Html"
        }, {
            "value" : "U",
            "key" : "classification",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Classification"
        }, {
            "value" : "Other",
            "key" : "producer-category",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "producer-category"
        } ],
        "SolrJdbc%2FText%2Fe6d6284c-67ff-46df-8c64-24406f15a941" : [ {
            "value" : "SolrJdbc%2FText%2Fe6d6284c-67ff-46df-8c64-24406f15a941",
            "key" : "uri_DEBUG",
            "type" : "Uri",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "URI (debug)"
        }, {
            "value" : "Alice's Adventures in Wonderland (multi-paragraph)",
            "key" : "docTitle",
            "type" : "String",
            "visible" : false,
            "editable" : true,
            "displayLabel" : "Document Title"
        }, {
            "value" : [ ],
            "key" : "authors",
            "type" : "String_List",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Authors"
        }, {
            "value" : null,
            "key" : "modifiedDate",
            "type" : "Date",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Last Edited Date"
        }, {
            "value" : 46,
            "key" : "pageCount",
            "type" : "Integer",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Pages"
        }, {
            "value" : 1365631323557,
            "key" : "published-date",
            "type" : "Date",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Publication Date"
        }, {
            "value" : [ ],
            "key" : "relatedDocs",
            "type" : "Uri_List",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Related Documents"
        }, {
            "value" : null,
            "key" : "document-description",
            "type" : "LongString",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Description"
        }, {
            "value" : null,
            "key" : "publisher",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Publisher"
        }, {
            "value" : null,
            "key" : "pubName",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Publication Name"
        }, {
            "value" : "Unknown",
            "key" : "producer",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Producer"
        }, {
            "value" : "Unknown",
            "key" : "distributor",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Distributor"
        }, {
            "value" : null,
            "key" : "document-organization",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Source Organization"
        }, {
            "value" : null,
            "key" : "document-language",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Source Language"
        }, {
            "value" : null,
            "key" : "document-country",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Source Country"
        }, {
            "value" : 1365631324772,
            "key" : "ingest-date",
            "type" : "Date",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Ingest Date"
        }, {
            "value" : "Plain Text",
            "key" : "document-type",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "File Format"
        }, {
            "value" : "Alice's Adventures in Wonderland (multi-paragraph).txt",
            "key" : "document-original-name",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Original File Name"
        }, {
            "value" : [ ],
            "key" : "document_comments",
            "type" : "Object_List",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Comments"
        }, {
            "value" : "Complete",
            "key" : "ingest-state",
            "type" : "String",
            "visible" : false,
            "editable" : false,
            "displayLabel" : "Ingestion State"
        }, {
            "value" : "http:%2F%2Flocalhost:8888%2Falice-multiple-paragraph.html",
            "key" : "retrieval-url",
            "type" : "Uri",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "URL"
        }, {
            "value" : "${authors}. (${published-date;DDJJNNZ MMM YY}) ${title}. ${pubName}\n                            (${document-country}). ${classification}",
            "key" : "keyCitationPlain",
            "type" : "String",
            "visible" : false,
            "editable" : false,
            "displayLabel" : "Citation Plain"
        }, {
            "value" : "${authors}. (${published-date;DDJJNNZ MMM YY}) ${title}. <i>${pubName}</i> (${document-country}). <b>${classification}</b>",
            "key" : "keyCitationHtml",
            "type" : "String",
            "visible" : false,
            "editable" : false,
            "displayLabel" : "Citation Html"
        }, {
            "value" : "U",
            "key" : "classification",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Classification"
        }, {
            "value" : "Unknown",
            "key" : "producer-category",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "producer-category"
        }, {
            "value" : "Alice's Adventures in Wonderland (multi-paragraph)",
            "key" : "docTitle",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "docTitle"
        } ],
        "SolrJdbc%2FImage%2Fa9f5f592-66f9-4ffe-a1f6-cc61b644a6f7" : [ {
            "value" : "SolrJdbc%2FImage%2Fa9f5f592-66f9-4ffe-a1f6-cc61b644a6f7",
            "key" : "uri_DEBUG",
            "type" : "Uri",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "URI (debug)"
        }, {
            "value" : "220px-Cats_having_sex_in_Israel",
            "key" : "docTitle",
            "type" : "String",
            "visible" : false,
            "editable" : true,
            "displayLabel" : "Document Title"
        }, {
            "value" : [ ],
            "key" : "authors",
            "type" : "String_List",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Authors"
        }, {
            "value" : null,
            "key" : "modifiedDate",
            "type" : "Date",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Last Edited Date"
        }, {
            "value" : 0,
            "key" : "pageCount",
            "type" : "Integer",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Pages"
        }, {
            "value" : 1365198566634,
            "key" : "published-date",
            "type" : "Date",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Publication Date"
        }, {
            "value" : [ ],
            "key" : "relatedDocs",
            "type" : "Uri_List",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Related Documents"
        }, {
            "value" : null,
            "key" : "document-description",
            "type" : "LongString",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Description"
        }, {
            "value" : null,
            "key" : "publisher",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Publisher"
        }, {
            "value" : null,
            "key" : "pubName",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Publication Name"
        }, {
            "value" : "Unknown",
            "key" : "producer",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Producer"
        }, {
            "value" : "Unknown",
            "key" : "distributor",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Distributor"
        }, {
            "value" : null,
            "key" : "document-organization",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Source Organization"
        }, {
            "value" : null,
            "key" : "document-language",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Source Language"
        }, {
            "value" : null,
            "key" : "document-country",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Source Country"
        }, {
            "value" : 1365198596021,
            "key" : "ingest-date",
            "type" : "Date",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Ingest Date"
        }, {
            "value" : "Image File",
            "key" : "document-type",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "File Format"
        }, {
            "value" : "220px-Cats_having_sex_in_Israel.jpg",
            "key" : "document-original-name",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Original File Name"
        }, {
            "value" : [ ],
            "key" : "document_comments",
            "type" : "Object_List",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Comments"
        }, {
            "value" : "Complete",
            "key" : "ingest-state",
            "type" : "String",
            "visible" : false,
            "editable" : false,
            "displayLabel" : "Ingestion State"
        }, {
            "value" : "http:%2F%2Fen.wikipedia.org%2Fwiki%2FCats",
            "key" : "retrieval-url",
            "type" : "Uri",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "URL"
        }, {
            "value" : "${authors}. (${published-date;DDJJNNZ MMM YY}) ${title}. ${pubName}\n                            (${document-country}). ${classification}",
            "key" : "keyCitationPlain",
            "type" : "String",
            "visible" : false,
            "editable" : false,
            "displayLabel" : "Citation Plain"
        }, {
            "value" : "${authors}. (${published-date;DDJJNNZ MMM YY}) ${title}. <i>${pubName}</i> (${document-country}). <b>${classification}</b>",
            "key" : "keyCitationHtml",
            "type" : "String",
            "visible" : false,
            "editable" : false,
            "displayLabel" : "Citation Html"
        }, {
            "value" : "U",
            "key" : "classification",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Classification"
        }, {
            "value" : "Unknown",
            "key" : "producer-category",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "producer-category"
        }, {
            "value" : "Cat - Wikipedia, the free encyclopedia",
            "key" : "docTitle",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "docTitle"
        } ],
        "SolrJdbc%2FRich%2F6ceeaf28-e118-4cdc-ad77-ecb3130fe9be" : [ {
            "value" : "SolrJdbc%2FRich%2F6ceeaf28-e118-4cdc-ad77-ecb3130fe9be",
            "key" : "uri_DEBUG",
            "type" : "Uri",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "URI (debug)"
        }, {
            "value" : "ING-01 Wikijunior-Big_Cats",
            "key" : "docTitle",
            "type" : "String",
            "visible" : false,
            "editable" : true,
            "displayLabel" : "Document Title"
        }, {
            "value" : [ ],
            "key" : "authors",
            "type" : "String_List",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Authors"
        }, {
            "value" : null,
            "key" : "modifiedDate",
            "type" : "Date",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Last Edited Date"
        }, {
            "value" : 65,
            "key" : "pageCount",
            "type" : "Integer",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Pages"
        }, {
            "value" : 1380672000000,
            "key" : "published-date",
            "type" : "Date",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Publication Date"
        }, {
            "value" : [ ],
            "key" : "relatedDocs",
            "type" : "Uri_List",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Related Documents"
        }, {
            "value" : null,
            "key" : "document-description",
            "type" : "LongString",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Description"
        }, {
            "value" : null,
            "key" : "publisher",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Publisher"
        }, {
            "value" : null,
            "key" : "pubName",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Publication Name"
        }, {
            "value" : "Unknown",
            "key" : "producer",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Producer"
        }, {
            "value" : "Analyst Document",
            "key" : "distributor",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Distributor"
        }, {
            "value" : null,
            "key" : "document-organization",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Source Organization"
        }, {
            "value" : null,
            "key" : "document-language",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Source Language"
        }, {
            "value" : null,
            "key" : "document-country",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Source Country"
        }, {
            "value" : 1380739211556,
            "key" : "ingest-date",
            "type" : "Date",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Ingest Date"
        }, {
            "value" : "PDF (Portable Document Format)",
            "key" : "document-type",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "File Format"
        }, {
            "value" : "ING-01 Wikijunior-Big_Cats.pdf",
            "key" : "document-original-name",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Original File Name"
        }, {
            "value" : [ ],
            "key" : "document_comments",
            "type" : "Object_List",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Comments"
        }, {
            "value" : "Complete",
            "key" : "ingest-state",
            "type" : "String",
            "visible" : false,
            "editable" : false,
            "displayLabel" : "Ingestion State"
        }, {
            "value" : null,
            "key" : "retrieval-url",
            "type" : "Uri",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "URL"
        }, {
            "value" : "${authors}. (${published-date;DDJJNNZ MMM YY}) ${title}. ${pubName}\n                            (${document-country}). ${classification}",
            "key" : "keyCitationPlain",
            "type" : "String",
            "visible" : false,
            "editable" : false,
            "displayLabel" : "Citation Plain"
        }, {
            "value" : "${authors}. (${published-date;DDJJNNZ MMM YY}) ${title}. <i>${pubName}</i> (${document-country}). <b>${classification}</b>",
            "key" : "keyCitationHtml",
            "type" : "String",
            "visible" : false,
            "editable" : false,
            "displayLabel" : "Citation Html"
        }, {
            "value" : "U",
            "key" : "classification",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Classification"
        }, {
            "value" : "Other",
            "key" : "producer-category",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "producer-category"
        } ],
        "SolrJdbc%2FText%2Fbce09265-f948-4208-8298-41035280824e" : [ {
            "value" : "SolrJdbc%2FText%2Fbce09265-f948-4208-8298-41035280824e",
            "key" : "uri_DEBUG",
            "type" : "Uri",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "URI (debug)"
        }, {
            "value" : "Alice's Adventures in Wonderland (multi-paragraph)",
            "key" : "docTitle",
            "type" : "String",
            "visible" : false,
            "editable" : true,
            "displayLabel" : "Document Title"
        }, {
            "value" : [ ],
            "key" : "authors",
            "type" : "String_List",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Authors"
        }, {
            "value" : null,
            "key" : "modifiedDate",
            "type" : "Date",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Last Edited Date"
        }, {
            "value" : 46,
            "key" : "pageCount",
            "type" : "Integer",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Pages"
        }, {
            "value" : 1365618927513,
            "key" : "published-date",
            "type" : "Date",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Publication Date"
        }, {
            "value" : [ ],
            "key" : "relatedDocs",
            "type" : "Uri_List",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Related Documents"
        }, {
            "value" : null,
            "key" : "document-description",
            "type" : "LongString",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Description"
        }, {
            "value" : null,
            "key" : "publisher",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Publisher"
        }, {
            "value" : null,
            "key" : "pubName",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Publication Name"
        }, {
            "value" : "Unknown",
            "key" : "producer",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Producer"
        }, {
            "value" : "Unknown",
            "key" : "distributor",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Distributor"
        }, {
            "value" : null,
            "key" : "document-organization",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Source Organization"
        }, {
            "value" : null,
            "key" : "document-language",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Source Language"
        }, {
            "value" : null,
            "key" : "document-country",
            "type" : "String",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Source Country"
        }, {
            "value" : 1365621007925,
            "key" : "ingest-date",
            "type" : "Date",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Ingest Date"
        }, {
            "value" : "Plain Text",
            "key" : "document-type",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "File Format"
        }, {
            "value" : "Alice's Adventures in Wonderland (multi-paragraph).txt",
            "key" : "document-original-name",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Original File Name"
        }, {
            "value" : [ ],
            "key" : "document_comments",
            "type" : "Object_List",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "Comments"
        }, {
            "value" : "Enriching",
            "key" : "ingest-state",
            "type" : "String",
            "visible" : false,
            "editable" : false,
            "displayLabel" : "Ingestion State"
        }, {
            "value" : "http:%2F%2Flocalhost:8888%2Falice-multiple-paragraph.html",
            "key" : "retrieval-url",
            "type" : "Uri",
            "visible" : true,
            "editable" : true,
            "displayLabel" : "URL"
        }, {
            "value" : "${authors}. (${published-date;DDJJNNZ MMM YY}) ${title}. ${pubName}\n                            (${document-country}). ${classification}",
            "key" : "keyCitationPlain",
            "type" : "String",
            "visible" : false,
            "editable" : false,
            "displayLabel" : "Citation Plain"
        }, {
            "value" : "${authors}. (${published-date;DDJJNNZ MMM YY}) ${title}. <i>${pubName}</i> (${document-country}). <b>${classification}</b>",
            "key" : "keyCitationHtml",
            "type" : "String",
            "visible" : false,
            "editable" : false,
            "displayLabel" : "Citation Html"
        }, {
            "value" : "U",
            "key" : "classification",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "Classification"
        }, {
            "value" : "Unknown",
            "key" : "producer-category",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "producer-category"
        }, {
            "value" : "Alice's Adventures in Wonderland (multi-paragraph)",
            "key" : "docTitle",
            "type" : "String",
            "visible" : true,
            "editable" : false,
            "displayLabel" : "docTitle"
        } ]
    };

    var noResultsMetadataResponse = [];

    ThetusHelpers.Fixtures = ThetusHelpers.Fixtures || {};
    ThetusHelpers.Fixtures.ResultsMetadata = ThetusHelpers.Fixtures.ResultsMetadata || {};

    ThetusHelpers.Fixtures.ResultsMetadata.resultsMetadataResponse = resultsMetadataResponse;
    ThetusHelpers.Fixtures.ResultsMetadata.noTemplatesResponse = noResultsMetadataResponse;

})(ThetusTestHelpers || (ThetusTestHelpers = {}));