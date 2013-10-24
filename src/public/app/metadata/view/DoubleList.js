/**
 * Created with IntelliJ IDEA.
 * User: mfawver
 * Date: 9/26/13
 * Time: 1:23 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.metadata.view.DoubleList', {
    extend: 'Savanna.metadata.view.MetadataItemView',
    alias: 'widget.metadata_doublelist',

    requires: [
        'Savanna.controller.Factory'
    ],

    items: [
    ],
    initComponent: function () {
        this.callParent(arguments);
        var me = this;

        me.on('beforerender', Ext.bind(function() {
            me.down('#displayLabelItem').text = me.displayLabel + ':';
//            if(null !== me.value && 0 != me.value.length) {
//                Ext.Array.each(me.value, function(stringElement) {
//                    var theLabel = Ext.create('Ext.form.Label', {
//                        text: '',
//                        width: "100%"
//                    });
//                    theLabel.setText( stringElement.toLocaleString() );
//                    me.add( theLabel );
//                });
//            } else {
//                me.add( Ext.create('Ext.form.Label', {
//                                    html: '&nbsp;',
//                                    width: "100%"
//                                })
//                );
//            }
        }, this));
    },

    makeEditViewItems: function() {
        this.makeViewViewItems(); // for now, until we get the edit mode figured out.
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
        if(null !== me.value && 0 != me.value.length) {
            Ext.Array.each(me.value, function(stringElement) {
                var theLabel = Ext.create('Ext.form.Label', {
                    text: '',
                    width: "100%",
                    height: 25
                });
                theLabel.setText( stringElement.toLocaleString() );
                contains.add( theLabel );
            });
        }
        me.add(contains);

    }

});