Ext.define('Savanna.workflow.store.WorkflowEventStore', {
    extend: 'Ext.data.JsonStore',

    requires: [
        'Ext.data.proxy.Rest',
        'Savanna.proxy.Cors',
        'Savanna.workflow.model.WorkflowEventModel'
    ],

    model: 'Savanna.workflow.model.WorkflowEventModel',

    config: {
        uri: null
    },

    autoLoad: false,

    constructor: function(config) {
        var me = this;

        this.callParent(arguments);
        this.initConfig(config);

        this.setProxy({
            type: 'savanna-cors',
            url: SavannaConfig.workflowEvents + me.getUri(),

            // Turn off the paging params...
            startParam: undefined,
            limitParam: undefined,
            pageParam: undefined,

            reader: {
                type: 'json'
            },

            writer: {
                type: 'json'
            }
        });
    }
});