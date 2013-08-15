/* global
    Ext: false,
    describe: false, beforeEach: false, afterEach: false, it: false, expect: false,
    createTestDom: false, cleanTestDom: false, Savanna: false */
Ext.require('Savanna.view.PrintModal');

describe('Savanna.view.PrintModal', function() {
    var modal = null;

    beforeEach(function() {
        createTestDom();
    });

    afterEach(function() {
        if (modal) {
            modal.destroy();
            modal = null;
        }

        cleanTestDom();
    });

    describe('default initialization', function() {

        beforeEach(function() {
            modal = Ext.create('Savanna.view.PrintModal', { renderTo: 'test-html' });
            modal.show();
        });

        it('should instantiate a simple modal for us', function() {
            expect(modal).not.toBeNull();
            expect(modal instanceof Savanna.view.PrintModal).toBeTruthy();
        });

        it('should be modal', function() {
            expect(modal.modal).toBeTruthy();
        });

        it('should have a "cancel" button', function() {
            var cancelButton = modal.down('button[type="cancel"]');

            expect(cancelButton).not.toBeNull();
        });

        it('should have a "print" button', function() {
            var printButton = modal.down('button[type="print"]');

            expect(printButton).not.toBeNull();
        });

        it('should have no content in the iframe', function() {
            expect(modal.getIframeContent()).toBe('');
        });
    });

    describe('setting content in the iframe', function() {

        describe('setting via configuration', function() {

            beforeEach(function() {
                modal = Ext.create('Savanna.view.PrintModal', {
                    renderTo: 'test-html',
                    html: 'TEST CONTENT'
                });
            });

            it('should get the content we configured', function() {
                expect(modal.getIframeContent()).toBe('TEST CONTENT');
            });
        });

        describe('setting via setIframeContent', function() {

            beforeEach(function() {
                modal = Ext.create('Savanna.view.PrintModal', { renderTo: 'test-html' });
            });

            it('should allow us to set the content via the method', function() {
                expect(modal.getIframeContent()).toBe('');

                modal.setIframeContent('SOME CONTENT');

                expect(modal.getIframeContent()).toBe('SOME CONTENT');
            });
        });
    })
});