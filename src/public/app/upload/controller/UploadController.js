/* global Ext: false, go: false, Savanna: false */
Ext.define('Savanna.upload.controller.UploadController', {
    extend: 'Ext.app.Controller',

    views: [
        'Savanna.upload.view.UploadComponent',
        'Savanna.upload.view.part.NewUploadView',
        'Savanna.upload.view.part.CurrentUploadsView'
    ],

    currentPollingIds:[],
    currentlyPolling:false,
    ingestedCount:0, //Do not use -1s because we are incrimenting the value (this.ingestedCount++ , this.currentlyUploadingCount+=...)
    failedCount:0,
    currentlyUploadingCount:0,
    dropAreaActive:false,

    init: function() {
        this.control({
            'upload_part_newupload #fileDropZone': {
                afterrender: this.setupFileDrop
            },

            'upload_part_newupload #chooseFilesButton': {
                click: this.chooseFilesHandler
            },

            'upload_part_newupload #fileBrowserButton': {
                change: this.fileBrowserChangeHandler
            },

            'upload_part_currentuploads #clearFinishedButton': {
                click: this.clearFinishedUploads
            }
        });
    },
    statics: {
        formatFileSize:function(bytes){
            var formattedNumber,
                suffix;
            if (bytes < 1048576){
                formattedNumber = Ext.util.Format.number( bytes/1024 ,'0');
                suffix = 'KB';
            }else{                                                    // '0.#' should work here but our build has a bug, this works on the ext jsfiddle page.
                formattedNumber = Ext.util.Format.number( bytes/1048576 ,'0.0');
                suffix = 'MB';                                        // So we need to do this.
                formattedNumber = formattedNumber.replace(/\.0/,"");
            }
            return formattedNumber + ' ' + suffix;
        }
    },

    /**
     *      CUSTOM METHODS/CONFIGURATION
     */

    // Add drop handler to the drop zone
    setupFileDrop: function(panel) {
        if (typeof window.FileReader !== 'undefined') {
            var dropArea = panel.getEl().dom;

            dropArea.ondragover = function () {
                //TODO - check the type of thing dragged in to determine if it can be dropped
                //add drop indication (transparency)
                dropArea.classList.add('dropzone_color');
                //Note that false means it can be dropped
                return false;
            };

            //remove drop indication
            dropArea.ondragleave = function () {
                dropArea.classList.remove('dropzone_color');
            };

            dropArea.ondrop = Ext.bind(this.fileDropHandler, this, [panel], true);
        }
    },

    /**
     *      EVENT HANDLERS
     */

    // Add drop handler to drop zone
    fileDropHandler: function(e, panel) {
        e.preventDefault();
        this.uploadFiles(e.dataTransfer.files, panel);
        panel.getEl().dom.classList.remove('dropzone_color');
    },

    // Launch file browser
    chooseFilesHandler: function(button) {
        var fileBrowser = button.up('upload_uploadcomponent').down('#fileBrowserButton');
        var input  = Ext.dom.Query.selectNode("[type='file']",fileBrowser.getEl().dom);
        input.multiple = true;
        input.click();
    },

    // File Browser "Files Selected" handeler
    fileBrowserChangeHandler: function(fileBrowserButton,event) {
        this.uploadFiles(event.target.files, fileBrowserButton);
    },

    /**
     *      HELPER METHODS
     */
    uploadFiles: function(files,component){
        var file;
        this.currentlyUploadingCount += files.length;
        var currentUploadsView = component.up('upload_uploadcomponent').down('upload_part_currentuploads');
        currentUploadsView.setVisible(true);
        var uploadGrid = currentUploadsView.down('#uploadsDataGrid');
        for (var i = 0 ; i < files.length ; i++){
            file = files[i];
            var tempId = Ext.id();
            this.uploadFileViaXMLHttpRequest(this.buildUploadUrl() , file,  uploadGrid, tempId);
            uploadGrid.store.add({ status:'pending', fileName: file.name , fileSize: file.size , progress:'Queued', fileId: tempId});
        }
    },

    uploadFileViaXMLHttpRequest:function(url, file, uploadGrid, tempId) {
        var formData = new FormData();
        formData.append(file.name, file);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.cors = true;
        xhr.onload = Ext.bind(this.onUploadRequestLoad,this,[uploadGrid, tempId],true );
        xhr.send(formData);  // multipart/form-data
    },

    onUploadRequestLoad: function(status, uploadGrid, tempId){
        var pollingId =  Ext.decode(status.target.response);

        // replace the tempId with the pollingId
        var modelIndex = uploadGrid.store.find('fileId',tempId);
        var model = uploadGrid.store.getAt(modelIndex);
        model.data.fileId = pollingId;

        this.currentPollingIds.push(pollingId);
        if (this.currentlyPolling === false){
            this.pollForDocuments(uploadGrid);
            this.currentlyPolling = true;
        }
    },

    pollForDocuments: function(uploadGrid){
        Ext.Ajax.request({
            url: this.buildUploadUrl(true),
            method: 'POST',
            cors: true,
            headers: {
                'Accept': 'application/json'
            },
            jsonData: Ext.JSON.encode(this.currentPollingIds) ,
            success: Ext.bind(this.onBatchPollingRequestLoad, this , [uploadGrid], true ),
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },

    onBatchPollingRequestLoad: function(response, response2, uploadGrid){
        var responseObject = Ext.decode(response.responseText);
        for(var i = this.currentPollingIds.length - 1 ; i >= 0 ; i--){
            var pollingId = this.currentPollingIds[i]
            var documentStatus = responseObject[pollingId];
            if (documentStatus === undefined){
                continue;                           //polling immediately, one may not be returned yet
            }
            // Update my store
            var modelIndex = uploadGrid.store.find('fileId',pollingId);
            var model = uploadGrid.store.getAt(modelIndex);
            model.data.status = (documentStatus.status !== 'unknown') ? documentStatus.status : 'pending';
            model.data.progress = (documentStatus.statusText !== 'unknown') ? documentStatus.statusText : 'Uploading document';
            if (!(model.data.docUri) && documentStatus.documentUri){
                model.data.docUri = documentStatus.documentUri;
            }
            if (documentStatus.status === 'completed' || documentStatus.status === 'failed' ){
                this.currentPollingIds.splice(i,1);
                (documentStatus.status === 'completed') ? this.ingestedCount++ : this.failedCount++;
            }
            model.commit();//clears dirty cell flag
        }

        if (this.currentPollingIds.length > 0){
            var me = this;
            var interval = setInterval(function() {
                me.pollForDocuments(uploadGrid);
                // always clear interval
                clearInterval(interval);
            }, 5000);
        }else{
            this.currentlyPolling = false;
        }

        uploadGrid.getView().refresh();

        this.updateGridStatusLabel(uploadGrid);

    },

    updateGridStatusLabel: function(uploadGrid){
        var uploadGridStatusLabel = uploadGrid.up('#currentUploadsView').down('#uploadProgressLabel');
        var uploadGridStatusText;
        if (this.currentlyPolling === false){
            uploadGridStatusText = (this.ingestedCount !== 1) ? this.ingestedCount + ' uploads have completed.' : '1 upload has completed.';
            if(this.failedCount > 0){
                uploadGridStatusText += '\t';
                uploadGridStatusText +=  (this.failedCount !== 1) ? this.failedCount + ' uploads have failed.' : '1 upload has failed.';
            }
            this.currentlyUploadingCount = 0;
            this.ingestedCount = 0;
            this.failedCount = 0;
        }else{
            var totalFinished = this.ingestedCount + this.failedCount;
            uploadGridStatusText = 'Ingestion in progress (' + totalFinished + '/' + this.currentlyUploadingCount + ')';
        }
        uploadGridStatusLabel.setText(uploadGridStatusText);
    },

    clearFinishedUploads: function(button){
        var uploadGrid = button.up('upload_uploadcomponent').down('#uploadsDataGrid');
        var finished = [];
        uploadGrid.store.each(function(record){
            if ( record.data.status != 'pending'){
                this.push(record);
            }
        },finished);
        uploadGrid.store.remove(finished);
        if (uploadGrid.store.count() === 0){
            var currentUploadsView = uploadGrid.up('upload_part_currentuploads');
            currentUploadsView.down('#uploadProgressLabel').setText('');
            currentUploadsView.setVisible(false);
        }
    },

    buildUploadUrl: function(forPolling){
        var url = SavannaConfig.uploadUrl;
        if (forPolling){
            url += '/status';
        }
        url += ';jsessionid=' + Savanna.jsessionid;
        return url;
    }

});
