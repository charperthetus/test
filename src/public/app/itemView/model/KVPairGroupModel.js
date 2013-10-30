/**
 * Created with IntelliJ IDEA.
 * User: bjohnson
 * Date: 10/15/13
 * Time: 2:36 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.itemView.model.KVPairGroupModel', {
    extend: 'Ext.data.Model',

    requires: [
        'Savanna.itemView.model.KVPairModel'
    ],

    fields: [
        { name: 'id', mapping: 'label'},
        { name: 'layoutType'},
        { name: 'pairs'}
    ],

    associations: [
        {
            type: 'hasMany',
            model: 'Savanna.itemView.model.KVPairModel',
            name: 'pairs',
            associationKey:'pairs'
        }
    ]
});

