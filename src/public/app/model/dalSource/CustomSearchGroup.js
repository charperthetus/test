Ext.define('Savanna.model.dalSource.CustomSearchGroup', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'id', type: 'string' },
        { name: 'displayLabel', type: 'string' },

        // TODO: this should probably be a has-many for another sub-model
        { name: 'customSearchParameters' }
    ]
});