/**
 * Created with IntelliJ IDEA.
 * User: bjohnson
 * Date: 10/27/13
 * Time: 6:14 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.itemView.view.annotationProperties.AnnotationProperties', {
    extend: 'Ext.grid.Panel',

    alias: 'widget.itemview_annotation_properties',

    store: null,

    title: 'Additional Properties (#)',

    hideHeaders: true,

    columns: [
        {
            xtype: 'templatecolumn',
            dataIndex: 'label',
            tpl: '<b>{label}</b>',
            flex: 1,
            sortable: false
        },
        {
            xtype: 'templatecolumn',
            dataIndex: 'values',
            flex: 1,
            sortable: false,
            tpl: Ext.create('Ext.XTemplate',
                '<tpl for="values" between=",  ">',
                '{label}',
                '</tpl>')
        }
    ]
});