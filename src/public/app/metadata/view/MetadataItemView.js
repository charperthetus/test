/**
 * Created with IntelliJ IDEA.
 * User: mfawver
 * Date: 9/30/13
 * Time: 8:06 AM
 * To change this template use File | Settings | File Templates.
 */


Ext.define('Savanna.metadata.view.MetadataItemView', {
    extend: 'Ext.container.Container',
    alias: 'widget.metadata_itemview',

    layout: 'hbox',
    width: "100%",
    border: false,
    padding: '0 3 0 3',
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

    applyEditMode: function(editMode) {
        if(this.getEditable())
            return editMode;
        else
            return undefined;
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
        this.layout = 'vbox';
        this.add(Ext.create('Ext.form.Label', {
            itemId: 'editLabelItem',
            width: '100%',
            //minWidth: 180,
            height: 25
        }));

        this.add(Ext.create('Ext.form.field.TextArea', {
            //fieldLabel: '',
            itemId: 'displayValueEdit',
            allowBlank: true,
            width: '100%',
            //labelWidth: 180,
            grow: true,
            growAppend: '',
            rows: 0,
            growMin: 22,
            growMax: 200,
            listeners: {
                blur: function(d) {
                    //console.log('Item Blur');
                    var newVal = d.getValue().trim();
                    me.setValue(newVal);
                }
            }
        }));
    },

    makeViewViewItems: function() {
        this.layout = 'hbox';
        this.add(Ext.create('Ext.form.Label', {
            itemId: 'displayLabelItem',
            //width: 180,
            //minWidth: 180,
            height: 25
        }));
        this.add(Ext.create('Ext.form.Label', {
            itemId: 'displayValue',
            width: '100%'

        }));
    }
});