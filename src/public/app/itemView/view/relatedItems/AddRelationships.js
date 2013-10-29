/**
 * Created with IntelliJ IDEA.
 * User: swatson
 * Date: 10/23/13
 * Time: 1:11 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.itemView.view.relatedItems.AddRelationships', {
    extend: 'Ext.window.Window',

    alias: 'widget.itemview_relationship_type_picker',

    title: 'Add Relationships',

    requires: ['Savanna.itemView.store.Relationships'],

    store: 'Savanna.itemView.store.Relationships',

    autoShow: true,

    mixins: {
        storeable: 'Savanna.mixin.Storeable'
    },

    items: [{
        xtype: 'panel',
        padding: 30,
        title: 'Available Relationships',
        itemId: 'relationshipGroups',
        layout: 'vbox'
    }],

    buttons: [
        {
            text: 'OK',
            itemId: 'addNewRelationshipTypes'
        },
        {
            text: 'CANCEL',
            handler: function() {
                this.up('window').close();
            }
        }
    ],

    constructor: function (options) {
        this.opts = options || {};
        this.mixins.storeable.initStore.call(this);
        this.callParent(arguments);
    },

    afterRender: function() {

        var me = this;
        var itemStore = Ext.data.StoreManager.lookup('Savanna.itemView.store.MainItemStore');
        Ext.each(itemStore.getAt(0).propertyGroupsStore.getAt(2).valuesStore.data.items, function (relatedItemsGroup) {
            console.log('relatedItemsGroup', relatedItemsGroup, relatedItemsGroup.data.label);
        });
        this.store.each(function(record) {
            var myPanel = me.down('#relationshipGroups');
            me.down('#relationshipGroups').add({
                xtype: 'checkbox',
                boxLabel: record.get('value'),
                name: record.get('key'),
                boxLabelAlign: 'after',
                cls: 'customInputField'
            });
        });
        this.callParent(arguments);

    }
});