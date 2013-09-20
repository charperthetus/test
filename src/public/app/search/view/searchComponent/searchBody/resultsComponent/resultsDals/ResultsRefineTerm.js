/**
 * Created with IntelliJ IDEA.
 * User: ksonger
 * Date: 9/13/13
 * Time: 11:44 AM
 * To change this template use File | Settings | File Templates.
 */
/* global Ext: false */
Ext.define('Savanna.search.view.searchComponent.searchBody.resultsComponent.resultsDals.ResultsRefineTerm', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.search_resultsDals_resultsterm',

    minWidth:30,
    bodyPadding:2,
    border:true,
    cls:'refine-term',

    initComponent: function () {
        this.callParent(arguments);
    },

    setTerm:function(term)  {
        this.queryById('termValue').setText(term);
    },

    items: [
        {
            xtype: 'text',
            itemId: 'termValue',
            text: ''
        },
        {
            xtype: 'button',
            itemId: 'removeTerm',
            text: 'x',
            style: {
                background: 'transparent',
                border: 'none'
            }
        }
    ]
});