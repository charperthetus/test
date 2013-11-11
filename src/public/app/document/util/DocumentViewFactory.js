/* global Ext: false */
Ext.define('Savanna.document.util.DocumentViewFactory', {
    requires: [
        'Savanna.document.view.DocumentComponent'
    ],

    getComponentForType: function(type, uri, label){
        if (type.toLowerCase() == 'rich' || type.toLowerCase() == 'text'){
            window.open('resources/document/?docId=' + encodeURI(uri) + '&name=' + label, uri);
        }else {
            return null;
        }
    }
});
