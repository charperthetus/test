/**
 * Created with IntelliJ IDEA.
 * User: bcannon
 * Date: 10/3/13
 * Time: 11:57 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.process.view.part.MetadataTabPanel', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.process_metadata',
    enableTabScroll: true,
    items: [
        { title: 'Details' }, //todo: fill in details
        { title: 'Comments' },
        { title: 'Selection' }
    ]
});