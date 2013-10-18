/**
 * Created by jbarmettler on 10/8/13.
 */

Ext.define('Savanna.modelSearch.controller.resultsComponent.resultsDals.ResultsOptionsController',
    {
        extend: 'Deft.mvc.ViewController',

        onClick: function () {
            this.getView().fireEvent('search:changeSelectedStore',  this.getView());
        },

        init: function () {
            this.getView().body.on('click', this.onClick, this);
        }

    }
);
