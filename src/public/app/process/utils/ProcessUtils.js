Ext.define('Savanna.process.utils.ProcessUtils', {
    singleton: true,

    requires: [
        'Ext.data.IdGenerator',
        'Ext.data.UuidGenerator'
    ],

    knownUriTypes: ['DecisionPoint', 'ProcessModel', 'ProcessAction', 'ProcessItem', 'InternalGroup'],

    getURI: function(category) {
        // by convention, category names are the same as the URI type
        if (this.knownUriTypes.indexOf(category) < 0) {
            console.log('Unknown uriType in getURI: ', category);
        }
        var uuid = Ext.data.IdGenerator.get('uuid').generate();
        return 'x' + uuid  + '/' + category;
    },

    getActionsGroup: function(group) {
        var actionsGroup = null;
        var iter = group.memberParts;
        while (iter.next()) {
            if (iter.value.category == "InternalGroup") {
                actionsGroup = iter.value;
                break;
            }
        }
        return actionsGroup;
    },

    startTextEdit: function(diagram, nodeData) {
        diagram.clearSelection();
        var node = diagram.findNodeForData(nodeData);
        node.isSelected = true;
        diagram.commandHandler.editTextBlock(node.findObject('TEXT'));
    },

    toggleButtons: function(obj, show) {
        var panel = obj.findObject('BUTTONS');
        if (panel) {
            panel.opacity = show ? 1.0 : 0.0;
        }
    },

    addNode: function(obj, category, description, fromObj) {
        var diagram = obj.diagram;
        diagram.startTransaction('addNode');
        var tobj = obj.part;
        var nodeData = {'category': category, 'text': description};
        nodeData.key = Savanna.process.utils.ProcessUtils.getURI(category);
        if (tobj.data.group) {
            nodeData.group = tobj.data.group;
        }

        diagram.model.addNodeData(nodeData);

        var linkData;
        if (fromObj) {
            linkData = { category: 'ProcessLink', from: tobj.data.key, to: nodeData.key };
        } else {
            linkData = { category: 'ProcessLink', from: nodeData.key, to: tobj.data.key };
        }
        if (tobj.category == 'DecisionPoint') {
            linkData.visible = true;
        }
        diagram.model.addLinkData(linkData);
        diagram.commitTransaction('addNode');
        Savanna.process.utils.ProcessUtils.startTextEdit(diagram, nodeData);
    },

    addDecision: function(e, obj) {
        Savanna.process.utils.ProcessUtils.addNode(obj, 'DecisionPoint', 'Decision', true);
    },

    addStepPart: function(obj, category, label, linkType) {
        var diagram = obj.diagram;
        diagram.startTransaction('addStepPart');
        var adornmentGroup = obj.part;
        var actionGroup = adornmentGroup.adornedObject;
        var stepGroup = actionGroup.containingGroup;
        var nodeData = {'category': category, 'text': label, 'group': stepGroup.data.key};
        nodeData.key = Savanna.process.utils.ProcessUtils.getURI(nodeData.category);

        diagram.model.addNodeData(nodeData);

        var linkData = {  category: linkType, from: actionGroup.data.key, to: nodeData.key };
        diagram.model.addLinkData(linkData);
        diagram.commitTransaction('addStepPart');
        Savanna.process.utils.ProcessUtils.startTextEdit(diagram, nodeData);
    },

    addInput: function(e, obj) {
        Savanna.process.utils.ProcessUtils.addStepPart(obj, 'ProcessItem', 'Input', 'InputLink');
    },

    addParticipant: function(e, obj) {
        Savanna.process.utils.ProcessUtils.addStepPart(obj, 'ProcessItem', 'Participant', 'ToolLink');
    },

    addByproduct: function(e, obj) {
        Savanna.process.utils.ProcessUtils.addStepPart(obj, 'ProcessItem', 'Byproduct', 'ByproductLink');
    },

    addResult: function(e, obj) {
        var category = 'ProcessItem';
        var label = 'Result';
        var linkType = 'ProcessLink';
        var diagram = obj.diagram;
        diagram.startTransaction('addResult');
        var adornmentGroup = obj.part;
        var actionGroup = adornmentGroup.adornedObject;
        var stepGroup = actionGroup.containingGroup;
        var nodeData = {'category': category, 'text': label};
        nodeData.key = Savanna.process.utils.ProcessUtils.getURI(nodeData.category);

        diagram.model.addNodeData(nodeData);

        var linkData = {  category: linkType, from: stepGroup.data.key, to: nodeData.key };
        diagram.model.addLinkData(linkData);
        diagram.commitTransaction('addResult');
        Savanna.process.utils.ProcessUtils.startTextEdit(diagram, nodeData);
    },

    addFinalResult: function(e, obj) {
        Savanna.process.utils.ProcessUtils.addNode(obj, 'ProcessItem', 'Result', true);
    },

    addEnd: function(e, obj) {
        Savanna.process.utils.ProcessUtils.addNode(obj, 'End', 'End', true);
    },

    addAction: function(e, obj) {
        var diagram = obj.diagram;
        diagram.startTransaction('addAction');

        var tobj = obj.panel.panel.part;
        var nodeData = {'category': 'ProcessAction', 'text': 'Action', 'group':tobj.data.key};
        nodeData.key = Savanna.process.utils.ProcessUtils.getURI(nodeData.category);
        diagram.model.addNodeData(nodeData);

        diagram.commitTransaction('addAction');
        Savanna.process.utils.ProcessUtils.startTextEdit(diagram, nodeData);

    },

    addStep: function(e, obj) {
        var diagram = obj.diagram;
        diagram.startTransaction('addStep');

        var step = {'category': 'ProcessModel', 'text': 'Description', 'isGroup': true, 'isSubGraphExpanded': true};
        step.key = Savanna.process.utils.ProcessUtils.getURI(step.category);
        diagram.model.addNodeData(step);

        var actionsGroup = {'category': 'InternalGroup', 'isGroup': true, 'group': step.key};
        actionsGroup.key = Savanna.process.utils.ProcessUtils.getURI(actionsGroup.category);
        diagram.model.addNodeData(actionsGroup);

        var action = {'category': 'ProcessAction', 'text': 'Action', 'group': actionsGroup.key};
        action.key = Savanna.process.utils.ProcessUtils.getURI(action.category);
        diagram.model.addNodeData(action);

        var tobj = obj.part;
        var newLink = { category: 'ProcessLink', from: tobj.data.key, to: step.key };
        if (tobj.category == 'DecisionPoint') {
            newLink.visible = true;
        }
        diagram.model.addLinkData(newLink);
        diagram.commitTransaction('addStep');
        Savanna.process.utils.ProcessUtils.startTextEdit(diagram, step);
    }




});
