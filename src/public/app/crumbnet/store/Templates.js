/**
 * Created with IntelliJ IDEA.
 * User: thille
 * Date: 7/25/13
 * Time: 5:17 PM
 * To change this template use File | Settings | File Templates.
 */
/* global Ext: false */
Ext.define('Savanna.crumbnet.store.Templates', {
    extend: 'Ext.data.JsonStore',

    storeId: 'templateStore',

    model: 'Savanna.crumbnet.model.Template',

    autoLoad: true,

    constructor: function() {
        this.buildData();

        this.callParent(arguments);
    },

    buildData: function() {
        this.data = [
            {
                title: 'TEST PALETTE GROUP ONE',
                items: [
                    { label: 'Concept label', category: 'Concept' },
                    { label: 'Hypothesis label', category: 'Hypothesis' },
                    { label: 'Question label', category: 'Question' }
                ]
            },
            {
                title: 'TEST PALETTE GROUP TWO',
                items: [
                    { label: 'Problem label', category: 'Problem' },
                    { label: 'Conclusion label', category: 'Conclusion' },
                    { label: 'Assumption label', category: 'Assumption' },
                    { label: 'Fact label', category: 'Fact' }
                ]
            }
        ];
    }
});