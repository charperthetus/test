/* global Ext: false */
/**
 * Override of Ext.AbstractComponent to take any component with an itemId and add that to the DOM element for the
 * component as a "data-selid" attribute to allow for Selenium selectors to reach said component.
 */
Ext.define('Savanna.patch.AbstractComponent', {
    extend: 'Ext.AbstractComponent'
}, function() {
    Ext.override(Ext.AbstractComponent, {
        onRender: function() {
            if (this.itemId) {
                this.getEl().dom.setAttribute('data-selid', this.itemId);
            }

            this.callParent(arguments);
        }
    });
});