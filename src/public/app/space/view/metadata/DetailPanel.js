/**
 * Created with IntelliJ IDEA.
 * User: bcannon
 * Date: 9/5/13
 * Time: 10:19 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.space.view.metadata.DetailPanel', {
    extend: 'Ext.panel.Panel',

    alias: 'widget.space_detailpanel',
    requires: [
        'Savanna.metadata.view.Details'
    ],
    title: 'Details',
    autoScroll: true,
    items: [{
    }],

    initComponent: function() {
        this.callParent(arguments);
        var detailsView = Ext.create('widget.metadata_details', {
            //itemURI: 'SolrJdbc%252FRich%252F2fa25cdf-9aab-471f-85b6-5359c0cd0dfd'
            itemURI: 'SolrJdbc%252FRich%252F061aedc6-d88c-497e-81dc-77d809b3262c'
        });
        this.add(detailsView);
    }
});
