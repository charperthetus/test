/**
 * Created by jbarmettler on 10/8/13.
 */

Ext.define('Savanna.modelSearch.controller.resultsComponent.ResultsPreviewContentController', {
    extend: 'Deft.mvc.ViewController',
    control: {
        previewclosebutton:  {
            click: 'onCloseClick'
        },
        previewPrevButton:  {
            click: 'onPrevClick'
        } ,
        previewNextButton:  {
            click: 'onNextClick'
        }

    },

    onCloseClick: function() {
        var view =  this.getView();
        if(view){
            view.up('#resultspreviewwindow').hide();
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
