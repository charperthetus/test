// Extending tabs
Ext.define('Savanna.components.tags.Tag', {
    extend: 'Ext.tab.Tab',
    
    alias: 'widget.autocomplete_tags',

    requires: ['Savanna.components.tags.TagsController'],
    
    controller: 'Savanna.components.tags.TagsController',
    
    closable: true,

    ui:'grey',

    margin:'1',
    
    style:{
        position:'relative'
    },
    bubbleEvents: [
        'Tag:RemoveSearchTerm',
        'Tag:TagClicked'
    ],
    
    setTerm: function(term)  {
        this.setText(term);
    }
});