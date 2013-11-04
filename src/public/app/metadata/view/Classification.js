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

    requires: ['Savanna.classification.view.ClassificationWindow'],

    layout: 'vbox',

    initComponent: function () {
        this.callParent(arguments);
        var me = this;

        me.on('beforerender', Ext.bind(function() {
           if(me.down('#labelItem')) {
                me.down('#labelItem').setText(me.getDisplayLabel() + ':');
            }
            if(me.down('#displayValue')) {
                me.down('#displayValue').setValue((null === me.getValue()) ? '&nbsp;' : me.getValue());
            }
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
        var me = this;
        var labelAndButtonContainer = Ext.create('Ext.form.Panel', {
            itemId: 'labelAndButtonContainer',
            layout: 'fit',
            width: "100%",
            border: false,
            tbar: [{
                    xtype: 'label',
                    itemId: 'labelItem',
                    cls: 'label'
                }, '->',
                {
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
                }]
        });
        labelAndButtonContainer.add(Ext.create('Ext.form.field.Display', {
            itemId: 'displayValue',
            width: '100%'
        }));
        this.add(labelAndButtonContainer);
    },

    makeViewViewItems: function() {
        this.add(Ext.create('Ext.form.Label', {
            itemId: 'labelItem',
            cls: 'label'
        }));
        this.add(Ext.create('Ext.form.field.Display', {
            itemId: 'displayValue',
            width: '100%'

        }));
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