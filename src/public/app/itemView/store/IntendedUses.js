/**
 * Created with IntelliJ IDEA.
 * User: ksonger
 * Date: 10/24/13
 * Time: 1:34 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.itemView.store.IntendedUses', {
    extend: 'Ext.data.Store',

    model: 'Savanna.itemView.model.IntendedUses',

    storeId: 'intended_use',

    /*
     until we have some services to work with
     */
    data: [
        {
            "label": "Intended Use 1",
            "uri": "xfe320da4-4b6c-3584-9c45-96dd13d52f3d%2FItemPropertyValue",
            "value": "Intended Use 1",
            "version": 0,
            "editable": true,
            "inheritedFrom": null
        },
        {
            "label": "Intended Use 2",
            "uri": "x850f62e9-0c6a-3560-aa8d-ae528732fcc6%2FItemPropertyValue",
            "value": "Intended Use 2",
            "version": 0,
            "editable": false,
            "inheritedFrom": {
                "label": "ParentClass",
                "uri": "xdce5c08e-29f1-39fa-9a8d-d64ff48fc06e%2FItem"
            }
        }
    ]
});
