/**
 * Created by jbarmettler on 10/8/13.
 */

Ext.define('Savanna.search.controller.resultsComponent.ResultsPreviewContentController', {
    extend: 'Deft.mvc.ViewController',
    control: {
        previewCloseButton:  {
            click: 'onCloseClick'
        },
        previewPrevButton:  {
            click: 'onPrevClick'
        },
        previewNextButton:  {
            click: 'onNextClick'
        },
        openResult:  {
            click: 'onOpenClick'
        }

    },

    onCloseClick: function() {
        var view =  this.getView();
        if(view){
            view.up('#resultspreviewwindow').hide();
        }

    },

    onOpenClick: function() {
        var rec =  this.getView().currentRecord;
        EventHub.fireEvent('open', {uri: rec.uri, type: rec.contentType, label: rec.title})
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
