/*
 *	@author eirby 8/29/2013
 *	@edits	astump 9/5/2013 - added this.callParent(arguments) to initComponent
 *
*/

Ext.define('ThetusUikit.form.field.Number', {
	override: 'Ext.form.field.Number',
	initComponent: function(){
		this.callParent(arguments);
	//Enables key event on comnpoent, these are disable by default.	
		enableKeyEvents=true;
		width=null;
	},
	onRender: function(){
		this.callParent(arguments);
		// Sets the scope of all function that follow
		var pagingtoolbar = this.findParentByType('pagingtoolbar');
		//Width set on render to be assed into keyup
		defaultWidth = this['width']; //Todo: figure out a better way to do this rather than a global scoped variable
		// Once the scope is set and is true the keyup listner is set
		if (pagingtoolbar) {
			var numberfields = pagingtoolbar.down('numberfield');

			if (numberfields['value'] > 0) {
				//numberfields is the item and keyup is onscreen event I'm listening for.
				numberfields.mon('keyup', this.monKeyUp, this);
			}
		}
	},

	//Keyup event listened for in line #17 
	onKeyUp: function(event, numberfields, options) {
		//Grab lentgth on input value
		var value = numberfields['value'].toString().length;
		if(value >= 3){
		this.setWidth((value-2)*7 + defaultWidth);
		}else{
			this.setWidth(defaultWidth);
		}
	}
});

