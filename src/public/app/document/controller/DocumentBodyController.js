Ext.define("Savanna.document.controller.DocumentBodyController", {
	 extend: 'Deft.mvc.ViewController',
	 
	 init: function() {
			
		// get the domElement which is the Flexpaper element 
 		var domElement = this.getView().domElement;
	
 		//Bind all flexpaper events
		jQuery(domElement).bind('onDocumentLoading', function(e) {
			
		});
		
		jQuery(domElement).bind('onCurrentPageChanged', function(e, pagenum) {
			// setting the current page value in currentPage text field in active tab
			Ext.ComponentQuery.query('desktop_savannaworkspace #maintabpanel')
				[0].getActiveTab().down('#currentPage').setValue(pagenum);
		});
		
		jQuery(domElement).bind('onDocumentLoaded',function(e, totalPages) {
			Ext.ComponentQuery
					.query('desktop_savannaworkspace #maintabpanel')[0]
					.getActiveTab().down('#totalPages').setText(totalPages);
		});
	},
	
	 
});
