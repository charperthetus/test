/**
 * Created with IntelliJ IDEA.
 * User: swatson
 * Date: 9/24/13
 * Time: 9:27 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.metadata.controller.FieldTypes', {
    extend: 'Ext.app.Controller',

    views: [
//        'Savanna.metadata.view.String',
//        'Savanna.metadata.view.LongString'
//        'Savanna.metadata.view.Details'
    ],

    requires:   [
        'Savanna.controller.Factory'
    ],

    stores: [
        'Savanna.metadata.store.Metadata'
    ],

    models: [
        'Savanna.metadata.model.Metadata'
    ],

    init: function () {

        this.control({
            'metadata_details #metadata_edit_button': {
                click: this.handleEditMode
            },
            'metadata_details #metadata_save_button': {
                click: this.handleSave
            }


             /*
            'search_resultscomponent panel[cls=results-dal]': {
                'render': this.onDalRender
            },
            'search_resultscomponent #refine_search_terms': {
                keyup: this.handleSearchTermKeyUp
            }
            */
        });
    },

    handleEditMode: function (elem) {
        //console.log('Edit button pressed.');
        var detailsView = elem.up('metadata_details');
        detailsView.setEditMode(!detailsView.editMode);
    },

    handleSave: function (elem) {
        //console.log('Edit button pressed.');
        var detailsView = elem.up('metadata_details');

        Ext.create('Ext.window.Window', {
            modal: true,
            width: 150,
            height: 100,
            html: 'Save button pressed'
        }).show();
    }
});