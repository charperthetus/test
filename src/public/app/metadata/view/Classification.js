/**
 * Created with IntelliJ IDEA.
 * User: mfawver
 * Date: 10/25/13
 * Time: 1:19 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.metadata.view.Classification', {
    extend: 'Savanna.metadata.view.MetadataItemView',
    alias: 'widget.metadata_classification',

    requires: [ 'Savanna.classification.view.ClassificationWindow', 
                'Ext.layout.container.HBox'],

    layout: 'hbox',

    padding: '0 10 10 10',

    initComponent: function () {
        this.callParent(arguments);
        var me = this;

        me.on('beforerender', Ext.bind(function() {
            me.down('#displayValue').setFieldLabel(me.getDisplayLabel());
            me.down('#displayValue').setValue((null === me.getValue()) ? '&nbsp;' : me.getValue());
        }, this));
    },

    makeItems: function () {
        this.removeAll();
        if(this.getEditMode()) {
            this.makeEditViewItems();
        } else {
            this.makeViewViewItems();
        }
    },

    makeEditViewItems: function() {
        this.makeViewViewItems();

        var classificationEditBtn = Ext.create('Ext.button.Button', {
            text: 'Edit',
            listeners: {
                click: function () {
                    var classificationWindow = Ext.create('Savanna.classification.view.ClassificationWindow', {
                        portionMarking: this.getValue(),
                        modal: true
                    });
                    classificationWindow.show();
                    classificationWindow.center();

                    EventHub.on('classificationedited', this.onClassificationChanged, this);
                },
                scope: this
            }
        });
        this.add(classificationEditBtn);
    },

    makeViewViewItems: function() {
        var labelAndButtonContainer = Ext.create('Ext.form.field.Display', {
            itemId: 'displayValue',
            layout: 'vbox',
            labelCls: 'label',
            flex: 10,
            labelPad: 2
        });
        this.add(labelAndButtonContainer);
    },

    onClassificationChanged: function(event) {
        EventHub.un('classificationedited', this.onClassificationChanged);
        if(event) {
            this.setValue(event.portionMarking);

            if(this.down('#displayValue')) {
                this.down('#displayValue').setValue(this.getValue() ? this.getValue() : '&nbsp;');
            }
        }
    }


});