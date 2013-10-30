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
        }
    },
    // Add drop handler to the drop zone
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
    fileDropHandler: function(e, panel) {
        e.preventDefault();
        console.debug(e.dataTransfer.files);
        Ext.Array.filter(e.dataTransfer.files, function(file){
            console.debug(file);
        });
    },
    buildImageGallery: function(images) {
        var me = this;
        Ext.Array.each(images, function() {
            var thumbnail = Ext.create('Savanna.itemView.view.imageBrowser.ImageThumbnail', {
                src: SavannaConfig.savannaUrlRoot + 'rest/document/' + encodeURI(this.raw.uri) + '/thumbnail/',
                alt: this.raw.description,
                title: this.raw.label
            });
            me.getView().queryById('thumbnailList').add(thumbnail);

            if (this.raw.primaryImage) {
                me.onChangeImage(null, this);
            }
        });
        this.setupFileDrop();
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