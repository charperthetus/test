/**
 * Created with IntelliJ IDEA.
 * User: ksonger
 * Date: 10/28/13
 * Time: 11:31 AM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.itemView.view.createItem.ParentItemsTreePanel' ,{
    extend: 'Ext.tree.Panel',
    alias : 'widget.itemview_treepanel',
    store: 'Savanna.itemView.store.ParentItemsStore',
    requires:   [
        'Savanna.itemView.store.ParentItemsStore'
    ],
    titleCollapse: true,
    rootVisible: false,
    width: '100%',
    height:400,
    forceFit:true,
    displayField: 'label',

    cls: 'treepanel-hideexpand',

    mixins: {
        storeable: 'Savanna.mixin.Storeable'
    },

    initComponent: function() {
        this.mixins.storeable.initStore.call(this);
        this.store.load();
        this.callParent(arguments);
    }
});