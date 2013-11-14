Ext.define('Savanna.workflow.model.WorkflowStateModel', {
    extend: 'Ext.data.Model',

    fields: [
        {name: '_type',             type: 'string'},
        {name: 'name',              type: 'string'},
        {name: 'displayLabel',      type: 'string'},
        {name: 'entityVersion',     type: 'int'},
        {name: 'uri',               type: 'string'}
    ]
});
