var ThetusTestHelpers;

(function (ThetusHelpers) {
    'use strict';

    var spaces = {
    "spaces": [
    {
        "id": 123456,
        "displayLabel": "My Very First Space",
        "description": "Test space number 1"
    },
    {
        "id": 456789,
        "displayLabel": "My Second Space",
        "description": "Test space number 2"
    }
]
};


ThetusHelpers.Fixtures = ThetusHelpers.Fixtures || {};
ThetusHelpers.Fixtures.Spaces = ThetusHelpers.Fixtures.Spaces || {};

ThetusHelpers.Fixtures.Spaces.spaces = spaces;
ThetusHelpers.Fixtures.Spaces.json = spaces;

})(ThetusTestHelpers || (ThetusTestHelpers = {}));