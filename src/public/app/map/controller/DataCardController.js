/**
 * Created with IntelliJ IDEA.
 * User: sseely
 * Date: 11/14/13
 * Time: 9:57 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.map.controller.DataCardController', {
    extend: 'Deft.mvc.ViewController',

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
        EventHub.fireEvent('hideDataCard');
        var currentFeature = mapComponent.down('map_popup_datacard').currentFeature;
        var editFeatureView = mapComponent.down('map_edit_feature');
        editFeatureView.show();
        this.setUpEditWindow(currentFeature, mapComponent);
    },

    setUpEditWindow: function (feature, mapComponent) {
        var editFeatureWindow = mapComponent.down('map_edit_feature');
        var fields = [];
        var values = [];
        for (var key in feature.attributes) {
            fields.push(key);
            values.push(feature.attributes[key]);
        }

        /*
        Set up the items object in the fieldset
         */
        var items = [];
        for (var i = 0; i < fields.length; i++) {
            items.push({
                'field': fields[i], 'value': values[i]
            })
        }
        var data = {'items': items};
        var columns = [
            {text: 'Field Name', dataIndex: 'field', flex: 1, menuDisabled: true},
            {text: 'Value', dataIndex: 'value', flex: 1, menuDisabled: true, editor: 'textfield'}
        ];

        editFeatureWindow.reconfigure(Ext.create('Ext.data.Store', {
            fields: ['field','value'],
            data: data,
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    root: 'items'
                }
            }}), columns);

    },

    removeSelectedFeature: function () {
        var mapComponent = this.getEditFeatureData().up('mapcomponent');
        var map = mapComponent.down('ol3mapcomponent').map;
        var userVectorLayer = map.getLayers().array_[1];
        var features = userVectorLayer.featureCache_.idLookup_;
        for (var key in features) {
            if (features[key].renderIntent_ === 'selected') {
                userVectorLayer.removeFeatures([features[key]]);
            }
        }
        EventHub.fireEvent('hideDataCard', arguments);
    }

});