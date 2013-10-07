/*
 *
 *  Panel Header Override. 
 *  Forces icons, tools, and glyphs to the left of the panel title.
 *
 *  based on a solution offered in the Sencha forums 
 *  http://www.sencha.com/forum/showthread.php?208036-Accordion-Header-Move-collapse-button-to-left-of-header-title
 *
 *  @author astump 8/20/2013
 *  @edits jgriffith 8/22/2013
 *  
*/
Ext.define('ThetusUikit.panel.Header', {
    override: 'Ext.panel.Header',
    initComponent: function() {
        var me = this;
        me.callParent(arguments);
        var toggleElemIndex = this.items.findIndex('type', /expand|collapse/g),
            toggleElem;
        if (toggleElemIndex > -1) {
            toggleElem = this.items.removeAt(toggleElemIndex);
            this.items.insert(0, toggleElem);
        }
    }
});
