/**
 * Created with IntelliJ IDEA.
 * User: bcannon
 * Date: 10/26/13
 * Time: 9:05 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.process.model.Link', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'from',     type: 'string' },
        { name: 'to',       type: 'string' },
        { name: 'category', type: 'string' },
        { name: 'label',    type: 'string' },
        { name: 'visible',  type: 'string' }
    ]
});
