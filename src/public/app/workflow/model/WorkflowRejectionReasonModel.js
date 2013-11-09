Ext.define('Savanna.workflow.model.WorkflowRejectionReasonModel', {
    extend: 'Ext.data.Model',

    fields: [
        {name: '_type',          type: 'string'},
        {name: 'entityDirty',    type: 'boolean'},
        {name: 'entityVersion',  type: 'int'},
        {name: 'entityDeleted',  type: 'boolean'},
        {name: 'displayLabel',   type: 'string'},
        {name: 'name',           type: 'string'},
        {name: 'cacheForEntity'},
        {name: 'entityPresent',  type: 'boolean'},
        {name: 'uri',            type: 'string'}
    ],

    associations: [
        {
            type: 'hasOne',
            model: 'Savanna.workflow.model.WorkflowDataCacheModel',
            name: 'cacheForEntity',
            associationKey:'cacheForEntity'
        }
    ]
});
