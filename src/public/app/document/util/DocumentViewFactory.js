/* global Ext: false */
Ext.define('Savanna.document.util.DocumentViewFactory', {
    requires: [
        'Savanna.document.view.DocumentComponent'
    ],

    getComponentForType: function(type, uri, label){
        if (type.toLowerCase() == 'rich' || type.toLowerCase() == 'text'){
            return Ext.create('Savanna.document.view.DocumentComponent', {
                title: label,
                itemUri: encodeURI(uri)
            });
        }else {
            return null;
        }
    }
});
