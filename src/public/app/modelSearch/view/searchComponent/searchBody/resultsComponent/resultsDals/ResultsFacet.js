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
    border: false,
    cls: 'results-facet',
    collapsible: true,
    collapsed: true,
    titleCollapse: true,
    dateFormat: 'Y-m-d\\TH:i:s.m\\Z',
    ui: 'results-facet',

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
                                cls: 'customDatePanel',
                                items: [
                                    {
                                        xtype: 'model_search_resultsDals_resultsdatefield',  //Sharing the search field didn't work out.
                                        fieldLabel: 'From',
                                        labelWidth: 35,
                                        width: 155,
                                        name: 'from_date',
                                        itemId: 'fromDate',
                                        value: new Date('1/1/1971')
                                    },
                                    {
                                        xtype: 'model_search_resultsDals_resultsdatefield',  //Sharing the search field didn't work out.
                                        fieldLabel: 'To',
                                        labelWidth: 35,
                                        width: 155,
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

        //Special case 'Any Time' filter because this is more efficient than creating a special filter on the server.
        // since we don't get this from the server we need to insert the total count.
        var total = this.searchResults.store.totalCount;
        var radioButtonAnyTime = {
            boxLabel: 'Any Time' + ' (' + total + ')',
            name: me.facet.key,   //group name
            inputValue: "AnyTime",
            id: 'checkbox_' + me.facet.key + '_' + String(Ext.id()),
            checked: (radioCount == 0),
            /*
             added to resolve defect SAV-5380.  Needs design to assign a class.
             */
            style: {'white-space': 'nowrap' }
        };
        radioCount++;
        radioButtonConfigs.push(radioButtonAnyTime);

        //add facets based on values from server
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

    getActualValue:function(value){
        return value[this.facet.key];
    },

    onDateRangeChange: function (radioGroup, newValue) { //oldValue is a third parameter
        var customDates = radioGroup.up('#facets_' + this.facet.key).queryById('customDatesPanel');

        var newValueString = this.getActualValue(newValue);
        var filters = this.getFilters();
        var filterKey = this.facet.key;

        //Special case anytime here:
        if(newValueString === "AnyTime"){

            //Since we are removing, we need to iterate from end to beginning
            var len = filters.length;
            var filterIndex;
            for (filterIndex = len - 1;  filterIndex >= 0; filterIndex--) {
                var filter = filters[filterIndex];
                if (filter.key === filterKey) {
                    Ext.Array.remove(filters, filter);
                    break;
                }
            }
            //Update the search results
            this.doFilter(this);
            return;
        }

        var newIsCustom = ( newValueString == "custom");

        if (!newIsCustom) {
            customDates.collapse();
            customDates.collapsed = true;
            var newFilter =  {key: filterKey, values: [{value: newValueString}]};
            var filterFound = false;
            Ext.each(filters, function (range, index) {
                if (range.key === filterKey) {
                    // replace it, do not add another
                    filters[index] = newFilter;
                    filterFound = true;
                }
            });
            if(!filterFound){
                filters.push(newFilter);
            }
            this.doFilter(this);
        } else {
            customDates.expand();
            customDates.collapsed = false;
            //re-query each time the custom date facet is opened, not just when the dates change.
            this.doCustomDateSearch();
        }
    },

    getFilters: function () {
        var filters = this.dal.data.facetFilterCriteria;

        if (!filters || !filters.length || filters == '') {
            this.dal.data.facetFilterCriteria = [];   // just set to an empty array
            filters = this.dal.data.facetFilterCriteria;
        }
        return filters;
    },

    //Called from date picker
    doCustomDateSearch: function () {

        //Note: We let the user select any date for the end and start dates and we will
        // turn it into a valid range.  Server doesn't handle this so we fix it on the client.

        var startDate = this.queryById('fromDate').getValue(),
            endDate = this.queryById('toDate').getValue(),
            fieldName = this.query('form')[0].itemId.replace('facets_', ''),
            smallerTime = Math.min(startDate.getTime(), endDate.getTime()),
            largerTime = Math.max(startDate.getTime(), endDate.getTime()),

            newDateRange = {
                key: fieldName,
                values: [
                    { valueMin: smallerTime, valueMax: largerTime}
                ]
            },
            updateExisting = false,
            me = this;

        var filters = this.getFilters();

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

    //string filter change
    onFacetFilterChange: function (btn) {
        this.onFacetFilterChangeHelper(btn.value, btn.inputValue, true);
    },

    onFacetFilterChangeHelper: function (isChecked, inputValue, doTheSearch) {

        var filterExists = false,
            facetName = this.facet.key,
            me = this;
        /*
         check to see if this facet filter exists in the store already
         */

        var filters = this.getFilters();


        Ext.each(filters, function (filter, index) {

            if (filter) {

                var values = filter.values;

                if (filter.key === facetName) { // if it already exists

                    filterExists = true;

                    if (isChecked) {   // if the checkbox has been selected, add the selection

                        values.push({ value: inputValue});

                    } else {       // if the checkbox has been deselected, remove the selection

                        //Since we are removing, we need to iterate from end to beginning
                        var len = values.length;
                        var valueIndex;
                        for (valueIndex = len - 1;  valueIndex >= 0; valueIndex--) {
                            var val = values[valueIndex];
                            if (val.value === inputValue) {
                                Ext.Array.remove(values, values[valueIndex]);
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

        if (!filterExists && isChecked) {
            filters.push({
                'key': facetName,
                'values': [
                    {value: inputValue}
                ]   // this is always an array
            });
        }


        var searchController = Savanna.controller.Factory.getController('Savanna.modelSearch.controller.SearchComponent');

        if (searchController !== undefined && doTheSearch ) {
            this.doFilter(this);
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
