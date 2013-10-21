/**
 * Created by jbarmettler on 10/8/13.
 */

Ext.define('Savanna.search.controller.resultsComponent.resultsDals.ResultsRefineSearchbarController',
    {
        extend: 'Deft.mvc.ViewController',

        control: {
            refine_search_terms: {
                keyup: 'onKeyUp',
                'onsearchclick': 'onSubmitClick'
            }
        },


        onKeyUp: function (field, evt) {
            if (evt.keyCode === Ext.EventObject.ENTER) {
                return this.onNewSearchTerm(field);
            }
            return false;
        },

        //Called when a new search term is added by pressing enter or the search button.
        onNewSearchTerm: function (field) {
            if (field.getValue().trim().length) {
                field.findParentByType('search_searchcomponent').refineSearchString += (field.getValue() + ' AND ');
                field.findParentByType('search_searchcomponent').down('#refineterms').addTerm(field);

                //Handle in main search results controller
                Savanna.getApplication().fireEvent('results:refineSearch', field);
                return true;
            }
            return false;
        },


        onSubmitClick: function (field) {
            console.log(field);
            var field = field.findParentByType('search_resultscomponent').down('#refine_search_terms');
            return this.onNewSearchTerm(field);
        },

        init: function () {
            return this.callParent(arguments);
        }

    }
);