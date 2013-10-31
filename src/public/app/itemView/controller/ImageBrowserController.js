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

    // Note: that this gets called anytime the view changes (edit/view mode)
    buildImageGallery: function() {
        var me = this,
            images = this.getView().store.getById('Images').valuesStore.data.items;

        this.clearImageBrowser();

        Ext.Array.each(images, function(image) {
            var imageMeta = (image.raw) ? image.raw : image.data;
            var thumbnail = Ext.create('Savanna.itemView.view.imageBrowser.ImageThumbnail', {
                src: SavannaConfig.savannaUrlRoot + 'rest/document/' + encodeURI(imageMeta.uri) + '/original/',
                alt: imageMeta.description,
                title: imageMeta.label
            });
            thumbnail.setSrc(SavannaConfig.savannaUrlRoot + 'rest/document/' + encodeURI(imageMeta.uri) + '/original/');
            thumbnail.setAlt((image.previewString) ? image.previewString : 'Insert a description');
            thumbnail.setTitle((image.title) ? image.title : 'Add a Title');
            thumbnail.setBodyStyle({
                backgroundImage: 'url(' + thumbnail.getSrc() + ')',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
                backgroundSize: 'contain',
                backgroundColor: 'transparent'
            });
            me.addImageToBrowser(thumbnail);

            if (imageMeta.primaryImage) {
                me.onChangeImage(null, image);
            }
        });
    },
    clearImageBrowser: function() {
        this.getView().queryById('thumbnailList').items.clear();
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
        console.debug(image);
        var selectedImage = image.getSrc(),
            title = (image.getTitle()) ? image.getTitle() : 'No title',
            description = (image.getAlt()) ? image.getAlt() : 'No description',
            jumboImage = this.getView().queryById('imagePrimary'),
            jumboMeta = this.getView().queryById('imageText'),
            imageWidth = image.getSrc().naturalWidth,
            imageHeight = image.getSrc().naturalHeight;

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