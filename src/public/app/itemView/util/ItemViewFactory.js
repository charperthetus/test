/* global Ext: false */
Ext.define('Savanna.itemView.util.ItemViewFactory', {
    requires: [
        'Savanna.itemView.view.ItemViewer'
    ],

    getComponentForType: function (type, uri, label, otherParams) {
        var editMode = false;
        if (otherParams && otherParams.hasOwnProperty('editMode')) {
            editMode = otherParams.editMode;
        }
        if (type.toLowerCase() == 'item') {

                return Ext.create('Savanna.itemView.view.ItemViewer', {
                    title: label,
                    itemUri: encodeURI(uri),
                    autoScroll: true,
                    editMode: editMode
                });

        } else {
            return null;
        }
    }

});