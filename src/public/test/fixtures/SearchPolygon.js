/**
 * Created with IntelliJ IDEA.
 * User: sseely
 * Date: 10/4/13
 * Time: 2:35 PM
 * To change this template use File | Settings | File Templates.
 */

var ThetusTestHelpers;

(function (ThetusHelpers) {
    'use strict';

    var searchPolygon =  {
        "coordinates": [
                [-21.26953125, 34.98046875],
                [15.29296875, 42.71484375],
                [53.61328125, 24.78515625],
                [64.51171875, -12.12890625],
                [38.14453125, -51.15234375],
                [-11.07421875, -45.87890625],
                [-29.70703125, 3.69140625]
        ],
        "type": "Polygon"
    };

    ThetusHelpers.Fixtures = ThetusHelpers.Fixtures || {};
    ThetusHelpers.Fixtures.SearchPolygon = ThetusHelpers.Fixtures.SearchPolygon || {};

    ThetusHelpers.Fixtures.SearchPolygon.searchPolygon = searchPolygon;

})(ThetusTestHelpers || (ThetusTestHelpers = {}));