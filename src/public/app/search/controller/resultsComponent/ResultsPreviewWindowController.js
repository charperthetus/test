/**
 * Created by jbarmettler on 10/8/13.
 */

Ext.define('Savanna.search.controller.resultsComponent.ResultsPreviewWindowController', {
    extend: 'Deft.mvc.ViewController',
    control: {

        previewPrevButton:  {
            click: 'onPrevClick'
        },
        previewNextButton:  {
            click: 'onNextClick'
        }
    },

    onPrevClick: function() {
        var view =  this.getView();
        view.fireEvent("search:previewPrevButton");

    },

    onNextClick: function() {
        var view =  this.getView();
        view.fireEvent("search:previewNextButton");
    },

    init: function () {
       return this.callParent( arguments );
    }

} );

