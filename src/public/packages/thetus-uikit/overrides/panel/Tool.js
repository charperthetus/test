Ext.define('ThetusUikit.panel.Tool', {
	
	override: 'Ext.panel.Tool',
	onRender: function(){
        	this.callParent(arguments);
             var me = this['type'];
             if(me =='close'){
                this.setSize(16, 15);
                this.el.setStyle('left', '0');
             }
             if(me =='maximize'){
                this.setSize(20, 20);
             }
             if(me =='restore'){
                this.setSize(20, 20);
             }
        },
	renderTpl: [
        '<img id="{id}-toolEl" src="{blank}" class="{baseCls}-img {baseCls}-{type}' +
            '{childElCls}" role="presentation" data-wat="wat"/>'
    ]
});