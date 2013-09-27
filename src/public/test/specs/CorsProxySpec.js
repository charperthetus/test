/* global Ext: false,
          describe: false, beforeEach: false, afterEach: false, it: false, expect: false, sinon: false, spyOn: false,
          ThetusTestHelpers: false, SavannaConfig: false */
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

            spyOn(Ext.Ajax, 'request');
        });

        afterEach(function() {
            proxy = null;
            proxyData = {};
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

        it('should set "cors", "withCredentials", and "disableCaching" parameters on call to Ajax', function() {
            proxy.doRequest(
                Ext.create('Ext.data.Operation', {}),
                function() { /* empty callback */ },
                proxy
            );

            var requestParams = Ext.Ajax.request.mostRecentCall.args[0];

            expect(requestParams.cors).toBeTruthy();
            expect(requestParams.withCredentials).toBeTruthy();
            expect(requestParams.disableCaching).toBeTruthy();
        });
    });

    describe('customization', function() {

        beforeEach(function() {
            SavannaConfig.CorsTestUrl = 'http://testCors.url/';
        });

        afterEach(function() {
            delete SavannaConfig.CorsTestUrl;
        });

        describe('modifying the request', function() {
            var proxy = null;

            beforeEach(function() {
                proxy = Ext.create('Savanna.proxy.Cors', {
                    url: SavannaConfig.CorsTestUrl,
                    modifyRequest: function(request) {
                        // do nothing (since we will spy on ourselves...
                        return request;
                    }
                });

                spyOn(proxy, 'modifyRequest').andCallThrough();

                var operation = new Ext.data.Operation();

                proxy.doRequest(operation);
            });

            afterEach(function() {
                proxy = null;
            });

            it('should hand a request to our modifyRequest method', function() {
                expect(proxy.modifyRequest).toHaveBeenCalled();
            });
        });
    });
});