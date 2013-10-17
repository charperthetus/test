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
    onMouseDragEnter: function (e, grp) {
        Savanna.process.utils.GroupEventHandlers.highlightGroup(grp, true);
    },

    onMouseDragLeave: function (e, grp) {
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
            grp.expandSubGraph();
            var actionsGroup = Savanna.process.utils.ProcessUtils.getActionsGroup(grp);
            if (actionsGroup) {
                grp.diagram.startTransaction("linkNodes");
                var iter = grp.diagram.selection.iterator;

                while (iter.next()) {
                    var node = iter.value;
                    var newLink = { category: 'InputLink', from: actionsGroup.data.key, to: node.data.key };
                    grp.diagram.model.addLinkData(newLink);
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

    memberValidation: function(grp, part) {
        return (part.category == 'ProcessItem');
    },

    actionsGroupMemberValidation: function(grp, part) {
        return (part.category == 'ProcessAction');
    },

    onActionMouseDragEnter:function(e, obj) {
        obj.areaBackground = '#00FF00';

    },

    onActionMouseDragLeave:function(e, obj) {
        obj.areaBackground = null;
    },

    onActionMouseDrop:function(e, obj) {
        var diagram = obj.diagram;
        var actionsGroup = obj.part;
        var stepGroup = actionsGroup ? actionsGroup.containingGroup : null;
        var ok = stepGroup && stepGroup.addMembers(diagram.selection, true);
        if (ok) {
            diagram.startTransaction("linkNodes");

            var iter = diagram.selection.iterator;

            while (iter.next()) {
                var node = iter.value;
                var newLink = { category: 'ToolLink', from: actionsGroup.data.key, to: node.data.key };
                diagram.model.addLinkData(newLink);
            }

            diagram.commitTransaction('linkNodes');
        } else {
            diagram.currentTool.doCancel();
        }

    }

});