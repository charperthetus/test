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

    views: ['Savanna.itemView.view.imageBrowser.ImagesGridEdit'],

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
     *  form search. Also responsible for styling the dropzone area.
     */
    setupFileDrop: function() {
        var dropTarget = this.getView().queryById('itemViewUploadImages').getEl(),
            dropTargetDom = dropTarget.dom;

        // Sets up the EXT drop
        if (dropTarget) {
            dropTarget.dropTarget = Ext.create('Ext.dd.DropTarget', dropTarget.dom, {
                ddGroup: 'SEARCH-ITEMS', // MUST MATCH THE DDGROUP IN SEARCH!!!
                notifyOver: this.notifyImageDragHover,
                notifyDrop: Ext.bind(this.notifyImageDragDrop, this)
            });
        }

        // Sets up the File System Drop (for file upload)
        if (typeof window.FileReader !== 'undefined') {

            // Feedback when dragging files over
            dropTargetDom.ondragover = function () {
                dropTargetDom.classList.add('dropzone_color');
                return false;
            };

            // Removing the feedback when drag leaves
            dropTargetDom.ondragleave = function () {
                dropTargetDom.classList.remove('dropzone_color');
            };

            dropTargetDom.ondrop = Ext.bind(this.fileDropHandler, this, [dropTargetDom], true);
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
     *  @param {panel} The DOM element representing the dropzone.
     */
    fileDropHandler: function(e, panel) {
        e.preventDefault();
        this.uploadFiles(e.dataTransfer.files);
        panel.classList.remove('dropzone_color');
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
        Ext.Array.each(files, function(file) {
            if(file.type.indexOf('image') !== -1){
                this.currentlyUploadingCount++;
                this.uploadFileViaXMLHttpRequest(file);
            } else {
                this.handleException('File Upload: File is not an image: ', file.name);
            }
        }, this);
    },

    /*
     *  Upload File Via XML
     *
     *  Handles uploading a single file and accepts the file formdata as well as tempID
     *
     *  @param {file} The file passed in the file change event
     *  @param {tempId} an ID that we've assigned to match it later
     */
    uploadFileViaXMLHttpRequest:function(file) {
        
        // Setup
        var formData = new FormData(),
            xhr = new XMLHttpRequest();
        
        // Operations
        formData.append(file.name, file);
        xhr.open('POST', this.buildUploadUrl(), true);
        xhr.cors = true;
        xhr.onload = Ext.bind(this.onUploadRequestLoad, this);              
        xhr.send(formData);
    },

    /*
     *  On Upload Requst
     *
     *  Handles the response from upload file and sets an ID for the upload to
     *  track down the line when polling.
     *
     *  @param {xhr} The XMLHttpRequest Object
     */
    onUploadRequestLoad: function(xhr){
        var pollingId =  Ext.decode(xhr.target.response);
        this.currentPollingIds.push(pollingId);
        if (!this.currentlyPolling) {
            this.pollForDocuments();
            this.currentlyPolling = true;
        }
    },

    /*
     *  Poll for Documents
     *
     *  A helper method for the AJAX polling request. Takes no parameters, but
     *  looks at the internal currentPollingIds for POST data.
     *
     *  @param {none}
     */
    pollForDocuments: function(){
        Ext.Ajax.request({
            url: this.buildUploadUrl(true),
            method: 'POST',
            cors: true,
            headers: {
                'Accept': 'application/json'
            },

            // The JSON object representing the polling ID's
            jsonData: Ext.JSON.encode(this.currentPollingIds),

            // Success Handler
            success: Ext.bind(this.onBatchPollingRequestLoad, this),

            // Failure (server failure)
            failure: function (response) {
                this.handleException('Upload Error: Failed to fetch upload status of documents, with status code ' + response.status);
            }
        });
    },

    /*
     *  On Batch Polling Request
     *
     *  Maintains peristance with the local variables set above based on the response from the service.
     *  This is a good candidate for refactor, since it's doing a lot of logic.
     *
     *  @param {response} The response object from the service call
     */
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

    /* 
     *  Update Upload Label
     *
     *  Updates the "Uploading (X of X)" label in the view.
     *  Takes no parameters, and checks the currentlyPollingIds and currentlyUploadingCount for status.
     *  Also responsible for showing and hiding the label based on the results.
     *
     *  @param {none}
     */
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

    /*
     *  Handle New Image
     *
     *  Puts the newly added image into the thumbnail gallery and persists to the local store.
     *  This gets called on both newly uploaded images and drag and drop images from search, so
     *  titles and descriptions may be present and need to be checked.
     *
     *  @param {image} Object containing the image data (uri, title, or documentUri properties)
     */
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
            src: this.buildImageUrl(imageURI),
            alt: (image.previewString) ? image.previewString : '',
            title: (image.title) ? image.title : 'Add a Title'
        });

        // Persist to the store and add the thumbnail to the slideshow
        this.addImageToBrowser(thumbnail);
        this.showSlideshowImages();
        this.onChangeImage(null, thumbnail);
        this.getView().storeHelper.addBotLevItemInStore(imageTitle, imageModel, this.getView().store.getById('Images'));
    }
});