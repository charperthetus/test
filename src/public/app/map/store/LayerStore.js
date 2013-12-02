Ext.define('Savanna.map.store.LayerStore', {
    extend: 'Ext.data.TreeStore',
    requires: ['Savanna.map.model.LayerModel'],

    model: 'Savanna.map.model.LayerModel',
    folderSort: true,

    root: {
        expanded: true
    },
    rootVisible: false,

    proxy: {
        type: 'memory',
        reader: {
            type: 'json'
        }
    }
});