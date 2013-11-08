Ext.define("Savanna.document.view.DocumentBody", {
    extend:"Ext.container.Container",
    alias:"widget.document_body",
    layout: "fit",
    autoScroll: false,
    requires:['Savanna.document.controller.DocumentBodyController'],
    docViewId: null,	
    itemUri: null,	
    border:false,
    domElement: null,	
    controller: 'Savanna.document.controller.DocumentBodyController',

    initComponent:function()    {
        this.callParent();
    },
	
		

    listeners: {
              resize: {
                  fn: function(el) {
                       //Flexpaper found
                        if($('#'+this.docViewId).parent().hasClass('flexpaper_viewer_container'))
                        {     
                                  
                              //to flexpaper viewer container
                              $('#'+this.docViewId).width(this.getWidth());
                              $('#'+this.docViewId).height(this.getHeight());
                             
							  //to flexpaper main container
                              $('#'+this.docViewId).parent().width(this.getWidth());
                              $('#'+this.docViewId).parent().height(this.getHeight());
                              
							  //apply to inner container
                              $('#pagesContainer_'+this.docViewId).width(this.getWidth());
                              $('#pagesContainer_'+this.docViewId).height(this.getHeight());
							  $FlexPaper(this.docViewId).fitHeight(); 
                              $FlexPaper(this.docViewId).fitWidth(); 
                              

                        }
                 }
              }
          },
    afterRender: function() {
		this.callParent(arguments);

		// get the document uri using the documentComponent's itemUri which inturn is set by the documentFactory instantiation with docUri as parameter
		this.itemUri = this.findParentByType('documentcomponent').itemUri;

		//This div needs an explicit id
        this.docViewId = this.findParentByType('documentcomponent').docViewId;
		this.domElement = Ext.DomHelper.insertHtml("afterBegin", 
			  this.getEl().dom, 
			  "<div id='" + this.docViewId
			  + "' class='flexpaper_viewer' style='width: 100%; height: "+this.findParentByType('tabpanel').getHeight()+"px;'></div>");

        jQuery(this.domElement).FlexPaperViewer(
            {
                config: {
                    PDFFile: SavannaConfig.documentUrl + this.itemUri + ';jsessionid=' 
			     + Savanna.jsessionid,
                    key: "@86cf4d402afdbe0b389$f6de2e67f473111c51e",
                    ZoomTransition: 'easeOut',
                    ZoomTime: 0.5,
                    ZoomInterval: 0.2,
                    FitPageOnLoad: false,
                    FitWidthOnLoad: false,
                    FullScreenAsMaxWindow: true,
                    ProgressiveLoading: false,
                    MinZoomSize: 0.2,
                    MaxZoomSize: 5,
                    SearchMatchAll: false,
                    BottomToolbar: 'none',
                    Toolbar: 'none',
                    InitViewMode: 'Portrait',
                    RenderingOrder: 'html5',
                    StartAtPage: '',
                    WMode: 'window',
                    localeChain: 'en_US',
                    localeDirectory: 'resources/flexpaper/locale/'
                }
            }
        );
    }		
});
