/**
 * Created with IntelliJ IDEA.
 * User: bjohnson
 * Date: 10/8/13
 * Time: 6:38 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.itemView.view.components.LabeledFieldWithTags', {
    extend: 'Ext.Panel',

    alias: 'widget.labeled_field_with_tags',

    width: '100%',

    layout: 'hbox',

    config: {
        propData: null
    },

    constructor: function(configs) {
        this.callParent(arguments);
        this.initConfig(configs);  //initializes configs passed in constructor
    },

    initComponent: function() {
        this.items = this.buildItems();
        this.callParent(arguments);
    },

    buildItems: function() {
        return [
            {
                xtype: 'label',
                itemId: 'propDisplayLabel',
                width: '30%',
                text: this.getPropData().propName
            },
            {
                xtype: 'auto_complete_with_tags',
                itemId: 'tagsComponent',
                width: '70%',
                labelType: 'Click to add a Property',
                tagValues: this.getPropData().propValue
            }
        ];
    }
});