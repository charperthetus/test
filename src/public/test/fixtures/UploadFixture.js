var ThetusTestHelpers;

(function (ThetusHelpers) {
    "use strict";

    var pollingResponse = {
            "test1" : {
                "statusText" : "Ingestion complete. Document will be searchable in a few seconds.",
                "status" : "completed",
                "documentUri" : "SolrJdbc%2FImage%2F03938b67-01b9-44b5-b07e-2447a8b2069b"
            },
            "test2" : {
                "statusText" : "Ingestion complete. Document will be searchable in a few seconds.",
                "status" : "completed",
                "documentUri" : "SolrJdbc%2FImage%2F7504b74b-5e63-4cc4-bf63-1f55470d6359"
            },
            "test3" : {
                "statusText" : "Ingestion complete. Document will be searchable in a few seconds.",
                "status" : "completed",
                "documentUri" : "SolrJdbc%2FImage%2F4fbc405c-393c-4850-a259-2d04e29c1315"
            }
    };


    ThetusHelpers.Fixtures = ThetusHelpers.Fixtures || {};
    ThetusHelpers.Fixtures.UploadFixture = ThetusHelpers.Fixtures.UploadFixture || {};

    ThetusHelpers.Fixtures.UploadFixture.pollingResponse = pollingResponse;

})(ThetusTestHelpers || (ThetusTestHelpers = {}));