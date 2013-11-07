// Extending tabs
Ext.define('Savanna.components.tags.Tag', {
    extend: 'Ext.tab.Tab',
    
    alias: 'widget.autocomplete_tags',

    requires: ['Savanna.components.tags.TagsController'],
    
    controller: 'Savanna.components.tags.TagsController',
    
    closable: true,

    ui:'autocomplete-tag',

    margin:'1',

    border:0,
    
    style:{
        position:'relative',
        maxWidth: '100%'
    },

    // Allow events to bubble up to other controllers
    bubbleEvents: [
        'Tag:RemoveSearchTerm',
        'Tag:TagClicked'
    ],
    
    // Method to set tag text
    setTerm: function(term)  {
        this.setText(term);
    }
});