/* global Ext: false */
Ext.define('Savanna.document.util.DocumentViewFactory', {
    requires: [
        'Savanna.document.view.DocumentComponent'
    ],

    getComponentForType: function(type, uri, label){
        if (type.toLowerCase() == 'rich'){
            window.open('resources/document/?docId=' + encodeURI(uri) + '&name=' + label, uri);
        }else {
            return null;
        }
    }
});
