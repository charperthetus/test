Ext.define('Savanna.itemView.controller.ImageBrowserController', {
    extend: 'Deft.mvc.ViewController',

    view: 'Savanna.itemView.view.imageBrowser.ImagesGrid',

    control: {
        view: {

            // TODO: This is run multiple times due to the nature of the event. Find a better way...
            afterlayout: 'buildImageGallery'
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

    // TODO: Move common itemId's here
    statics: {
        mainImage: null,
        mainImageDescription: null,
        uploadwindow: null
    },

    // TODO: Remove this once we find a better event to trigger from
    config: {
        hasBeenBuilt: false
    },

    // TODO: Replace this with some reeeeeeeeal data.... awwww yeah...
    store: {
        data: [{
            src: 'http://2.bp.blogspot.com/-SwRvvHer_wQ/T6GhgnQoS0I/AAAAAAAHhkY/iyxaoyoC-2g/s800/Kia-K9-01.jpg',
            title: 'Car',
            alt: 'Vroom vroom!',
            isFeatured: false
        }, {
            src: 'http://4.bp.blogspot.com/-8iGyCfFuLuU/T5QA-1t4QTI/AAAAAAAAAXg/izbeFI2PvC0/s1600/korea.jpg',
            title: 'City',
            alt: 'It\'s a beautiful night, such a beautful night.',
            isFeatured: false
        }, {
            src: 'http://media.lonelyplanet.com/lpi/24744/24744-14/469x264.jpg',
            title: 'Lake',
            alt: 'I\'d rather not be rowing.',
            isFeatured: false
        }, {
            src: 'http://3.bp.blogspot.com/-kyrXb2orUgA/Te9KO0AxR5I/AAAAAAAAErY/X_XkbgU107Q/s1600/Blue_Ocean_17723522_std.jpg',
            title: 'Tropics',
            alt: 'That\'s a nice dock',
            isFeatured: true
        }, {
            src: 'http://1.bp.blogspot.com/-iOPb28o8svc/TpvN-dWORKI/AAAAAAAAAuw/8pPLujrCSQ0/s1600/toronto.jpg',
            title: 'Dark city',
            alt: 'Kind of reminds me of Seattle.',
            isFeatured: false
        }, {
            src: 'http://www.ebaytemplate.info/wp-content/gallery/germany/elbe-river-dresden-germany.jpg',
            title: 'Old City',
            alt: 'This is an older city.',
            isFeatured: false
        }, {
            src: 'http://blog.educationusa.or.kr/wp-content/uploads/2008/07/dokdo-islets.jpg',
            title: 'Boating',
            alt: 'Sure beats rowing',
            isFeatured: false
        }, {
            src: 'http://villaluxe.com/wp-content/gallery/pamillaretreat/maxico-palmilla-04.jpg',
            title: 'Patio',
            alt: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
            isFeatured: false
        }]
    },

    buildImageGallery: function() {
        if (this.getHasBeenBuilt()) {
            
            return true;
        
        } else {

            var me = this,
                store = this.store;

            Ext.Array.each(store.data, function() {
                var thumbnail = Ext.create('Savanna.itemView.view.imageBrowser.ImageThumbnail', {
                    src: this.src,
                    alt: this.alt,
                    title: this.title
                });
                me.getView().queryById('thumbnailList').add(thumbnail);

                if (this.isFeatured) {
                    me.onChangeImage(null, this);
                }
            });
            this.setHasBeenBuilt(true);            
        }
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