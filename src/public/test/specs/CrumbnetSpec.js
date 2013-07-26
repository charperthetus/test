/* global Ext: false, describe: false, beforeEach: false, afterEach: false, createTestDom: false, cleanTestDom: false, it: false, expect: false, Savanna: false, spyOn: false, go: false, ThetusTestHelpers: false */
Ext.require('Savanna.crumbnet.controller.CrumbnetController');

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
            controller = Ext.create('Savanna.crumbnet.controller.CrumbnetController');
            view = Ext.create('Savanna.crumbnet.view.CrumbnetComponent', { renderTo: 'test-html' });
            diagram = view.down('go-graph_canvas').diagram;
        });

        afterEach(function() {
            controller = null;
            view.destroy();
            view = null;
            diagram = null;
        });

        it('should have a controller instance', function() {
            expect(controller instanceof Savanna.crumbnet.controller.CrumbnetController).toBeTruthy();
        });

        describe('handleGraphToolbarButtonClick', function(){

            it('should zoom the diagram when we click "zoomToFit"', function() {
                var button = view.down('button[type="zoomToFit"]');

                //noinspection JSValidateTypes
                spyOn(diagram, 'zoomToFit');

                controller.handleGraphToolbarButtonClick(button);

                expect(diagram.zoomToFit).toHaveBeenCalled();
            });

            it('should undo the last action when we click "undo"', function() {
                var button = view.down('button[type="undo"]');

                //noinspection JSValidateTypes
                spyOn(diagram.undoManager, 'undo');

                controller.handleGraphToolbarButtonClick(button);

                expect(diagram.undoManager.undo).toHaveBeenCalled();
            });

            it('should redo the last action when we click "redo"', function() {
                var button = view.down('button[type="redo"]');

                //noinspection JSValidateTypes
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

            it('should toggle the overview when we click "overview"', function() {
                var overviewVisible = null !== view.down('go-graph_overview');

                var button = view.down('button[type="overview"]');

                controller.handleGraphToolbarButtonClick(button);

                expect(null !== view.down('go-graph_overview')).not.toBe(overviewVisible);

                controller.handleGraphToolbarButtonClick(button);

                expect(null !== view.down('go-graph_overview')).toBe(overviewVisible);
            });
        });

        describe('handleGraphMenuClick', function(){

            it('should change diagram layout when we click "tree"', function() {
                var menuButton = view.down('menuitem[type="tree"]');
                var menu = view.down('#layoutMenu');
                controller.handleGraphMenuClick(menu, menuButton);

                expect(diagram.layout instanceof go.Layout).toBeTruthy();
            });

            it('should change diagram layout when we click "grid"', function() {
                var menuButton = view.down('menuitem[type="grid"]');
                var menu = view.down('#layoutMenu');
                controller.handleGraphMenuClick(menu, menuButton);

                expect(diagram.layout instanceof go.Layout).toBeTruthy();
            });

            it('should change diagram layout when we click "force"', function() {
                var menuButton = view.down('menuitem[type="force"]');
                var menu = view.down('#layoutMenu');
                controller.handleGraphMenuClick(menu, menuButton);

                expect(diagram.layout instanceof go.Layout).toBeTruthy();
            });

            it('should change diagram layout when we click "circular"', function() {
                var menuButton = view.down('menuitem[type="circular"]');
                var menu = view.down('#layoutMenu');
                controller.handleGraphMenuClick(menu, menuButton);

                expect(diagram.layout instanceof go.Layout).toBeTruthy();
            });

            it('should change diagram layout when we click "layeredDigraph"', function() {
                var menuButton = view.down('menuitem[type="layeredDigraph"]');
                var menu = view.down('#layoutMenu');
                controller.handleGraphMenuClick(menu, menuButton);

                expect(diagram.layout instanceof go.Layout).toBeTruthy();
            });

            it('should change diagram alignment when we click "right"', function() {
                var menuButton = view.down('menuitem[type="right"]');
                var menu = view.down('#alignmentMenu');
                controller.handleGraphMenuClick(menu, menuButton);

                //We always set the alignment back to default after changing it
                expect(diagram.contentAlignment).toBe(go.Spot.Default);
            });

            it('should change diagram alignment when we click "left"', function() {
                var menuButton = view.down('menuitem[type="left"]');
                var menu = view.down('#alignmentMenu');
                controller.handleGraphMenuClick(menu, menuButton);

                //We always set the alignment back to default after changing it
                expect(diagram.contentAlignment).toBe(go.Spot.Default);
            });

            it('should change diagram alignment when we click "top"', function() {
                var menuButton = view.down('menuitem[type="top"]');
                var menu = view.down('#alignmentMenu');
                controller.handleGraphMenuClick(menu, menuButton);

                //We always set the alignment back to default after changing it
                expect(diagram.contentAlignment).toBe(go.Spot.Default);
            });

            it('should change diagram alignment when we click "bottom"', function() {
                var menuButton = view.down('menuitem[type="bottom"]');
                var menu = view.down('#alignmentMenu');
                controller.handleGraphMenuClick(menu, menuButton);

                //We always set the alignment back to default after changing it
                expect(diagram.contentAlignment).toBe(go.Spot.Default);
            });

            it('should change diagram alignment when we click "center"', function() {
                var menuButton = view.down('menuitem[type="center"]');
                var menu = view.down('#alignmentMenu');
                controller.handleGraphMenuClick(menu, menuButton);

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
        var view = null;

        beforeEach(function() {
            view = Ext.create('Savanna.crumbnet.view.CrumbnetComponent', { renderTo: 'test-html' });
        });

        afterEach(function() {
            if (view && view.destroy) {
                view.destroy();
            }

            view = null;
        });

        describe('Main Crumbnet View', function(){
            it('should set up a palette node template', function() {
                var palette = view.down('go-graph_palette');

                expect(palette.palette.nodeTemplate).not.toBeUndefined();
            });

            it('should set up a canvas node template', function() {
                var canvas = view.down('go-graph_canvas');

                expect(canvas.diagram.nodeTemplate).not.toBeUndefined();

                var nodeTemplate = canvas.diagram.nodeTemplate;

                expect(nodeTemplate.findObject('icon')).not.toBeNull();
                expect(nodeTemplate.findObject('label')).not.toBeNull();
            });

            it('should NOT set up an overview panel by default', function() {
                var overview = view.down('go-graph_overview');
                // NOTE: when I would use expect(overview).toBeNull(), the test would hang...
                expect(null === overview).toBeTruthy();
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

        describe('Crumbnet Palette View', function() {
            var fixtures = {};

            beforeEach(function() {
                fixtures = Ext.clone(ThetusTestHelpers.Fixtures.Crumbnet);
            });

            afterEach(function() {
                fixtures = {};
            });

            it('should render view as an accordion', function() {
                var paletteMenu = view.down('crumbnet_part_palette-menu');

                expect(paletteMenu instanceof Savanna.crumbnet.view.part.PaletteMenu).toBeTruthy();
            });
        });
    });
});