/**
 * Created with IntelliJ IDEA.
 * User: thille
 * Date: 8/8/13
 * Time: 9:52 AM
 * To change this template use File | Settings | File Templates.
 */
/* global Ext: false,
          describe: false, beforeEach: false, afterEach: false, it: false, expect: false, sinon: false */
Ext.require('Savanna.proxy.Cors');
describe('Savanna.proxy.Cors', function() {
    var server = null;

    beforeEach(function() {
        server = new ThetusTestHelpers.FakeServer(sinon);
    });

    afterEach(function() {
        if (server) {
            server.restore();
            server = null;
        }
    });

    describe('default usage', function() {
        var proxy = null,
            proxyData = {};

        beforeEach(function() {
            proxy = Ext.create('Savanna.proxy.Cors', {
                reader: {
                    readRecords: function(data) {
                        proxyData = data;
                    }
                }
            });
        });

        afterEach(function() {
            proxy = null;
            proxyData = {};
        });

        it('should be configured for cors', function() {
            expect(proxy.cors).toBeTruthy();
        });

        it('should be configured to provide credentials', function() {
            expect(proxy.withCredentials).toBeTruthy();
        });

        it('should be configured to use "POST" for all methods', function() {
            var actionMethods = proxy.actionMethods;

            for (var key in actionMethods) {
                if (actionMethods.hasOwnProperty(key)) {
                    expect(actionMethods[key]).toBe('POST');
                }
            }
        });

        it('should add session id to url by default', function() {
            spyOn(proxy, 'getUrl').andReturn('TEST_URL');

            expect(proxy.buildUrl()).toBe('TEST_URL;jsessionid=undefined');
        });

        it('should NOT add session id to url if "addSessionId" is set to false', function() {
            proxy.addSessionId = false;

            spyOn(proxy, 'getUrl').andReturn('TEST_URL');

            expect(proxy.buildUrl()).toBe('TEST_URL');
        });
    });
});