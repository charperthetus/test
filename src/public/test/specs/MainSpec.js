Ext.Loader.setConfig({ enabled: true, syncModeEnabled: true, disableCaching: false }); // NOTE: A great example of a confusing option "disableCaching is false when we do not want to prevent caching...":)
Ext.require('Savanna.Config');
Ext.require('Savanna.controller.Main');

describe('Savanna Main', function() {
    var TEST_SESSION_ID = 'TEST_SESSION_ID',
        fixtures = {},
        controller = null,
        LOGIN_URL = '',
        PING_URL = '';

    beforeEach(function() {
        LOGIN_URL = LOGIN_URL || Savanna.Config.savannaUrlRoot + Savanna.Config.loginUrl;
        PING_URL = PING_URL || Savanna.Config.savannaUrlRoot + Savanna.Config.pingUrl;

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

            describe('user is not logged in', function() {

                beforeEach(function() {
                    server.respondWith('GET', PING_URL, { isLoggedIn: false });
                });

                it('should get a "not logged in" response from the ping service', function() {
                    var pingResponse = {};

                    controller.checkIfLoggedIn(function(data) {
                        pingResponse = data;
                    });

                    server.respond({
                        errorOnInvalidRequest: true
                    });

                    expect(pingResponse.isLoggedIn).toBeFalsy();
                });
            });

            describe('user is already logged in', function() {

                beforeEach(function() {
                    server.respondWith('GET', PING_URL, { isLoggedIn: true, sessionId: TEST_SESSION_ID });
                });

                it('should store session ID in Savanna when ping is successful', function() {
                    expect(Savanna.jsessionid).toBeUndefined();

                    controller.onLaunch();

                    server.respond({
                        errorOnInvalidRequest: true
                    });

                    expect(Savanna.jsessionid).toBe(TEST_SESSION_ID);
                });
            });

            describe('ping service is down', function() {

                beforeEach(function() {
                    server.respondWith('GET', PING_URL, { _statusCode: 500, _headers: { 'Content-Type': 'text/html' } });
                });

                it('should NOT store session ID in Savanna when ping is successful', function() {
                    expect(Savanna.jsessionid).toBeUndefined();

                    controller.onLaunch();

                    server.respond({
                        errorOnInvalidRequest: true
                    });

                    expect(Savanna.jsessionid).toBeUndefined();
                });
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
                                removeCalled = true; console.log('removeCalled');
                            }
                        }
                    };
                });

                afterEach(function() {
                    if (view) view.destroy();

                    view = null;
                    mockApplication = null;
                    removeCalled = false;
                });

                it('should listen for "render" event on login view', function() {
                    expect(view.hasListener('render')).toBeFalsy();
                    controller.init(mockApplication);
                    expect(view.hasListener('render')).toBeTruthy();
                });

                it('should process "render" event on login iframe message', function() {

                    controller.init(mockApplication);

                    view.fireEvent('render');

                    runs(function() {
                        window.postMessage('foo', '*');
                    });

                    waitsFor(function() {
                        return removeCalled;
                    }, 'removeCalled to be true');

                    runs(function() {
                        expect(removeCalled).toBeTruthy();
                    });
                });
            });
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