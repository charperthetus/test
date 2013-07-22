Ext.require('Savanna.crumbnet.controller.GoGraph');

describe('Savanna.crumbnet', function() {

    beforeEach(function() {
        createTestDom();
    });

    afterEach(function() {
        cleanTestDom();
    });

    describe('Controller', function() {
        var controller = null,
            view = null,
            diagram = null;

        beforeEach(function() {
            controller = Ext.create('Savanna.crumbnet.controller.GoGraph');
            view = Ext.create('Savanna.crumbnet.view.GoGraph', {renderTo: 'test-html'});
            diagram = view.down('go-graph_canvas').diagram;
        });

        afterEach(function() {
            controller = null;
            view.destroy();
            view = null;
            diagram = null;
        });

        it('should have a controller instance', function() {
            expect(controller instanceof Savanna.crumbnet.controller.GoGraph).toBeTruthy();
        });

        describe('handleGraphToolbarButtonClick', function(){

            it('should zoom the diagram when we click "zoomToFit"', function() {
                var button = view.down('button[type="zoomToFit"]');

                spyOn(diagram, 'zoomToFit');

                controller.handleGraphToolbarButtonClick(button);

                expect(diagram.zoomToFit).toHaveBeenCalled();
            });

            it('should undo the last action when we click "undo"', function() {
                var button = view.down('button[type="undo"]');

                spyOn(diagram.undoManager, 'undo');

                controller.handleGraphToolbarButtonClick(button);

                expect(diagram.undoManager.undo).toHaveBeenCalled();
            });

            it('should redo the last action when we click "redo"', function() {
                var button = view.down('button[type="redo"]');

                spyOn(diagram.undoManager, 'redo');

                controller.handleGraphToolbarButtonClick(button);

                expect(diagram.undoManager.redo).toHaveBeenCalled();
            });

            it('should toggle the diagram grid when we click "grid"', function() {
                var currentVis = diagram.grid.visible;

                var button = view.down('button[type="grid"]');

                controller.handleGraphToolbarButtonClick(button);

                expect(diagram.grid.visible).not.toBe(currentVis);
                expect(diagram.toolManager.draggingTool.isGridSnapEnabled).not.toBe(currentVis);
                expect(diagram.toolManager.resizingTool.isGridSnapEnabled).not.toBe(currentVis);
            });
        });
        describe('handleGraphMenuClick', function(){

            it('should change diagram layout when we click "tree"', function() {
                var menuButton = view.down('menuitem[type="tree"]');
                var menu = view.down('#layoutMenu');
                controller.handleGraphToolbarButtonClick(menu, menuButton);

                expect(diagram.layout instanceof go.Layout).toBeTruthy();
            });

            it('should change diagram layout when we click "grid"', function() {
                var menuButton = view.down('menuitem[type="grid"]');
                var menu = view.down('#layoutMenu');
                controller.handleGraphToolbarButtonClick(menu, menuButton);

                expect(diagram.layout instanceof go.Layout).toBeTruthy();
            });

            it('should change diagram layout when we click "force"', function() {
                var menuButton = view.down('menuitem[type="force"]');
                var menu = view.down('#layoutMenu');
                controller.handleGraphToolbarButtonClick(menu, menuButton);

                expect(diagram.layout instanceof go.Layout).toBeTruthy();
            });

            it('should change diagram layout when we click "circular"', function() {
                var menuButton = view.down('menuitem[type="circular"]');
                var menu = view.down('#layoutMenu');
                controller.handleGraphToolbarButtonClick(menu, menuButton);

                expect(diagram.layout instanceof go.Layout).toBeTruthy();
            });

            it('should change diagram layout when we click "layeredDigraph"', function() {
                var menuButton = view.down('menuitem[type="layeredDigraph"]');
                var menu = view.down('#layoutMenu');
                controller.handleGraphToolbarButtonClick(menu, menuButton);

                expect(diagram.layout instanceof go.Layout).toBeTruthy();
            });

            it('should change diagram alignment when we click "right"', function() {
                var menuButton = view.down('menuitem[type="right"]');
                var menu = view.down('#alignmentMenu');
                controller.handleGraphToolbarButtonClick(menu, menuButton);

                //We always set the alignment back to default after changing it
                expect(diagram.contentAlignment).toBe(go.Spot.Default);
            });

            it('should change diagram alignment when we click "left"', function() {
                var menuButton = view.down('menuitem[type="left"]');
                var menu = view.down('#alignmentMenu');
                controller.handleGraphToolbarButtonClick(menu, menuButton);

                //We always set the alignment back to default after changing it
                expect(diagram.contentAlignment).toBe(go.Spot.Default);
            });
            it('should change diagram alignment when we click "top"', function() {
                var menuButton = view.down('menuitem[type="top"]');
                var menu = view.down('#alignmentMenu');
                controller.handleGraphToolbarButtonClick(menu, menuButton);

                //We always set the alignment back to default after changing it
                expect(diagram.contentAlignment).toBe(go.Spot.Default);
            });
            it('should change diagram alignment when we click "bottom"', function() {
                var menuButton = view.down('menuitem[type="bottom"]');
                var menu = view.down('#alignmentMenu');
                controller.handleGraphToolbarButtonClick(menu, menuButton);

                //We always set the alignment back to default after changing it
                expect(diagram.contentAlignment).toBe(go.Spot.Default);
            });
            it('should change diagram alignment when we click "center"', function() {
                var menuButton = view.down('menuitem[type="center"]');
                var menu = view.down('#alignmentMenu');
                controller.handleGraphToolbarButtonClick(menu, menuButton);

                //We always set the alignment back to default after changing it
                expect(diagram.contentAlignment).toBe(go.Spot.Default);
            });

        });


    });

    describe('Model', function() {
        it('should be able to instantiate', function() {
            var cModel = Ext.create('Savanna.crumbnet.model.Graph');
            expect(cModel).not.toBeNull();
        });
    });

    describe('Store', function() {
        it('should have nodeDataArray and linkDataArray properties defined', function() {
            var cStore = Ext.create('Savanna.crumbnet.store.Graph');
            expect(cStore).not.toBeNull();
        });
    });

    describe('Views', function() {
        var view = null

        beforeEach(function() {
            view = Ext.create('Savanna.crumbnet.view.GoGraph', {renderTo: 'test-html'});
        });

        afterEach(function() {
            view.destroy();
            view = null;
        });

        describe('Main Crumbnet View', function(){
            it('should set up a palette config', function() {
                var palette = view.down('go-graph_palette');
                console.log(palette.config);
                expect(palette.config.paletteNodeTemplateMap.count).toBeGreaterThan(0);
            });

            it('should set up a canvas config', function() {
                var canvas = view.down('go-graph_canvas');
                expect(canvas.config.nodeTemplateMap.count).toBeGreaterThan(0);
                var iter = canvas.config.nodeTemplateMap.iterator;
                iter.next();
                var firstItem = iter.value;
                expect(firstItem.findObject('icon')).not.toBeNull();
                expect(firstItem.findObject('label')).not.toBeNull();
            });
        });

        describe('Crumbnet Canvas View', function(){
            it('should have a store and a diagram', function() {
                var canvas = view.down('go-graph_canvas');
                expect(canvas.store instanceof Savanna.crumbnet.store.Graph).toBeTruthy();
                //This could be brittle because the diagram is created in the onRender function which is async
                expect(canvas.diagram).not.toBeNull();
            });
        });
    });
});