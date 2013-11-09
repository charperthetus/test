Ext.define('Savanna.workflow.store.WorkflowStateStore', {
    extend: 'Ext.data.JsonStore',

    requires: [
        'Ext.data.proxy.Rest',
        'Savanna.proxy.Cors',
        'Savanna.workflow.model.WorkflowStateModel'
    ],

    model: 'Savanna.workflow.model.WorkflowStateModel',

    autoLoad: false,

    constructor: function() {

        this.callParent(arguments);

        this.setProxy({
            type: 'savanna-cors',
            url: SavannaConfig.workflowStates,

            reader: {
                type: 'json'
            },

            writer: {
                type: 'json'
            }
        });
    }
});