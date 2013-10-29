Ext.define('Savanna.classification.controller.DialogController', {
    extend: 'Deft.mvc.ViewController',

    requires: ['Savanna.classification.store.OptionsStore'],

    control: {
        errorLabel: true,
        classificationField: {
            select: 'onClassificationSelect'
        },
        sciField: {
            change: 'requestRestrictions'
        },
        fgiField: {
            change: 'requestRestrictions'
        },
        disField: {
            change: 'requestRestrictions'
        },
        relField: {
            change: 'requestRestrictions'
        },
        okButton: true,
        cancelButton: true
    },

    init: function() {
        var options = Ext.getStore('classificationOptions');
        if(!options) {
            options = Ext.create('Savanna.classification.store.OptionsStore');
            options.load({callback: this.optionsLoaded, scope: this});
        }
        else {
            this.loadFieldStores(options.first());
        }
        this.callParent(arguments);
    },

    optionsLoaded: function(records) {
        this.loadFieldStores(records.shift());
    },

    loadFieldStores: function(options) {
        // CLASSIFICATION
        this.getClassificationField().store.loadData(options.get('classificationMarkings'));

        // SCI
        this.getSciField().store.loadData(options.get('sciMarkings'));

        // FGI
        var fgiData = Ext.Array.map(options.get('fgiMarkings'), this.mapCallback);
        this.getFgiField().store.loadData(fgiData);

        // DISSEM
        this.getDisField().store.loadData(options.get('dissemMarkings'));

        // REL
        var relData = Ext.Array.map(options.get('relMarkings'), this.mapCallback);
        this.getRelField().store.loadData(relData);
    },

    mapCallback: function(item) {
        return {
            text: item
        };
    },

    onClassificationSelect: function(combobox, records) {
        var background, color;
        switch(combobox.value) {
            case "USCLASS_TS":
                background = "#FFFA53"
                color = "#000000";
                break;
            case "USCLASS_SECRET":
                background = "#ED1C24";
                color = "#FFFFFF";
                break;
            case  "USCLASS_CONF":
                background = "#235FAC";
                color = "#FFFFFF";
                break;
            case "USCLASS_UNCLASS":
                background = "#4CB748";
                color = "#FFFFFF";
                break;
            default:
                background = "#878787";
                color = "#FFFFFF";
                break;
        }
        combobox.setFieldStyle('background:' + background);
        combobox.setFieldStyle('textAlign:center');
        combobox.setFieldStyle('color:' + color);

        this.requestRestrictions();
    },

    requestRestrictions: function() {
        var classificationLastValue = this.getClassificationField().lastValue;
        var sciLastValue = this.getSciField().lastValue;
        var fgiLastValue = this.getFgiField().lastValue;
        var dissemLastValue = this.getDisField().lastValue;
        var relLastValue = this.getRelField().lastValue;

        var sciMarkings = sciLastValue ? sciLastValue.split(', ') : [];
        var dissemMarkings = dissemLastValue ? dissemLastValue.split(', ') : [];
        var markingIds = Ext.Array.merge([classificationLastValue], sciMarkings, dissemMarkings);

        var markings = {
            markingIds: markingIds,
            fgiMarkings: fgiLastValue ? fgiLastValue.split(', ') : [],
            relMarkings: relLastValue ? relLastValue.split(', ') : []
        };

        Ext.Ajax.request({
            url: SavannaConfig.capcoRestrictionsMarkings + ';jsessionid=' + Savanna.jsessionid,
            method: 'POST',
            jsonData: markings,
            headers: {
                'Accept': 'application/json'
            },
            success: this.onRequestSuccess,
            scope: this
        });
    },

    onRequestSuccess: function(response) {
        var responseObj = Ext.JSON.decode(response.responseText);
        if(responseObj.formattedString.restrictions) {
            var errors = responseObj.formattedString.errors;
            var restrictions = responseObj.formattedString.restrictions;
            this.updateForm(errors, restrictions);
        } else {
            this.getSciField().setValue();
            this.getFgiField().setValue();
            this.getDisField().setValue();
            this.getRelField().setValue();
            this.requestRestrictions();
        }
    },

    updateForm: function(errors, restrictions) {
        if(errors) {
            var error = errors.pop();
            this.getErrorLabel().setText(error);
            this.getErrorLabel().show();
            this.getOkButton().setDisabled(true);
        }
        else {
            this.getErrorLabel().hide();
            this.getOkButton().setDisabled(false);
        }
        this.refreshRestrictions(restrictions.notAllowedMarkings);
        this.setRequiredMarkings(restrictions.requiredMarkings);
    },

    refreshRestrictions: function(notAllowedMarkings) {
        this.removeNotAllowedSelections(notAllowedMarkings);
        this.filterFieldStore(this.getSciField().getStore(), 'id', notAllowedMarkings);
        this.filterFieldStore(this.getFgiField().getStore(), 'text', notAllowedMarkings);
        this.filterFieldStore(this.getDisField().getStore(), 'id', notAllowedMarkings);
        this.filterFieldStore(this.getRelField().getStore(), 'text', notAllowedMarkings)
        this.enableDisableFields(notAllowedMarkings);
    },

    setRequiredMarkings: function(requiredMarkings) {

    },

    removeNotAllowedSelections: function(notAllowedMarkings) {
        var sciField = this.getSciField();
        var fgiField = this.getFgiField();
        var disField = this.getDisField();
        var relField = this.getRelField();

        for(var i = 0; i < notAllowedMarkings.length; i++) {
            sciField.removeValue(notAllowedMarkings[i]);
            disField.removeValue(notAllowedMarkings[i]);
        }

        if(notAllowedMarkings.indexOf('FGI_FGI') >= 0) {
            fgiField.setValue();
        }

        if(notAllowedMarkings.indexOf('DISSEM_REL_TO') >= 0) {
            relField.setValue();
        }
    },

    enableDisableFields: function(notAllowedMarkings) {
        var sciField = this.getSciField();
        if(sciField.getStore().getCount()) {
            sciField.setDisabled(false);
        } else {
            sciField.setDisabled(true);
        }

        var fgiField = this.getFgiField();
        if(fgiField.getStore().getCount() && notAllowedMarkings.indexOf('FGI_FGI') < 0) {
            fgiField.setDisabled(false);
        } else {
            fgiField.setDisabled(true);
        }

        var disField = this.getDisField();
        if(disField.getStore().getCount()) {
            disField.setDisabled(false);
        } else {
            disField.setDisabled(true);
        }

        var relField = this.getRelField();
        if(relField.getStore().getCount() && notAllowedMarkings.indexOf('DISSEM_REL_TO') < 0) {
            relField.setDisabled(false);
        } else {
            relField.setDisabled(true);
        }
    },

    filterFieldStore: function(store, valueField, notAllowedMarkings) {
        if(store.filters.length > 1) {
            store.filters.removeAt(1);
        }
        store.filter({
            filterFn: function(item) {
                return notAllowedMarkings.indexOf(item.get(valueField)) < 0;
            }
        });
    },
});