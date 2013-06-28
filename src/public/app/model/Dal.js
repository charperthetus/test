Ext.define('Savanna.model.Dal', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'id', type: 'string' },
        { name: 'disaplayName', type: 'string' },
        { name: 'customSearchDescription', type: 'string' },
        { name: 'timeoutMillis', type: 'int' },
        { name: 'textDescription', type: 'string' },
        { name: 'inputTypes' },
        { name: 'outputTypes' },
        { name: 'facetDescriptions' }
    ]
});