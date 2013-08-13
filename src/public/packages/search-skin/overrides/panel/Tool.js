Ext.define('SearchSkin.panel.Tool', {
	
	override: 'Ext.panel.Tool',

	renderTpl: [
        '<img id="{id}-toolEl" src="{blank}" class="{baseCls}-img {baseCls}-{type}' +
            '{childElCls}" role="presentation" data-wat="wat"/>'
    ]
});