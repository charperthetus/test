/**
 * Created with IntelliJ IDEA.
 * User: bjohnson
 * Date: 10/15/13
 * Time: 2:36 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.itemView.view.itemView.model.PropertyGroupValueValueModel', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'label'},
        { name: 'uri'},
        { name: 'value'},
        { name: 'version'},
        { name: 'editable'},
        { name: 'inheritedFrom'}
    ]
});

