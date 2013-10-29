/**
 * Created with IntelliJ IDEA.
 * User: ksonger
 * Date: 10/24/13
 * Time: 1:35 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.itemView.model.IntendedUses', {
    extend: 'Ext.data.Model',

    fields: [
        {name: "label"},
        {name: "uri"},
        {name: "value"},
        {name: "version"},
        {name: "editable"},
        {name: "inheritedFrom"}
    ]
});
