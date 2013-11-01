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

    onMouseDrop: function(e, obj, data) {
        var stepGoup = obj.part;
        var diagram = stepGroup.diagram;
        var category = 'ProcessItem';
        var label = data.records[0].data.label;
        var linkType = 'ProcessLink';
        diagram.startTransaction('onMouseDrop');
        var nodeData = {'category': category, 'label': label};
        nodeData.uri = Savanna.process.utils.ProcessUtils.getURI(nodeData.category);
        Savanna.process.utils.ProcessUtils.setRepresentsUri(nodeData, data.records[0].data.uri);

        diagram.model.addNodeData(nodeData);

        var linkData = {  category: linkType, from: stepGroup.data.uri, to: nodeData.uri };
        linkData.uri = Savanna.process.utils.ProcessUtils.getURI(linkData.category);
        diagram.model.addLinkData(linkData);
        diagram.commitTransaction('onMouseDrop');
        Savanna.process.utils.ProcessUtils.startTextEdit(diagram, nodeData);
    },

    // when the selection is dropped into a Group, add the selected Parts into that Group;
    // if it fails, cancel the tool, rolling back any changes
    onActionGroupMouseDrop: function (e, obj, data) {
        data.records.forEach(function(rec) {
            var dropObj = rec.data;
            if (dropObj.type === 'Action') {
                Savanna.process.utils.ProcessUtils.addAction(obj, dropObj.label, dropObj.uri);
            }
        });
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

    altsGroupMemberValidation: function(group, part) {
        return (part.category == 'ProcessItem');
    },

    onActionMouseDragEnter:function(e, obj) {
        obj.areaBackground = '#00FF00';

    },

    onActionMouseDragLeave:function(e, obj) {
        obj.areaBackground = null;
    },

    onNodeMouseDrop: function(obj, data, linkType) {
        data.records.forEach(function(rec) {
            var dropObj = rec.data;
            if (dropObj.type === 'Item') {
                Savanna.process.utils.ProcessUtils.addNode(obj, 'ProcessItem', dropObj.label, dropObj.uri, linkType);
            }
        });
    },

    onParticipantMouseDrop:function(e, obj, data) {
        Savanna.process.utils.GroupEventHandlers.onNodeMouseDrop(obj, data, 'ToolLink');
    },

    onInputMouseDrop:function(e, obj, data) {
        Savanna.process.utils.GroupEventHandlers.onNodeMouseDrop(obj, data, 'InputLink');
    },

    onByproductMouseDrop:function(e, obj, data) {
        Savanna.process.utils.GroupEventHandlers.onNodeMouseDrop(obj, data, 'ByproductLink');
    },

    onResultMouseDrop:function(e, obj, data) {
        var actionsGroup = obj.part;
        var stepGroup = actionsGroup ? actionsGroup.containingGroup : null;

        Savanna.process.utils.GroupEventHandlers.onNodeMouseDrop(stepGroup, data, 'OutputLink');
     }

});