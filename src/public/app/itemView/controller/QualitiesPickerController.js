/**
 * Created with IntelliJ IDEA.
 * User: bjohnson
 * Date: 10/26/13
 * Time: 5:46 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.itemView.controller.QualitiesPickerController', {
    extend: 'Deft.mvc.ViewController',

    views: [
        'Savanna.itemView.view.itemQualities.QualitiesPicker'
    ],
    control: {
        availableQualitiesGroup: {
            itemclick: 'qualityChecked'
        }
    },

    qualityChecked: function (grid, record, item, index, e, eOpts) {
        if (e.target.checked) {
            //add to store
            grid.store.add()
        }
        else {
            //remove from store
        }
    }
});