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

    editMode: false,
//    setEditMode: function(inEditMode) {
//        console.log('this.editMode', this.editMode);
//        console.log('inEditMode', inEditMode);
//
//        if(inEditMode != this.editMode) {
//            this.editMode = inEditMode;
//            console.log('this.editMode', this.editMode);
//            this.makeItems();
//            //this.refresh();
//        }
//    },

    // metadata values
    key: '',
    value: null,
    displayLabel: '',
    visible: true,
    editable: true,
    type: '',

    initValues: function(config) {
        this.key = config.key;
        this.value = config.value;
        this.displayLabel = config.displayLabel;
        this.visible = config.visible;
        this.editable = config.editable;
        this.editMode = config.editMode;
        this.type = config.type;
    },

    makeItems: function () {
        this.removeAll();
        if(this.editMode) {
            this.add(Ext.create('Ext.form.field.Text', {
                fieldLabel: '',
                itemId: 'displayValueEdit',
                allowBlank: true,
                width: '100%',
                labelWidth: '15%'
            }));
        } else {
            this.add(Ext.create('Ext.form.Label', {
                itemId: 'displayLabelItem',
                width: '15%',
                height: 25
            }));
            this.add(Ext.create('Ext.form.Label', {
                itemId: 'displayValue',
                width: '85%'

            }));
        }
    }
});