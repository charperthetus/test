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
        if (this.model.facetDataType === 'STRING') {
            this.buildFacetFilterGroup();
        }
    },

    buildFacetOptions: function () {

        var content;

        switch (this.model.facetDataType) {

            case 'DATE' :

                content = [
                    {
                        xtype: 'form',
                        itemId: 'facets_' + this.model.facetId,
                        items: [
                            {
                                xtype: 'radiogroup',
                                // Arrange radio buttons, distributed vertically
                                columns: 1,
                                vertical: true,
                                items: [
                                    { boxLabel: 'Any Time', name: this.model.facetId, inputValue: 'all', checked: true },
                                    { boxLabel: 'Past 24 Hours', name: this.model.facetId, inputValue: 'day'},
                                    { boxLabel: 'Past Week', name: this.model.facetId, inputValue: 'week' },
                                    { boxLabel: 'Past Month', name: this.model.facetId, inputValue: 'month' },
                                    { boxLabel: 'Past Year', name: this.model.facetId, inputValue: 'year' },
                                    { boxLabel: 'Custom Range', name: this.model.facetId, inputValue: 'custom' }
                                ]
                            }
                        ]
                    }
                ];
                break;

            case 'STRING' :

                content = [
                    {
                        xtype: 'form',
                        itemId: 'facets_' + this.model.facetId,
                        items: [
                            {
                                xtype: 'checkboxgroup',
                                itemId: 'checkboxGroup',
                                // Arrange radio buttons, distributed vertically
                                columns: 1,
                                vertical: true,
                                items: [],
                                listeners:  {
                                    'change': Ext.bind(this.onDateRangeChange, this, true)
                                }
                            }
                        ]
                    }
                ];
                break;
        }

        return content;
    },
    buildFacetFilterGroup: function () {

        var set = this.set,
            facet = this.model.facetId,
            me = this;

        Ext.each(set.store.facetValueSummaries[facet].facetValues, function (facetobj) {

            var checkbox = {
                boxLabel: facetobj.key + ' (' + facetobj.value + ')',
                name: facetobj.key,
                inputValue: facetobj.key,
                id: 'checkbox_' + facetobj.key + '_' + String(Ext.id()),
                listeners:  {
                    'change': Ext.bind(me.onFacetFilterChange, me, [this], true)
                }
            };

            me.queryById('facets_' + me.model.facetId).queryById('checkboxGroup').add(checkbox);
        });
    },

    onDateRangeChange:function()    {
        console.log(arguments);
    },

    onFacetFilterChange: function (btn, newValue, oldValue, eOpts, facetobj) {
        var filterExists = false,
            facet = this.model.facetId,
            me = this;
        /*
         check to see if this facet filter exists in the store already
         */
        if (me.dal.data.facetFilterCriteria.length > 0) {

            Ext.each(me.dal.data.facetFilterCriteria, function (filter, index) {

                var values = me.dal.data.facetFilterCriteria[index].facetValues;

                if (filter.facetName === facet) { // if it already exists

                    filterExists = true;

                    if (btn.value) {   // if the checkbox has been selected, add the selection

                        values.push(facetobj.key);

                    } else {       // if the checkbox has been deselected, remove the selection

                        values.splice(index, 1);
                    }
                }

                me.dal.data.facetFilterCriteria[index].facetValues = values;
            });

        }   else    {
            me.dal.data.facetFilterCriteria = [];   // just set to an empty array
        }
        if (!filterExists) {       // add the new filter to the store
            var newFilter = {
                'facetName': facet,
                'facetValues': [facetobj.key]   // this is an array
            };
            me.dal.data.facetFilterCriteria.push(newFilter);
        }
        /*
        resubmit the search request
         */
        Savanna.controller.Factory.getController('Savanna.search.controller.SearchComponent').doSearch(me);
    }
});