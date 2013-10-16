/**
 * Created with IntelliJ IDEA.
 * User: swatson
 * Date: 9/24/13
 * Time: 10:14 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.metadata.model.Metadata', {
    extend: 'Ext.data.Model',

    requires: [
        'Savanna.proxy.Cors'
    ],

    // NOTE: if you have a relationship, you need to be sure to require that model...

    fields: [
        //{ name: 'metadata' }

        {name: 'type' },
        {name: 'key' },
        {name: 'value' },
        {name: 'displayLabel' },
        {name: 'visible' },
        {name: 'editable' }
    ]
//    proxy: {
//        type: 'savanna-cors',
//
//        addSessionId: true,
//        startParam: undefined,
//        limitParam: undefined,
//        pageParam: undefined,
//
//        reader: {
//            type: 'json'
//        },
//        writer: {
//            type: 'json'
//        }
//    }
});


