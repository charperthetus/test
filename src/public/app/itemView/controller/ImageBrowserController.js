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

    init: function() {
        console.log("Controller loaded");
        return this.callParent(arguments);
    }
});