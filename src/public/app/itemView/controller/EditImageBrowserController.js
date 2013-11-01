/*
 *  Savanna.itemView.controller.EditImageBrowserController
 *
 *  Edit Images Browser Contoller handles dragging and dropping images from search
 *  as well as uploading new images. It extends the Image Browser Controller for
 *  sliding and clicking on images, so edits to how that functions need to be made there.
 *
 *  @author Joel Griffith jgriffith@thetus.com
 */
Ext.define('Savanna.itemView.controller.EditImageBrowserController', {
    
    extend: 'Savanna.itemView.controller.ImageBrowserController',

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

    ///////////////////////////////////
    // Private Variables and Configs
    ///////////////////////////////////
    currentPollingIds: [],
    currentlyPolling: false,
    ingestedCount: 0,
    failedCount: 0,
    currentlyUploadingCount: 0,

    /////////////////////////////////
    // Helpers
    /////////////////////////////////

    /*
     *  Build Upload URL
     *
     *  Builds the uplaod status URL as well as the standard Upload URL.
     *  Adds the jsessionid as well.
     *
     *  @param {isCheckingStatus} Boolean, to check status
     */
    buildUploadUrl: function(isCheckingStatus) {
        var url = SavannaConfig.uploadUrl;
        if (isCheckingStatus){
            url += '/status';
        }
        url += ';jsessionid=' + Savanna.jsessionid;
        return (url);
    },

    /*
     *  Handle Exception
     *
     *  Abstraction to handle exceptions, currently just logs them in the console.
     *
     *  @param {message} String of the exception
     */
    handleException: function(message) {
        Ext.log(message);
    },

    /////////////////////////////////
    // Setup
    /////////////////////////////////

    /*
     *  Init
     *
     *  Calls parent class, setups up the drop zones
     */
    init: function() {
        this.callParent(arguments);
        this.setupFileDrop();
    },

    /*
     *  Setup File Drop
     *
     *  Setups up both the File System drop (new images), and the drag and drop
     *  form search. 
     */
    setupFileDrop: function() {
        var me = this;
        var dropTarget = me.getView().queryById('itemViewUploadImages').getEl(),
            dropTargetDom = dropTarget.dom;

        // Sets up the EXT drop
        if (dropTarget) {
            dropTarget.dropTarget = Ext.create('Ext.dd.DropTarget', dropTarget.dom, {
                ddGroup: 'SEARCH-ITEMS', // MUST MATCH THE DDGROUP IN SEARCH!!!
                notifyOver: Ext.Function.bind(me.notifyImageDragHover, me),
                notifyDrop: Ext.Function.bind(me.notifyImageDragDrop, me)
            });
        }

        // Sets up the File System Drop (for file upload)
        if (typeof window.FileReader !== 'undefined') {
            dropTargetDom.ondragover = function () {
                return false;
            };
            dropTargetDom.ondrop = Ext.bind(this.fileDropHandler, this, [dropTarget], true);
        }
    },

    /////////////////////////////
    // Drag Handlers
    /////////////////////////////

    /*
     *  Notify Image Drag Hover
     *
     *  Method that determines if the item can be dropped. Must return
     *  either dropAllowed or dropNotAllowed so the UI can reflect if an item is droppable.
     *
     *  @params (ddSrouce, e, data) All passed by ExtJS, see their docs for details.
     */
    notifyImageDragHover: function(ddSource, e, data) {
        //don't allow anything other than an Item to be dropped into the item palette
        if (data.records[0].data.contentType === 'Image') {
            return Ext.dd.DropZone.prototype.dropAllowed;
        } else {
            return Ext.dd.DropZone.prototype.dropNotAllowed;
        }
    },

    /*
     *  Notifiy Image Drag Drop
     *
     *  Method that, if false, prevents the drop from occuring (and the item animates back to
     *  it's origin). If it can drop, then the handler is fired.
     *
     *  @params (ddSrouce, e, data) ExtJS Event data, see docs.
     */
    notifyImageDragDrop: function(ddSource, e, data) {
        if(data.records[0].data.contentType !== 'Image'){
            // Prevent dropping
            return false;
        } else {
            // Add the image to the browser
            this.handleNewImage(data.records[0].data);
        }
        return true;
    },

    /*
     *  File Drop Handler
     *
     *  Prevents the default behaviour (opening the image in the browser, new tab), and calls
     *  uploadFiles with the event data.
     *
     *  @param {e} Browser event, passed automatically by the drag action.
     */
    fileDropHandler: function(e) {
        e.preventDefault();
        this.uploadFiles(e.dataTransfer.files);
    },

    ////////////////////////
    // File Upload Button
    ////////////////////////
    
    /*
     *  Chose File Handler
     *
     *  Queries the view for the hidden <input type='file'> button and simulates a click.
     *  This method is called when a user clicks the dummy button present in the view.
     *  See events above for how this is called
     *  
     *  @param {none}
     */
    chooseFilesHandler: function() {
        var fileBrowser = this.getView().queryById('fileBrowserButton');
        var input  = Ext.dom.Query.selectNode('[type=\'file\']', fileBrowser.getEl().dom);
        input.multiple = true;
        input.click();
    },

    /*
     *  File Browser Change Handler
     *
     *  Called when a change event happens on the <input type='file'> button. This
     *  Triggers the internal methods for handling the action.
     *
     *  @param {fileBrowserButton, event} Passed by the browser.
     */
    fileBrowserChangeHandler: function(fileBrowserButton, event) {
        this.uploadFiles(event.target.files);
    },

    /*
     *  Upload Files
     *
     *  Handles both the file upload button and drag and drop events. Iterates over and
     *  checks to see if they're and image type, adds them to the currentlyUploadingCount,
     *  assigns them a tempID, and uploads the file.
     *  
     *  @param {files} Array of files
     */
    uploadFiles: function(files){
        var uploadGrid = this.getView().queryById('uploadStatus');

        Ext.Array.each(files, function(file) {
            if(file.type.indexOf('image') !== -1){
                this.currentlyUploadingCount++;
                var tempId = Ext.id();
                this.uploadFileViaXMLHttpRequest(file, tempId);
            } else {
                this.handleException('File Upload: File is not an image: ', file.name);
            }
        }, this);
    },

    /*
     *  Upload File Via XML
     *
     *  Handles uploading a single file and accepts
     */
    uploadFileViaXMLHttpRequest:function(file, tempId) {
        var formData = new FormData();
        formData.append(file.name, file);
        
        var xhr = new XMLHttpRequest();
        xhr.open('POST', this.buildUploadUrl(), true);
        xhr.cors = true;
        xhr.onload = Ext.bind(this.onUploadRequestLoad,this,[tempId],true );              
        xhr.send(formData);  // multipart/form-data
    },
    onUploadRequestLoad: function(status){
        var pollingId =  Ext.decode(status.target.response);

        this.currentPollingIds.push(pollingId);
        if (this.currentlyPolling === false){
            this.pollForDocuments();
            this.currentlyPolling = true;
        }
    },
    pollForDocuments: function(){
        Ext.Ajax.request({
            url: this.buildUploadUrl(true),
            method: 'POST',
            cors: true,
            headers: {
                'Accept': 'application/json'
            },
            jsonData: this.buildJSONStringArray(this.currentPollingIds) ,
            success: Ext.bind(this.onBatchPollingRequestLoad, this , [], true ),

            // TODO: Handle failures
            failure: function (response) {
                console.log('server-side failure with status code ' + response.status);
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
    onBatchPollingRequestLoad: function(response){
        var responseObject = Ext.decode(response.responseText);
        for(var i = this.currentPollingIds.length - 1 ; i >= 0 ; i--){
            var pollingId = this.currentPollingIds[i];
            var documentStatus = responseObject[pollingId];
            if (documentStatus === undefined){
                continue;                           //polling immediately, one may not be returned yet
            }
            // Update my store
            if (documentStatus.status === 'completed' || documentStatus.status === 'failed' ){
                this.currentPollingIds.splice(i,1);
                if (documentStatus.status === 'completed') { 
                    this.ingestedCount++;
                    this.handleNewImage(documentStatus);
                } else {
                    this.failedCount++;
                } 
            }
        }
        if (this.currentPollingIds.length > 0){
            var me = this;
            var interval = setInterval(function() {
                me.pollForDocuments();
                // always clear interval
                clearInterval(interval);
            }, 5000);
        }else{
            this.currentlyPolling = false;
        }
        this.updateUploadLabel();
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
    handleNewImage: function(image){

        // Check to see if this was dragged from Search or from Upload. The URI is under a different key in each
        var imageURI = (image.uri) ? image.uri : image.documentUri,
            imageTitle = (image.title) ? image.title : image.documentUri;

        // The store helper expects argument #2 to be an object representing the model, this sets that up
        var imageModel = {
            title: imageTitle,
            uri: imageURI,
            comment: null
        };

        // Create the view for the image thumbnail
        var thumbnail = Ext.create('Savanna.itemView.view.imageBrowser.ImageThumbnail', {
            src: SavannaConfig.savannaUrlRoot + 'rest/document/' + encodeURI(imageURI) + '/original/',
            alt: (image.previewString) ? image.previewString : 'Insert a description',
            title: (image.title) ? image.title : 'Add a Title'
        });

        // Persist to the store and add the thumbnail to the slideshow
        this.addImageToBrowser(thumbnail);
        this.showSlideshowImages();
        this.getView().storeHelper.addBotLevItemInStore(imageTitle, imageModel, this.getView().store.getById('Images'));
        this.onChangeImage(null, thumbnail);
    }
});