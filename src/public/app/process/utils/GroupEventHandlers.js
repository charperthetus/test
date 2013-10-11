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
    onActionGroupMouseDrop: function (e, grp) {
        var ok = grp.addMembers(grp.diagram.selection, true);
        if (ok) {
            grp.expandSubGraph();
        } else {
            grp.diagram.currentTool.doCancel();
        }
    },

    onNodeGroupMouseDrop: function (e, grp) {
        var ok = grp.addMembers(grp.diagram.selection, true);
        if (ok) {
            var linkToActions = true;
            if (grp.category == "OutputsGroup") {
                linkToActions = false;
            }
            grp.expandSubGraph();
            var actionGroup = null;
            var parentGroup = grp.containingGroup;
            var iter = parentGroup.memberParts;
            while (iter.next()) {
                if (iter.value.category == "ActionsGroup") {
                    actionGroup = iter.value;
                    break;
                }
            }
            if (actionGroup) {
                grp.diagram.startTransaction("linkNodes");
                iter = grp.diagram.selection.iterator;

                while (iter.next()) {
                    var node = iter.value;
                    var newlink;
                    if (linkToActions) {
                        newlink = { from: node.data.key, to: actionGroup.data.key };
                    } else {
                        newlink = { from: actionGroup.data.key, to: node.data.key };
                    }
                    grp.diagram.model.addLinkData(newlink);
                }

                grp.diagram.commitTransaction('linkNodes');
            }
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
                background.fill = group.canAddMembers(group.diagram.selection) ? '#00FF00' : group.name;
            } else {
                background.fill = group.name;
            }
        }
    },

    nodeGroupMemberValidation: function(grp, part) {
        if (part.category == 'Item') {
            return true;
        }
    },

    actionsGroupMemberValidation: function(grp, part) {
        if (part.category == 'Action') {
            return true;
        }
    }

});