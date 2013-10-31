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
                me.down('#labelItem').html = me.getDisplayLabel() + ':';
            }
            if(me.down('#displayValue')) {
                me.down('#displayValue').html = (null === me.getValue()) ? '&nbsp;' : me.getValue();
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
        var labelAndButtonContainer = Ext.create('Ext.container.Container', {
            itemId: 'labelAndButtonContainer',
            layout: 'hbox',
            width: "100%",
            border: false
        });

        labelAndButtonContainer.add(Ext.create('Ext.form.Label', {
            itemId: 'labelItem',
            height: 25
        }));

        labelAndButtonContainer.add( Ext.create('Ext.Button', {
            text: 'Edit',
            padding: '0 0 0 180',
            listeners: {
                click: function () {
                    var classificationWindow = Ext.create('Savanna.classification.view.ClassificationWindow', {
                        portionMarking: this.getValue()
                    });
                    classificationWindow.show();
                    classificationWindow.center();

                    EventHub.on('classificationedited', this.onClassificationChanged, this);
                },
                scope: this
            }
        }));

        this.add(labelAndButtonContainer);

        this.add(Ext.create('Ext.form.Label', {
            itemId: 'displayValue',
            width: '100%'
        }));
    },

    makeViewViewItems: function() {
        this.add(Ext.create('Ext.form.Label', {
            itemId: 'labelItem',
            height: 25
        }));
        this.add(Ext.create('Ext.form.Label', {
            itemId: 'displayValue',
            width: '100%'

        }));
    },

    onClassificationChanged: function(event) {
        EventHub.un('classificationedited', this.onClassificationChanged);
        if(event) {
            this.setValue(event.portionMarking);

            if(this.down('#displayValue')) {
                this.down('#displayValue').setText(this.getValue() ? this.getValue() : '&nbsp;');
            }
        }
    }


});