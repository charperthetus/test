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
            var itemView = Ext.create('Savanna.itemView.view.ItemViewer', {
                title: e.target.value,
                itemUri: e.target.name,
                closable: true,
                autoScroll: true,
                tabConfig: {
                    ui: 'dark'
                }
            });
            Savanna.app.fireEvent('search:itemSelected', itemView);
        }
    }
});