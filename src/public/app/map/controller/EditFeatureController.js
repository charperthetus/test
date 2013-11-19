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
        this.getCancelEditFeature().up('#featureDetailsView').collapse();
        this.getCancelEditFeature().up('map_edit_feature').destroy();
        EventHub.fireEvent('unselectFeature');
    },

    submitFeatureEdit: function () {
        var editFeaturePanel = this.getSubmitEditFeature().up('map_edit_feature');
        var editStore = editFeaturePanel.getStore();
        var attributes = [];
        var items = editStore.data.items;
        for (var i = 0; i < items.length; i++) {
            attributes.push(items[i].data)
        }
        var feature = this.getSubmitEditFeature().up('mapcomponent').down('map_popup_datacard').getCurrentFeature();
        feature.attributes = attributes;
        this.getSubmitEditFeature().up('#featureDetailsView').collapse();
        editFeaturePanel.destroy();
        EventHub.fireEvent('unselectFeature');
    }
});