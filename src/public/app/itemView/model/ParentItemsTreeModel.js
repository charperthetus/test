/**
 * Created with IntelliJ IDEA.
 * User: ksonger
 * Date: 10/28/13
 * Time: 9:11 AM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.itemView.model.ParentItemsTreeModel', {
    extend: 'Ext.data.Model',

    fields: [
        {name: "label"},
        {name: "id"},
        {name: "uri"},
        {name: "hasChildren"},
        {name: "results"},
        {name: 'leaf', defaultValue: false}
    ]
});
