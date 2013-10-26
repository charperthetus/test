/**
 * Created with IntelliJ IDEA.
 * User: bjohnson
 * Date: 10/8/13
 * Time: 10:10 AM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.itemView.view.itemQualities.EditItemQualities', {
    extend: 'Ext.panel.Panel',

    alias: 'widget.itemview_edit_qualities',

    controller: 'Savanna.itemView.controller.EditQualitiesController',

    require: [
        'Savanna.itemView.controller.EditQualitiesController'
    ],

    layout: 'vbox',

    width: '100%',

    tbar: [
        {
            xtype: 'tbfill'
        },
        {
            xtype: 'auto_complete',
            itemId: 'addPropAutoChooser',
            labelType: 'Click to Add a Property',
            width: '35%',
            store: Ext.create('Savanna.itemView.store.AutoCompleteStore', {
                urlEndPoint: SavannaConfig.savannaUrlRoot + 'rest/mockModelSearch/keyword/qualities',
                paramsObj: {excludeUri:'asdf', pageStart:0, pageLimit:10}
            })
        },
        {
            xtype: 'button',
            text: 'Chooser',            
            itemId: 'predicateschooser'
        },
        {
            xtype: 'tbfill'
        }
    ],

    items: []
});