Ext.define('Savanna.modelSearch.model.dalSource.CustomSearchParameter', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'id', type: 'string' },
        { name: 'displayLabel', type: 'string' },
        { name: 'defaultValue' },
        { name: 'date' },
        { name: 'parameterType', type: 'string' },

        // NOTE: could possibly be hasMany relationships...
        { name: 'list' },
        { name: 'radioOptions' }
    ],

    belongsTo: 'Savanna.modelSearch.model.dalSource.CustomSearchGroup'
});
