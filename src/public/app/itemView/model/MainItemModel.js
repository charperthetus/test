/**
 * Created with IntelliJ IDEA.
 * User: bjohnson
 * Date: 10/15/13
 * Time: 2:36 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.itemView.model.MainItemModel', {
    extend: 'Ext.data.Model',

    requires: [
        'Savanna.itemView.model.KVPairGroupModel',
        'Savanna.itemView.model.PropertyGroupModel'
    ],

    fields: [
        { name: 'label'},
        { name: 'uri'},
        { name: 'editable'},
        { name: 'deletable'},
        { name: 'version'},
        { name: 'created'},
        { name: 'createdBy'},
        { name: 'lastModified'},
        { name: 'lastModifiedBy'},
        { name: 'kvPairGroups'},
        { name: 'propertyGroups'}
    ],

    associations: [
        {
            type: 'hasMany',
            model: 'Savanna.itemView.model.KVPairGroupModel',
            name: 'kvPairGroups',
            associationKey:'kvPairGroups'
        },
        {
            type: 'hasMany',
            model: 'Savanna.itemView.model.PropertyGroupModel',
            name: 'propertyGroups',
            associationKey:'propertyGroups'
        },
        {
            type: 'belongsTo',
            model: 'Savanna.process.model.Process',
            name: 'nodeDataArray',
            associationKey: 'nodeDataArray',
            foreignKey: 'label'
        }
    ]
});

