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
        var mapComponent = this.getCancelEditFeature().up('mapcomponent');
        var editFeaturePanel = mapComponent.down('map_edit_feature');
        editFeaturePanel.destroy();
    },

    submitFeatureEdit: function () {
        console.log('Shit was changed...')
    }
});