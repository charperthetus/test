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

    initComponent: function () {
        this.callParent(arguments);
        var me = this;

        this.on('beforerender', Ext.bind(function() {
            if(me.getEditable() && me.getEditMode()) {
                me.setTitle(me.getDisplayLabel());

                if(me.down('#displayValueEdit')) {
                    me.down('#displayValueEdit').setValue(me.getValue());
                }
            } else {
                me.setTitle(me.getDisplayLabel() + ':&nbsp;&nbsp;');
                if(me.down('#displayValue')) {
                    me.down('#displayValue').setValue((null === me.getValue()) ? '' : me.getValue().toString());
                }
            }
        }, this));
    },

    makeEditViewItems: function() {
        var me = this;
        me.add(Ext.create('Ext.form.RadioGroup', {
            itemId: 'displayValueEdit',
            items: [{
                        boxLabel: 'True',
                        checked: true === me.value,
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
                        checked: false === me.value,
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