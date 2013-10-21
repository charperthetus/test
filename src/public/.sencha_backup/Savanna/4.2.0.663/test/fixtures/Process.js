var ThetusTestHelpers;

(function (ThetusHelpers) {
    'use strict';

    var defaultPaletteTemplateResponse = {
        success: true,
        groups: [
            {
                "id": "PROCESS_ACTION_PALETTE",
                "title": "Actions",
                "templates": [
                    {
                        "category": "ProcessAction",
                        "text": "Mix"
                    },
                    {
                        "category": "ProcessAction",
                        "text": "Stir"
                    },
                    {
                        "category": "ProcessAction",
                        "text": "Dissolve"
                    },
                    {
                        "category": "ProcessAction",
                        "text": "Heat"
                    },
                    {
                        "category": "ProcessAction",
                        "text": "Filter"
                    },
                    {
                        "category": "ProcessAction",
                        "text": "Rinse"
                    }

                ]
            },
            {
                "id": "PROCESS_ITEM_PALETTE",
                "title": "Items",
                "templates": [
                    {
                        "category": "ProcessItem",
                        "text": "Thing"
                    },
                    {
                        "category": "ProcessItem",
                        "text": "Person"
                    },
                    {
                        "category": "ProcessItem",
                        "text": "Place"
                    }
                ]
            },
            {
                "id": "PROCESS_DECISION_PALETTE",
                "title": "Decisions",
                "templates": [
                    {
                        "category": "DecisionPoint",
                        "text": "Branch"
                    },
                    {
                        "category": "DecisionPoint",
                        "text": "Merge"
                    }
                ]
            }
        ]
    };

    var noTemplatesResponse = {
        success: true,
        groups: []
    };

    ThetusHelpers.Fixtures = ThetusHelpers.Fixtures || {};
    ThetusHelpers.Fixtures.Process = ThetusHelpers.Fixtures.Process || {};

    ThetusHelpers.Fixtures.Process.defaultPaletteTemplateResponse = defaultPaletteTemplateResponse;
    ThetusHelpers.Fixtures.Process.json = defaultPaletteTemplateResponse;
    ThetusHelpers.Fixtures.Process.noTemplatesResponse = noTemplatesResponse;

})(ThetusTestHelpers || (ThetusTestHelpers = {}));