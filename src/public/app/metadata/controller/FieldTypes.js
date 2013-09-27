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
        'Savanna.metadata.view.String',
        'Savanna.metadata.view.LongString'
    ],
    requires:   [
        'Savanna.controller.Factory'
    ],
    init: function () {

        this.control({
            'metadata_details #metadata_edit_button': {
                click: this.handleEditMode
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
        console.log('Edit button pressed.');
        Ext.create('Ext.window.Window', {
            modal: true,
            width: 150,
            height: 100,
            html: 'Edit button pressed'
        }).show();
    }
});