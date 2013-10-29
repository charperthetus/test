// Extending tabs
Ext.define('Savanna.components.autoComplete.Tag', {
    extend: 'Ext.tab.Tab',
    
    alias: 'widget.autocomplete_tags',
    
    closable: true,
    
    bubbleEvents: ['Tag:RemoveSearchTerm'],
    
    listeners:  {
        click: function() {
            this.fireEvent('Tag:RemoveSearchTerm', this);
        }
    },
    
    setTerm: function(term)  {
        this.setText(term);
    }
});