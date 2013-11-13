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

    storeHelper: null,

    width: '100%',

    tbar: [
        {
            xtype: 'auto_complete',
            itemId: 'addPropAutoChooser',
            labelType: 'Click to add a quality',
            margin: '10 5 0 0',
            width: '90%',
            store: Ext.create('Savanna.itemView.store.AutoCompleteStore', {
                urlEndPoint: SavannaConfig.savannaUrlRoot + 'rest/model/search/typeahead',
                paramsObj: {pageStart: 0, pageSize: 20, alphabetical: false, type: 'Quality', userAssertableOnly: true}
            })
        },{
            xtype: 'button',
            glyph: 'searchBinoculars',
            cls: 'toolbarButtonFramework',
            width:25,
            height:25,
            itemId: 'qualitiesChooser',
            tooltip: 'Click to browse qualities'
        },
        {
            xtype: 'tbfill'
        }
    ],

    items: []
});