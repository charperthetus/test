/* global Ext: false, Savanna: false,
         describe: false, it: false, expect: false, beforeEach: false, afterEach: false
         , ThetusTestHelpers: false
*/

Ext.require('Savanna.patch.AbstractComponent');

describe('Savanna.patch.AbstractComponent', function() {

    beforeEach(function() {
        // anything you need set up before every test runs

        ThetusTestHelpers.ExtHelpers.createTestDom();

        Ext.define('Savanna.test.Component', {
            extend: 'Ext.Component'
        });
    });

    afterEach(function() {
        // any clean-up that needed to reset the test environment

        ThetusTestHelpers.ExtHelpers.cleanTestDom();
    });

    describe('instantiate for test coverage analysis', function() {
        var instance;

        beforeEach(function() {
            instance = new Savanna.patch.AbstractComponent();
        });

        afterEach(function() {
            instance = null;
        });

        it('should be able to create an instance', function() {
            expect(instance instanceof Savanna.patch.AbstractComponent).toBeTruthy();
        });
    });

    describe('adding data attribute for any component with a itemId', function() {
        var component;

        beforeEach(function() {
            component = Ext.create('Savanna.test.Component', {
                itemId: 'TEST-ID',
                renderTo: ThetusTestHelpers.ExtHelpers.TEST_HTML_DOM_ID
            });
        });

        afterEach(function() {
            if (component) {
                component.destroy();
                component = null;
            }
        });

        it('should have added a "data-selid" attribute to the component dom element', function() {
            expect(component.getEl().dom.getAttribute('data-selid')).toBe('TEST-ID');
        });
    });

    describe('suppressing data attribute for any component without a itemId', function() {
        var component;

        beforeEach(function() {
            component = Ext.create('Savanna.test.Component', {
                renderTo: ThetusTestHelpers.ExtHelpers.TEST_HTML_DOM_ID
            });
        });

        afterEach(function() {
            if (component) {
                component.destroy();
                component = null;
            }
        });

        it('should NOT have added a "data-selid" attribute to the component dom element', function() {
            expect(component.getEl().dom.getAttribute('data-selid')).toBeNull();
        });
    });
});