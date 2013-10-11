Ext.define('Savanna.process.layout.StepLayout', {});

function StepLayout() {
    go.Layout.call(this);
    this.isViewportSized = false;
    this.isOngoing = true;
}

go.Diagram.inherit(StepLayout, go.Layout);

StepLayout.prototype.doLayout = function(coll) {
    if (coll === this.group) {
        coll = this.group.memberParts;
    } else {
        return;
    }

    var toolsWidth = 0;
    var inputsHeight = 0;
    var actionsHeight = 0;
    var outputsHeight = 0;
    var middleWidth = 0;

    var toolsGroup = null;
    var inputsGroup = null;
    var actionsGroup = null;
    var outputsGroup = null;
    var byproductsGroup = null;

    var it = coll.iterator;
    var node;
    while (it.next()) {
        node = it.value;
        if (!(node instanceof go.Group)) {
            continue;
        }

        switch (node.category) {
            case 'ToolsGroup':
                toolsWidth = node.actualBounds.width;
                toolsGroup = node;
                break;
            case 'InputsGroup':
                inputsHeight = node.actualBounds.height;
                middleWidth = Math.max(middleWidth, node.actualBounds.width);
                inputsGroup = node;
                break;
            case 'ActionsGroup':
                actionsHeight = node.actualBounds.height;
                middleWidth = Math.max(middleWidth, node.actualBounds.width);
                actionsGroup = node;
                break;
            case 'OutputsGroup':
                outputsHeight = node.actualBounds.height;
                middleWidth = Math.max(middleWidth, node.actualBounds.width);
                outputsGroup = node;
                break;
            case 'ByproductsGroup':
                byproductsGroup = node;
                break;
        }
    }

    // implementations of doLayout that do not make use of a LayoutNetwork
    // need to perform their own transactions
    this.diagram.startTransaction("StepLayout Layout");

    if (toolsGroup) {
        toolsGroup.move(new go.Point(0, 0));
//        toolsGroup.hieght = inputsHeight + actionsHeight + outputsHeight;
    }
    if (inputsGroup) {
        inputsGroup.move(new go.Point(toolsWidth, 0));
//        inputsGroup.width = middleWidth;
    }
    if (actionsGroup) {
        actionsGroup.move(new go.Point(toolsWidth, inputsHeight));
//        actionsGroup.width = middleWidth;
    }
    if (outputsGroup) {
        outputsGroup.move(new go.Point(toolsWidth, inputsHeight + actionsHeight));
//        outputsGroup.width = middleWidth;
    }
    if (byproductsGroup) {
        byproductsGroup.move(new go.Point(toolsWidth + middleWidth, 0));
//        byproductsGroup.hieght = inputsHeight + actionsHeight + outputsHeight;
    }

    this.diagram.commitTransaction("StepLayout Layout");
};
