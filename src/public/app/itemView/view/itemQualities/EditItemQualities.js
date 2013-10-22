/**
 * Created with IntelliJ IDEA.
 * User: bjohnson
 * Date: 10/8/13
 * Time: 10:10 AM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.itemView.view.itemQualities.EditItemQualities', {
    extend: 'Ext.panel.Panel',

    alias: 'widget.itemview_edit_qualities',

    layout: 'vbox',

    width: '100%',

    tbar: [
        {
            xtype: 'tbfill'
        },
        {
            xtype: 'combo',
            itemId: 'addPropAutoChooser',
            displayField: 'title',
            typeAhead: false,
            hideLabel: true,
            hideTrigger: true,
            anchor: '100%',
            pageSize: 10,
            width: '35%',
            minChars: 1,
            enableKeyEvents: true,
            emptyText: 'Click to Add a Property',
            queryMode: 'local'
        },
        {
            xtype: 'tbfill'
        }
    ],

    items: [],

    addProp: function (prop) {
        if (this.queryById('prop_' + prop.propName.replace(/[\s']/g, "_")) === null) {
            var newProp = Ext.create('Savanna.itemView.view.components.LabeledFieldWithTags', {
                itemId: 'prop_' + prop.propName.replace(/[\s']/g, "_"),
                propData: prop
            });

            this.add(newProp);
        }
    },

    removeProp: function (closeButton) {
        var myProp = this.queryById(closeButton.up('auto_complete_with_tags').itemId);
        this.queryById('item_properties').remove(myProp);
    }
});