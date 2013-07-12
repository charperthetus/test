Ext.define('Savanna.model.dalSource.CustomSearchGroup', {
    extend: 'Ext.data.Model',

    alternateClassName: 'DalCustomSearchGroup',

    requires: [
        'Savanna.model.dalSource.CustomSearchParameter'
    ],

    fields: [
        { name: 'id', type: 'string' },
        { name: 'displayLabel', type: 'string' }
    ],

    belongsTo: 'Savanna.model.DalSource',

    hasMany: [
        { model: 'Savanna.model.dalSource.CustomSearchParameter', name: 'customSearchParameters' }
    ]
});