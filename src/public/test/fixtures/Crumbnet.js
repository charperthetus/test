var ThetusTestHelpers;

(function (ThetusHelpers) {
    'use strict';

    var defaultPalette = [
        {
            title: 'TEST PALETTE GROUP ONE',
            templates: [
                { label: 'TEST PALETTE TEMPLATE ONE', category: 'TMPL_ONE' },
                { label: 'TEST PALETTE TEMPLATE TWO', category: 'TMPL_TWO' }
            ]
        },
        {
            title: 'TEST PALETTE GROUP TWO',
            templates: [
                { label: 'TEST PALETTE TEMPLATE THREE', category: 'TMPL_THREE' },
                { label: 'TEST PALETTE TEMPLATE FOUR', category: 'TMPL_FOUR' }
            ]
        }
    ];

    ThetusHelpers.Fixtures = ThetusHelpers.Fixtures || {};
    ThetusHelpers.Fixtures.Crumbnet = ThetusHelpers.Fixtures.Crumbnet || {};

    ThetusHelpers.Fixtures.Crumbnet.defaultPalette = defaultPalette;

})(ThetusTestHelpers || (ThetusTestHelpers = {}));