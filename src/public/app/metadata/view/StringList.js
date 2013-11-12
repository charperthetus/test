Ext.define('Savanna.metadata.view.StringList', {
    extend: 'Savanna.metadata.view.MetadataItemView',
    alias: 'widget.metadata_stringlist',

    requires: [
        'Ext.form.FieldContainer',
        'Ext.layout.container.Form',
        'Ext.form.field.Display',
        'Ext.form.FieldSet'
    ],

    beforeRender: function() {
        this.setTitle(this.getDisplayLabel() + ':');
    },

    makeEditViewItems: function() {

        if(!this.getValue()) {
            this.setValue([]);
        }
        if(!this.getValue().length) {
            this.getValue().push('');
        }

        var editFieldSet = Ext.create('Ext.form.FieldSet', {
            itemId: 'editFieldSet',
            layout: 'vbox',
            width: '100%',
            border: false
        });
        this.createEditItems(editFieldSet);

        var addButton = Ext.create('Ext.button.Button', {
            text: 'Add',
            cls: 'stringList-addBtn',
            listeners: {
                click: this.addItem,
                scope: this
            }
        });
        this.add(editFieldSet);
        this.add(addButton);
    },

    makeViewViewItems: function() {
        var me = this;

        var contains = Ext.create('Ext.form.FieldContainer', {
            layout: 'form',
            itemId: 'valueContainer',
            width: '100%',
            border: false
        });
        if(null !== me.value && 0 !== me.value.length) {
            Ext.Array.each(me.value, function(stringElement) {
                var theLabel = Ext.create('Ext.form.field.Display', {});
                theLabel.setValue( stringElement );
                contains.add( theLabel );
            });
        }
        me.add(contains);
    },

    addItem: function() {
        var value = Ext.Array.clone(this.getValue());
        value.push('');
        this.setValue(value);
    },

    createEditItems: function(editFieldSet) {
        var me = this;
        var cloneArray = Ext.Array.clone(me.getValue());
        Ext.Array.each(cloneArray, function(stringElement, index, allItems) {
            var editAndDeleteContainer = me.makeEditAndDeleteContainer(index);
            me.makeEditAndDeleteItem(index, editAndDeleteContainer, stringElement, allItems );
            editFieldSet.add(editAndDeleteContainer);
        });
    },

    makeEditAndDeleteContainer: function(index) {
        return Ext.create('Ext.form.FieldContainer', {
            layout: 'hbox',
            width: '100%',
            itemId: 'EandDContainer' + parseInt(index, 10),
            border: false,
            flex: 1
        });
    },

    deleteItem: function(index) {
        this.setValue(Ext.Array.erase(Ext.Array.clone(this.getValue()), index, 1));
    },

    makeEditAndDeleteItem: function(index, container, stringElement, allItems) {
        var me = this;
        var textField = Ext.create('Ext.form.field.Text', {
            allowBlank: true,
            flex: 9,
            value: stringElement,

            listeners: {
                blur: function(d) {
                    allItems[index] = d.getValue().trim();
                    me.setValue(allItems);
                }
            }
        });
        container.add(textField);

        var deleteButton = Ext.create('Ext.button.Button', {
            text: 'X',
            flex: 1,
            listeners: {
                click: function() {
                    me.deleteItem(index);
                }
            }
        });
        container.add(deleteButton);
    },

    updateValue: function(newValue) {
        var container;
        if(this.getEditMode() && this.getEditable()) {
            container = this.down('#editFieldSet');
            container.removeAll();
            this.createEditItems(container);
        } else {
            container = this.down('#valueContainer');
            container.removeAll();
            for(var i = 0; i < newValue.length; i++) {
                var display = Ext.create('Ext.form.field.Display', {
                    value: newValue[i]
                });
                container.add(display);
            }
        }
    }

});