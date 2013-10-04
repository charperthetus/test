/* global Ext: false, describe: false,
          beforeEach: false, afterEach: false, it: false, expect: false, spyOn: false, runs: false, sinon: false, waitsFor: false,
          ThetusTestHelpers: false, Savanna: false,
          go: false */
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
//                    expect(dropZone.hasListener('ondrop')).toBeTruthy(); // TODO:figure out how to do this (check for ondrop listener)
//                    expect(dropZone.ondrop).toBeTruthy();
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
                it('should programattically click the fileBrowserButton', function () {
                    spyOn(controller,'fileBrowserChangeHandler');
                    controller.chooseFilesHandler(chooseFilesButton);
//                    expect(controller.fileBrowserChangeHandler).toHaveBeenCalled(); // TODO: can't do this because it's from an event, can I test this?
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
                expect(Savanna.upload.controller.UploadController.formatFileSize(3145728)).toEqual('3 MB');
                expect(Savanna.upload.controller.UploadController.formatFileSize(51200)).toEqual('50 KB');
                expect(Savanna.upload.controller.UploadController.formatFileSize(10253)).toEqual('10.01 KB');
                expect(Savanna.upload.controller.UploadController.formatFileSize(10342)).toEqual('10.1 KB');
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
            files = [{name:'threeMegabyteFile', size: 3145728},{name:'fiftyKilobyteFile', size: 51200},{name:'tenPointZeroOneKilobyteFile', size: 10253}];/* 3MB, 50KB & 10.01KB */
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
                var modelIndex = uploadGrid.store.find('fileName','threeMegabyteFile');
                var model = uploadGrid.store.getAt(modelIndex);
                model.data.status = 'completed';
//                expect(currentUploadsView.isVisible()).toBeTruthy();//TODO - test this
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