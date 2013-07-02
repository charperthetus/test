Ext.define('Savanna.model.DalSource', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'id', type: 'string' },
        { name: 'disaplayName', type: 'string' },
        { name: 'textDescription', type: 'string' },
        { name: 'customSearchDescription' },

        // This is data that is not needed for search display, but IS needed for results display...
        { name: 'facetDescriptions' },

        // These are fields that currently are not used
        { name: 'timeoutMillis', type: 'int' },
        { name: 'inputTypes' },
        { name: 'outputTypes' }
    ]
});