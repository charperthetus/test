/* global Ext: false,
          describe: false, it: false, expect: false,
          Savanna: false
*/
Ext.require('Savanna.Config');

describe('Savanna.Config', function() {

    describe('buildSavnnaUrl', function() {

        it('should use the configured "savannaUrlRoot" and a key to build the URL', function() {
            Savanna.Config.savannaUrlRoot = 'TEST_ROOT/';
            Savanna.Config.TEST_KEY = 'TEST_URL';

            expect(Savanna.Config.buildSavannaUrl('TEST_KEY')).toBe('TEST_ROOT/TEST_URL');
        });

        describe('error handling', function() {
            var origErrorHandler = function() {},
                handledError = false;

            beforeEach(function() {
                origErroHandler = Ext.Error.handle;

                Ext.Error.handle = function() {
                    handledError = true;
                    return true; // stop propagation
                };
            });

            afterEach(function() {
                Ext.Error.handle = origErroHandler;
                origErrorHandler = function() {};
                handledError = false;
            });

            it('should raise an error if we give it a key it does not understand', function() {
                Savanna.Config.buildSavannaUrl('NONEXISTENT_KEY');

                expect(handledError).toBeTruthy();
            });
        });
    });
});