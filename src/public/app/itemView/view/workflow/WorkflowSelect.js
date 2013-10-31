/**
 * Created with IntelliJ IDEA.
 * User: ksonger
 * Date: 10/24/13
 * Time: 3:26 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.itemView.view.workflow.WorkflowSelect', {
    extend: 'Ext.window.Window',

    alias: 'widget.itemview_workflow_select',

    title: 'Workflow',

    autoShow: true,

    changeValue: 'submit',

    initComponent: function () {
        this.items = this.setupItems();
        this.buttons = this.setupButtons();
        this.callParent(arguments);
    },

    setupItems: function () {
        var content = [
            {
                xtype: 'form',
                padding: 30,
                title: 'Available Workflow Options',
                itemId: 'workflowSelect',
                items: [
                    {
                        xtype: 'radiogroup',
                        itemId: 'workflowRadiogroup',
                        padding: 8,
                        // Arrange radio buttons, distributed vertically
                        columns: 1,
                        vertical: true,
                        items: [
                            { boxLabel: '<b>Publish</b> Makes the item public so other can access it by searching the model', itemId: 'option_workflow_publish', name: 'workflow_options', inputValue: 'publish' },
                            { boxLabel: '<b>Submit</b> Marks the item Ready for Review', itemId: 'option_workflow_submit', name: 'workflow_options', inputValue: 'submit', checked: true},
                            { boxLabel: '<b>Approve</b> Marks the item as Approved', itemId: 'option_workflow_approve', name: 'workflow_options', inputValue: 'approve' },
                            { boxLabel: '<b>Reject</b> Marks the item as Rejected', itemId: 'option_workflow_reject', name: 'workflow_options', inputValue: 'reject' }
                        ],
                        listeners: {
                            'change': this.onWorkflowChange
                        }

                    },
                    {
                        html: '<b>Add a Note</b>'
                    },
                    {
                        xtype: 'textarea',
                        itemId: 'workflow_notes',
                        width: '100%',
                        height: 110
                    }
                ]
            }
        ];
        return content;
    },

    setupButtons:function() {
        var btns = [
            {
                text: 'OK',
                listeners: {
                    'click': this.onWorkflowCommit
                }
            },
            {
                text: 'CANCEL',
                listeners: {
                    'click': this.onWorkflowCancel
                }
            }
        ];
        return btns;
    },

    constructor: function (options) {
        this.callParent(arguments);
    },

    onWorkflowChange: function () {
        //console.log('workflow change event');
        this.up('itemview_workflow_select').changeValue = this.lastValue.workflow_options;
    },
    onWorkflowCommit: function () {
        //console.log('workflow commit event, action is: ' + this.up('itemview_workflow_select').changeValue);
        this.up('itemview_workflow_select').close();
    },
    onWorkflowCancel: function () {
        //console.log('workflow cancel event');
        this.up('itemview_workflow_select').close();
    }
});
