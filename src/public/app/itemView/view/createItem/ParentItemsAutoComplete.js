/**
 * Created with IntelliJ IDEA.
 * User: bjohnson
 * Date: 10/4/13
 * Time: 11:04 AM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.itemView.view.createItem.ParentItemsAutoComplete', {
    extend: 'Savanna.components.autoComplete.AutoComplete',

    alias: 'widget.parentitems_auto_complete',


    controller: 'Savanna.itemView.controller.ParentItemsAutoCompleteController',

    requires: [
        'Savanna.itemView.controller.ParentItemsAutoCompleteController',
        'Savanna.components.tags.Tag'
    ],


    initComponent: function() {
        this.items = this.buildItems();
        this.callParent(arguments);
    }
});
