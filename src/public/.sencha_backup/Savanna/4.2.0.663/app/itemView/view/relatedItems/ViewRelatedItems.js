/**
 * Created with IntelliJ IDEA.
 * User: bjohnson
 * Date: 10/10/13
 * Time: 4:17 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.itemView.view.itemView.ViewRelatedItems', {
    extend: 'Ext.panel.Panel',

    alias: 'widget.itemview_related_processes',

    store: 'Savanna.itemView.store.MainItemStore',

    title: 'Related Items (#)'
});