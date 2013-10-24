/**
 * Created with IntelliJ IDEA.
 * User: bjohnson
 * Date: 10/23/13
 * Time: 8:25 AM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.itemView.controller.EditHeaderController', {
    extend: 'Deft.mvc.ViewController',

    views: [
        'Savanna.itemView.view.header.EditHeader'
    ],

    control: {
        view: {
            'EditHeader:StoreSet': 'storeSet'
        },
        parentBtn: {
            click: 'openParentItem'
        },
        parentChooser: {
            click: 'openParentChooser'
        }
    },

    storeSet: function () {
        var me = this;

        Ext.each(me.getView().store.getAt(0).data.values, function(value) {
            me.getView().queryById('addAliasBox').addTag(value.label);
        });

        Ext.each(me.getView().store.getAt(1).data.values, function(value) {
            me.getView().queryById('addIntendedUseBox').addTag(value.label);
        });

        me.getView().queryById('parentBtn').setText(me.getView().store.getAt(3).data.values[0].label);

        me.getView().queryById('itemDescription').setValue(me.getView().store.getAt(4).data.values[0].value);
    },

    openParentItem: function() {
        this.getView().fireEvent('ItemView:OpenItem', this.getView().store.getAt(3).data.values[0].label, this.getView().store.getAt(3).data.values[0].value);
    },

    openParentChooser: function() {
        //ToDo: build and connect the chooser
        console.log('open a chooser for a parent here');
    }
});