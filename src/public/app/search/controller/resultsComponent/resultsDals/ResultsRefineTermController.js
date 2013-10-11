/**
 * Created by jbarmettler on 10/8/13.
 *
 * Controls those purple/blue chicklets with text and an X on the right.
 *
 */

Ext.define('Savanna.search.controller.resultsComponent.resultsDals.ResultsRefineTermController',
    {
        extend: 'Deft.mvc.ViewController',

        control: {
            //the close button
            removeTerm: {
                click: 'onCloseButton'
            },

            //The label component.  This is here to auto-generate the getter for the component.
            termValue: {}
        },


        onCloseButton: function (closeButton) {
            this.getView().fireEvent('Search:RemoveSearchTerm', this.getTermValue().text, this.getView());
        },

        init: function () {
            return this.callParent(arguments);
        }

    }
);