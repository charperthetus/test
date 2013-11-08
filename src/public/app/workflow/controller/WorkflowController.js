Ext.define('Savanna.workflow.controller.WorkflowController', {
    extend: 'Deft.mvc.ViewController',

    requires: [
        'Deft.mvc.ViewController',
        'Savanna.workflow.store.WorkflowStateStore'
    ],

    control: {
        workflowRadioGroup: {
            change: 'onWorkflowChange'
        },
        workflowOK: {
            click: 'onWorkflowCommit'
        },
        workflowCANCEL: {
            click: 'onWorkflowCancel'
        }
    },

    init: function() {
        this.callParent(arguments);

        this.stateStore = Ext.create('Savanna.workflow.store.WorkflowStateStore');
        this.eventStore = Ext.create('Savanna.workflow.store.WorkflowEventStore', {uri: this.getView().getUri()});
        this.stateStore.load({
            scope: this,
            callback: this.onWorkflowStatesLoaded
        });
        this.eventStore.load({
            scope: this,
            callback: this.onWorkflowEventsLoaded
        });
    },

    onWorkflowStatesLoaded: function(records) {
        var me = this;
        var radioGroup = this.getWorkflowRadioGroup();

        //add radio buttons based on values from server
        Ext.each(records, function (record) {
            var radioButton = {
                boxLabel: record.data.name,
                name: 'workflowRadioGroup',
                inputValue: record.data.uri,
                itemId: record.data.uri,
                checked: false,
                style: {'white-space': 'nowrap'}
            };
            radioGroup.add(radioButton);
        });

        Ext.Ajax.request({
            url: SavannaConfig.itemViewUrl + encodeURI(classUri) + '/instance;jsessionid=' + Savanna.jsessionid,
            method: 'GET',
            success: function(response){
                var message = Ext.decode(response.responseText);
                data.representsItemUri = message.uri;
            },
            failure: function(response){
                console.log('Server Side Failure: ' + response.status);
            }
        });

    },

    onWorkflowEventsLoaded: function(records) {
        var first = records.first();
        var last = records.last();
    },

    onWorkflowChange: function () {
        console.log('workflow change event');
        this.getView().changeValue = this.getWorkflowRadioGroup().lastValue.workflowRadioGroup;
    },
    onWorkflowCommit: function () {
        console.log('workflow commit event, action is: ' + this.getView().changeValue);
        this.getView().close();
    },
    onWorkflowCancel: function () {
        console.log('workflow cancel event');
        this.getView().close();
    }
});