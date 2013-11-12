Ext.define('Savanna.metadata.controller.InformationPanelController', {
    extend: 'Deft.mvc.ViewController',

    requires: [
        'Savanna.metadata.store.InformationStore',
        'Savanna.metadata.view.Boolean',
        'Savanna.metadata.view.BooleanList',
        'Savanna.metadata.view.Classification',
        'Savanna.metadata.view.Date',
        'Savanna.metadata.view.DateList',
        'Savanna.metadata.view.Double',
        'Savanna.metadata.view.DoubleList',
        'Savanna.metadata.view.Integer',
        'Savanna.metadata.view.IntegerList',
        'Savanna.metadata.view.MetadataItemView',
        'Savanna.metadata.view.String',
        'Savanna.metadata.view.StringList',
        'Savanna.metadata.view.StringVerticalEdit',
        'Savanna.metadata.view.Title',
        'Savanna.metadata.view.Uri',
        'Savanna.metadata.view.UriList'
    ],

    control: {
        view: {
            updateitemuri: 'onUpdateItemUri'
        },
        viewCard: true,
        editButton: {
            click: 'setEditCard'
        },
        editCard: true,
        saveButton: {
            click: 'saveEditCard'
        },
        cancelButton: {
            click: 'discardChanges'
        }
    },

    informationStore: null,

    init: function() {
        this.informationStore = Ext.create('Savanna.metadata.store.InformationStore');
        if(this.getView().getItemUri()) {
            this.informationStore.itemUri = this.getView().getItemUri();
            this.loadInformationStore(this.createFields);
        }
        this.callParent(arguments);
    },

    loadInformationStore: function(callback) {
        this.informationStore.load({
            callback: callback,
            scope: this
        })
    },

    createFields: function() {
        for(var i = 0; i < this.informationStore.getCount(); i++) {
            var data = this.informationStore.getAt(i).data;
            var viewClass = this.getViewClass(data.type, data.key);

            if(viewClass) {

                var param = {
                    key: data.key,
                    type: data.type,
                    value: data.value,
                    displayLabel: data.displayLabel,
                    visible: data.visible !== undefined ? data.visible : false,
                    editable: data.editable !== undefined ? data.editable : false
                };

                if(data.key === 'classification' && (!data.value || data.value === '__NONE__')) {
                    param.value = 'UNSPECIFIED';
                }

                this.getViewCard().add(this.createField(viewClass, param, false));
                this.getEditCard().add(this.createField(viewClass, param, true));
            }
        }
    },

    createField: function(className, param, editMode) {
         return Ext.create(className, {
             key: param.key,
             type: param.type,
             value: param.value,
             editMode: editMode,
             visible: param.visible,
             editable: param.editable,
             displayLabel: param.displayLabel
        });
    },

    getViewClass: function(name, key) {
        var className = this.getViewClassByKey(key);
        if(!className) {
            className = this.getViewClassByName(name);
        }
        return className;
    },

    getViewClassByName: function(name) {
        var className = null;

        switch(name) {
            case 'String':
                className = 'Savanna.metadata.view.String';
                break;
            case 'LongString':
                className = 'Savanna.metadata.view.StringVerticalEdit';
                break;
            case 'Date':
                className = 'Savanna.metadata.view.Date';
                break;
            case 'Uri':
                className = 'Savanna.metadata.view.Uri';
                break;
            case 'Integer':
                className = 'Savanna.metadata.view.Integer';
                break;
            case 'Boolean':
                className = 'Savanna.metadata.view.Boolean';
                break;
            case 'Double':
                className = 'Savanna.metadata.view.Double';
                break;
            case 'String_List':
                className = 'Savanna.metadata.view.StringList';
                break;
            case 'Boolean_List':
                className = 'Savanna.metadata.view.BooleanList';
                break;
            case 'Date_List':
                className = 'Savanna.metadata.view.DateList';
                break;
            case 'Integer_List':
                className = 'Savanna.metadata.view.IntegerList';
                break;
            case 'Double_List':
                className = 'Savanna.metadata.view.DoubleList';
                break;
            case 'Uri_List':
                className = 'Savanna.metadata.view.UriList';
                break;
        }
        return className;
    },

    getViewClassByKey: function(key) {
        var className = null;
        switch(key) {
            case 'classification':
                className = 'Savanna.metadata.view.Classification';
                break;
            case 'docTitle':
                className = 'Savanna.metadata.view.Title';
                break;
            case 'document-description':
                className = 'Savanna.metadata.view.StringVerticalEdit';
                break;
        }
        return className;
    },

    updateFields: function() {
        var viewFields = this.getViewCard().items;
        var editFields = this.getEditCard().items;
        for(var i = 0; i < viewFields.getCount(); i++) {
            var viewField = viewFields.getAt(i);
            var editField = editFields.getAt(i);
            viewField.setValue(editField.getValue());
        }
    },

    discardChanges: function() {
        var viewFields = this.getViewCard().items;
        var editFields = this.getEditCard().items;
        for(var i = 0; i < editFields.getCount(); i++) {
            var viewField = viewFields.getAt(i);
            var editField = editFields.getAt(i);
            editField.setValue(viewField.getValue());
        }
        this.setViewCard();
    },

    saveClassification: function(portionMarking) {
        Ext.Ajax.request({
            url: SavannaConfig.capcoUrl + this.getView().getItemUri() + ';jsessionid=' + Savanna.jsessionid,
            method: 'POST',
            jsonData: Ext.JSON.encode(portionMarking),
            callback: this.updateClassification,
            scope: this
        });
    },

    updateClassification: function() {
        EventHub.fireEvent('classificationchanged', this.getView().getItemUri());
    },

    onUpdateItemUri: function(newItemUri, oldItemUri) {
        if(newItemUri !== oldItemUri) {
            this.informationStore.itemUri = newItemUri;
            this.loadInformationStore(this.createFields);
        }
    },

    setEditCard: function() {
        this.getView().getLayout().setActiveItem(this.getEditCard());
    },

    saveEditCard: function() {
        var fields = this.getEditCard().items;
        for(var i = 0; i < fields.getCount(); i++) {
            var field = fields.getAt(i);
            for(var j = 0; j < this.informationStore.getCount(); j++) {
                var data = this.informationStore.getAt(i);
                if(data.get('key') === field.key) {
                    if(data.get('key') === 'classification') {
                        this.saveClassification(field.value);
                    } else if(data.get('value') !== field.value
                        || (Ext.isArray(field.value) && !Ext.Array.equals(data.get('value'), field.value))) {
                        data.set('value', field.value);
                    }
                    break;
                }
            }
        }
        this.informationStore.sync();
        this.updateFields();
        this.setViewCard();
    },

    setViewCard: function() {
        this.getView().getLayout().setActiveItem(this.getViewCard());
    }
});