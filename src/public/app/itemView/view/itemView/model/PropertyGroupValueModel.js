/**
 * Created with IntelliJ IDEA.
 * User: bjohnson
 * Date: 10/15/13
 * Time: 2:36 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.itemView.view.itemView.model.PropertyGroupValueModel', {
    extend: 'Ext.data.Model',

    requires: [
        'Savanna.itemView.view.itemView.model.PropertyGroupValueValueModel'
    ],

    fields: [
        { name: 'label'},
        { name: 'predicateUri'},
        { name: 'values'}
    ],

    associations: [
        {
            type: 'hasMany',
            model: 'Savanna.itemView.view.itemView.model.PropertyGroupValueValueModel',
            name: 'values',
            associationKey:'values'
        }
    ]
});

