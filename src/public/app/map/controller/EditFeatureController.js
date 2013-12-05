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
        view: {
            updatefeaturepanel: 'updateTheView'
        },
        featureIndexDisplay: true,
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

    selection: null,
    index: 0,
    layer: null,
    feature: null,

    updateTheView: function(selection, index, layer) {
        this.selection = selection;
        this.layer = layer;
        this.index = index;

        if(selection.length === 0) {
            this.getView().collapse();
            this.feature = null;
        }
        else {
            this.feature = selection[index].feature;
            var inUserLayer = false;

            if(layer) {
                var layerFeatures = layer.getSource().getFeatures();
                for(var k = 0; k < layerFeatures.length; k++) {
                    if(this.feature === layerFeatures[k]) {
                        inUserLayer = true;
                        break;
                    }
                }
                if(!inUserLayer) {
                    this.getRemoveFeature().disable();
                }
            }
            else {
                this.getRemoveFeature().disable();
            }
        }

        if(selection.length > 0) {
            this.getFeatureIndexDisplay().setText((index + 1) + ' of ' + selection.length);
            this.getPreviousFeature().setDisabled(!(index > 0));
            this.getNextFeature().setDisabled(!(index < selection.length - 1));
        }
        else {
            this.getFeatureIndexDisplay().setText('');
            this.getPreviousFeature().setDisabled(true);
            this.getNextFeature().setDisabled(true);
        }
        this.setupEditWindow(this.feature)
    },

    setupEditWindow: function(feature) {
        var items = [];
        if(feature) {
            var attributes = feature.getAttributes();
            for(var key in attributes) {
                if(key != 'geometry') {
                    items.push({
                        field: key,
                        value: attributes[key]
                    })
                }
            }
        }

        var store = Ext.create('Ext.data.Store', {
            fields: ['field', 'value'],
            data: items
        });

        this.getView().reconfigure(store, null);
        this.getView().expand();
    },

    removeFeature: function () {
        var response = confirm('Are you sure you want to delete this feature?');
        if (response === true) {
            EventHub.fireEvent('removeCurrentFeature');
        }
    },

    submitFeatureEdit: function () {
        var editStore = this.getView().getStore();
        var attributes = [];
        var items = editStore.data.items;
        for (var i = 0; i < items.length; i++) {
            var key = items[i].data.field;
            this.feature.values_[key] = items[i].data.value;
        }
        this.setupEditWindow(this.feature);
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