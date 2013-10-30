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
                //me.down('#displayLabelItem').text = me.displayLabel + ':';
            } else {
                me.down('#displayLabelItem').text = me.displayLabel + ':';
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
        var fieldLabelValue = me.displayLabel + ':';

        var stackAndAddContainer = Ext.create('Ext.container.Container', {
            itemId: 'stackandaddcontainer',
            layout: 'vbox',
            width: "100%",
            border: false
        });

        var stackContainer = Ext.create('Ext.container.Container', {
            itemId: 'stackcontainer',
            layout: 'vbox',
            width: "100%",
            border: false
        });
        me.createEditItems(stackContainer, fieldLabelValue);
        stackAndAddContainer.add(stackContainer);

        var newItemButton = Ext.create('Ext.Button', {
            text: 'Add',
            padding: '0 0 0 180',
            listeners: {
                click: function () {
                    me.addNewItem();
                }
            }
        });
        stackAndAddContainer.add(newItemButton);
        me.add(stackAndAddContainer);

    },

    createEditItems: function(stackContainer, firstFieldLabelValue) {
        var me = this;
        var cloneArray = Ext.Array.clone(me.getValue());
        Ext.Array.each(cloneArray, function(stringElement, index, allItems) {
            var editAndDeleteContainer = me.makeEditAndDeleteContainer(index);
            me.makeEditAndDeleteItem(index, editAndDeleteContainer, stringElement, firstFieldLabelValue, allItems );
            stackContainer.add(editAndDeleteContainer);

            firstFieldLabelValue = '&nbsp;';
        });

    },

    makeEditAndDeleteContainer: function(index) {
        return Ext.create('Ext.container.Container', {
            layout: 'hbox',
            width: "100%",
            itemId: 'EandDContainer' + parseInt(index, 10),
            border: false
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
        this.down('#stackcontainer').removeAll();
        var fieldLabelValue = this.displayLabel + ':';
        this.createEditItems(this.down('#stackcontainer'), fieldLabelValue);
    },

    makeEditAndDeleteItem: function(index, container, stringElement, fieldLabelValue, allItems) {
        var me = this;
        var textField = Ext.create('Ext.form.field.Text', {
            allowBlank: true,
            width: '90%',
            labelWidth: 180,
            value: stringElement,
            labelSeparator: '', // we'll just append it to the label itself.  Saves trouble on all the items after the first.

            listeners: {
                blur: function(d) {
                    allItems[index] = d.getValue().trim();
                    me.setValue(allItems);
                }
            }
        });
        textField.fieldLabel = fieldLabelValue;
        container.add(textField);

        var deleteButton = Ext.create('Ext.Button', {
            text: 'X',
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
        this.add(Ext.create('Ext.form.Label', {
            itemId: 'displayLabelItem',
            width: 180,
            minWidth: 180,
            height: 25
        }));

        var contains = Ext.create('Ext.container.Container', {
            layout: 'vbox',
            width: "100%",
            border: false
        });
        if(null !== me.value && 0 !== me.value.length) {
            Ext.Array.each(me.value, function(stringElement) {
                var theLabel = Ext.create('Ext.form.Label', {
                    text: '',
                    width: "100%",
                    height: 25
                });
                theLabel.setText( stringElement );
                contains.add( theLabel );
            });
        }
        me.add(contains);

    }

});