 //
 // *	@author astump	10/9/2013 - sets the default state of panels in Savanna to only allow 
 // *								collapsed/uncollapsed states, not the floating effect over 
 // *								additional content.
 // *
 //

Ext.define('Savanna-Theme.panel.Panel', {
	override: 'Ext.panel.Panel',
	
	floatable: false
});