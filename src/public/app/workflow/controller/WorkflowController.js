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
        workflowNotes: true,
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
        this.stateStore.load({
            scope: this,
            callback: this.onWorkflowStatesLoaded
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

        this.eventStore = Ext.create('Savanna.workflow.store.WorkflowEventStore', {uri: this.getView().getUri()});
        this.eventStore.load({
            scope: this,
            callback: this.onWorkflowEventsLoaded
        });


    },

    onWorkflowEventsLoaded: function(records, operation, success) {
        if (records && success) {
            var workflowEvent = records.first();
            var workflowStateUri = workflowEvent.workflowState.uri;
            var valueObj = {'workflowRadioGroup': workflowStateUri};
            this.getWorkflowRadioGroup().setValue(valueObj);
        } else {
            this.getWorkflowRadioGroup().items.items[0].setValue(true);
        }
    },

    onWorkflowChange: function () {
        this.getView().changeValue = this.getWorkflowRadioGroup().lastValue.workflowRadioGroup;
    },

    onWorkflowCommit: function () {
        var me = this;
        var jsonObj = {
            workflowComment: this.getWorkflowNotes().getValue(),
            uri: this.getView().getUri(),
            workflowState: {
                uri: this.getView().changeValue
            }
        };
        Ext.Ajax.request({
            url: SavannaConfig.workflowEvents + encodeURI(encodeURIComponent(this.getView().getUri())) + ';jsessionid=' + Savanna.jsessionid,
            method: 'POST',
            jsonData: jsonObj,
            success: function(response){
                me.getView().close();
            },
            failure: function(response){
                me.getView().close();
            }
        });
    },

    onWorkflowCancel: function () {
        this.getView().close();
    }
});