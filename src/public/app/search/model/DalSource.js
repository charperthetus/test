Ext.define('Savanna.search.model.DalSource', {
    extend: 'Ext.data.Model',

    // NOTE: if you have a relationship, you need to be sure to require that model...
    requires: [
        'Savanna.search.model.dalSource.CustomSearchGroup'
    ],

    fields: [
        { name: 'id', type: 'string' },
        { name: 'displayName', type: 'string' },
        { name: 'textDescription', type: 'string' },

        // This is data that is not needed for search display, but IS needed for results display...
        { name: 'facetDescriptions' },

        // These are fields that currently are not used
        { name: 'timeoutMillis', type: 'int' },
        { name: 'inputTypes' },
        { name: 'outputTypes' }
    ],

    // NOTE: the model class must be fully qualififed in your relationship definition
    hasMany: [
        { model: 'Savanna.search.model.dalSource.CustomSearchGroup', name: 'customSearchGroups' }
    ]
});