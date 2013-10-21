/**
 * Created with IntelliJ IDEA.
 * User: mfawver
 * Date: 9/26/13
 * Time: 12:29 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.metadata.view.Boolean', {
    extend: 'Savanna.metadata.view.MetadataItemView',
    alias: 'widget.metadata_boolean',

    requires: [
        'Savanna.controller.Factory'
    ],

    items: [
    ],

    initComponent: function () {
        this.callParent(arguments);
        var me = this;

        this.on('beforerender', Ext.bind(function() {
            if(me.getEditable() && me.getEditMode()) {
                if(me.down('#displayValueEdit')) {
                    me.down('#displayValueEdit').setValue(me.getValue());
                    me.down('#displayValueEdit').fieldLabel = me.getDisplayLabel();
                }
            } else {
                if(me.down('#displayLabelItem')) {
                    me.down('#displayLabelItem').html = me.getDisplayLabel() + ':&nbsp;&nbsp;';
                }
                if(me.down('#displayValue')) {
                    me.down('#displayValue').html = (null === me.getValue()) ? '&nbsp;' : me.getValue().toString();
                }
            }
        }, this));
    },

    makeEditViewItems: function() {
        var me = this;
        this.add(Ext.create('Ext.form.RadioGroup', {
            fieldLabel: '',
            itemId: 'displayValueEdit',
            width: 350,
            labelWidth: 200,
            items: [{
                        boxLabel: 'True',
                        checked: me.value == true,
                        name: 'radios',
                        listeners: {
                            change: function(d) {
                                if(d.getValue()) {
                                    me.setValue(true);
                                }
                            }
                        }

                    }, {
                        boxLabel: 'False',
                        checked: me.value == false,
                        name: 'radios',
                        listeners: {
                            change: function(d) {
                                if(d.getValue()) {
                                    me.setValue(false);
                                }
                            }
                        }

                    }]
        }));
    }


});