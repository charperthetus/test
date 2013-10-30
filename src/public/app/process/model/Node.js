/**
 * Created with IntelliJ IDEA.
 * User: bcannon
 * Date: 10/26/13
 * Time: 9:04 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.process.model.Node', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'uri',               type: 'string'},
        {name: 'label',             type: 'string'},
        {name: 'type',              type: 'string'},   //possible values: "Item", "Process"
        {name: 'modifiedBy',        type: 'string'},
        {name: 'modifiedDate',      type: 'string'},
        {name: 'preview',           type: 'string'},
        {name: 'primaryImageUrl',   type: 'string'},
        {name: 'workflowState',     type: 'string'},
        {name: 'classification',    type: 'string'}
    ]
});
