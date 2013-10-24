/**
 * Created with IntelliJ IDEA.
 * User: ksonger
 * Date: 10/24/13
 * Time: 1:32 PM
 * To change this template use File | Settings | File Templates.
 */
/**
 * Created with IntelliJ IDEA.
 * User: swatson
 * Date: 10/23/13
 * Time: 1:11 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.itemView.view.header.AddIntendedUses', {
    extend: 'Ext.window.Window',

    alias: 'widget.itemview_intendeduses_add_picker',

    title: 'Add Intended Uses',

    requires: [
        'Savanna.itemView.store.IntendedUses'
    ],

    store: 'Savanna.itemView.store.IntendedUses',

    autoShow: true,

    mixins: {
        storeable: 'Savanna.mixin.Storeable'
    },

    items: [
        {
            xtype: 'panel',
            padding: 30,
            title: 'Available Intended Uses',
            itemId: 'intendedUseGroups',
            layout: 'vbox'
        }
    ],

    buttons: [
        {
            text: 'OK'
        },
        {
            text: 'cancel'
        }
    ],

    constructor: function (options) {
        this.opts = options || {};
        this.mixins.storeable.initStore.call(this);
        this.callParent(arguments);
    },

    afterRender: function () {

        var me = this;
        this.store.each(function (record) {
            var myPanel = me.down('#intendedUseGroups');
            myPanel.add({
                xtype: 'checkbox',
                boxLabel: record.get('label'),
                name: record.get('value'),
                boxLabelAlign: 'after',
                cls: 'customInputField'
            });
        });
        this.callParent(arguments);

    }
});