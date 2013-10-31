Ext.define('Savanna.itemView.controller.EditImageBrowserController', {
    extend: 'Deft.mvc.ViewController',

    requires: [
        'Savanna.itemView.store.ItemViewStoreHelper'
    ],

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
        },
        handleUploadImagesButton: {
            live: true,
            selector: 'panel #fileBrowserButton',
            listeners: {
                change: {
                    fn: 'fileBrowserChangeHandler'
                }
            }
        }
    },

    // Properties used for uploading images
    currentPollingIds: [],
    currentlyPolling: false,
    ingestedCount: 0,
    failedCount: 0,
    currentlyUploadingCount: 0,
    dropAreaActive: false,

    // Store Helper for persisting
    storeHelper: null,

    /////////
    // Setup
    /////////
    init: function() {
        this.callParent(arguments);
        this.setupFileDrop();
        this.setupExtDrop();
        this.storeHelper = Ext.create('Savanna.itemView.store.ItemViewStoreHelper');
    },

    // Setup the Ext Drop Handler
    setupExtDrop: function() {
        var me = this;
        var dropTarget = me.getView().queryById('itemViewUploadImages').getEl();
        if (dropTarget) {
            dropTarget.dropTarget = Ext.create('Ext.dd.DropTarget', dropTarget.dom, {
                ddGroup: 'SEARCH-ITEMS',
                notifyOver: Ext.Function.bind(me.notifyImageDragHover, me),
                notifyDrop: Ext.Function.bind(me.notifyImageDragDrop, me)
            });
        }
    },
    // Check if the Ext Item can be droped by its contentType
    notifyImageDragHover: function(ddSource, e, data) {
        //don't allow anything other than an Item to be dropped into the item palette
        if (data.records[0].data.contentType === 'Image') {
            return Ext.dd.DropZone.prototype.dropAllowed;
        } else {
            return Ext.dd.DropZone.prototype.dropNotAllowed;
        }
    },
    // The Ext Drop Event, checks again if it's an image
    notifyImageDragDrop: function(ddSource, e, data) {
        if(data.records[0].data.contentType !== 'Image'){
            // Prevent dropping
            return false;
        } else {
            // Add the image to the browser
            this.createNewImage(data.records[0].data);
        }
        return true;
    },
    // Setting up the dropzone for uploading files, calls fileDropHandler
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
    // Prevent the default behaviour of the browser (opening the image), and start the upload chain
    fileDropHandler: function(e) {
        e.preventDefault();
        this.uploadFiles(e.dataTransfer.files);
    },
    // Launch file browser, does so by 'clicking' the hidden HTML input[type=file]
    chooseFilesHandler: function(button) {
        var fileBrowser = this.getView().queryById('fileBrowserButton');
        var input  = Ext.dom.Query.selectNode('[type=\'file\']', fileBrowser.getEl().dom);
        input.multiple = true;
        input.click();
    },
    // Handles the the Upload button completion event
    fileBrowserChangeHandler: function(fileBrowserButton,event) {
        this.uploadFiles(event.target.files, fileBrowserButton);
    },
    // Helper to build the URL
    buildUploadUrl: function(forPolling){
        var url = SavannaConfig.uploadUrl;
        if (forPolling){
            url += '/status';
        }
        url += ';jsessionid=' + Savanna.jsessionid;
        return url;
    },
    // Iterates over the files uploaded and ignores ones that aren't images
    uploadFiles: function(files,component){
        var file;

        var uploadGrid = this.getView().queryById('uploadStatus');

        for (var i = 0 ; i < files.length ; i++){
            file = files[i];

            // Check if file is an image before uploading
            if(file.type.indexOf('image') !== -1){
                this.currentlyUploadingCount++;
                var tempId = Ext.id();
                this.uploadFileViaXMLHttpRequest(this.buildUploadUrl() , file,  uploadGrid, tempId);
                uploadGrid.store.add({ status:'pending', fileName: file.name , fileSize: file.size , progress:'Queued', fileId: tempId});
            } else {
                console.debug('Not an image: ', file.name);
            }
        }
    },
    // Creates the XMLHTTPRequest
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
                    this.createNewImage(documentStatus);
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
        this.updateUploadLabel();
        uploadGrid.getView().refresh();
    },
    updateUploadLabel: function() {
        var uploadStatus = this.getView().queryById('uploadStatusMessage');
        uploadStatus.show();
        uploadStatus.update('Uploading (' + this.currentPollingIds.length + ' of ' + this.currentlyUploadingCount + ')');

        // Once uploads are done, reset
        if(this.currentPollingIds.length === 0) {
            this.currentlyUploadingCount = 0;
            uploadStatus.hide();
        }
    },

    //////////////////
    // IMAGE BROWSING
    //////////////////
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
    createNewImage: function(image){
        var thumbnail = Ext.create('Savanna.itemView.view.imageBrowser.ImageThumbnail', {
            src: SavannaConfig.savannaUrlRoot + 'rest/document/' + encodeURI(image.uri) + '/original/',
            alt: (image.previewString) ? image.previewString : 'Insert a description',
            title: (image.title) ? image.title : 'Add a Title'
        });
        this.addImageToBrowser(thumbnail);
        //this.storeHelper.addBotLevItemInStore(image.title, image, this.getView().store);
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