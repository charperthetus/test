/* global Ext: false, describe: false,
          beforeEach: false, afterEach: false, it: false, expect: false, spyOn: false, runs: false, sinon: false, waitsFor: false,
          ThetusTestHelpers: false, Savanna: false,
          go: false */
Ext.require('Savanna.Config');
Ext.require('Savanna.upload.controller.UploadController');
Ext.require('Savanna.upload.view.UploadComponent');

describe('Savanna.upload', function() {

    beforeEach(function() {
        ThetusTestHelpers.ExtHelpers.createTestDom();
        SavannaConfig.resourcesPathPrefix = '/';
    });

    afterEach(function() {
        ThetusTestHelpers.ExtHelpers.cleanTestDom();
    });

    describe('Controller', function() {
        var controller = null,
            errorRaised = false,
            origErrorHandleFn = null,
            view = null;

        beforeEach(function() {
            controller = Ext.create('Savanna.upload.controller.UploadController');
            view = Ext.create('Savanna.upload.view.UploadComponent', { renderTo: ThetusTestHelpers.ExtHelpers.TEST_HTML_DOM_ID, width: 500, height: 500 });
            origErrorHandleFn = Ext.Error.handle;
            Ext.Error.handle = function() {
                errorRaised = true;
                return true;
            };
        });

        afterEach(function() {
            controller = null;
            errorRaised = false;
            Ext.Error.handle = origErrorHandleFn;
            if (view) {
                view.destroy();
            }
            view = null;
        });

        it('should have a controller instance', function() {
            expect(controller instanceof Savanna.upload.controller.UploadController).toBeTruthy();
        });



        describe('fileDragAndDrop', function(){
            var dropZone;

            beforeEach(function() {
                dropZone = view.down('#fileDropZone');
            });

            afterEach(function() {
                dropZone = null;
            });

            describe('setupFileDrop', function() {

                it('should add a drop handler to the fileDropZone panel', function () {
                    controller.setupFileDrop(dropZone);
                    expect(dropZone.getEl().dom.ondrop).not.toBeNull();
                });

            });

            describe('fileDropHandler', function() {
                var dropEvent;
                beforeEach(function() {
                    dropEvent = {
                        dataTransfer: { files:null },
                        preventDefault : function(){}
                    }
                });

                afterEach(function() {
                    dropEvent = null;
                });

                it('should call uploadFiles', function () {
                    spyOn(controller, 'uploadFiles');
                    controller.fileDropHandler(dropEvent,dropZone);
                    expect(controller.uploadFiles).toHaveBeenCalled();
                });
            });
        });


        describe('fileBrowser', function(){
            var chooseFilesButton,
                fileBrowserButton;

            beforeEach(function() {
                chooseFilesButton = view.down('#chooseFilesButton');
                fileBrowserButton = view.down('#fileBrowserButton');
            });

            afterEach(function() {
                chooseFilesButton = null;
                fileBrowserButton = null;
            });

            describe('chooseFilesHandler', function() {
                it('should add the fileBrowser to the view', function () {
                    controller.chooseFilesHandler(chooseFilesButton);
                    expect(fileBrowserButton.isVisible()).toBeTruthy();
                });
            });

            describe('fileBrowserChangeHandler', function() {
                var event
                beforeEach(function() {
                    event = {
                        target: { files:null }
                    }
                });

                afterEach(function() {
                    event = null;
                });

                it('should call uploadFiles', function () {
                    spyOn(controller,'uploadFiles');
                    controller.fileBrowserChangeHandler(fileBrowserButton,event);
                    expect(controller.uploadFiles).toHaveBeenCalled();
                });
            });
        });


        describe('formatFileSize', function() {
            it('should format the file size correctly', function () {
                expect(Savanna.upload.controller.UploadController.formatFileSize(3145728)).toEqual('3 MB');// Make sure we strip '.0' from '3.0'
                expect(Savanna.upload.controller.UploadController.formatFileSize(52428800)).toEqual('50 MB');// Make sure we don't strip the '0' from '50'
                expect(Savanna.upload.controller.UploadController.formatFileSize(5662311)).toEqual('5.4 MB');// Make sure we show tenths decimal when present
                expect(Savanna.upload.controller.UploadController.formatFileSize(64307)).toEqual('63 KB');// Make sure we don't show tenths decimal on KB when it exist and round up
            });
        });


    });

    describe('uploadGrid', function(){

        var controller = null,
            errorRaised = false,
            origErrorHandleFn = null,
            view = null,
            uploadGrid = null,
            files = null,
            currentUploadsView = null;

        beforeEach(function() {
            controller = Ext.create('Savanna.upload.controller.UploadController');
            view = Ext.create('Savanna.upload.view.UploadComponent', { renderTo: ThetusTestHelpers.ExtHelpers.TEST_HTML_DOM_ID, width: 500, height: 500 });
            uploadGrid = view.down('#uploadsDataGrid');
            currentUploadsView = view.down('#currentUploadsView');
            origErrorHandleFn = Ext.Error.handle;
            Ext.Error.handle = function() {
                errorRaised = true;
                return true;
            };
            files = [{name:'threeMegabyteFile', size: 3145728, fileId:'test1'},{name:'fiftyKilobyteFile', size: 51200, fileId:'test2'},{name:'tenPointZeroOneKilobyteFile', size: 10253, fileId:'test3'}];/* 3MB, 50KB & 10.01KB */
            spyOn(controller,'uploadFileViaXMLHttpRequest');
            controller.uploadFiles(files,uploadGrid);
        });

        afterEach(function() {
            controller = null;
            errorRaised = false;
            Ext.Error.handle = origErrorHandleFn;
            if (view) {
                view.destroy();
            }
            if (uploadGrid) {
                uploadGrid.destroy();
            }
            view = null;
            uploadGrid = null;
            files = null;
        });

        describe('gridUpdatesProperly', function() {

            it('should add a file to the grid when it gets uploaded', function () {
                expect(uploadGrid.store.count()).toEqual(3);
            });
            it('should be visible when there are rows in the grid', function () {
                expect(currentUploadsView.isVisible()).toBeTruthy();
            });
            it('should update the models status when we receive polling updates', function () {
                var fixture = Ext.clone(ThetusTestHelpers.Fixtures.UploadFixture);
                var testResponse  = {};
                testResponse.responseText = JSON.stringify(fixture.pollingResponse);
                controller.currentPollingIds = ['test1','test2','test3'];
                uploadGrid.store.each(function(record){
                    storeIndex = this.indexOf(record);
                    record.data.fileId = controller.currentPollingIds[storeIndex];
                },uploadGrid.store);
                controller.currentPollingIds = ['test1','test2','test3'];
                controller.onBatchPollingRequestLoad( testResponse , null, uploadGrid);
                uploadGrid.store.each(function(record){
                    var fileStatus = fixture.pollingResponse[record.data.fileId];
                    expect(record.data.progress).toEqual(fileStatus.statusText);
                    expect(record.data.status).toEqual(fileStatus.status);
                    expect(record.data.docUri).toEqual(fileStatus.documentUri);
                });
                expect(controller.currentPollingIds).toEqual([]);
                fixture = null;
            });
            it('should remove all finished (completed and failed) files from grid when user clicks "clear finished"', function () {
                uploadGrid.store.each(function(record){
                    record.data.status = (this.indexOf(record) % 2 === 0) ? 'pending' : 'completed';
                },uploadGrid.store);
                controller.clearFinishedUploads(uploadGrid);
                expect(uploadGrid.store.count()).toEqual(2);

                uploadGrid.store.each(function(record){
                    record.data.status = (this.indexOf(record) !== 0) ? 'failed' : 'completed';
                },uploadGrid.store);
                controller.clearFinishedUploads(uploadGrid);
                expect(uploadGrid.store.count()).toEqual(0);

            });
            it('should hide the current uploads view when the grid is empty', function () {
                uploadGrid.store.each(function(record){
                    record.data.status = (this.indexOf(record) === 0) ? 'failed' : 'completed'; // one failed
                },uploadGrid.store);
                controller.clearFinishedUploads(uploadGrid);
                expect(currentUploadsView.isVisible()).toBeFalsy();
            });
        });

    });

});