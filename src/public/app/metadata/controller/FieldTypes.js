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
             /*
            'search_resultscomponent panel[cls=results-dal]': {
                'render': this.onDalRender
            },
            'search_resultscomponent #refine_search_terms': {
                keyup: this.handleSearchTermKeyUp
            }
            */
        });
    }
});