/**
 * Created by jbarmettler on 10/8/13.
 */

Ext.define('Savanna.search.controller.resultsComponent.ResultsPreviewContentController', {
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
        Savanna.getApplication().fireEvent("search:previewPrevButton");

    },

    onNextClick: function() {
        var view =  this.getView();
        Savanna.getApplication().fireEvent("search:previewNextButton");
    },

    init: function () {
       return this.callParent( arguments );
    }

} );
