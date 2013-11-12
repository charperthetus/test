/**
 * Created with IntelliJ IDEA.
 * User: ksonger
 * Date: 10/24/13
 * Time: 3:26 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.workflow.view.WorkflowSelect', {
    extend: 'Ext.window.Window',

    alias: 'widget.workflow_select',

    requires: [
        'Savanna.workflow.controller.WorkflowController'
    ],

    controller: 'Savanna.workflow.controller.WorkflowController',
    title: 'Manage Workflow',
    width: 500,
    height: 425,

    config: {
        uri: null
    },

    constrain: true,

    autoShow: true,

    store: 'Savanna.workflow.store.WorkflowStateStore',

    changeValue: null,

    items: [
        {
            xtype: 'form',
            padding: 30,
            title: 'Workflow States',
            ui:'white',
            itemId: 'workflowSelect',
            items: [
                {
                    xtype: 'radiogroup',
                    itemId: 'workflowRadioGroup',
                    padding: 8,
                    // Arrange radio buttons, distributed vertically
                    columns: 1,
                    vertical: true,
                    items: []
                },
                {
                    html: '<b>Add a Note</b>'
                },
                {
                    xtype: 'textarea',
                    itemId: 'workflowNotes',
                    width: '100%',
                    height: 110
                }
            ]
        }
    ],

    buttons: [
        {
            text: 'OK',
            itemId: 'workflowOK',
            ui:'commit'
        },
        {
            text: 'Cancel',
            itemId: 'workflowCANCEL'
        }
    ]
});
