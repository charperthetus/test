/**
 * Created with IntelliJ IDEA.
 * User: bjohnson
 * Date: 10/15/13
 * Time: 2:36 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.itemView.model.KVPairGroupModel', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'label'},
        { name: 'layoutType'}
    ],

    associations: [
        { type: 'hasMany', model: 'KVPairModel', name: 'pairs'}
    ]
});

