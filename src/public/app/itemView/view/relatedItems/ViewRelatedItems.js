/**
 * Created with IntelliJ IDEA.
 * User: bjohnson
 * Date: 10/10/13
 * Time: 4:17 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.itemView.view.relatedItems.ViewRelatedItems', {
    extend: 'Ext.panel.Panel',

    alias: 'widget.itemview_view_related_items',

    require: ['Savanna.itemView.controller.ViewRelatedItemsController'],

    controller: 'Savanna.itemView.controller.ViewRelatedItemsController'

});