/**
 * Created with IntelliJ IDEA.
 * User: bcannon
 * Date: 10/3/13
 * Time: 1:02 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.process.controller.ProcessController', {
    extend: 'Deft.mvc.ViewController',

    control: {
        addstepbutton: {
            click: "addStepClick"
        },
        adddecisionbutton: {
            click: "addDecisionClick"
        },
        expandsteps: {
            click: "expandStepsClick"
        },
        collapsesteps: {
            click: "collapseStepsClick"
        }
    },
    init: function() {
        return this.callParent(arguments);
    },

    addStepClick: function() {
        console.log('add step'); //todo: remove console log statement and do something useful
    },
    addDecisionClick: function() {
        console.log('add decision'); //todo: remove console log statement and do something useful
    },
    expandStepsClick: function() {
        console.log('expand all steps'); //todo: remove console log statement and do something useful
    },
    collapseStepsClick: function() {
        console.log('collapse all steps'); //todo: remove console log statement and do something useful
    }
});