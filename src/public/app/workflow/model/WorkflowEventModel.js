Ext.define('Savanna.workflow.model.WorkflowEventModel', {
    extend: 'Ext.data.Model',

    requires: [
        'Savanna.workflow.model.WorkflowActionModel',
        'Savanna.workflow.model.WorkflowRejectionReasonModel',
        'Savanna.workflow.model.WorkflowStateModel'
    ],

    fields: [
        {name: '_type',                         type: 'string'},
        {name: 'entityVersion',                 type: 'int'},
        {name: 'lastWorkflowActionPerformedBy', type: 'string'},
        {name: 'rejectionReason'},
        {name: 'workflowState'},
        {name: 'displayLabel',                  type: 'string'},
        {name: 'workflowActions'},
        {name: 'lastWorkflowActionDate',        type: 'int'},
        {name: 'workflowComment',               type: 'string'},
        {name: 'lastWorkflowAction'},
        {name: 'parentUri',                     type: 'string'},
        {name: 'uri',                           type: 'string'}
    ],

    associations: [
        {
            type: 'hasOne',
            model: 'Savanna.workflow.model.WorkflowRejectionReasonModel',
            name: 'rejectionReason',
            associationKey:'rejectionReason'
        },
        {
            type: 'hasOne',
            model: 'Savanna.workflow.model.WorkflowStateModel',
            name: 'workflowState',
            associationKey:'workflowState'
        },
        {
            type: 'hasMany',
            model: 'Savanna.workflow.model.WorkflowActionModel',
            name: 'workflowActions',
            associationKey:'workflowActions'
        },
        {
            type: 'hasOne',
            model: 'Savanna.workflow.model.WorkflowActionModel',
            name: 'lastWorkflowAction',
            associationKey:'lastWorkflowAction'
        }
    ]
});
