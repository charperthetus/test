Ext.define('Savanna.process.layout.StepLayout', {});

function StepLayout() {
    go.Layout.call(this);
    this.isViewportSized = false;
    this.isOngoing = true;
}

go.Diagram.inherit(StepLayout, go.Layout);

StepLayout.prototype.doLayout = function(coll) {
    var gmake = go.GraphObject.make;  // for conciseness in defining templates

    if (coll === this.group) {
        coll = this.group.memberParts;
    } else {
        return;
    }
    var toolParts = new go.Set(go.Part);
    var inputParts = new go.Set(go.Part);
    var byproductParts = new go.Set(go.Part);

    var iter = coll.iterator;
    while (iter.next()) {
        var part = iter.value;
        if (part instanceof go.Link) {
            switch (part.toNode.category) {
                case 'Tool':
                    toolParts.add(part);
                    break;
                case 'Item':
                    inputParts.add(part);
                    break;
                case 'Byproduct':
                    byproductParts.add(part);
                    break;
            }
        } else {
            switch (part.category) {
                case 'Tool':
                    toolParts.add(part);
                    break;
                case 'Item':
                    inputParts.add(part);
                    break;
                case 'Byproduct':
                    byproductParts.add(part);
                    break;
                case 'ActionsGroup':
                    toolParts.add(part);
                    inputParts.add(part);
                    byproductParts.add(part);
                    break;
            }
        }
    }

    this.diagram.startTransaction("StepLayout");

    var toolLayout = gmake(go.TreeLayout, {angle: 180, arrangement: go.TreeLayout.ArrangementFixedRoots});
    var inputLayout = gmake(go.TreeLayout, {angle: 270, arrangement: go.TreeLayout.ArrangementFixedRoots});
    var byproductLayout = gmake(go.TreeLayout, {angle: 0, arrangement: go.TreeLayout.ArrangementFixedRoots});

    toolLayout.doLayout(toolParts);
    inputLayout.doLayout(inputParts);
    byproductLayout.doLayout(byproductParts);

    this.diagram.commitTransaction("StepLayout");
};
