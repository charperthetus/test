/**
 * Created with IntelliJ IDEA.
 * User: bjohnson
 * Date: 10/8/13
 * Time: 10:10 AM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.itemView.view.itemView.ItemProperties', {
    extend: 'Ext.Panel',

    alias: 'widget.item_properties',

    layout: 'vbox',

    width: '100%',

    items: [],

    addProp: function (prop) {
        if (this.queryById('prop_' + prop.propName.replace(/[\s']/g, "_")) === null) {
            var newProp = Ext.create('Savanna.itemView.view.itemView.components.LabeledFieldWithTags', {
                itemId: 'prop_' + prop.propName.replace(/[\s']/g, "_"),
                propData: prop
            });

//            newProp.setTerm(prop.propName);
            this.add(newProp);
        }
    },

    removeProp: function (closeButton) {
        var myProp = this.queryById(closeButton.up('auto_complete_with_tags').itemId);
        this.queryById('item_properties').remove(myProp);
    }
});