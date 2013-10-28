/* global Ext: false, Savanna: false */
/**
 * Created with IntelliJ IDEA.
 * User: ksonger
 * Date: 7/17/13
 * Time: 11:08 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.modelSearch.view.SearchComponent', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.model_search_searchcomponent',

    requires: [
        'Savanna.modelSearch.view.searchComponent.SearchBody',
        'Savanna.modelSearch.view.searchComponent.SearchBar',
        'Savanna.modelSearch.view.searchComponent.SearchToolbar',
        'Savanna.controller.Factory',
        'Savanna.modelSearch.controller.SearchDals'
    ],

    layout: 'border',
    flex:4,
    //todo: uncomment if this component is not in a floating window
//    title: 'Search',
    closable:false,
    border:false,


    items: [
        {
            xtype: 'model_search_searchbar',
            itemId: 'searchbar',
            region: 'north'
        },
        {
            hidden: true,
            xtype: 'model_searchbody',
            itemId: 'searchbody',
            region: 'center'
        }
    ],

    dockedItems: [
        {
            xtype: 'model_search_searchtoolbar',
            itemId: 'searchtoolbar'
        }
    ],

    initComponent: function () {

        this.refineSearchString = '';

        this.callParent(arguments);

        Savanna.controller.Factory.getController('Savanna.modelSearch.controller.SearchComponent');
    }
});
