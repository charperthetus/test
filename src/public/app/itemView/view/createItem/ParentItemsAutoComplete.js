
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
