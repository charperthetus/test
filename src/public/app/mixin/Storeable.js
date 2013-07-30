/**
 * Created with IntelliJ IDEA.
 * User: thille
 * Date: 7/30/13
 * Time: 1:33 PM
 * To change this template use File | Settings | File Templates.
 */
/* global Ext: false */
/**
 * Savanna.mixin.Storeable
 *
 * A mixin to create Ext.data.Store backed containers
 *
 * General Usage:
 *
 * // In your class definition
 * Ext.define('Savanna.someView.Foo', {
 *      extend: 'Some.subclass.of.Ext.container.AbstractContainer',
 *      mixins: {
 *          storeable: 'Savanna.mixin.Storeable'
 *      },
 *      store: 'Savanna.some.Store',
 *      initComponent: function() {
 *          this.initStore();
 *      }
 * });
 */

// TODO: TEST!!!!!!

Ext.define('Savanna.mixin.Storeable', {
    /**
     * initializes the store
     *
     * This should be called in initComponent()
     */
    initStore: function () {
        // Look up the configured Store. If none configured, use the fieldless, empty Store defined in Ext.data.Store.
        this.store = Ext.getStore(this.store || 'ext-empty-store') || Ext.create(this.store) || Ext.getStore('ext-empty-store');

        this.mon(this.store, {
            load: this.onStoreLoad,
            scope: this
        });
    },

    /**
     * Returns the store associated with this Panel.
     * @return {Ext.data.Store} The store
     */
    getStore: function() {
        return this.store;
    }
});
