/**
 * Created with IntelliJ IDEA.
 * User: swatson
 * Date: 9/24/13
 * Time: 10:14 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.metadata.model.Metadata', {
    extend: 'Ext.data.Model',

    // NOTE: if you have a relationship, you need to be sure to require that model...

    fields: [
        { name: '_type', type: 'string' },
        { name: 'uri', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'children' },
        { name: 'nodeType', type: 'string' },
        { name: 'classificationPortionMarking', type: 'string' },
        { name: 'classification' },
        { name: 'savannaItemUri', type: 'string' },
        { name: 'parentNodeUri', type: 'string' },
        { name: 'extent', type: 'string' },
        { name: 'isImportant'},
        { name: 'areaOfResponsibility', type: 'string' },
        { name: 'isCollapsed', type: 'string' },
        { name: 'childContainerCount', type: 'int' },
        { name: 'childCount', type: 'int' },
        { name: 'publishOrCreationDate' },
        { name: 'enteredBy', type: 'string' },
        { name: 'entityVersion', type: 'string' },
        { name: 'displayLabel', type: 'string' },
        { name: 'metadata' }
    ]
});