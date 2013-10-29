/* global Ext: false */
Ext.define('Savanna.process.utils.ProcessViewFactory', {
    requires: [
        'Savanna.process.view.ProcessEditorComponent'
    ],

    getComponentForType: function(type, uri, label){
        if (type.toLowerCase() == 'process'){
            return Ext.create('Savanna.process.view.ProcessEditorComponent', {
                title: label,
                // someday we will need a uri  itemUri: encodeURI(uri),
            });
        }else {
            return null;
        }
    }

});