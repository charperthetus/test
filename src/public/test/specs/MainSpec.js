Ext.Loader.setConfig({ disableCaching: false }); // NOTE: A great example of a confusing option "disableCaching is false when we do not want to prevent caching...":)

describe('Savanna Main', function() {
    var TEST_SESSION_ID = 'TEST_SESSION_ID',
        fixtures = {},
        controller = null;

    beforeEach(function() {
        this.addMatchers(ExtSpec.Jasmine.Matchers);

        //fixtures = Ext.clone(ThetusTestHelpers.Fixtures.Search);

        // NOTE: you need to set up the controller even before view tests, otherwise the view will not be able to be instantiated
        controller = Ext.create('Savanna.controller.Main', { disableCaching: false });

        //ItemViewer.jsessionid = TEST_SESSION_ID;
    });

    afterEach(function() {
        fixtures = null;

        if (controller) controller.destroy();
        controller = null;
    });

    describe('Controller', function() {
        var server = null;

        beforeEach(function() {
            server = new ThetusTestHelpers.FakeServer(sinon);
        });

        afterEach(function() {
            if (server) server.restore();

            server = null;
        });

        it('should have a controller of the correct type instantiated', function() {
            expect(controller).not.toBeNull();
            expect(controller instanceof Savanna.controller.Main).toBeTruthy();
        });
    });

    describe('View', function() {
        var view = null;

        beforeEach(function() {
            view = Ext.create('Savanna.view.Main', { renderTo: Ext.dom.Query.selectNode('#test-html') });
        });

        afterEach(function() {
            if (view) view.destroy();
            view = null;
        });

        it('should have a view of the correct type instantiated', function() {
            expect(view).not.toBeNull();
            expect(view instanceof Savanna.view.Main).toBeTruthy();
        });
    });
});