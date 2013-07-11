Ext.define('Savanna.model.DalSource', {
    extend: 'Ext.data.Model',

    requires: [
        'Savanna.model.dalSource.CustomSearchGroup'
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

    hasMany: [
        { model: 'Savanna.model.dalSource.CustomSearchGroup', name: 'customSearchGroups' }
    ]
});