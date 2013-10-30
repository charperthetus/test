Ext.define('Savanna.itemView.controller.EditImageBrowserController', {
    extend: 'Deft.mvc.ViewController',

    view: 'Savanna.itemView.view.imageBrowser.ImagesGridEdit',

    control: {
        view: {
            'EditImagesGrid:Setup': 'buildImageGallery'
        },
        navLeft: {
            live: true,
            listeners: {
                click: {
                    fn: 'onNavLeft'
                }
            }
        },
        navRight: {
            live: true,
            listeners: {
                click: {
                    fn: 'onNavRight'
                }
            }
        },
        itemview_imagethumbnail: {
            live: true,
            selector: 'panel itemview_imagethumbnail',
            listeners: {
                click: {
                    element: 'el',
                    fn: 'onChangeImage'
                }
            }
        },
        uploadImagesButton: {
            live: true,
            selector: 'panel #uploadImagesButton',
            listeners: {
                click: {
                    fn: 'chooseFilesHandler'
                }
            }
        }
    },

    currentPollingIds: [],
    currentlyPolling: false,
    ingestedCount: 0,
    failedCount: 0,
    currentlyUploadingCount: 0,
    dropAreaActive: false,

    // FILE UPLOADING
    init: function() {
        this.callParent(arguments);
        this.setupFileDrop();
    },
    // Query the drop zone, fire the fileHandler when items are dropped
    setupFileDrop: function() {
        var panel = this.getView().queryById('itemViewUploadImages');
        if (typeof window.FileReader !== 'undefined') {
            var dropArea = panel.getEl().dom;

            dropArea.ondragover = function () {
                return false;
            };

            dropArea.ondrop = Ext.bind(this.fileDropHandler, this, [panel], true);
        }
    },
    // Add drop handler
    fileDropHandler: function(e) {
        e.preventDefault();
        this.uploadFiles(e.dataTransfer.files);
    },
    // Launch file browser, does so by querying the hidden input[type=file]
    chooseFilesHandler: function(button) {
        var fileBrowser = this.getView().queryById('fileBrowserButton');
        var input  = Ext.dom.Query.selectNode('[type=\'file\']', fileBrowser.getEl().dom);
        input.multiple = true;
        input.click();
    },
    // Handles the file selected event once users select files
    fileBrowserChangeHandler: function(fileBrowserButton,event) {
        this.uploadFiles(event.target.files, fileBrowserButton);
    },
    buildUploadUrl: function(forPolling){
        var url = SavannaConfig.uploadUrl;
        if (forPolling){
            url += '/status';
        }
        url += ';jsessionid=' + Savanna.jsessionid;
        return url;
    },
    uploadFiles: function(files,component){
        console.debug(files);
        var file;
        this.currentlyUploadingCount += files.length;

        var uploadGrid = this.getView().queryById('uploadStatus');
        for (var i = 0 ; i < files.length ; i++){
            file = files[i];

            // Check if file is an image before uploading
            if(file.type.indexOf('image') !== -1){
                var tempId = Ext.id();
                this.uploadFileViaXMLHttpRequest(this.buildUploadUrl() , file,  uploadGrid, tempId);
                uploadGrid.store.add({ status:'pending', fileName: file.name , fileSize: file.size , progress:'Queued', fileId: tempId});
            } else {
                console.debug('Not an image: ', file.name);
            }
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
            jsonData: this.buildJSONStringArray(this.currentPollingIds) ,
            success: Ext.bind(this.onBatchPollingRequestLoad, this , [uploadGrid], true ),

            // TODO: Handle failures
            failure: function (response, opts) {
                console.debug('server-side failure with status code ' + response.status);
            }
        });
    },
    buildJSONStringArray:function(array){ // Make my arra valid json.
        var jsonString = '[';
        for (var i = 0 ; i < array.length ; i++ ){
            jsonString += '"' + array[i] + '"';
            if (i !== array.length - 1){
                jsonString += ',';
            }
        }
        jsonString += ']';
        return jsonString;
    },
    onBatchPollingRequestLoad: function(response, response2, uploadGrid){
        var responseObject = Ext.decode(response.responseText);
        for(var i = this.currentPollingIds.length - 1 ; i >= 0 ; i--){
            var pollingId = this.currentPollingIds[i];
            var documentStatus = responseObject[pollingId];
            if (documentStatus === undefined){
                continue;                           //polling immediately, one may not be returned yet
            }
            // Update my store
            var modelIndex = uploadGrid.store.find('fileId',pollingId);
            var model = uploadGrid.store.getAt(modelIndex);
            model.data.status = (documentStatus.status !== 'unknown') ? documentStatus.status : 'pending';
            model.data.progress = (documentStatus.statusText !== 'unknown') ? documentStatus.statusText : 'Uploading Image';
            if (!(model.data.docUri) && documentStatus.documentUri){
                model.data.docUri = documentStatus.documentUri;
            }
            if (documentStatus.status === 'completed' || documentStatus.status === 'failed' ){
                this.currentPollingIds.splice(i,1);
                if (documentStatus.status === 'completed') { 
                    this.ingestedCount++;
                    this.createNewImage(documentStatus.documentUri);
                } else {
                    this.failedCount++;
                } 
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

    // IMAGE BROWSING
    buildImageGallery: function(images) {
        var me = this;
        // TODO: Abstract this out.
        Ext.Array.each(images, function() {
            var thumbnail = Ext.create('Savanna.itemView.view.imageBrowser.ImageThumbnail', {
                src: SavannaConfig.savannaUrlRoot + 'rest/document/' + encodeURI(this.raw.uri) + '/original/',
                alt: this.raw.description,
                title: this.raw.label
            });
            me.addImageToBrowser(thumbnail);

            if (this.raw.primaryImage) {
                me.onChangeImage(null, this);
            }
        });
    },
    createNewImage: function(imageUri){
        var thumbnail = Ext.create('Savanna.itemView.view.imageBrowser.ImageThumbnail', {
            src: SavannaConfig.savannaUrlRoot + 'rest/document/' + encodeURI(imageUri) + '/original/',
            alt: 'Insert a description',
            title: 'Add a Title'
        });
        this.addImageToBrowser(thumbnail);
        this.onChangeImage(null, thumbnail);
    },
    addImageToBrowser: function(image){
        this.getView().queryById('thumbnailList').add(image);
    },
    // Scroll Left Button
    onNavLeft: function() {
        var gallery = this.getView().queryById('thumbnailList');
        gallery.scrollBy(-450, 0, true);
    },
    // Scroll Right Button
    onNavRight: function() {
        var gallery = this.getView().queryById('thumbnailList');
        gallery.scrollBy(450, 0, true);
    },
    // Selecting an image to expand
    onChangeImage: function(btn, image) {
        var selectedImage = image.src,
            title = (image.title) ? image.title : 'No title',
            description = (image.alt) ? image.alt : 'No description',
            jumboImage = this.getView().queryById('imagePrimary'),
            jumboMeta = this.getView().queryById('imageText'),
            imageWidth = image.naturalWidth,
            imageHeight = image.naturalHeight;

        var backgroundSize = (imageWidth < jumboImage.width && imageHeight < jumboImage.height) ? 'inherit' : 'contain';
        
        // In order to display text over an image, the image is used as a background image on a panel
        jumboImage.setBodyStyle({
            backgroundImage: 'url(' + selectedImage + ')',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundSize: backgroundSize,
            backgroundColor: 'transparent'
        });
        jumboMeta.update(description);
    }
});