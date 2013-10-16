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

    id: '',

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
        var me = this;
        if(this.getEditable() && this.getEditMode()) {
            this.add(Ext.create('Ext.form.field.Text', {
                fieldLabel: '',
                itemId: 'displayValueEdit',
                allowBlank: true,
                width: '100%',
                labelWidth: 200,
                listeners: {
                            blur: function(d) {
                                var newVal = d.getValue().trim();
                                //console.log('newValue', newVal);
                                me.setValue(newVal);
                            }
                        }
            }));
        } else {
            this.add(Ext.create('Ext.form.Label', {
                itemId: 'displayLabelItem',
                width: 200,
                minWidth: 200,
                height: 25
            }));
            this.add(Ext.create('Ext.form.Label', {
                itemId: 'displayValue',
                width: '100%'

            }));
        }
    }
});