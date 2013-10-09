/**
 * Created by jbarmettler on 10/8/13.
 */

Ext.define('Savanna.search.controller.ResultsPreviewContentController', {
    extend: 'Deft.mvc.ViewController',
    control: {
        previewclosebutton:  {
            click: 'onCloseClick'
        }

    },
    onCloseClick: function() {
        this.getPreviewclosebutton().up('#resultspreviewwindow').hide();
    }

} );
