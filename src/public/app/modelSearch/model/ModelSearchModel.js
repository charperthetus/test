/**
 * Created with IntelliJ IDEA.
 * User: amartin
 * Date: 9/24/13
 * Time: 9:04 AM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.modelSearch.model.ModelSearchModel', {
    extend: 'Ext.data.Model',

    idProperty: 'id',

    uriProperty:'uri',

    fields: [
        { name: 'referenceName', type: 'auto' },
        { name: 'classification', type: 'auto' },
        { name: 'lastModifiedByUser', type: 'auto' },
        { name: 'uri', type: 'auto'},
        { name: 'id', type: 'auto' },
        { name: 'workflowState', mapping: 'workflowInfo.workflowState' },
        { name: 'lastModifiedDate', type: 'date', dateFormat: 'time' }
    ]
});

