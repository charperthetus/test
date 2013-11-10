Ext.define("Savanna.document.controller.DocumentBodyController", {
    extend: 'Deft.mvc.ViewController',

    init: function () {

        //get the view part
        var myView = this.getView();

        // get the domElement which is the Flexpaper element
        var domElement = myView.domElement;

        // Getting the toolbar instance
        var activeToolBar = myView.findParentByType('documentcomponent').down('document_toolbar');

        jQuery(domElement).bind('onCurrentPageChanged', function (e, pagenum) {

            // setting the current page value in currentPage text field in active tab
            activeToolBar.down('#currentPage').setValue(pagenum);

            var prevButton = activeToolBar.down('#previousPage');

            var nextButton = activeToolBar.down('#nextPage');

            //if the page number is one
            if (pagenum == 1) {
                prevButton.setDisabled(true);
                nextButton.setDisabled(false);
            }
            //if the page number is end of the page
            else if (pagenum == $FlexPaper(myView.docViewId).getTotalPages()) {
                prevButton.setDisabled(false);
                nextButton.setDisabled(true);
            }
            else {
                prevButton.setDisabled(false);
                nextButton.setDisabled(false);
            }
        });

        jQuery(domElement).bind('onDocumentLoaded', function (e, totalPages) {

            // setting the total page value in TotalPage Label field in active tab
            activeToolBar.down('#totalPages').setText(totalPages);
        });
    }


});
