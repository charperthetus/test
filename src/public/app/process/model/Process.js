/**
 * Created with IntelliJ IDEA.
 * User: bcannon
 * Date: 10/17/13
 * Time: 12:55 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.process.model.Process', {
    extend: 'Ext.data.Model',

    requires: [
        'Savanna.itemView.model.MainItemModel'
    ],

    fields: [
        { name: 'class', type: 'string' },
        { name: 'nodeKeyProperty', type: 'string' },
        { name: 'uri', type: 'string' },
        'nodeDataArray',
        'linkDataArray'
    ],

    associations: [
        {
            type: 'hasMany',
            model: 'Savanna.itemView.model.MainItemModel',
            name: 'nodeDataArray',
            associationKey:'nodeDataArray',
            foreignKey: 'label'
        }
    ]
});
