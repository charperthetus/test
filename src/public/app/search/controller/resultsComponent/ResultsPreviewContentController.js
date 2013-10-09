/**
 * Created by jbarmettler on 10/8/13.
 */

Ext.define('Savanna.search.controller.resultsComponent.ResultsPreviewContentController', {
    extend: 'Deft.mvc.ViewController',
    control: {
        previewclosebutton:  {
            click: 'onCloseClick'
        }

    },
    onCloseClick: function() {
        var view =  this.getView();
        if(view){
            view.up('#resultspreviewwindow').hide();
        }

    },

    init: function () {
       return this.callParent( arguments );
    }

} );
