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

    requires: [
        'Savanna.itemView.controller.EditQualitiesController'
    ],

    controller: 'Savanna.itemView.controller.EditQualitiesController',

    layout: 'vbox',

    width: '100%',

    tbar: [
        {
            xtype: 'auto_complete',
            itemId: 'addPropAutoChooser',
            labelType: 'Click to Add a Property',
            width: '66%',
            store: Ext.create('Savanna.itemView.store.AutoCompleteStore', {
                urlEndPoint: SavannaConfig.savannaUrlRoot + 'rest/model/fakeuri/qualities',
                paramsObj: {pageStart:0, pageSize: 20, alphabetical: true}
            })
        },
        {
            xtype: 'button',
            glyph: 'searchBinoculars',
            itemId: 'qualitiesChooser'
        },
        {
            xtype: 'tbfill'
        }
    ],

    items: []
});