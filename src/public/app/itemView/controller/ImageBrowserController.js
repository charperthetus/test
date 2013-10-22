/**
 * @class Savanna.itemView.controller.ImageBrowserController
 * @extends extendsClass
 * Description
 */
Ext.define('Savanna.itemView.controller.ImageBrowserController', {
    extend: 'Deft.mvc.ViewController',
    
    views: [
        'Savanna.itemView.view.imageBrowser.ImagesGrid',
        'Savanna.itemView.view.imageBrowser.ImagesThumbnail'
    ],

    control: {
        nav_left: {
            click:'onNavLeft'
        },
        nav_right: {
            click: 'onNavRight'
        }
    },

    init: function() {
        return this.callParent(arguments);
    },

    // Scroll Left Button
    onNavLeft: function() {
        var gallery = Ext.ComponentQuery.query('#thumbnail_list')[0];
        gallery.scrollBy(-450, 0, true);
    },

    // Scroll Right Button
    onNavRight: function() {
        var gallery = Ext.ComponentQuery.query('#thumbnail_list')[0];
        gallery.scrollBy(450, 0, true);
    },

    // Selecting an image to expand
    onChangeImage: function(btn, image) {
        var selectedImage = image.src,
            title = (image.title) ? image.title : 'No title',
            description = (image.alt) ? image.alt : 'No description',
            jumboImage = Ext.ComponentQuery.query('#image_primary')[0],
            jumboMeta = Ext.ComponentQuery.query('#image_text')[0],
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
    },
});