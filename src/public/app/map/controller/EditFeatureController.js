/**
 * Created with IntelliJ IDEA.
 * User: sseely
 * Date: 11/14/13
 * Time: 4:05 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.map.controller.EditFeatureController', {
    extend: 'Deft.mvc.ViewController',

    control: {
        previousFeature: {
            click: 'navigateFeatures'
        },

        nextFeature: {
            click: 'navigateFeatures'
        },

        removeFeature: {
            click: 'removeFeature'
        },

        submitEditFeature: {
            click: 'submitFeatureEdit'
        }
    },

    removeFeature: function () {
        var response = confirm('Are you sure you want to delete this feature?');
        if (response === true) {
            EventHub.fireEvent('removeCurrentFeature');
        }
    },

    submitFeatureEdit: function () {
        var editFeaturePanel = this.getSubmitEditFeature().up('map_edit_feature');
        var mapView = this.getSubmitEditFeature().up('mapcomponent').down('ol3mapcomponent');
        var feature = mapView.getCurrentSelection()[mapView.getFeatureIndex()];
        var editStore = editFeaturePanel.getStore();
        var attributes = [];
        var items = editStore.data.items;
        for (var i = 0; i < items.length; i++) {
            var key = items[i].data.field;
            feature.values_[key] = items[i].data.value;
        }
        EventHub.fireEvent('updateFeatureView');
//        this.getSubmitEditFeature().up('#featureDetailsView').collapse();
//        editFeaturePanel.destroy();
//        EventHub.fireEvent('unselectFeature');
    },

    navigateFeatures: function (button) {
        var mapView = this.getSubmitEditFeature().up('mapcomponent').down('ol3mapcomponent');
        if(mapView.getFeatureIndex() <= mapView.getCurrentSelection().length - 1) {
            var newIndex = mapView.getFeatureIndex();
            newIndex += (button.direction === 'next')? 1:-1;
            mapView.setFeatureIndex(newIndex);
        }
        EventHub.fireEvent('updateFeatureView');
    }

});