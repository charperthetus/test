/**
 * Created with IntelliJ IDEA.
 * User: bjohnson
 * Date: 10/23/13
 * Time: 4:11 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.itemView.view.header.DisplayLabel', {
    extend: 'Ext.Component',

    alias: 'widget.itemview_displaylabel',

    tpl: [
        '<h1>{displayLabel}</h1>'
    ],

    data: { displayLabel: '' } // default data
});