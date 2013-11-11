Ext.define('Savanna.metadata.view.MetadataItemView', {
    extend: 'Ext.form.FieldSet',
    
    alias: 'widget.metadata_itemview',
    
    border: false,
    itemId: '',
    config: {
        editMode: false,

        // metadata values
        key: '',
        value: null,
        displayLabel: '',
        visible: true,
        editable: true,
        type: ''
    },
    width: '100%',

    applyEditMode: function(editMode) {
        if(this.getEditable()){
            return editMode;
        } else {
            return undefined;
        }  
    },

    initValues: function(config) {
        id = config.key;
        this.setKey( config.key );
        this.setValue( config.value );
        this.setDisplayLabel( config.displayLabel );
        this.setVisible( config.visible );
        this.setEditable( config.editable );
        this.setEditMode( config.editMode );
        this.setType( config.type );
    },

    initComponent: function () {
        this.callParent(arguments);
        var config = this.initialConfig || {};
        this.initValues(config);
        this.makeItems();
    },

    makeItems: function () {
        this.removeAll();
        if(this.getEditable() && this.getEditMode()) {
            this.makeEditViewItems();
        } else {
            this.makeViewViewItems();
        }
    },

    makeEditViewItems: function() {
        var me = this;
        me.setTitle('');

        this.add(Ext.create('Ext.form.field.TextArea', {
            itemId: 'displayValueEdit',
            allowBlank: true,
            width: '100%',
            grow: true,
            growAppend: '',
            rows: 0,
            growMin: 22,
            growMax: 200,
            listeners: {
                blur: function(d) {
                    var newVal = d.getValue().trim();
                    me.setValue(newVal);
                }
            }
        }));
    },

    makeViewViewItems: function() {
        this.add(Ext.create('Ext.form.field.Display', {
            itemId: 'displayValue'
        }));
    },

    updateValue: function(newValue) {
        if(this.getEditMode() && this.getEditable()) {
            this.down('#displayValueEdit').setValue(newValue);
        } else {
            this.down('#displayValue').setValue(newValue);
        }
    }

});
