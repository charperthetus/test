Ext.define('Savanna.itemView.controller.RelatedProcessesController', {
    extend: 'Deft.mvc.ViewController',

    views: [
        'Savanna.itemView.view.relatedProcesses.RelatedProcesses'
    ],
    control: {
        view: {
            itemclick: 'openRelatedProcesses'
        }
    },
    openRelatedProcesses: function( grid, record, item, index, e, eOpts) {
        if (e.target.id == "openProcess") {
            EventHub.fireEvent('open', {uri: e.target.name, label: e.target.value, type: 'process'});
        }
    }
});