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
                        "category": "Action",
                        "text": "Mix"
                    },
                    {
                        "category": "Action",
                        "text": "Stir"
                    },
                    {
                        "category": "Action",
                        "text": "Dissolve"
                    },
                    {
                        "category": "Action",
                        "text": "Heat"
                    },
                    {
                        "category": "Action",
                        "text": "Filter"
                    },
                    {
                        "category": "Action",
                        "text": "Rinse"
                    },

                ]
            },
            {
                "id": "PROCESS_ITEM_PALETTE",
                "title": "Items",
                "templates": [
                    {
                        "category": "Item",
                        "text": "Thing"
                    },
                    {
                        "category": "Item",
                        "text": "Person"
                    },
                    {
                        "category": "Item",
                        "text": "Place"
                    }
                ]
            },
            {
                "id": "PROCESS_DECISION_PALETTE",
                "title": "Decisions",
                "templates": [
                    {
                        "category": "Decision",
                        "text": "Branch"
                    },
                    {
                        "category": "Decision",
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