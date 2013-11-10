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

    requires: [ 'Savanna.classification.view.ClassificationWindow'],

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
        // classification is not configured to be editable through metadata
        // ignore its editable property
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
                // todo: this view should be using a controller for event handling
                click: function () {
                    // create and show a new classification window
                    var classificationWindow = Ext.create('Savanna.classification.view.ClassificationWindow', {
                        portionMarking: this.getValue(),
                        modal: true
                    });
                    classificationWindow.show();
                    classificationWindow.center();

                    // wait for classification editing to complete
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
        // an event object is returned if the classification was edited in the panel
        if(event) {
            // update the view's value
            this.setValue(event.portionMarking);

            // update the view's label text
            if(this.down('#displayValue')) {
                this.down('#displayValue').setValue(this.getValue() ? this.getValue() : '&nbsp;');
            }
        }
    }


});