Ext.define('Savanna.process.utils.GroupEventHandlers', {
    singleton: true,

    requires: [
        'Savanna.process.utils.ProcessUtils'
    ],

    onMouseEnter: function (e, obj) {
        Savanna.process.utils.ProcessUtils.toggleButtons(obj, true);
    },

    onMouseLeave: function (e, obj) {
        Savanna.process.utils.ProcessUtils.toggleButtons(obj, false);
    },

    // highlight when dragging into the Group
    onMouseDragEnter: function (e, grp, prev) {
        Savanna.process.utils.GroupEventHandlers.highlightGroup(grp, true);
    },

    onMouseDragLeave: function (e, grp, next) {
        Savanna.process.utils.GroupEventHandlers.highlightGroup(grp, false);
    },

    // when the selection is dropped into a Group, add the selected Parts into that Group;
    // if it fails, cancel the tool, rolling back any changes
    onMouseDrop: function (e, grp) {
        var ok = grp.addMembers(grp.diagram.selection, true);
        if (ok) {
            grp.expandSubGraph();
        } else {
            grp.diagram.currentTool.doCancel();
        }
    },

    // this function is used to highlight a Group that the selection may be dropped into
    highlightGroup: function(group, show) {
        if (!group)
            return;
        var background = group.findObject('BACKGROUND');
        if (background) {
            if (show) {
                background.fill = group.canAddMembers(group.diagram.selection) ? '#00FF00' : Savanna.process.utils.ViewTemplates.stepColor;
            } else {
                background.fill = Savanna.process.utils.ViewTemplates.stepColor;
            }
        }
    },

    memberValidation: function(grp, part) {
        if (part.category == 'Item' || part.category == 'Action') {
            return true;
        }
    }

});