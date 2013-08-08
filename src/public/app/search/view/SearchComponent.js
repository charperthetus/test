/**
 * Created with IntelliJ IDEA.
 * User: ksonger
 * Date: 7/17/13
 * Time: 11:08 AM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.search.view.SearchComponent', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.search_searchcomponent',

    requires: [
        'Savanna.search.view.SearchBody',
        'Savanna.search.view.SearchBar',
        'Savanna.search.view.SearchToolbar',
        'Savanna.controller.Factory',
        'Savanna.search.controller.SearchDals'
    ],

    layout: 'border',
    flex:4,
    title: 'Search',
    closable:false,
    border:false,
    mixins: {
        storeable: 'Savanna.mixin.Storeable'
    },
    store:"Savanna.search.store.SearchHistory",
    items: [
        {
            xtype: 'search_searchbar',
            itemId: 'searchbar',
            region: 'north'
        },
        {
            xtype: 'search_searchbody',
            itemId: 'searchbody',
            region: 'center'
        }
    ],
    dockedItems: [
        {
            xtype: 'search_searchtoolbar',
            itemId: 'searchtoolbar'
        }
    ],

    initComponent: function () {
        this.callParent(arguments);
        Savanna.controller.Factory.getController('Savanna.search.controller.SearchComponent');
        this.initStore();
    },
    onStoreLoad: function() {
        // do any magic you need to your container when the store is reloaded
        this.updateHistory(Ext.data.StoreManager.lookup('searchHistory').searches);
    },
    updateHistory: function (searches) {
        //#searchtoolbar #historybutton #historymenu
        var historyMenu = this.down("#historymenu");
        historyMenu.removeAll();
        //TODO: look for dupes and do not include them - or, remove at store level
        Ext.each(searches, function (search, index) {
            historyMenu.add({
                text: search.query
            })
        })
    }
});