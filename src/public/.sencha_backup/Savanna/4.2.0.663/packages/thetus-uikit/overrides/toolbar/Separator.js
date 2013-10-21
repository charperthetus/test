Ext.define('ThetusUikit.toolbar.Separator', {
    override: 'Ext.toolbar.Separator',
  onRender: function(){
  		this.callParent(arguments);
  		var separator = Ext.ComponentQuery.query('pagingtoolbar > tbseparator');
        Ext.Array.each(separator, function(name){ name.hidden=true;});
  	}
});