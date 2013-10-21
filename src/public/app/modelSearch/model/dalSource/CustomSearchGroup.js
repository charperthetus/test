Ext.define('Savanna.modelSearch.model.dalSource.CustomSearchGroup', {
    extend: 'Ext.data.Model',

    alternateClassName: 'DalCustomSearchGroup',

    requires: [
        'Savanna.modelSearch.model.dalSource.CustomSearchParameter'
    ],

    fields: [
        { name: 'id', type: 'string' },
        { name: 'displayLabel', type: 'string' }
    ],

    belongsTo: 'Savanna.modelSearch.model.DalSource',

    hasMany: [
        { model: 'Savanna.modelSearch.model.dalSource.CustomSearchParameter', name: 'customSearchParameters' }
    ]
});
