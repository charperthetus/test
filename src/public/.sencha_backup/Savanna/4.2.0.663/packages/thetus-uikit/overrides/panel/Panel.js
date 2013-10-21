/*
 *	@author jgriffith 9/17/2013
 *	@edits	astump	9/18/2013 - changed from 'colapsible' to 'closable' to take advantage
 *								of the already built UI
 *
*/

Ext.define('ThetusUikit.panel.Panel', {
	override: 'Ext.panel.Panel',
	
	initComponent: function() {
		var me = this;
		me.callParent(arguments);
		if (me.collapsible){
			me.addClsWithUI('closable');
		}
	}
});