/*
*   Search Field Override
*
*   @author jlashley 9/26/2013
*  @edits  astump  10/15/2013 -
*       - minor edits to pass jslint validation.
*       - added this.callSuper(arguments) 
*           - see http://docs.sencha.com/extjs/4.2.0/#!/api/Ext.Base-method-callSuper
* 
*   As of 10/15/2013 the Ext.us.form.SearchField is not included the Sencha documentation.
*   We believe this is becuase it is not a complete widget in EXT. JS. 4.2.0 OR 4.2.1
*   So this component is the main component for search field which should be used in all themes if swapped.
*
*/
Ext.define('ThetusUikit.ux.form.SearchField', {
    extend: 'Ext.form.field.Trigger',

    alias: 'widget.thetus-searchfield',

    // Search and Close trigger icon classes
    trigger1Cls: Ext.baseCSSPrefix + 'form-clear-trigger',
    trigger2Cls: Ext.baseCSSPrefix + 'form-search-trigger',

    hasSearch : false,
    paramName : 'query',


    initComponent: function(){
        var me = this;

        // Calls parent class of overridden class.
        me.callParent(arguments);

        me.on('specialkey', function(f, e){
            if(e.getKey() === e.ENTER){
                me.onTrigger2Click();
            }
            // Get UX direction on this. ESC keypress may not work for UI.
            if(e.getKey() === e.ESC){
                me.onTrigger1Click();
            }
        }, me);
    },

    checkChange: function(){
        var me = this;
        if ( me.triggerEl !== undefined  ){
            var str = me.getValue();
            if (str.length > 0){
                me.hasSearch = true;
                me.triggerEl.item(0).setDisplayed('block');
            } else {
                me.hasSearch = false;
                me.triggerEl.item(0).setDisplayed('none');
            }
        }
    },

    afterRender: function(){
        var me = this;
        // Calls the parent class of the overriden class.
        me.callParent();
        // Hide the close icon.
        this.triggerEl.item(0).setDisplayed('none');
        this.triggerEl.item(0).set({'data-selid': 'search_clear'});
        this.triggerEl.item(1).set({'data-selid': 'search_submit'});
    },

    // Close icon trigger click
    onTrigger1Click : function(event){
        var me = this;
        if(me.hasSearch){
            me.setValue('');
            me.fireEvent('onclearclick', me, event); 
        }
    },

    // Search icon trigger click
    onTrigger2Click : function(event){
        var me = this;
        if (me.hasSearch){
            me.fireEvent('onsearchclick', me, event);
        }
    }
});