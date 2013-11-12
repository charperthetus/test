Ext.define('Savanna.classification.controller.WindowController', {
    extend: 'Deft.mvc.ViewController',

    requires: ['Savanna.classification.store.OptionsStore'],

    control: {
        view: {
            close: 'onClose'
        },
        errorLabel: true,
        classificationField: {
            select: 'onClassificationSelect'
        },
        sciField: {
            change: 'requestRestrictionsByMarkings'
        },
        fgiField: {
            change: 'requestRestrictionsByMarkings'
        },
        disField: {
            change: 'requestRestrictionsByMarkings'
        },
        relField: {
            change: 'requestRestrictionsByMarkings'
        },
        finishButton: {
            click: 'onFinishButtonClick'
        },
        cancelButton: {
            click: 'onCancelButtonClick'
        }
    },

    init: function() {
        // lock the fields while data is loading
        this.hideFields();

        // verify whether classification options have already been loaded
        var options = Ext.getStore('classificationOptions');
        if(!options) {
            // create a new options store and load it
            options = Ext.create('Savanna.classification.store.OptionsStore');
            options.load({
                callback: this.optionsLoaded,
                scope: this
            });
        }
        else {
            // classification options have already been loaded
            // populate the classification fields with loaded data
            this.loadFieldStores(options.first());

            // load the restrictions
            this.requestRestrictionsByPortionMarking();
        }
        this.callParent(arguments);
    },

    optionsLoaded: function(records) {
        this.loadFieldStores(records.shift());
        this.requestRestrictionsByPortionMarking();
    },

    loadFieldStores: function(options) {
        // classification
        this.getClassificationField().store.loadData(options.get('classificationMarkings'));

        // sci
        this.getSciField().store.loadData(options.get('sciMarkings'));

        // fgi markings must be mapped to an object to be used in a combo
        var fgiData = Ext.Array.map(options.get('fgiMarkings'), this.mapCallback);
        this.getFgiField().store.loadData(fgiData);

        // dissemination
        this.getDisField().store.loadData(options.get('dissemMarkings'));

        // release to markings must be mapped to an object to be used in a combo
        var relData = Ext.Array.map(options.get('relMarkings'), this.mapCallback);
        this.getRelField().store.loadData(relData);
    },

    mapCallback: function(item) {
        // the default display label value is text
        return {
            text: item
        };
    },

    onClassificationSelect: function() {
        this.styleClassificationField();
        this.requestRestrictionsByMarkings();
    },

    styleClassificationField: function() {
        var classificationField = this.getClassificationField();
        var background, color;
        switch(classificationField.getValue()) {
            case "USCLASS_TS":
                background = "#FFFA53";
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
        classificationField.setFieldStyle('background:' + background);
        classificationField.setFieldStyle('textAlign:center');
        classificationField.setFieldStyle('color:' + color);
    },

    requestRestrictionsByPortionMarking: function() {
        var portionMarking = this.getView().getPortionMarking();
        if(portionMarking && portionMarking !== 'UNSPECIFIED') {
            this.makeRestrictionsAjaxRequest('restrictions/string', Ext.JSON.encode(portionMarking),
                this.onSuccessRestrictionsByPortionMarking);
        }
        else {
            this.getFinishButton().setDisabled(true);
            this.getClassificationField().setValue('UNSPECIFIED');
            this.styleClassificationField();
        }
    },

    onSuccessRestrictionsByPortionMarking: function(response) {
        // decode the json response text
        var responseObj = Ext.JSON.decode(response.responseText);

        this.getClassificationField().suspendEvents(false);
        this.getSciField().suspendEvents(false);
        this.getDisField().suspendEvents(false);

        var selectedMarkingIds = responseObj.selectedMarkingIds;
        for(var i = 0; i < selectedMarkingIds.length; i++) {
            // load classification if applicable
            if(this.getClassificationField().findRecordByValue(selectedMarkingIds[i])) {
                this.getClassificationField().setValue(selectedMarkingIds[i]);
                this.styleClassificationField();
            } else {
                // load all applicable sci and dissemination values
                this.getSciField().setValue(selectedMarkingIds[i]);
                this.getDisField().setValue(selectedMarkingIds[i]);
            }
        }

        this.getClassificationField().resumeEvents();
        this.getSciField().resumeEvents();
        this.getDisField().resumeEvents();

        // load fgi values
        var ismformat = responseObj.ismformatData.ismformat;
        if(ismformat.fgisourceOpen) {
            this.getFgiField().suspendEvents(false);
            // fgi data is formatted as so: fgi1 fgi2 fgi3 ...
            this.getFgiField().setValue(ismformat.fgisourceOpen.split(' '));
            this.getFgiField().resumeEvents();
        }
        // load rel values
        if(ismformat.releasableTo) {
            this.getRelField().suspendEvents(false);
            // rel data is formatted as so: rel1 rel2 rel3 ...
            this.getRelField().setValue(ismformat.releasableTo.split(' '));
            this.getRelField().resumeEvents();
        }

        var errors = responseObj.formattedString.errors;
        var restrictions = responseObj.formattedString.restrictions;
        this.updateForm(errors, restrictions);
    },

    requestRestrictionsByMarkings: function() {
        var markings = this.getClassificationMarkings();
        this.makeRestrictionsAjaxRequest('restrictions/markings', markings, this.onSuccessRestrictionsByMarkings);
    },

    getClassificationMarkings: function() {
        var classificationLastValue = this.getClassificationField().lastValue;
        var sciLastValue = this.getSciField().lastValue;
        var fgiLastValue = this.getFgiField().lastValue;
        var dissemLastValue = this.getDisField().lastValue;
        var relLastValue = this.getRelField().lastValue;

        var sciMarkings = sciLastValue ? sciLastValue.split(', ') : [];
        var dissemMarkings = dissemLastValue ? dissemLastValue.split(', ') : [];
        var markingIds = Ext.Array.merge([classificationLastValue], sciMarkings, dissemMarkings);

        return {
            markingIds: markingIds,
            fgiMarkings: fgiLastValue ? fgiLastValue.split(', ') : [],
            relMarkings: relLastValue ? relLastValue.split(', ') : []
        };
    },

    makeRestrictionsAjaxRequest: function(endpoint, jsonData, successFunction) {
        Ext.Ajax.request({
            url: SavannaConfig.capcoUrl + endpoint + ';jsessionid=' + Savanna.jsessionid,
            method: 'POST',
            jsonData: jsonData,
            headers: {
                'Accept': 'application/json'
            },
            success: successFunction,
            scope: this
        })
    },

    onSuccessRestrictionsByMarkings: function(response) {
        var responseObj = Ext.JSON.decode(response.responseText);
        if(responseObj.formattedString.restrictions) {
            var errors = responseObj.formattedString.errors;
            var restrictions = responseObj.formattedString.restrictions;
            this.updateForm(errors, restrictions);
        } else {
            this.getSciField().suspendEvents(false);
            this.getSciField().setValue();
            this.getSciField().resumeEvents();

            this.getFgiField().suspendEvents(false);
            this.getFgiField().setValue();
            this.getFgiField().resumeEvents();

            this.getDisField().suspendEvents(false);
            this.getDisField().setValue();
            this.getDisField().resumeEvents();

            this.getRelField().suspendEvents(false);
            this.getRelField().setValue();
            this.getRelField().resumeEvents();

            this.requestRestrictionsByMarkings();
        }
    },

    updateForm: function(errors, restrictions) {
        if(errors) {
            var error = errors.pop();
            this.getErrorLabel().setText(error);
            this.getErrorLabel().show();
            this.getFinishButton().setDisabled(true);
        }
        else {
            this.getErrorLabel().hide();
            this.getFinishButton().setDisabled(false);
        }

        this.removeNotAllowedSelections(restrictions.notAllowedMarkings);

        this.refreshRestrictions(restrictions.notAllowedMarkings);

        if(restrictions.requiredMarkings) {
            this.setRequiredMarkings(restrictions.requiredMarkings);
        }

        this.enableDisableFields(restrictions.notAllowedMarkings);
    },

    refreshRestrictions: function(notAllowedMarkings) {
        this.filterNotAllowedMarkings(this.getSciField(), 'id', notAllowedMarkings);
        this.filterNotAllowedMarkings(this.getFgiField(), 'text', notAllowedMarkings);
        this.filterNotAllowedMarkings(this.getDisField(), 'id', notAllowedMarkings);
        this.filterNotAllowedMarkings(this.getRelField(), 'text', notAllowedMarkings);
    },

    filterNotAllowedMarkings: function(field, valueField, notAllowedMarkings) {
        var store = field.getStore();
        store.clearFilter();
        store.filter(field.queryFilter);
        store.filter({
            filterFn: function(item) {
                return notAllowedMarkings.indexOf(item.get(valueField)) < 0;
            }
        });
    },

    setRequiredMarkings: function(requiredMarkings) {
        for(var i = 0; i < requiredMarkings.length; i++) {
            this.getSciField().setValue(requiredMarkings[i]);
            this.getDisField().setValue(requiredMarkings[i]);
        }
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

        this.getClassificationField().setDisabled(false);

        var sciField = this.getSciField();
        if(sciField.getStore().getCount()) {
            sciField.show();
        } else {
            sciField.hide();
        }

        var fgiField = this.getFgiField();
        // disable the fgi field if not allowed markings include FGI_FGI
        if(fgiField.getStore().getCount() && notAllowedMarkings.indexOf('FGI_FGI') < 0) {
            fgiField.show();
        } else {
            fgiField.hide();
        }

        var disField = this.getDisField();
        if(disField.getStore().getCount()) {
            disField.show();
        } else {
            disField.hide();
        }

        var relField = this.getRelField();
        // disable the rel field if not allowed markings include DISSEM_REL_TO
        if(relField.getStore().getCount() && notAllowedMarkings.indexOf('DISSEM_REL_TO') < 0) {
            relField.show();
        } else {
            relField.hide();
        }
    },

    onFinishButtonClick: function(){
        var markings = this.getClassificationMarkings();
        this.makeRestrictionsAjaxRequest('restrictions/markings', markings, this.onFinishSuccess);
        this.getView().hide();
    },

    onFinishSuccess: function(response){
        var responseObj = Ext.JSON.decode(response.responseText);
        var portionMarking = responseObj.formattedString.formattedString;

        var event = {
            classificationTitle: this.getClassificationField().getRawValue(),
            portionMarking: portionMarking
        };
        EventHub.fireEvent('classificationedited', event);
        this.getView().destroy();
    },

    onCancelButtonClick: function(){
        this.getView().close();
    },

    onClose: function() {
        EventHub.fireEvent('classificationedited');
    },

    hideFields: function() {
        this.getSciField().hide();
        this.getFgiField().hide();
        this.getDisField().hide();
        this.getRelField().hide();
    }

});