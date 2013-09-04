/**
 * Created with IntelliJ IDEA.
 * User: ksonger
 * Date: 8/22/13
 * Time: 2:00 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.search.view.searchComponent.searchBody.resultsComponent.resultsDals.ResultsFacets', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.search_resultsDals_resultsfacets',
    requires:   [
       'Savanna.search.view.searchComponent.searchBody.resultsComponent.resultsDals.ResultsFacet'
    ],
    header: false,
    width: '100%',
    minHeight:200,

    initComponent: function () {
        this.callParent(arguments);
    },
    items:  [
        {

        }
    ],
    tbar:   [
        {
            xtype: 'tbtext',
            text: 'Refine Search'
        },
        {
            xtype: 'tbfill'
        },
        {
            text:'Reset',
            itemId:'resultsFacetsReset'
        }

    ]
});
