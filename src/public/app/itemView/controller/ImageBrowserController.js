/*
 *  Savanna.itemView.controller.ImageBrowserController
 * 
 *  Controller to handle browsing images in the image browser.
 *  This class is also extended by the Edit version, so edits here
 *  will impact that controller as well. Requires the ImagesThumbnail
 *  since they're added dynamically based on the store.
 */
Ext.define('Savanna.itemView.controller.ImageBrowserController', {
    extend: 'Deft.mvc.ViewController',

    view: 'Savanna.itemView.view.imageBrowser.ImagesGrid',

    control: {
        view: {
            'ViewImagesGrid:Setup': 'buildImageGallery'
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
        }
    },

    //////////////////////////
    // Helpers 
    //////////////////////////

    /* 
     * Build Image Url
     *
     * Takes a image URI and encodes it with the proper rest endpoing
     *
     * @param {string} Image URI [thetus%2EArtifactOntology%3AYellowPalmOilContainer%2FModelItemXML]
     */
    buildImageUrl: function(imageURI) {
        return SavannaConfig.savannaUrlRoot + 'rest/document/' + encodeURI(imageURI) + '/original/';
    },

    //////////////////////////
    // Image Gallery
    //////////////////////////

    /*
     * Build Image Gallery
     *
     * Clears out the thumbnail panel and iterates over the images store to build a gallery.
     * Since this gets run when exiting edit mode, we need to clear the browser and fetch any new images.
     *
     * @param none
     */
    buildImageGallery: function() {
        var images = this.getView().store.getById('Images').valuesStore.data.items;

        // Discontinue building if there are no images, and hide the slideshow area
        if(images.length === 0) { 
            this.hideSlideshowImages(); 
            return false;
        }

        // Remove any previous images
        this.clearImageBrowser();

        /* 
         * 1 - Iterate over the images store and create the thumbnail.
         * 2 - Call addImageToBrowser after creation.
         * 3 - If it's the primary image, fire off onChangeImage to load it into the jumbo
         */
        Ext.Array.each(images, function(image) {
            var imageMeta = (image.raw) ? image.raw : image.data;
            var thumbnail = Ext.create('Savanna.itemView.view.imageBrowser.ImageThumbnail', {
                src: this.buildImageUrl(imageMeta.uri),
                alt: imageMeta.description,
                title: imageMeta.label
            });
            this.addImageToBrowser(thumbnail);
            if (imageMeta.primaryImage) {
                this.onChangeImage(null, image);
            }
        }, this);

        // Once images are loaded, show the images
        this.showSlideshowImages();
    },

    /*
     *  Hide Slideshow Images
     *
     *  Method that hides the slideshow part of Jumbotron
     *  @param {none}
     */
    hideSlideshowImages: function() {
        this.getView().queryById('thumbnailGallery').hide();
    },

    /*
     *  Show Slideshow Images
     *
     *  Method that shows the slideshow part of Jumbotron
     *  @param {none}
     */
    showSlideshowImages: function() {
        this.getView().queryById('thumbnailGallery').show();
    },

    /*
     *  Clear Image Browser
     *
     *  Clears the images in the thumbnail panel.
     *
     *  @param {none}
     */
    clearImageBrowser: function() {
        this.getView().queryById('thumbnailList').items.clear();
    },

    /*
     *  Add Image to Browser
     *
     *  Adds a image to the thumbnail list
     *
     *  @param {image} The Ext Thumbnail class (view)
     */
    addImageToBrowser: function(image){
        if(image) {
            this.getView().queryById('thumbnailList').add(image);            
        }
    },

    /*
     *  On Nav Left
     *
     *  Button handler responsbile for scrolling the thumbnails left
     *
     *  @param {none}
     */
    onNavLeft: function() {
        var gallery = this.getView().queryById('thumbnailList');
        gallery.scrollBy(-450, 0, true);
    },

    /*
     *  On Nav Right
     *
     *  Button handler responsible for scrolling the thumbnails right
     */
    onNavRight: function() {
        var gallery = this.getView().queryById('thumbnailList');
        gallery.scrollBy(450, 0, true);
    },

    /*
     *  On Change Image
     *
     *  Handler for expanding the thumbnail image to the jumbotron.
     *  It does so by getting the image url, title, and description and 
     *  setting the jumbo's panel background-style to have that image.
     *
     *  @param {btn} The Ext Image that was clicked
     *  @param {iamge} The image object passed with the click. Looks for the alt and src properties
     */
    onChangeImage: function(btn, image) {

        // Setup and sanitation
        var selectedImage = image.src,
            description = (image.alt) ? image.alt : 'No description',
            jumboTron = this.getView().queryById('imagePrimary'),
            jumboDescription = this.getView().queryById('imageText'),
            imageWidth = image.naturalWidth,
            imageHeight = image.naturalHeight;

        // Check the image to see if we need to shrink it down
        var backgroundSize = (imageWidth < jumboTron.width && imageHeight < jumboTron.height) ? 'inherit' : 'contain';
        
        // In order to display text over an image, the image is used as a background image on a panel
        jumboTron.setBodyStyle({
            backgroundImage: 'url(' + selectedImage + ')',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundSize: backgroundSize,
            backgroundColor: 'transparent'
        });

        // Add the description
        jumboDescription.update(description);
    }
});