/**
 * Created by jbarmettler on 10/8/13.
 *
 * Controls those purple/blue chicklets with text and an X on the right.
 *
 */

Ext.define('Savanna.modelSearch.controller.resultsComponent.resultsDals.ResultsFacetsController',
    {
        extend: 'Deft.mvc.ViewController',

        control: {
            //the close button
            showHideFacets: {
                click: 'onHideShowFacetsClick'
            }
        },


        onHideShowFacetsClick: function (btn) {
            Ext.each(btn.up('#resultsfacets').query('panel[cls=results-facet]'), function (facet) {
                if (facet) {
                    if (!btn.facetsExpanded) {
                        btn.setText('Hide All');
                        facet.expand();
                    } else {
                        facet.collapse();
                        btn.setText('Show All');
                    }
                }
            });
            btn.facetsExpanded = !btn.facetsExpanded;
        },

        init: function () {
            return this.callParent(arguments);
        }

    }
);
