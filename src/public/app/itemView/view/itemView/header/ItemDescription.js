/**
 * Created with IntelliJ IDEA.
 * User: bjohnson
 * Date: 10/1/13
 * Time: 1:56 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.itemView.view.itemView.header.ItemDescription', {
    extend: 'Ext.form.field.TextArea',

    alias: 'widget.itemview_description',

    margin: 10,

    name: 'description',
    fieldLabel: 'Description',
    value: 'Hello World',
    grow: false
});
