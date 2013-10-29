/**
 * Created with IntelliJ IDEA.
 * User: swatson
 * Date: 10/23/13
 * Time: 1:30 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.itemView.store.Relationships', {
    extend: 'Ext.data.Store',

    model: 'Savanna.itemView.model.Relationships',

    storeId: 'relationship',

    data: [
        { key: '1', value: 'can be confused with' },
        { key: '2', value: 'is part of' },
        { key: '3', value: 'is mixed with' },
        { key: '4', value: 'smells like' }
    ]
});
