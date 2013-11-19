/**
 * Created with IntelliJ IDEA.
 * User: sseely
 * Date: 11/14/13
 * Time: 9:57 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.map.controller.DataCardController', {
    extend: 'Deft.mvc.ViewController',

    requires: 'Savanna.map.view.part.EditFeature',

    control: {
        editFeatureData: {
            click: 'editFeature'
        },

        removeSelectedFeature: {
            click: 'removeSelectedFeature'
        }
    },

    editFeature: function () {
        var mapComponent = this.getEditFeatureData().up('mapcomponent');
        mapComponent.down('map_popup_datacard').hide();
        var currentFeature = mapComponent.down('map_popup_datacard').getCurrentFeature();
        if (mapComponent.down('map_edit_feature') != null) {
            mapComponent.down('map_edit_feature').destroy();
        }
        var editFeatureView = Ext.create('Savanna.map.view.part.EditFeature');
        var featureDetailsView = mapComponent.down('#featureDetailsView');
        featureDetailsView.add(editFeatureView);
        editFeatureView.show();
        this.setUpEditWindow(currentFeature, editFeatureView);
        featureDetailsView.expand();
    },

    setUpEditWindow: function (feature, editFeatureView) {
        var items = [];
        var attributes = feature.attributes;
        for (var i = 0; i < attributes.length; i++) {
            items.push(attributes[i]);
        }
        var data = {'items': items};
        var columns = [
            {text: 'Field Name', dataIndex: 'field', flex: 1, menuDisabled: true},
            {text: 'Value', dataIndex: 'value', flex: 1, menuDisabled: true, editor: 'textfield'}
        ];
        var gridStore = Ext.create('Ext.data.Store', {
            fields: ['field','value'],
            data: data,
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    root: 'items'
                }
            }});

        editFeatureView.reconfigure(gridStore, columns);
    },

    removeSelectedFeature: function () {
        var mapComponent = this.getEditFeatureData().up('mapcomponent');
        var mapView = mapComponent.down('ol3mapcomponent');
        var userVectorLayer = mapView.getUserLayer();
        var feature = mapComponent.down('map_popup_datacard').getCurrentFeature()
        userVectorLayer.removeFeatures([feature]);
        EventHub.fireEvent('hideDataCard', arguments);
    }
});