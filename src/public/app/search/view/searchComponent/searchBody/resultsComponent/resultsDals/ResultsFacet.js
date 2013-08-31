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

    requires: [
        'Ext.XTemplate',
        'Ext.form.Panel',
        'Ext.form.RadioGroup'
    ],

    width: '100%',
    minHeight: 20,
    bodyPadding: 5,
    border: false,
    collapsible: true,
    collapsed: true,
    titleCollapse: true,
    hideCollapseTool: true,

    initComponent: function () {
        this.title = this.model.displayValue;
        this.items = this.buildFacetOptions();
        this.callParent(arguments);
    },

    buildFacetOptions: function () {
        switch (this.model.facetDataType) {
            case 'DATE' :


                return [
                    {
                        xtype: 'form',
                        itemId: 'dateForm',
                        items: [
                            {
                                xtype: 'radiogroup',
                                // Arrange radio buttons, distributed vertically
                                columns: 1,
                                vertical: true,
                                items: [
                                    { boxLabel: 'Any Time', name: 'any', inputValue: '1', checked: true },
                                    { boxLabel: 'Past 24 Hours', name: 'today', inputValue: '2'},
                                    { boxLabel: 'Past Week', name: 'week', inputValue: '3' },
                                    { boxLabel: 'Past Month', name: 'month', inputValue: '4' },
                                    { boxLabel: 'Past Year', name: 'year', inputValue: '5' },
                                    { boxLabel: 'Custom Range', name: 'custom', inputValue: '6' }
                                ]
                            }
                        ]
                    }
                ];
        }
    }
});