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
            var val = (bytes < 1048576) ? bytes/1024  : bytes/1048576 ;
            var suffix = (bytes < 1048576) ? 'KB'  : 'MB' ;
            var formatted = Ext.util.Format.number(val,'0.00');
            formatted = formatted.replace(/.00/,""); // strip .00 off the string
            formatted = formatted.replace(/(.\d)0/,"$1"); // if .x0 capture x and strip 0 off end
//            This should work but for some reasome the formatter in our build has a bug. this works on the ext jsfiddle page
//            var formatted = Ext.util.Format.number(val,'0.##');
            return formatted + ' ' + suffix;
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
                //Note that false means it can be dropped
                return false;
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
            url: this.buildUploadUrl(true),  // TODO: I don't think I need to do this anymore, check tomorrow (or before checkin at least)
            method: 'POST',
            cors: true,
            headers: {
                'Accept': 'application/json'
            },
            jsonData: this.buildJSONStringArray(this.currentPollingIds) ,
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
                continue;                           //TODO: this needs to be fixed when nick gets the fix in
            }
            // Update my store
            var modelIndex = uploadGrid.store.find('fileId',pollingId);
            var model = uploadGrid.store.getAt(modelIndex);
            model.data.status = (documentStatus.status) ? documentStatus.status : 'pending'; //TODO: remove these hack status updates and find out why values are null.
            model.data.progress = (documentStatus.statusText) ? documentStatus.statusText : 'Uploading document';
            if (!(model.data.docUri) && documentStatus.documentUri){
                model.data.docUri = documentStatus.documentUri;
            }
            console.log('polling response object =\n {\n   statusText : ' + documentStatus.statusText + ' ,\n   status : ' + documentStatus.status +' ,\n   documentUri : ' + documentStatus.documentUri + '\n }');
            if (documentStatus.status === 'completed' || documentStatus.status === 'failed' ){
                this.currentPollingIds.splice(i,1);
            }
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
    },

    buildJSONStringArray:function(array){ // Make my arra valid json.
        var jsonString = '['
        for (var i = 0 ; i < array.length ; i++ ){
            jsonString += '"' + array[i] + '"';
            if (i !== array.length - 1){
                jsonString += ',';
            }
        }
        jsonString += ']';
        return jsonString;
    }

});
