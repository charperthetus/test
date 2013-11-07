/**
 * Created with IntelliJ IDEA.
 * User: bcannon
 * Date: 10/17/13
 * Time: 12:55 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.process.model.Process', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'class', type: 'string' },
        { name: 'nodeKeyProperty', type: 'string' },
        { name: 'uri', type: 'string' },
        { name: 'identifier', type: 'string' },
        'nodeDataArray',
        'linkDataArray'
    ]
});
