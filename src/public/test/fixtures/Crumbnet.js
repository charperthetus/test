var ThetusTestHelpers;

(function (ThetusHelpers) {
    'use strict';

    var defaultPalette = [
        {
            title: 'TEST PALETTE GROUP ONE',
            items: [
                { label: 'Concept label', category: 'Concept' },
                { label: 'Hypothesis label', category: 'Hypothesis' },
                { label: 'Question label', category: 'Question' }
            ]
        },
        {
            title: 'TEST PALETTE GROUP TWO',
            items: [
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