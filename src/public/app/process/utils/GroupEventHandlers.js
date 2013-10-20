Ext.define('Savanna.process.utils.GroupEventHandlers', {
    singleton: true,

    timeoutId: 0,

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
    onMouseDragEnter: function (e, group) {
        if (!group.isSubGraphExpanded){
            Savanna.process.utils.GroupEventHandlers.timeoutId = Ext.Function.defer(Savanna.process.utils.GroupEventHandlers.onMouseHold, 750, this, [null, group]);
        }
    },

    onMouseDragLeave: function (e, grp) {
        var timeoutId = Savanna.process.utils.GroupEventHandlers.timeoutId;
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = 0;
        }
    },

    // when the selection is dropped into a Group, add the selected Parts into that Group;
    // if it fails, cancel the tool, rolling back any changes
    onActionGroupMouseDrop: function (e, obj) {
        var diagram = obj.diagram;
        var actionGroup = obj.part;
        var ok = actionGroup.addMembers(diagram.selection, true);
        if (ok) {
            actionGroup.expandSubGraph();
        } else {
            diagram.currentTool.doCancel();
        }
    },

    onStepGroupMouseDrop: function (e, grp) {
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

    onMouseHold: function(e, group) {
        var diagram = group.diagram;
        group.expandSubGraph();
        diagram.layout.doLayout(diagram);
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

    onNodeMouseDrop: function(obj, linkType) {
        var diagram = obj.diagram;
        var actionsGroup = obj.part;
        var stepGroup = actionsGroup ? actionsGroup.containingGroup : null;
        var ok = stepGroup.addMembers(diagram.selection, true);
        if (ok) {
            diagram.startTransaction("onNodeMouseDrop");

            var iter = diagram.selection.iterator;
            while (iter.next()) {
                var node = iter.value;
                var newLink = { category: linkType, from: actionsGroup.data.key, to: node.data.key };
                diagram.model.addLinkData(newLink);
            }

            diagram.commitTransaction('onNodeMouseDrop');
        } else {
            diagram.currentTool.doCancel();
        }
    },

    onParticipantMouseDrop:function(e, obj) {
        Savanna.process.utils.GroupEventHandlers.onNodeMouseDrop(obj, 'ToolLink');
    },

    onInputMouseDrop:function(e, obj) {
        Savanna.process.utils.GroupEventHandlers.onNodeMouseDrop(obj, 'InputLink');
    },

    onByproductMouseDrop:function(e, obj) {
        Savanna.process.utils.GroupEventHandlers.onNodeMouseDrop(obj, 'ByproductLink');
    },

    onResultMouseDrop:function(e, obj) {
        var linkType = 'ProcessLink';
        var diagram = obj.diagram;
        var actionsGroup = obj.part;
        var stepGroup = actionsGroup ? actionsGroup.containingGroup : null;
        diagram.startTransaction("onResultMouseDrop");

        var iter = diagram.selection.iterator;
        while (iter.next()) {
            var node = iter.value;
            var newLink = { category: linkType, from: stepGroup.data.key, to: node.data.key };
            diagram.model.addLinkData(newLink);
        }

        diagram.commitTransaction('onResultMouseDrop');
     }

});