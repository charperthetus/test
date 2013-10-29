// Extending tabs
Ext.define('Savanna.components.autoComplete.Tag', {
    extend: 'Ext.tab.Tab',
    
    alias: 'widget.autocomplete_tags',

    requires: ['Savanna.components.autoComplete.TagsController'],
    
    controller: 'Savanna.components.autoComplete.TagsController',
    
    closable: true,
    
    bubbleEvents: ['Tag:RemoveSearchTerm'],
    
    setTerm: function(term)  {
        this.setText(term);
    }
});