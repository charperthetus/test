var ThetusTestHelpers;

(function (ThetusHelpers) {
    'use strict';

    // NOTE: this data is duplicated in sr/public/app/assets/testCrumbnetTemplates.json
    var defaultPaletteTemplateResponse = {
        success: true,
        groups: [
            {
                "id": "TEST_PALETTE_GROUP_ONE",
                "title": "TEST PALETTE GROUP ONE",
                "templates": [
                    {
                        "type": "Concept",
                        "category": "standard",
                        "title": "Concept",
                        "color": "#FFA500",
                        "percent": 10
                    },
                    {
                        "type": "Hypothesis",
                        "category": "standard",
                        "title": "Hypothesis",
                        "color": "#00FF00",
                        "percent": 10
                    },
                    {
                        "type": "Question",
                        "category": "standard",
                        "title": "Question",
                        "color": "#00CED1",
                        "percent": 10
                    }
                ]
            },
            {
                "id": "TEST_PALETTE_GROUP_TWO",
                "title": "TEST PALETTE GROUP TWO",
                "templates": [
                    {
                        "type": "Problem",
                        "category": "standard",
                        "title": "Problem",
                        "color": "#FF0000",
                        "percent": 10
                    },
                    {
                        "type": "Conclusion",
                        "category": "standard",
                        "title": "Conclusion",
                        "color": "#800080",
                        "percent": 10
                    },
                    {
                        "type": "Assumption",
                        "category": "standard",
                        "title": "Assumption",
                        "color": "#FFFF00",
                        "percent": 10
                    },
                    {
                        "type": "Fact",
                        "category": "standard",
                        "title": "Fact",
                        "color": "#008000",
                        "percent": 10
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
    ThetusHelpers.Fixtures.Crumbnet = ThetusHelpers.Fixtures.Crumbnet || {};

    ThetusHelpers.Fixtures.Crumbnet.defaultPaletteTemplateResponse = defaultPaletteTemplateResponse;
    ThetusHelpers.Fixtures.Crumbnet.noTemplatesResponse = noTemplatesResponse;

})(ThetusTestHelpers || (ThetusTestHelpers = {}));