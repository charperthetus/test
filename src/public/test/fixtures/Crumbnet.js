var ThetusTestHelpers;

(function (ThetusHelpers) {
    'use strict';

    var defaultPalette = [
        {
            id: 'TEST_PALETTE_GROUP_ONE',
            title: 'TEST PALETTE GROUP ONE',
            templates: [
                { label: 'Concept label', category: 'Concept' },
                { label: 'Hypothesis label', category: 'Hypothesis' },
                { label: 'Question label', category: 'Question' }
            ]
        },
        {
            id: 'TEST_PALETTE_GROUP_TWO',
            title: 'TEST PALETTE GROUP TWO',
            templates: [
                { label: 'Problem label', category: 'Problem' },
                { label: 'Conclusion label', category: 'Conclusion' },
                { label: 'Assumption label', category: 'Assumption' },
                { label: 'Fact label', category: 'Fact' }
            ]
        }
    ];

    ThetusHelpers.Fixtures = ThetusHelpers.Fixtures || {};
    ThetusHelpers.Fixtures.Crumbnet = ThetusHelpers.Fixtures.Crumbnet || {};

    ThetusHelpers.Fixtures.Crumbnet.defaultPalette = defaultPalette;

})(ThetusTestHelpers || (ThetusTestHelpers = {}));