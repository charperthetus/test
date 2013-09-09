/**
 * Created with IntelliJ IDEA.
 * User: bcannon
 * Date: 9/5/13
 * Time: 8:51 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.spacemanager.view.SpaceMetadataTabPanel', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.space_metadatatabpanel',
    requires:[
        'Ext.tab.Panel',
        'Savanna.spacemanager.view.metadata.DetailPanel',
        'Savanna.spacemanager.view.metadata.TeamPanel',
        'Savanna.spacemanager.view.metadata.CommentPanel',
        'Savanna.spacemanager.view.metadata.ActivityPanel'
    ],
    activeTab: 0,
    items: [
        {
            xtype: 'space_detailpanel',
            itemId: 'spacedetails'
        },
        {
            xtype: 'space_teampanel',
            itemId: 'spaceteam'
        },
        {
            xtype: 'space_commentpanel',
            itemId: 'spacecomments'
        },
        {
            xtype: 'space_activitypanel',
            itemId: 'spaceactivity'
        }
    ]
});
