/* global Ext: false, Savanna: false,
         describe: false, it: false, expect: false, beforeEach
*/

Ext.require('Savanna.utils.CorsAjax');

describe('Savanna.utils.CorsAjax', function() {

    describe('request', function() {

        beforeEach(function() {
            spyOn(Ext.Ajax, 'request');
        });

        it('should always set "cors" and "withCredentials" parameters to underlying Ajax request to true', function() {
            Savanna.utils.CorsAjax.request({
                url: 'TEST-URL'
            });

            var requestParams = Ext.Ajax.request.mostRecentCall.args[0];

            expect(requestParams.cors).toBeTruthy();
        });
    });
});