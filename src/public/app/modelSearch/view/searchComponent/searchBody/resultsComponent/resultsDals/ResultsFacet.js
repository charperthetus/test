/**
 * Created with IntelliJ IDEA.
 * User: ksonger
 * Date: 8/22/13
 * Time: 3:14 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.modelSearch.view.searchComponent.searchBody.resultsComponent.resultsDals.ResultsFacet', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.model_search_resultsDals_resultsfacet',

    requires: [
        'Ext.XTemplate',
        'Ext.form.Panel',
        'Ext.form.RadioGroup',
        'Savanna.modelSearch.view.searchComponent.searchBody.resultsComponent.resultsDals.ResultsDatefield'
    ],

    width: '100%',
    minHeight: 20,
    bodyPadding: 5,
    border: false,
    cls: 'results-facet',
    collapsible: true,
    collapsed: true,
    titleCollapse: true,
    hideCollapseTool: true,
    dateFormat: 'Y-m-d\\TH:i:s.m\\Z',

    initComponent: function () {

        this.title = this.facet.label;
        this.items = this.buildFacetOptions();
        this.callParent(arguments);


        if (this.facet.facetType === 'string') {
            this.buildFacetFilterGroup();
        }
    },

    buildFacetOptions: function () {

        var content;
        var me = this;

        switch (this.facet.facetType) {

            case 'double' :
                content = [
                ];
                break;
            case 'date' :
                var radioItemConfigs = this.buildDateRadioItems();
                content = [
                    {
                        xtype: 'form',
                        itemId: 'facets_' + this.facet.key,
                        items: [
                            {
                                xtype: 'radiogroup',
                                itemId: 'dateFacet',
                                // Arrange radio buttons, distributed vertically
                                columns: 1,
                                vertical: true,
                                items: radioItemConfigs,
                                listeners: {
                                    //we want this to be *this*, and not radiogroup when we call the callback.
                                    'change': Ext.bind(me.onDateRangeChange, me)
                                }
                            },
                            {
                                xtype: 'form',
                                itemId: 'customDatesPanel',
                                collapsible: true,
                                collapsed: true,
                                titleCollapse: true,
                                hideCollapseTool: true,
                                header: false,
                                width: '100%',
                                items: [
                                    {
                                        xtype: 'model_search_resultsDals_resultsdatefield',
                                        fieldLabel: 'From',
                                        labelWidth: 50,
                                        width: 185,
                                        name: 'from_date',
                                        itemId: 'fromDate',
                                        value: new Date('1/1/1971')
                                    },
                                    {
                                        xtype: 'model_search_resultsDals_resultsdatefield',
                                        fieldLabel: 'To',
                                        labelWidth: 50,
                                        width: 185,
                                        name: 'to_date',
                                        itemId: 'toDate',
                                        value: new Date()
                                    }
                                ]

                            }
                        ]
                    }
                ];
                break;

            case 'string' :

                content = [
                    {
                        xtype: 'form',
                        itemId: 'facets_' + this.facet.key,
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
                console.log('Unknown facet type: ' + this.facet.faceType);
                break;
        }

        return content;
    },

    buildFacetFilterGroup: function () {

        var searchResults = this.searchResults,
            me = this;
        if (searchResults.store.facetValueSummaries) {
            Ext.each(this.facet.facetValues, function (facetobj) {

                var checkbox = {
                    boxLabel: facetobj.value + ' (' + facetobj.count + ')',
                    name: facetobj.key,
                    inputValue: facetobj.value,
                    id: 'checkbox_' + me.facet.key + '_' + String(Ext.id()),
                    /*
                     added to resolve defect SAV-5380.  Needs design to assign a class.
                     */
                    style: {
                        'white-space': 'nowrap'
                    },
                    listeners: {
                        'change': Ext.bind(me.onFacetFilterChange, me)
                    }
                };

                me.down('#stringFacet').add(checkbox);
            });

        }
    },

    /*
     Return an array of configs for date type radio buttons
     */
    buildDateRadioItems: function () {
        var me = this;
        var radioButtonConfigs = [];
        var radioCount = 0;
        //  { boxLabel: 'Any Time', itemId: 'date_all', name: facetID, inputValue: 'all', checked: true },
        Ext.each(this.facet.facetValues, function (facetobj) {

            var radioButton = {
                boxLabel: facetobj.value + ' (' + facetobj.count + ')',
                name: me.facet.key,   //group name
                inputValue: facetobj.value,
                id: 'checkbox_' + me.facet.key + '_' + String(Ext.id()),
                checked: (radioCount == 0),
                /*
                 added to resolve defect SAV-5380.  Needs design to assign a class.
                 */
                style: {'white-space': 'nowrap' }
            };
            radioCount++;
            radioButtonConfigs.push(radioButton);
        });

        //add a radio button for custom date range
        var radioButtonCustom = {
            boxLabel: "Custom Range",
            name: me.facet.key,  //group name
            inputValue: "custom",
            id: 'checkbox_' + me.facet.key + '_' + String(Ext.id()),
            checked: (radioCount == 0),
            /*
             added to resolve defect SAV-5380.  Needs design to assign a class.
             */
            style: {'white-space': 'nowrap' }
        };
        radioCount++;
        radioButtonConfigs.push(radioButtonCustom);

        return radioButtonConfigs;
    },


    onDateRangeChange: function (radioGroup, newValue, oldValue) {
        var customDates = radioGroup.up('#facets_' + this.facet.key).queryById('customDatesPanel');

        var newIsCustom = false;
        for (key in newValue) {
            if (newValue[key] == 'custom') {
                newIsCustom = true;
                break;
            }
        }
        if (!newIsCustom) {
            customDates.collapse();
            customDates.collapsed = true;
            this.onFacetFilterChange();
        } else {
            customDates.expand();
            customDates.collapsed = false;
            //the new search will be kicked off by the date picker close event
        }
    },

    //Called from date picker
    doCustomDateSearch: function () {

        var startDate = this.queryById('fromDate').getValue(),
            endDate = this.queryById('toDate').getValue(),
            fieldName = this.query('form')[0].itemId.replace('facets_', ''),
            newDateRange = {
                key: fieldName,
                values: [
                    { valueMin: startDate.getTime(), valueMax: endDate.getTime()}
                ]
            },
            updateExisting = false,
            me = this;

        var filters = me.dal.data.facetFilterCriteria;

        if (!filters || !filters.length || filters == '') {
            me.dal.data.facetFilterCriteria = [];   // just set to an empty array
            filters = me.dal.data.facetFilterCriteria;
        }

        if (filters.length > 0) {
            Ext.each(filters, function (range, index) {
                if (range.key === fieldName) {
                    // replace it, do not add another
                    filters[index] = newDateRange;
                    updateExisting = true;
                }
            });
        }

        if (!updateExisting) {
            filters.push(newDateRange);
        }

        var searchController = Savanna.controller.Factory.getController('Savanna.modelSearch.controller.SearchComponent');

        if (searchController !== undefined) {
            this.doFilter(me);
        }
    },

    onFacetFilterChange: function (btn) {

        var filterExists = false,
            facetName = this.facet.key,
            me = this;
        /*
         check to see if this facet filter exists in the store already
         */

        var filters = me.dal.get('facetFilterCriteria');
        if (filters.length) {

            Ext.each(filters, function (filter, index) {

                if (filter) {

                    var values = filter.values;

                    if (filter.key === facetName) { // if it already exists

                        filterExists = true;

                        if (btn.value) {   // if the checkbox has been selected, add the selection

                            values.push({ value: btn.inputValue});

                        } else {       // if the checkbox has been deselected, remove the selection

                            //Since we are removing, we need to iterate from end to beginning
                            var len = values.length;
                            var index;
                            for (index = len - 1; index--; index >= 0) {
                                if (val.value === btn.inputValue) {
                                    Ext.Array.remove(values, values[ind]);
                                }
                            }
                        }
                    }

                    if (values.length > 0) {
                        filter.values = values;
                    } else {
                        me.dal.get('facetFilterCriteria').splice(index, 1);   // remove the facetFilterCriteria entirely
                    }
                }

            });

            if (!filterExists) {
                me.dal.get('facetFilterCriteria').push({
                    'key': facetName,
                    'values': [
                        {value: btn.inputValue}
                    ]   // this is always an array
                });
            }

        } else {
            if (me.dal.get('facetFilterCriteria').length === 0) {
                me.dal.set('facetFilterCriteria', []);
            }
            me.dal.get('facetFilterCriteria').push({
                'key': facetName,
                'values': [
                    {value: btn.inputValue}
                ]   // this is always an array
            });
        }
        var searchController = Savanna.controller.Factory.getController('Savanna.modelSearch.controller.SearchComponent');

        if (searchController !== undefined) {
            this.doFilter(btn);
        }

    },

    doFilter: function (btn) {

        var searchController = Savanna.controller.Factory.getController('Savanna.modelSearch.controller.SearchComponent'),
            component = searchController.getSearchComponent(btn),
            currentDalPanel = component.down('#searchdals').queryById(this.dal.get('id')),
            searchString = component.queryById('searchbar').buildSearchString(),
            searchObj = searchController.buildSearchObject(searchString, this.dal, currentDalPanel);

        searchController.buildAndLoadResultsStore(this.dal, component, searchObj, 'filter');
    }
});
