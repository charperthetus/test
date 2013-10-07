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
                        "category": "action",
                        "title": "Mix",
                        "figure": "Circle"
                    },
                    {
                        "category": "action",
                        "title": "Stir",
                        "figure": "Circle"
                    },
                    {
                        "category": "action",
                        "title": "Dissolve",
                        "figure": "Circle"
                    },
                    {
                        "category": "action",
                        "title": "Heat",
                        "figure": "Circle"
                    },
                    {
                        "category": "action",
                        "title": "Filter",
                        "figure": "Circle"
                    },
                    {
                        "category": "action",
                        "title": "Rinse",
                        "figure": "Circle"
                    },

                ]
            },
            {
                "id": "PROCESS_ITEM_PALETTE",
                "title": "Items",
                "templates": [
                    {
                        "category": "item",
                        "title": "Thing",
                        "figure": "Square"
                    },
                    {
                        "category": "item",
                        "title": "Person",
                        "figure": "Square"
                    },
                    {
                        "category": "item",
                        "title": "Place",
                        "figure": "Square"
                    },
                ]
            },
            {
                "id": "PROCESS_DECISION_PALETTE",
                "title": "Decisions",
                "templates": [
                    {
                        "category": "decision",
                        "title": "Branch",
                        "figure": "Diamond"
                    },
                    {
                        "category": "decision",
                        "title": "Merge",
                        "figure": "Diamond"
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