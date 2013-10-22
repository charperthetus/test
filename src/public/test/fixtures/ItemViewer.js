var ThetusTestHelpers;

(function (ThetusHelpers) {
    "use strict";

    // THIS IS BOILERPLATE FOR CREATING FIXTURE DATA...
    var itemViewData = {
        "label": "ModelItem",
        "uri": "x84385f20051847dd70c1874fb17799458db6498e%2FItem",
        "version": 0,
        "created": 1371873600000,
        "createdBy": "demouser",
        "lastModified": 1382384110124,
        "lastModifiedBy": "demouser",
        "kvPairGroups": [{
            "label": "Related Processes",
            "layoutType": "kvPairsGroup",
            "pairs": [{
                "key": {
                    "label": "Related Process 1",
                    "uri": "x2e51f0c7-1318-3473-a5ed-fad93118339b%2FProcessModel"
                },
                "value": [{
                    "label": "Role1",
                    "uri": "Role1%2FItemRole"
                }, {
                    "label": "Role2",
                    "uri": "Role2%2FItemRole"
                }]
            }, {
                "key": {
                    "label": "Related Process 2",
                    "uri": "x07d81a12-22b5-3e23-8ad2-a3a08461ed12%2FProcessModel"
                },
                "value": [{
                    "label": "Role3",
                    "uri": "Role3%2FItemRole"
                }]
            }, {
                "key": {
                    "label": "Related Process 3",
                    "uri": "x6b6d02aa-b547-3f4a-b751-d88a8b1e81fa%2FProcessModel"
                },
                "value": [{
                    "label": "Role4",
                    "uri": "Role4%2FItemRole"
                }, {
                    "label": "Role5",
                    "uri": "Role5%2FItemRole"
                }, {
                    "label": "Role6",
                    "uri": "Role6%2FItemRole"
                }]
            }, {
                "key": {
                    "label": "Related Process 4",
                    "uri": "xccd19fa0-f3c0-3f13-aa8f-c0786dde9497%2FProcessModel"
                },
                "value": [{
                    "label": "Role7",
                    "uri": "Role7%2FItemRole"
                }]
            }]
        }],
        "propertyGroups": [{
            "label": "Header",
            "layoutType": "headerGroup",
            "values": [{
                "label": "Aliases",
                "predicateUri": "info%2Ecore%3AhasAlternateName%2FItemPredicate",
                "values": [{
                    "label": "Alias1",
                    "uri": "xd15ae892-7f7a-3122-ac6b-39e20d75ec32%2FItemPropertyValue",
                    "value": "Alias1",
                    "version": 0,
                    "editable": true,
                    "inheritedFrom": null
                }, {
                    "label": "Alias2",
                    "uri": "x7ed2e925-e1be-3cb1-843f-df726e6b62ba%2FItemPropertyValue",
                    "value": "Alias2",
                    "version": 0,
                    "editable": true,
                    "inheritedFrom": null
                }, {
                    "label": "Alias3",
                    "uri": "x64f0c017-1408-3d03-840e-9e11826d1916%2FItemPropertyValue",
                    "value": "Alias3",
                    "version": 0,
                    "editable": true,
                    "inheritedFrom": null
                }]
            }, {
                "label": "Intended Use",
                "predicateUri": "lib%2EExtendedRelationOntology%3Ahas_function+%2FItemPredicate",
                "values": [{
                    "label": "Intended Use 1",
                    "uri": "xfe320da4-4b6c-3584-9c45-96dd13d52f3d%2FItemPropertyValue",
                    "value": "Intended Use 1",
                    "version": 0,
                    "editable": true,
                    "inheritedFrom": null
                }, {
                    "label": "Intended Use 2",
                    "uri": "x850f62e9-0c6a-3560-aa8d-ae528732fcc6%2FItemPropertyValue",
                    "value": "Intended Use 2",
                    "version": 0,
                    "editable": false,
                    "inheritedFrom": {
                        "label": "ParentClass",
                        "uri": "xdce5c08e-29f1-39fa-9a8d-d64ff48fc06e%2FItem"
                    }
                }]
            }, {
                "label": "Improvised Use",
                "predicateUri": "lib%2EExtendedRelationOntology%3Ahas_role%2FItemPredicate",
                "values": [{
                    "label": "Improvised Use 1",
                    "uri": "xb7f0ea72-c12a-3e12-b7c0-e2bdcbae2d7b%2FItemPropertyValue",
                    "value": "Improvised Use 1",
                    "version": 0,
                    "editable": true,
                    "inheritedFrom": null
                }, {
                    "label": "Improvised Use 2",
                    "uri": "x7297ff31-b247-3107-b894-dba2809fdda4%2FItemPropertyValue",
                    "value": "Improvised Use 2",
                    "version": 0,
                    "editable": true,
                    "inheritedFrom": null
                }, {
                    "label": "Improvised Use 3",
                    "uri": "x7468f272-0d05-3c89-8740-38ba57445746%2FItemPropertyValue",
                    "value": "Improvised Use 3",
                    "version": 0,
                    "editable": true,
                    "inheritedFrom": null
                }, {
                    "label": "Improvised Use 4",
                    "uri": "x10e253c7-1123-35fd-8c7d-5581d1af2d33%2FItemPropertyValue",
                    "value": "Improvised Use 4",
                    "version": 0,
                    "editable": false,
                    "inheritedFrom": {
                        "label": "ParentClass",
                        "uri": "xc41a224e-0e7d-39d0-bfb2-92deffcf18d7%2FItem"
                    }
                }]
            }, {
                "label": "Parent",
                "predicateUri": "rdfs%3AsubClassOf%2FItemPredicate",
                "values": [{
                    "label": "ParentClass",
                    "uri": "xf58f14a9-4281-3ac4-8a2c-4e566695f8fd%2FItemPropertyValue",
                    "value": "x486aae50-7bc8-3c92-9a0d-7df3ce799bf4%2FItem",
                    "version": 0,
                    "editable": true,
                    "inheritedFrom": null
                }]
            }, {
                "label": "Description",
                "predicateUri": "rdfs%3Acomment%2FItemPredicate",
                "values": [{
                    "label": "Description",
                    "uri": "x35fd877f-9368-3fff-ad38-56134e647937%2FItemPropertyValue",
                    "value": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur enim libero, consequat ac interdum sit amet, faucibus vitae magna. Etiam fringilla metus ut magna mattis, non sollicitudin ante vestibulum. Sed ac enim nec tortor aliquet elementum. Vestibulum eros nisl, dictum vitae dignissim id, convallis eget felis. Ut at molestie quam, eget pulvinar ligula. Sed accumsan nisl accumsan nulla tincidunt, sed vulputate neque ultrices. Pellentesque sit amet imperdiet lorem.",
                    "version": 0,
                    "editable": true,
                    "inheritedFrom": null
                }]
            }]
        }, {
            "label": "Images",
            "layoutType": "imageGroup",
            "values": [{
                "label": "Images",
                "predicateUri": "unknown%3AhasImages%2FItemPredicate",
                "values": [{
                    "label": "Primary Image",
                    "uri": "tcontent%2FImage%2FcontentUID1",
                    "value": "Primary Image",
                    "version": 0,
                    "editable": true,
                    "inheritedFrom": null
                }, {
                    "label": "Image2",
                    "uri": "tcontent%2FImage%2FcontentUID2",
                    "value": "Image2",
                    "version": 0,
                    "editable": true,
                    "inheritedFrom": null
                }, {
                    "label": "Image3",
                    "uri": "tcontent%2FImage%2FcontentUID3",
                    "value": "Image3",
                    "version": 0,
                    "editable": true,
                    "inheritedFrom": null
                }, {
                    "label": "Image4",
                    "uri": "tcontent%2FImage%2FcontentUID4",
                    "value": "Image4",
                    "version": 0,
                    "editable": true,
                    "inheritedFrom": null
                }]
            }]
        }, {
            "label": "Related Items",
            "layoutType": "relationshipPropertyGroup",
            "values": [{
                "label": "Related Items",
                "predicateUri": "rdfs%3AseeAlso%2FItemPredicate",
                "values": [{
                    "label": "Related Item 1",
                    "uri": "x03438bc1-896e-31c5-a2d0-8445bbf67d40%2FItemPropertyValue",
                    "value": "x14f2c7cc-e188-33c9-a695-86af83979bf3%2FItem",
                    "version": 0,
                    "editable": false,
                    "inheritedFrom": {
                        "label": "ParentClass",
                        "uri": "x9c2c6aa0-5e7f-3e10-ac40-de402af091c5%2FItem"
                    }
                }, {
                    "label": "Related Item 2",
                    "uri": "xa2e1533b-34c2-3ee3-8847-ab17e6255366%2FItemPropertyValue",
                    "value": "x7ab54f26-efc0-3767-a654-259e73b67b32%2FItem",
                    "version": 0,
                    "editable": false,
                    "inheritedFrom": {
                        "label": "GrandparentClass",
                        "uri": "x78eca3c0-b00a-3e12-8e29-fb647cc24603%2FItem"
                    }
                }, {
                    "label": "Related Item 3",
                    "uri": "xca75396c-ad10-3119-84f3-5a7dd947ff09%2FItemPropertyValue",
                    "value": "xe170c6b0-0833-3dee-98e5-4011a8b0062d%2FItem",
                    "version": 0,
                    "editable": true,
                    "inheritedFrom": null
                }]
            }, {
                "label": "Confusers",
                "predicateUri": "info%2Ecore%3AhasConfusers%2FItemPredicate",
                "values": [{
                    "label": "Confuser 1",
                    "uri": "x7c451b73-0843-3e6b-bee0-9c1a062cfc91%2FItemPropertyValue",
                    "value": "x80442cd1-64bd-38d9-be6e-a8fdff9e7fe1%2FItem",
                    "version": 0,
                    "editable": true,
                    "inheritedFrom": null
                }, {
                    "label": "Confuser 2",
                    "uri": "x55c6c5c6-f7a9-3525-bdb3-bacfdb97e943%2FItemPropertyValue",
                    "value": "xe3589311-79fa-3a7f-b023-0e09d863108e%2FItem",
                    "version": 0,
                    "editable": true,
                    "inheritedFrom": null
                }]
            }]
        }, {
            "label": "Properties",
            "layoutType": "dataPropertyGroup",
            "values": [{
                "label": "Colors",
                "predicateUri": "rnrm%2Ecore%3AhasColors%2FItemPredicate",
                "values": [{
                    "label": "Black",
                    "uri": "rnrm%2Egeneral%3ABlack%2FPropertyValue",
                    "value": "Black",
                    "version": 0,
                    "editable": true,
                    "inheritedFrom": null
                }, {
                    "label": "Blue",
                    "uri": "rnrm%2Egeneral%3ABlue%2FPropertyValue",
                    "value": "Blue",
                    "version": 0,
                    "editable": true,
                    "inheritedFrom": null
                }, {
                    "label": "Green",
                    "uri": "rnrm%2Egeneral%3AGreen%2FPropertyValue",
                    "value": "Green",
                    "version": 0,
                    "editable": false,
                    "inheritedFrom": {
                        "label": "ParentClass",
                        "uri": "x705d5843-2f05-3dfa-98ac-32130e3d8b5e%2FItem"
                    }
                }]
            }]
        }]
    };

    ThetusHelpers.Fixtures = ThetusHelpers.Fixtures || {};
    ThetusHelpers.Fixtures.ItemViewer = ThetusHelpers.Fixtures.ItemViewer || {};

    ThetusHelpers.Fixtures.ItemViewer.itemsData = itemViewData;

})(ThetusTestHelpers || (ThetusTestHelpers = {}));