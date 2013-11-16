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
        cancelEditFeature: {
            click: 'cancelEditFeature'
        },

        submitEditFeature: {
            click: 'submitFeatureEdit'
        }
    },

    cancelEditFeature: function () {
        var editFeaturePanel = this.getCancelEditFeature().up('map_edit_feature');
        editFeaturePanel.destroy();
    },

    submitFeatureEdit: function () {
        var editFeaturePanel = this.getSubmitEditFeature().up('map_edit_feature');
        var editStore = editFeaturePanel.getStore();
        var attributes = [];
        var items = editStore.data.items;
        for (var i = 0; i < items.length; i++) {
            attributes.push(items[i].data)
        }
        var feature = editFeaturePanel.currentFeature;
        feature.attributes = attributes;
        editFeaturePanel.destroy();
    }
});