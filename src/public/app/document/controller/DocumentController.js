Ext.define("Savanna.document.controller.DocumentController", {
    extend: 'Deft.mvc.ViewController',
    currentView: 'Portrait',
    currentTool: 'hand',
    dvId: null,
    control: {
        searchText: true,
        handTool: {
            click: 'onHandTool'
        },
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
        twoPageView: {
            click: 'onTwoPageView'
        },
        searchDoc: {
            click: 'onSearchDoc'
        },
        exportDoc: {
            click: 'onExportDoc'
        },
        printDoc: {
            click: 'onPrintDoc'
        }
    },
    init: function () {
        this.dvId = this.getView().docViewId;
    },
    onHandTool: function() {
        $FlexPaper(this.dvId).setCurrentCursor("ArrowCursor");
        this.currentTool = "hand";
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
        if( this.currentView != 'TwoPage') {
            $FlexPaper(this.dvId).fitwidth();
        }

    },
    onNextPage : function() {
        $FlexPaper(this.dvId).nextPage();
    },
    onPreviousPage : function() {
        $FlexPaper(this.dvId).prevPage();
    },
    onSinglePageView:function() {
        $FlexPaper(this.dvId).switchMode("Portrait");
        this.currentView='Portrait';
    },
    onThumbView:function() {
        $FlexPaper(this.dvId).switchMode("Tile");
        this.currentView='Tile';
    },
    onTwoPageView:function() {
        $FlexPaper(this.dvId).switchMode("TwoPage");
        this.currentView ='TwoPage';
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
        location.href =  SavannaConfig.documentUrl + this.getView().itemUri + "/original;jsessionid=" + Savanna.jsessionid
    }


});
