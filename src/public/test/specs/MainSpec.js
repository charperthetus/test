Ext.require('Savanna.Config');
Ext.require('Savanna.controller.Main');
Ext.require('Savanna.view.Login');

describe('Savanna Main', function() {
    var TEST_SESSION_ID = 'TEST_SESSION_ID',
        fixtures = {},
        controller = null,
        LOGIN_URL = '';

    beforeEach(function() {
        LOGIN_URL = LOGIN_URL || Savanna.Config.savannaUrlRoot + Savanna.Config.loginUrl;

        this.addMatchers(ExtSpec.Jasmine.Matchers);

        //fixtures = Ext.clone(ThetusTestHelpers.Fixtures.Search);

        // NOTE: you need to set up the controller even before view tests, otherwise the view will not be able to be instantiated

        controller = Ext.create('Savanna.controller.Main');

        //ItemViewer.jsessionid = TEST_SESSION_ID;
    });

    afterEach(function() {
        fixtures = null;

        if (controller) controller.destroy();
        controller = null;

        // Make sure Savanna is not keeping our session ID between tests...
        delete Savanna.jsessionid;
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

        describe('Login', function() {
            // TODO: create login fixtures...
            var loginFixtures = {},
               view = null;

            beforeEach(function() {
                loginFixtures = {};
            });

            afterEach(function() {
                loginFixtures = null;
            });

            describe('listens to Login view for events', function() {
                var view = null,
                    mockApplication = null,
                    removeCalled = false;

                beforeEach(function() {
                    view = Ext.create('Savanna.view.Login');
                    mockApplication = {
                        viewport: {
                            add: function() {},
                            remove: function() {
                                removeCalled = true;
                            }
                        }
                    };
                });

                afterEach(function() {
                    if (view) view.destroy();

                    view = null;
                    mockApplication = null;
                    removeCalled = false;

                    if (controller.swapLogin.restore) controller.swapLogin.restore();
                });

                it('should listen for "render" event on login view', function() {
                    expect(view.hasListener('render')).toBeFalsy();
                    controller.init(mockApplication);
                    expect(view.hasListener('render')).toBeTruthy();
                });

                it('should process message from login iframe', function() {
                    sinon.spy(controller, 'swapLogin');

                    runs(function() {
                        controller.init(mockApplication);

                        view.fireEvent('render');
                    });

                    runs(function() {
                        window.postMessage(TEST_SESSION_ID, '*');
                    });

                    waitsFor(function() {
                        return controller.swapLogin.called;
                    }, 'swapLogin to be called', 300);

                    runs(function() {
                        expect(controller.swapLogin.called).toBeTruthy();
                    });
                });
            });
        });
    });
});