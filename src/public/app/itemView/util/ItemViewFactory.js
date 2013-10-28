/* global Ext: false */
Ext.define('Savanna.itemView.util.ItemViewFactory', {
    requires: [
        'Savanna.itemView.view.ItemViewer'
    ],

    getComponentForType: function(type, uri, label){
        if (type.toLowerCase() == 'item'){
            return Ext.create('Savanna.itemView.view.ItemViewer', {
                title: label,
                itemUri: encodeURI(uri),
                closable: true,
                autoScroll: true,
                tabConfig: {
                    ui: 'dark'
                }
            });
        }else {
            return null;
        }
    }

});