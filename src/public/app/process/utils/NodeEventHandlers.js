Ext.define('Savanna.process.utils.NodeEventHandlers', {
    singleton: true,

    requires: [
        'Ext.ComponentQuery'
    ],

    darkText: '#454545',
    startColor: '#79C900',
    mainColor: '#00A9C9',
    endColor: '#DC3C00',
    stepColor: '#FFFF88',

    onMouseEnter: function (e, obj) {
        Savanna.process.utils.NodeEventHandlers.toggleButtons(obj, true);
    },

    onMouseLeave: function (e, obj) {
        Savanna.process.utils.NodeEventHandlers.toggleButtons(obj, false);
    },

    onMouseDrop: function (e, obj) {
        var it;
        var newlink;
        obj.diagram.startTransaction('autoLink');
        if (obj && obj.containingGroup) {
            obj.containingGroup.addMembers(obj.diagram.selection, true);
            it = obj.diagram.selection.iterator;
            while (it.next()) {
                newlink = { from: it.value.data.key, to: obj.data.key };
                // add the new link to the model
                obj.diagram.model.addLinkData(newlink);
            }
        } else {
            it = obj.diagram.selection.iterator;
            while (it.next()) {
                newlink = { from: obj.data.key, to: it.value.data.key };
                // add the new link to the model
                obj.diagram.model.addLinkData(newlink);
            }
        }
        obj.diagram.commitTransaction('autoLink');
    },

    onMouseDragEnter: function (e, grp, prev) {
        //todo
    },

    onMouseDragLeave: function (e, grp, next) {
        //todo
    },

    toggleButtons: function(obj, show) {
        var panel = obj.findObject('BUTTONS');
        if (panel) {
            panel.opacity = show ? 1.0 : 0.0;
        }
    },




});