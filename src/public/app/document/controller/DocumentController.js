Ext.define("Savanna.document.controller.DocumentController", {
    extend: 'Deft.mvc.ViewController',
    currentView: 'Portrait',
    currentTool: 'hand',
    dvId: null,
    control: {
        searchText: true,
        selectTool: {
            click: 'onSelectTool'
        },
		
        zoomIn: {
            click: 'onZoomIn'
        },
        zoomOut: {
            click: 'onZoomOut'
        },
        zoomFit: {
            click: 'onZoomFit'
        },
        nextPage: {
            click: 'onNextPage'
        },
        previousPage: {
            click: 'onPreviousPage'
        },
        singlePageView: {
            click: 'onSinglePageView'
        },
        thumbView: {
            click: 'onThumbView'
        },
        searchDoc: {
            click: 'onSearchDoc'
        },
        exportDoc: {
            click: 'onExportDoc'
        },
        printDoc: {
            click: 'onPrintDoc'
        },
        searchText:{//search textbox enter event
                keyup:'handleSearchTextKeyUp'
        },
	currentPage: {
		keyup: 'handlePageTextKeyUp'
	}		
		
    },
    init: function () {
		
		this.dvId = this.getView().docViewId;
    },
	

	onSelectTool: function() {
       $FlexPaper(this.dvId).setCurrentCursor("TextSelectorCursor");
        this.currentTool = "select";
    },
    onZoomIn: function() {
        $FlexPaper(this.dvId).setZoom($FlexPaper(this.dvId).scale + .2);
    },
    onZoomOut: function() {
        $FlexPaper(this.dvId).setZoom($FlexPaper(this.dvId).scale - .2);
    },
    onZoomFit: function() {
		//TODO:Need to discuss with thetus regarding single and two page with zoom fit
        $FlexPaper(this.dvId).fitHeight();
    },
    onNextPage : function() {
        $FlexPaper(this.dvId).nextPage();
    },
    onPreviousPage : function() {
        $FlexPaper(this.dvId).prevPage();
    },
    onSinglePageView:function() {
	this.currentPageNumber = $FlexPaper(this.dvId).getCurrPage();
        $FlexPaper(this.dvId).switchMode("Portrait");
		this.currentView='Portrait';
    },
    onThumbView:function() {
        $FlexPaper(this.dvId).switchMode("Tile");
        this.currentView='Tile';
    },
    onSearchDoc : function() {
        var searchText = this.getSearchText().getValue();
        if (searchText != "") {
            $FlexPaper(this.dvId).searchText(searchText);
        }
    },
    onPrintDoc : function() {
        $FlexPaper(this.dvId).printPaper();
    },
    onExportDoc : function() {
        location.href =  SavannaConfig.documentUrl + this.getView().itemUri + "/;jsessionid=" 
							+ Savanna.jsessionid;
    },
    //search text key up handler
    handleSearchTextKeyUp: function (field, evt) {
        //check the enter key is pressed or not
        if (evt.keyCode === Ext.EventObject.ENTER) {
            this.onSearchDoc();
        }
    },
     //hange the page change event
     handlePageTextKeyUp : function(field , event){
        if(event.keyCode == Ext.EventObject.ENTER){
                $FlexPaper(this.dvId).gotoPage(field.getValue());
        }
     }
    

});
