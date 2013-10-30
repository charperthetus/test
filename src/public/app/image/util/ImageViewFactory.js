/* global Ext: false */
Ext.define('Savanna.image.util.ImageViewFactory', {
    requires: [
        'Savanna.image.view.ImageComponent'
    ],

    getComponentForType: function(type, uri, label){
        if (type.toLowerCase() == 'image'){
            return Ext.create('Savanna.image.view.ImageComponent', {
                title: label,
                itemUri: encodeURI(uri)
            });
        }else {
            return null;
        }
    }

});
