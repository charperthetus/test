Ext.define('Savanna.workflow.model.WorkflowActionModel', {
    extend: 'Ext.data.Model',

    fields: [
        {name: '_type',          type: 'string'},
        {name: 'entityVersion',  type: 'int'},
        {name: 'displayLabel',   type: 'string'},
        {name: 'name',           type: 'string'},
        {name: 'uri',            type: 'string'},
        {name: 'capabilityName', type: 'string'}
    ]
});
