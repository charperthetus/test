/**
 * Created with IntelliJ IDEA.
 * User: bjohnson
 * Date: 10/15/13
 * Time: 2:36 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.itemView.model.PropertyGroupModel', {
    extend: 'Ext.data.Model',

    requires: [
        'Savanna.itemView.model.PropertyGroupValueModel'
    ],

    fields: [
        { name: 'id', mapping: 'label'},
        { name: 'label'},
        { name: 'layoutType'},
        { name: 'values'}
    ],

    associations: [
        {
            type: 'hasMany',
            model: 'Savanna.itemView.model.PropertyGroupValueModel',
            name: 'values',
            associationKey:'values'
        }
    ]
});

