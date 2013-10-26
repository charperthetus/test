/* global Ext: false */
/**
 * Savanna.utils.EventHub
 *
 * Singleton class to pass all application level events through.
 *
 */
Ext.define('Savanna.utils.EventHub', {
    alternateClassName: ['EventHub'],
    mixins: {
        observable: 'Ext.util.Observable'
    },
    singleton: true,
    constructor:function(config){
        this.mixins.observable.constructor.call(this, config);
    }
});