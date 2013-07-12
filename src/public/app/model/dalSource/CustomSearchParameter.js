Ext.define('Savanna.model.dalSource.CustomSearchParameter', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'id', type: 'string' },
        { name: 'displayLabel', type: 'string' },
        { name: 'defaultValue' },
        { name: 'date' },

        // NOTE: could possibly be hasMany relationships...
        { name: 'list' },
        { name: 'radioOptions' }
    ],

    belongsTo: 'Savanna.model.dalSource.CustomSearchGroup'
});