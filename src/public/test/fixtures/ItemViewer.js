var ThetusTestHelpers;

(function (ThetusHelpers) {
    "use strict";

    // THIS IS BOILERPLATE FOR CREATING FIXTURE DATA...
    var itemViewData = {
        "uri" : "x012f931fec769ca941e8de4f7a674bec2a290937%2FItem",
        "label" : "ModelItem",
        "version" : 0,
        "created" : 1371873600000,
        "createdBy" : "demouser",
        "lastModified" : 1381521941862,
        "lastModifiedBy" : "demouser",
        "kvPairGroups" : [ {
            "label" : "Related Processes",
            "layoutType" : "singlelistkvpairs",
            "pairs" : [ {
                "key" : {
                    "label" : "Related Process 1",
                    "uri" : "xbdf3acebf51e0a2b834bd559099908d18c6ec195%2FProcess"
                },
                "value" : [ {
                    "label" : "Role1",
                    "uri" : "Role1%2FItemRole"
                }, {
                    "label" : "Role2",
                    "uri" : "Role2%2FItemRole"
                } ]
            }, {
                "key" : {
                    "label" : "Related Process 2",
                    "uri" : "x9b20615f4fc0199b0ff21ac2817a1b01f6f41c28%2FProcess"
                },
                "value" : [ {
                    "label" : "Role3",
                    "uri" : "Role3%2FItemRole"
                } ]
            }, {
                "key" : {
                    "label" : "Related Process 3",
                    "uri" : "xb01609c9dd8845b75149128d5c94eed9b4a64123%2FProcess"
                },
                "value" : [ {
                    "label" : "Role4",
                    "uri" : "Role4%2FItemRole"
                }, {
                    "label" : "Role5",
                    "uri" : "Role5%2FItemRole"
                }, {
                    "label" : "Role6",
                    "uri" : "Role6%2FItemRole"
                } ]
            }, {
                "key" : {
                    "label" : "Related Process 4",
                    "uri" : "x43ca83c2bcc107eb573ddb6e60b3fbbe850375aa%2FProcess"
                },
                "value" : [ {
                    "label" : "Role7",
                    "uri" : "Role7%2FItemRole"
                } ]
            } ]
        } ],
        "propertyGroups" : [ {
            "label" : "Header",
            "values" : [ {
                "label" : "Aliases",
                "predicateUri" : "info%2Ecore%3AhasAlternateName%2FItemPredicate",
                "values" : [ {
                    "label" : "Alias1",
                    "value" : "Alias1",
                    "version" : 0,
                    "editable" : true,
                    "inheritedFrom" : null,
                    "uri" : "x77f7a69652697e86cd386a1f3ea00d3396f45611%2FItemPropertyValue"
                }, {
                    "label" : "Alias2",
                    "value" : "Alias2",
                    "version" : 0,
                    "editable" : true,
                    "inheritedFrom" : null,
                    "uri" : "xbf46ccae163be7bc13cd343c14a1afc37e5be6df%2FItemPropertyValue"
                }, {
                    "label" : "Alias3",
                    "value" : "Alias3",
                    "version" : 0,
                    "editable" : true,
                    "inheritedFrom" : null,
                    "uri" : "x53cad29ee0082c570e26241a9cdfca9b0981b643%2FItemPropertyValue"
                } ]
            }, {
                "label" : "Intended Use",
                "predicateUri" : "lib%2EExtendedRelationOntology%3Ahas_function+%2FItemPredicate",
                "values" : [ {
                    "label" : "Intended Use 1",
                    "value" : "Intended Use 1",
                    "version" : 0,
                    "editable" : true,
                    "inheritedFrom" : null,
                    "uri" : "xf57e312df8c4b5a65a066001c759d4981345fc4e%2FItemPropertyValue"
                }, {
                    "label" : "Intended Use 2",
                    "value" : "Intended Use 2",
                    "version" : 0,
                    "editable" : false,
                    "inheritedFrom" : {
                        "label" : "Parent",
                        "uri" : "xf57e3c57c94ec7345074c7928a3ec1cc6381adb3%2FItem"
                    },
                    "uri" : "x8998a93189b153087356439173f6524d6d314920%2FItemPropertyValue"
                } ]
            }, {
                "label" : "Improvised Use",
                "predicateUri" : "lib%2EExtendedRelationOntology%3Ahas_role%2FItemPredicate",
                "values" : [ {
                    "label" : "Improvised Use 1",
                    "value" : "Improvised Use 1",
                    "version" : 0,
                    "editable" : true,
                    "inheritedFrom" : null,
                    "uri" : "x447d926c45a29bc469c637a717733798c4f6f642%2FItemPropertyValue"
                }, {
                    "label" : "Improvised Use 2",
                    "value" : "Improvised Use 2",
                    "version" : 0,
                    "editable" : true,
                    "inheritedFrom" : null,
                    "uri" : "x72851705ed1976b7a5f1a7e3eb9ed6d33bc7cc50%2FItemPropertyValue"
                }, {
                    "label" : "Improvised Use 3",
                    "value" : "Improvised Use 3",
                    "version" : 0,
                    "editable" : true,
                    "inheritedFrom" : null,
                    "uri" : "xea84504d2c6b49154d4f299c7f6865dd07a4e746%2FItemPropertyValue"
                }, {
                    "label" : "Improvised Use 4",
                    "value" : "Improvised Use 4",
                    "version" : 0,
                    "editable" : false,
                    "inheritedFrom" : {
                        "label" : "Parent",
                        "uri" : "xb2666e7a941fda3648febecd6c33e3713530937a%2FItem"
                    },
                    "uri" : "x3d30ae64552132df254abb8989a008fc94c56fe5%2FItemPropertyValue"
                } ]
            }, {
                "label" : "Description",
                "predicateUri" : "rdfs%3Acomment%2FItemPredicate",
                "values" : [ {
                    "label" : "Description",
                    "value" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur enim libero, consequat ac interdum sit amet, faucibus vitae magna. Etiam fringilla metus ut magna mattis, non sollicitudin ante vestibulum. Sed ac enim nec tortor aliquet elementum. Vestibulum eros nisl, dictum vitae dignissim id, convallis eget felis. Ut at molestie quam, eget pulvinar ligula. Sed accumsan nisl accumsan nulla tincidunt, sed vulputate neque ultrices. Pellentesque sit amet imperdiet lorem.",
                    "version" : 0,
                    "editable" : true,
                    "inheritedFrom" : null,
                    "uri" : "x5ce45bfd69d4eb7ab8c7cdda247a3a8aba17630d%2FItemPropertyValue"
                } ]
            } ]
        }, {
            "label" : "Related Items",
            "values" : [ {
                "label" : "Related Items",
                "predicateUri" : "rdfs%3AseeAlso%2FItemPredicate",
                "values" : [ {
                    "label" : "Related Item 1",
                    "value" : "xbc38070d0563d36eda0b739a14c489e35bd4b804%2FItem",
                    "version" : 0,
                    "editable" : false,
                    "inheritedFrom" : {
                        "label" : "Parent",
                        "uri" : "xa11e1fd769318980666299173396612dc8810d0a%2FItem"
                    },
                    "uri" : "xa7ebb2adca128bdfa87a5a1de4c8cceb39d30c4e%2FItemPropertyValue"
                }, {
                    "label" : "Related Item 2",
                    "value" : "x3a1b48dd4ed5ddcb53ce8000a4fe7a0d3fe57cb5%2FItem",
                    "version" : 0,
                    "editable" : false,
                    "inheritedFrom" : {
                        "label" : "Grandparent",
                        "uri" : "xba955511c00e6c4723cb15f908dc6f025d9408b2%2FItem"
                    },
                    "uri" : "x4f41b443f52f65d33793c482cbd4d848b4261df1%2FItemPropertyValue"
                }, {
                    "label" : "Related Item 3",
                    "value" : "x7c5a93be770d820fe106b862a0a98ebb34440255%2FItem",
                    "version" : 0,
                    "editable" : true,
                    "inheritedFrom" : null,
                    "uri" : "x9add30c7723d42d43fa52eac0547f45944125c09%2FItemPropertyValue"
                } ]
            }, {
                "label" : "Confusers",
                "predicateUri" : "info%2Ecore%3AhasConfusers%2FItemPredicate",
                "values" : [ {
                    "label" : "Confuser 1",
                    "value" : "x9025259eedbae3b9a9d629c4b8344f947289eb86%2FItem",
                    "version" : 0,
                    "editable" : true,
                    "inheritedFrom" : null,
                    "uri" : "x35bb8fa613467b4f7f618c48acd66d5cc91e55e5%2FItemPropertyValue"
                }, {
                    "label" : "Confuser 2",
                    "value" : "xf248351274ab0b9e114b512b8a5617617f442af2%2FItem",
                    "version" : 0,
                    "editable" : true,
                    "inheritedFrom" : null,
                    "uri" : "xade0fa9c94ce3bec0a45dfc5d3bec0c328878f1e%2FItemPropertyValue"
                } ]
            } ]
        }, {
            "label" : "Properties",
            "values" : [ {
                "label" : "Colors",
                "predicateUri" : "rnrm%2Ecore%3AhasColors%2FItemPredicate",
                "values" : [ {
                    "label" : "Black",
                    "value" : "Black",
                    "version" : 0,
                    "editable" : true,
                    "inheritedFrom" : null,
                    "uri" : "rnrm%2Egeneral%3ABlack%2FPropertyValue"
                }, {
                    "label" : "Blue",
                    "value" : "Blue",
                    "version" : 0,
                    "editable" : true,
                    "inheritedFrom" : null,
                    "uri" : "rnrm%2Egeneral%3ABlue%2FPropertyValue"
                }, {
                    "label" : "Green",
                    "value" : "Green",
                    "version" : 0,
                    "editable" : false,
                    "inheritedFrom" : {
                        "label" : "Parent",
                        "uri" : "x70969f90a02508f19004fe5781787cc87085fca0%2FItem"
                    },
                    "uri" : "rnrm%2Egeneral%3AGreen%2FPropertyValue"
                } ]
            } ]
        } ]
    };

    ThetusHelpers.Fixtures = ThetusHelpers.Fixtures || {};
    ThetusHelpers.Fixtures.ItemViewer = ThetusHelpers.Fixtures.ItemViewer || {};

    ThetusHelpers.Fixtures.ItemViewer.itemsData = itemViewData;

})(ThetusTestHelpers || (ThetusTestHelpers = {}));