/*
 *	Search Field Override
 *
 *	@author jlashley 9/26/2013
 *
 */

//TODO I willl add comments later after another task

Ext.define('ThetusUikit.ux.form.SearchField', {
    extend: 'Ext.form.field.Trigger',

    alias: 'widget.searchfield',

    trigger1Cls: Ext.baseCSSPrefix + 'form-clear-trigger',

    trigger2Cls: Ext.baseCSSPrefix + 'form-search-trigger',

    hasSearch : false,
    paramName : 'query',

    initComponent: function(){
        this.callParent(arguments);
        this.on("specialkey" , function(f, e){
            if(e.getKey() == e.ENTER){
                this.onTrigger2Click();
            }
            if(e.getKey() == e.ESC){
                Ext.getCmp(this.getEl()['id']).setValue('');
            }
        }, this);
    },

    checkChange: function(){
        var me = this;
        console.log(me);
        if ( me.triggerEl !== undefined  ){
            var str = Ext.getCmp(this.getEl()['id']).getValue();
            if (str.length > 0){
                me.triggerEl.item(0).setDisplayed('block');
            } else {
                me.triggerEl.item(0).setDisplayed('none');
            }
        }
    },

    afterRender: function(){
        this.callParent();
        var me = this;
        me.triggerEl.item(0).setDisplayed('none');
    },

    onTrigger1Click : function(event){
        var me = this;
        console.log(me);
        Ext.getCmp(this.getEl()['id']).setValue('');

        this.fireEvent("onclearclick", this, event);
    },

    onTrigger2Click : function(event){
        this.fireEvent("onsearchclick", this, event);
    }
});