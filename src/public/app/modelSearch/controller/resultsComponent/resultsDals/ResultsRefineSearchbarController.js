/**
 * Created by jbarmettler on 10/8/13.
 */

Ext.define('Savanna.modelSearch.controller.resultsComponent.resultsDals.ResultsRefineSearchbarController',
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
                field.findParentByType('model_search_searchcomponent').refineSearchString += (field.getValue() + ' AND ');
                field.findParentByType('model_search_searchcomponent').down('#refineterms').addTerm(field);

                //Handle in main search results controller
                Savanna.getApplication().fireEvent('model_results:refineSearch', field);
                return true;
            }
            return false;
        },


        onSubmitClick: function (btn) {
            var field = btn.findParentByType('model_search_resultscomponent').down('#refine_search_terms');
            return this.onNewSearchTerm(field);
        },

        init: function () {
            return this.callParent(arguments);
        }

    }
);
