/**
 * Created with IntelliJ IDEA.
 * User: swatson
 * Date: 7/22/13
 * Time: 10:52 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.require('Savanna.search.view.SearchBody');

describe('Search Map', function() {

    beforeEach(function() {
        createTestDom();
    });

    afterEach(function() {
        cleanTestDom();
    });

    describe('Savanna.search.view.SearchMap', function() {

        describe('constructor', function() {

            it('should be able to create a search map', function() {
                var map = Ext.create('Savanna.search.view.SearchMap',  { renderTo: 'test-html' });

                expect(map instanceof Savanna.search.view.SearchMap).toBeTruthy();

            });

        });
    });
});