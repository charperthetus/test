/**
 * Created by jbarmettler on 10/8/13.
 */

Ext.define('Savanna.search.controller.resultsComponent.ResultsPreviewContentController', {
    extend: 'Deft.mvc.ViewController',
    control: {

        openResult:  {
            click: 'onOpenClick'
        }

    },



    onOpenClick: function() {
        var rec =  this.getView().currentRecord;
        EventHub.fireEvent('open', {uri: rec.uri, type: rec.contentType, label: rec.title})
    },



    init: function () {
       return this.callParent( arguments );
    }

} );
