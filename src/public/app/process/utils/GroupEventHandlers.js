Ext.define('Savanna.process.utils.GroupEventHandlers', {
    singleton: true,

    timeoutId: 0,

    requires: [
        'Savanna.process.utils.ProcessUtils'
    ],

    onMouseEnter: function (e, obj) {
        Savanna.process.utils.ProcessUtils.toggleGadgets(obj, true);
    },

    onMouseLeave: function (e, obj) {
        Savanna.process.utils.ProcessUtils.toggleGadgets(obj, false);
    },

    onSelectionChange: function(obj) {
        Savanna.process.utils.ProcessUtils.toggleGadgets(obj, false);
    },

    // highlight when dragging into the Group
    onMouseDragEnter: function (e, group) {
        if (!group.isSubGraphExpanded){
            Savanna.process.utils.GroupEventHandlers.timeoutId = Ext.Function.defer(Savanna.process.utils.GroupEventHandlers.onMouseHold, 750, this, [null, group]);
        }
    },

    onMouseDragLeave: function () {
        var timeoutId = Savanna.process.utils.GroupEventHandlers.timeoutId;
        if (timeoutId) {
            clearTimeout(timeoutId);
            Savanna.process.utils.GroupEventHandlers.timeoutId = 0;
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

    onMouseHold: function(e, group) {
        var diagram = group.diagram;
        group.expandSubGraph();
        diagram.layout.doLayout(diagram);
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