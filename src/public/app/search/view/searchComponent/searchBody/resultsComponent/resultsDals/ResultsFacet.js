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
        'Ext.form.RadioGroup',
        'Savanna.search.view.searchComponent.searchBody.resultsComponent.resultsDals.ResultsDatefield'
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

        /*
         DATE facetDataTypes don't need this step because they're a static set of 6 options...
         not ideal - the options would be nice to get dynamically from the services side
         */
        if (this.model.facetDataType === 'STRING') {
            this.buildFacetFilterGroup();
        }
    },

    buildFacetOptions: function () {

        var content;

        switch (this.model.facetDataType) {

            case 'DATE' :
                var facetID = this.model.facetId;
                content = [
                    {
                        xtype: 'form',
                        itemId: 'facets_' + this.model.facetId,
                        items: [
                            {
                                xtype: 'radiogroup',
                                itemId: 'dateFacet',
                                // Arrange radio buttons, distributed vertically
                                columns: 1,
                                vertical: true,
                                items: [
                                    { boxLabel: 'Any Time', name: facetID, inputValue: 'all', checked: true },
                                    { boxLabel: 'Past 24 Hours', name: facetID, inputValue: 'past_year'},
                                    { boxLabel: 'Past Week', name: facetID, inputValue: 'past_week' },
                                    { boxLabel: 'Past Month', name: facetID, inputValue: 'past_month' },
                                    { boxLabel: 'Past Year', name: facetID, inputValue: 'past_year' },
                                    { boxLabel: 'Custom Range', name: facetID, inputValue: 'custom' }
                                ],
                                listeners: {
                                    'change': Ext.bind(this.onDateRangeChange, this)
                                }
                            },
                            {
                                xtype: 'form',
                                itemId:'customDatesPanel',
                                collapsible: true,
                                collapsed: true,
                                titleCollapse: true,
                                hideCollapseTool: true,
                                header:false,
                                width:'100%',
                                items: [{
                                    xtype: 'search_resultsDals_resultsdatefield',
                                    fieldLabel: 'From',
                                    labelWidth:50,
                                    width:185,
                                    name: 'from_date',
                                    itemId:'fromDate',
                                    value: new Date('1/1/1971')
                                }, {
                                    xtype: 'search_resultsDals_resultsdatefield',
                                    fieldLabel: 'To',
                                    labelWidth:50,
                                    width:185,
                                    name: 'to_date',
                                    itemId:'toDate',
                                    value: new Date()
                                }]

                            }
                        ]
                    }
                ]
                ;
                break;

            case
            'STRING'
            :

                content = [
                    {
                        xtype: 'form',
                        itemId: 'facets_' + this.model.facetId,
                        items: [
                            {
                                xtype: 'checkboxgroup',
                                itemId: 'stringFacet',
                                columns: 1,
                                vertical: true,
                                items: []
                            }
                        ]
                    }
                ];
                break;

            default:
                content = [];
                Ext.Error.raise({
                    msg: 'Unknown facet type: ' + this.model.facetDataType
                });
                break;
        }

        return content;
    },
    buildFacetFilterGroup: function () {

        var set = this.set,
            facet = this.model.facetId,
            me = this;

        if (set.store.facetValueSummaries[facet] !== undefined) {

            Ext.each(set.store.facetValueSummaries[facet].facetValues, function (facetobj) {

                var checkbox = {
                    boxLabel: facetobj.key + ' (' + facetobj.value + ')',
                    name: facetobj.key,
                    inputValue: facetobj.key,
                    id: 'checkbox_' + facetobj.key + '_' + String(Ext.id()),
                    listeners: {
                        'change': Ext.bind(me.onFacetFilterChange, me)
                    }
                };

                me.queryById('facets_' + me.model.facetId).queryById('stringFacet').add(checkbox);
            });

        } else {
            /*
             this appears to be the case with LinkedIn - getting a 'location' facet that does not
             line up with facetValueSummaries in the DAL sources.  May need services to resolve it,
             will take a closer look before pinging Travis
             */
            Ext.Error.raise({
                msg: 'Undefined facetValueSummary for supplied facet: ' + facet
            });
        }
    },

    onDateRangeChange: function (btn) {

        var now = new Date(),
            startDate,
            fieldName = btn.ownerCt.itemId.replace('facets_', ''),
            rangeName = btn.lastValue[fieldName],
            format = 'Y-m-d\\TH:i:s.m\\Z',
            endDate = Ext.Date.format(new Date(), format), //default
            customDates = btn.up('#facets_' + this.model.facetId).queryById('customDatesPanel'),
            me = this;

        if(rangeName === 'custom')   {
            customDates.expand();
        }   else    {
            customDates.collapse();
        }

        switch (rangeName) {
            case 'any'  :
                startDate = Ext.Date.format(new Date(0), format);
                break;

            case 'past_year'    :
                startDate = Ext.Date.format(Ext.Date.subtract(now, Ext.Date.YEAR, 1), format);
                break;

            case 'past_month'    :
                startDate = Ext.Date.format(Ext.Date.subtract(now, Ext.Date.MONTH, 1), format);
                break;

            case 'past_week'    :
                startDate = Ext.Date.format(Ext.Date.subtract(now, Ext.Date.DAY, 7), format);
                break;

            case 'past_day'    :
                startDate = Ext.Date.format(Ext.Date.subtract(now, Ext.Date.DAY, 1), format);
                break;

            case 'custom'   :
                // do nothing, just reveals the custom date range panel
                break;

            default:
                Ext.Error.raise({
                    msg: 'Unknown value: ' + rangeName
                });
        }

        if (!me.dal.data.dateTimeRanges.length) {
            me.dal.data.dateTimeRanges = [];   // just set to an empty array
        }
        var newDateRange = {
            'Startdate': startDate,
            'dateRangeName': rangeName,
            'DateFieldName': fieldName,
            'Enddate': endDate
        };

        var updateExisting = false;

        if (me.dal.data.dateTimeRanges.length > 0) {
            Ext.each(me.dal.data.dateTimeRanges, function (range, index) {
                if (range.DateFieldName === fieldName) {
                    // replace it, do not add another
                    me.dal.data.dateTimeRanges[index] = newDateRange;
                    updateExisting = true;
                }
            });
        }

        if (!updateExisting) {
            me.dal.data.dateTimeRanges.push(newDateRange);
        }

        /*
         resubmit the search request
         */
        var searchController = Savanna.controller.Factory.getController('Savanna.search.controller.SearchComponent');

        if (searchController !== undefined && rangeName !== 'custom') {
            searchController.doSearch(me);
        }
    },

    doCustomDateSearch:function()   {
        var format = 'Y-m-d\\TH:i:s.m\\Z',
            startDate = Ext.Date.format(this.queryById('fromDate').getValue(), format),
            endDate = Ext.Date.format(this.queryById('toDate').getValue(), format),
            fieldName = this.query('form')[0].itemId.replace('facets_', ''),
            rangeName = 'custom',
            me = this;


        if (!me.dal.data.dateTimeRanges.length) {
            me.dal.data.dateTimeRanges = [];   // just set to an empty array
        }
        var newDateRange = {
            'Startdate': startDate,
            'dateRangeName': rangeName,
            'DateFieldName': fieldName,
            'Enddate': endDate
        };

        var updateExisting = false;

        if (me.dal.data.dateTimeRanges.length > 0) {
            Ext.each(me.dal.data.dateTimeRanges, function (range, index) {
                if (range.DateFieldName === fieldName) {
                    // replace it, do not add another
                    me.dal.data.dateTimeRanges[index] = newDateRange;
                    updateExisting = true;
                }
            });
        }

        if (!updateExisting) {
            me.dal.data.dateTimeRanges.push(newDateRange);
        }

        /*
         resubmit the search request
         */
        var searchController = Savanna.controller.Factory.getController('Savanna.search.controller.SearchComponent');

        if (searchController !== undefined) {
            searchController.doSearch(me);
        }
    },

    onFacetFilterChange: function (btn) {

        var filterExists = false,
            facet = this.model.facetId,
            me = this;
        /*
         check to see if this facet filter exists in the store already
         */

        if (me.dal.data.facetFilterCriteria.length) {

            Ext.each(me.dal.data.facetFilterCriteria, function (filter, index) {

                var values = me.dal.data.facetFilterCriteria[index].facetValues;

                if (filter.facetName === facet) { // if it already exists

                    filterExists = true;

                    if (btn.value) {   // if the checkbox has been selected, add the selection

                        values.push(btn.inputValue);

                    } else {       // if the checkbox has been deselected, remove the selection

                        Ext.each(values, function (val, ind) {
                            if (val === btn.inputValue) {
                                values.splice(ind, 1);
                            }
                        });

                    }
                }

                if (values.length > 0) {
                    me.dal.data.facetFilterCriteria[index].facetValues = values;
                } else {
                    me.dal.data.facetFilterCriteria.splice(index, 1);   // remove the facetFilterCriteria entirely
                }

            });

        } else {
            me.dal.data.facetFilterCriteria = [
                {
                    'facetName': facet,
                    'facetValues': [btn.inputValue]   // this is always an array
                }
            ];
        }
        /*
         resubmit the search request
         */
        var searchController = Savanna.controller.Factory.getController('Savanna.search.controller.SearchComponent');

        if (searchController !== undefined) {
            searchController.doSearch(me);
        }
    }
})
;