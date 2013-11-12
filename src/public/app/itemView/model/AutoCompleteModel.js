/**
 * Created with IntelliJ IDEA.
 * User: bjohnson
 * Date: 10/22/13
 * Time: 12:46 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.itemView.model.AutoCompleteModel', {
    extend: 'Ext.data.Model',

    fields: [
        {name: "uri"},
        {name: "label"},
        {name: "type"},
        {name: "modifiedBy"},
        {name: "modifiedDate"},
        {name: "preview"},
        {name: "primaryImageUrl"},
        {name: "classification"},
        {name: "workflowState"},
        {name: "predicateRange"},
        {name: "selected", type: 'bool'},
        {name: "disabled", type: 'bool'}
    ]
});