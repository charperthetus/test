/**
 * Created with IntelliJ IDEA.
 * User: ksonger
 * Date: 8/22/13
 * Time: 3:14 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.search.view.searchComponent.searchBody.resultsComponent.resultsDals.ResultsFacet', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.search_resultsDals_resultsfacet',

    header: false,
    width: '100%',
    minHeight:20,
    bodyPadding: 5,
    border:false,

    initComponent: function () {
        this.html = this.model.displayValue;
        this.callParent(arguments);
    }
});