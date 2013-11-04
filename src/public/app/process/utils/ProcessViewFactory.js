/* global Ext: false */
Ext.define('Savanna.process.utils.ProcessViewFactory', {
    requires: [
        'Savanna.process.view.ProcessEditorComponent'
    ],

    getComponentForType: function(type, uri, label){
        if (type.toLowerCase() === 'process'){
            var encodedUri = encodeURIComponent(uri);
            return Ext.create('Savanna.process.view.ProcessEditorComponent', {
                title: label,
                itemUri: encodedUri
            });
        }else {
            return null;
        }
    }

});