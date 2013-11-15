/**
 * Created with IntelliJ IDEA.
 * Date: 10/28/13
 * Time: 9:11 AM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.process.model.ProcessCategoryModel', {
    extend: 'Ext.data.Model',

    fields: [
        {name: "label"},
        {name: "id"},
        {name: "uri"},
        {name: "hasChildren"},
        {name: "description"},
        {name: "results"},
        {name: 'leaf', defaultValue: false}
    ]
});
