/**
 * Created with IntelliJ IDEA.
 * User: mfawver
 * Date: 9/26/13
 * Time: 9:32 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.metadata.view.StringList', {
    extend: 'Savanna.metadata.view.MetadataItemView',
    alias: 'widget.metadata_stringlist',

    items: [
    ],

    initComponent: function () {
        this.callParent(arguments);
        var me = this;

        me.on('beforerender', Ext.bind(function() {
            if(me.getEditable() && me.getEditMode()) {
                me.setTitle(me.displayLabel + ':');
            } else {
                me.setTitle(me.displayLabel + ':');
            }
        }, this));
    },

    makeEditViewItems: function() {
        var me = this;
        if (null === me.getValue()) {
            me.setValue([]);
        }
        if (0 === me.getValue().length) {
            me.value.push('');
        }
        
        var stackAndAddContainer = Ext.create('Ext.form.FieldSet', {
            itemId: 'stackandaddcontainer',
            layout: 'vbox',
            width: '100%',
            border: false
        });

        me.createEditItems(stackAndAddContainer);
        
        var newItemButton = Ext.create('Ext.Button', {
            text: 'Add',
            cls: 'stringList-addBtn',
            listeners: {
                click: function () {
                    me.addNewItem();
                }
            }
        });
        me.add(stackAndAddContainer);
        me.add(newItemButton);
    },

    createEditItems: function(stackContainer) {
        var me = this;
        var cloneArray = Ext.Array.clone(me.getValue());
        Ext.Array.each(cloneArray, function(stringElement, index, allItems) {
            var editAndDeleteContainer = me.makeEditAndDeleteContainer(index);
            me.makeEditAndDeleteItem(index, editAndDeleteContainer, stringElement, allItems );
            stackContainer.add(editAndDeleteContainer);
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
        var cloneArray = Ext.Array.clone(this.getValue());
        if(1 < this.getValue().length) {
            Ext.Array.remove(cloneArray, cloneArray[index]);
            this.setValue(cloneArray);
        } else {
            cloneArray[0] = '';
            this.setValue(cloneArray);
        }

        this.clearAndRecreate();
    },

    addNewItem: function() {
        this.value.push('');
        this.clearAndRecreate();

        var containerId = '#EandDContainer'+parseInt(this.getValue().length-1);
        var item = this.down(containerId);
        if(item) {
            item.down('textfield').focus();
        }
    },

    clearAndRecreate: function() {
        this.down('#stackandaddcontainer').removeAll();
        this.createEditItems(this.down('#stackandaddcontainer'));
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

        var deleteButton = Ext.create('Ext.Button', {
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

    makeViewViewItems: function() {
        var me = this;
        
        var contains = Ext.create('Ext.form.FieldContainer', {
            layout: 'form',
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

    }

});