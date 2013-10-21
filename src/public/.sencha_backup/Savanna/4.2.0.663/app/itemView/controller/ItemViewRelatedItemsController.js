/**
 * @class Savanna.itemView.controller.ItemViewRelatedItemsController
 * @extends extendsClass
 * Description
 */
Ext.define('Savanna.itemView.controller.ItemViewRelatedItemsController', {
    extend: 'Deft.mvc.ViewController',

    views: [
        'Savanna.itemView.view.relatedItems.ViewRelatedItems'
    ],

    init: function() {
        return this.callParent(arguments);
    }
});