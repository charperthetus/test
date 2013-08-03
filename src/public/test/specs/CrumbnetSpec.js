/* global Ext: false, describe: false, beforeEach: false, afterEach: false, createTestDom: false, cleanTestDom: false,
          it: false, expect: false, Savanna: false, spyOn: false, go: false, ThetusTestHelpers: false, waitsFor: false,
          runs: false, sinon: true */
Ext.require('Savanna.crumbnet.controller.CrumbnetController');
Ext.require('Savanna.crumbnet.utils.ViewTemplates');

describe('Savanna.crumbnet', function() {
    var CRUMBNET_PALETTE_TEMPLATES_URL = 'app/assets/data/testCrumbnetTemplates.json';
    var fixtures = {};
    var server = null;

    beforeEach(function() {
        createTestDom();

        fixtures = Ext.clone(ThetusTestHelpers.Fixtures.Crumbnet);
        server = new ThetusTestHelpers.FakeServer(sinon);
    });

    afterEach(function() {
        cleanTestDom();

        fixtures = {};
        server.restore();

        server = null;
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

        describe('handleGraphToolbarButtonClick', function() {

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

        describe('handleLayoutMenuClick', function() {

            it('should change diagram layout when we click "tree"', function() {
                var menuButton = view.down('menuitem[type="tree"]');
                var menu = view.down('#layoutMenu');
                controller.handleLayoutMenuClick(menu, menuButton);

                expect(diagram.layout instanceof go.Layout).toBeTruthy();
            });

            it('should change diagram layout when we click "grid"', function() {
                var menuButton = view.down('menuitem[type="grid"]');
                var menu = view.down('#layoutMenu');
                controller.handleLayoutMenuClick(menu, menuButton);

                expect(diagram.layout instanceof go.Layout).toBeTruthy();
            });

            it('should change diagram layout when we click "force"', function() {
                var menuButton = view.down('menuitem[type="force"]');
                var menu = view.down('#layoutMenu');
                controller.handleLayoutMenuClick(menu, menuButton);

                expect(diagram.layout instanceof go.Layout).toBeTruthy();
            });

            it('should change diagram layout when we click "circular"', function() {
                var menuButton = view.down('menuitem[type="circular"]');
                var menu = view.down('#layoutMenu');
                controller.handleLayoutMenuClick(menu, menuButton);

                expect(diagram.layout instanceof go.Layout).toBeTruthy();
            });

            it('should change diagram layout when we click "layeredDigraph"', function() {
                var menuButton = view.down('menuitem[type="layeredDigraph"]');
                var menu = view.down('#layoutMenu');
                controller.handleLayoutMenuClick(menu, menuButton);

                expect(diagram.layout instanceof go.Layout).toBeTruthy();
            });
        });

        describe('handleAlignmentMenuClick', function() {

            it('should change diagram alignment when we click "right"', function() {
                var menuButton = view.down('menuitem[type="right"]');
                var menu = view.down('#alignmentMenu');
                controller.handleAlignmentMenuClick(menu, menuButton);

                //We always set the alignment back to default after changing it
                expect(diagram.contentAlignment).toBe(go.Spot.Default);
            });

            it('should change diagram alignment when we click "left"', function() {
                var menuButton = view.down('menuitem[type="left"]');
                var menu = view.down('#alignmentMenu');
                controller.handleAlignmentMenuClick(menu, menuButton);

                //We always set the alignment back to default after changing it
                expect(diagram.contentAlignment).toBe(go.Spot.Default);
            });

            it('should change diagram alignment when we click "top"', function() {
                var menuButton = view.down('menuitem[type="top"]');
                var menu = view.down('#alignmentMenu');
                controller.handleAlignmentMenuClick(menu, menuButton);

                //We always set the alignment back to default after changing it
                expect(diagram.contentAlignment).toBe(go.Spot.Default);
            });

            it('should change diagram alignment when we click "bottom"', function() {
                var menuButton = view.down('menuitem[type="bottom"]');
                var menu = view.down('#alignmentMenu');
                controller.handleAlignmentMenuClick(menu, menuButton);

                //We always set the alignment back to default after changing it
                expect(diagram.contentAlignment).toBe(go.Spot.Default);
            });

            it('should change diagram alignment when we click "center"', function() {
                var menuButton = view.down('menuitem[type="center"]');
                var menu = view.down('#alignmentMenu');
                controller.handleAlignmentMenuClick(menu, menuButton);

                //We always set the alignment back to default after changing it
                expect(diagram.contentAlignment).toBe(go.Spot.Default);
            });
        });

        describe('handleLinkStyleClick', function() {
            var menuButton = null,
                menu = null,
                diagram = null;

            beforeEach(function() {
                menuButton = view.down('menuitem[type="standard"]');
                menu = view.down('#linkStyleMenu');
                diagram = controller.getDiagramForMenu(menu);
            });

            afterEach(function() {
                menuButton = null;
                menu = null;
                diagram = null;
            });

            describe('error conditions', function() {
                var raisedError = false;

                beforeEach(function() {
                    Ext.Error.handle = function() {
                        raisedError = true;
                        return true;
                    };
                });

                afterEach(function() {
                    Ext.Error.handle = function() {};
                    raisedError = false;
                });

                it('should log an error if we send a link style that is not understood', function() {
                    menuButton.type = 'UNKNOWN_TYPE';

                    controller.handleLinkStyleMenuClick(menu, menuButton);

                    expect(raisedError).toBeTruthy();
                });
            });

            describe('valid conditions', function() {
                // TODO: validate that this is true (it may be that if no links are selected, then ALL links should change
                //       in which case there will be only one link category after the button is clickec)
                it('should NOT change link styles if no link is selected', function() {
                    var selectedNodeSet = diagram.selection;

                    expect(selectedNodeSet.count).toBe(0);

                    var linkIterator = diagram.links;
                    var linkStylesSeen = {};

                    while (linkIterator.next()) {
                        linkStylesSeen[linkIterator.value.category] = true;
                    }

                    expect(Object.keys(linkStylesSeen).length).toBeGreaterThan(1);

                    controller.handleLinkStyleMenuClick(menu, menuButton);

                    linkIterator = diagram.links;
                    linkStylesSeen = {};

                    while (linkIterator.next()) {
                        linkStylesSeen[linkIterator.value.category] = true;
                    }

                    expect(Object.keys(linkStylesSeen).length).toBeGreaterThan(1);
                });

                it('should only change the style for the selected links', function() {
                    var linkIterator = diagram.links;
                    var beforeLinkStyleCounts = {};
                    var firstLinkStyle = null;
                    var secondLinkStyle = null;

                    // gather a count of links styles and select one link whose style will change
                    while (linkIterator.next()) {
                        var linkStyle = linkIterator.value.category;

                        if (!firstLinkStyle) {
                            firstLinkStyle = linkStyle;
                        }
                        if (!secondLinkStyle && linkStyle !== firstLinkStyle) {
                            secondLinkStyle = linkStyle;
                            linkIterator.value.isSelected = true;
                        }

                        typeof beforeLinkStyleCounts[linkStyle] === 'undefined' ? beforeLinkStyleCounts[linkStyle] = 1 : ++beforeLinkStyleCounts[linkStyle];
                    }

                    // make sure we made a selection and have more than one style
                    expect(diagram.selection.count).toBe(1);
                    expect(Object.keys(beforeLinkStyleCounts).length).toBeGreaterThan(1);
                    expect(secondLinkStyle).toBeDefined();

                    // select the menu to change the selected link to the first link style we found
                    menuButton = view.down('menuitem[type="' + firstLinkStyle + '"]');

                    expect(menuButton).toBeDefined();

                    controller.handleLinkStyleMenuClick(menu, menuButton);

                    // get a count of link styles after we made our change
                    var afterLinkStyleCounts = {};
                    linkIterator = diagram.links;

                    while (linkIterator.next()) {
                        var linkStyle = linkIterator.value.category;

                        typeof afterLinkStyleCounts[linkStyle] === 'undefined' ? afterLinkStyleCounts[linkStyle] = 1 : ++afterLinkStyleCounts[linkStyle];
                    }

                    expect(afterLinkStyleCounts[firstLinkStyle]).toBe(beforeLinkStyleCounts[firstLinkStyle] + 1);
                    expect(afterLinkStyleCounts[secondLinkStyle]).toBe(beforeLinkStyleCounts[secondLinkStyle] - 1);
                });
            });
        });
    });

    describe('Model', function() {

        describe('Graph', function() {
            it('should be able to instantiate', function() {
                var cModel = Ext.create('Savanna.crumbnet.model.Graph');
                expect(cModel).not.toBeNull();
            });
        });

        describe('Template', function() {
            it('should be able to instantiate', function() {
                var templateData = fixtures.defaultPaletteTemplateResponse.groups[0].templates[0];
                var templateModel = Ext.create('Savanna.crumbnet.model.Template', templateData);

                expect(templateModel.get('label')).toBe('Concept label');
                expect(templateModel.get('category')).toBe('Concept');
            });
        });

        describe('TemplateGroup', function() {
            it('should be able to instantiate', function() {
                var templateGroupData = fixtures.defaultPaletteTemplateResponse.groups[0];
                var templateGroupModel = Ext.create('Savanna.crumbnet.model.TemplateGroup', templateGroupData);

                expect(templateGroupModel.get('title')).toBe('TEST PALETTE GROUP ONE');
                expect(templateGroupModel.templates()).not.toBeNull();
            });

            it('should be able to render templates data as JSON', function() {
                var templateGroupData = fixtures.defaultPaletteTemplateResponse.groups[0];
                var templateGroupModel = Ext.create('Savanna.crumbnet.model.TemplateGroup', templateGroupData);
                var templatesData = templateGroupData.templates;

                for (var i = 0; i < templatesData.length; ++i) {
                    templateGroupModel.templates().add(templatesData[i]);
                }

                expect(templateGroupModel.templatesAsJson()).toEqual(templatesData);
            });
        });
    });

    describe('Store', function() {

        describe('Graph', function() {
            it('should have nodeDataArray and linkDataArray properties defined', function() {
                var cStore = Ext.create('Savanna.crumbnet.store.Graph');
                expect(cStore).not.toBeNull();
            });
        });

        describe('Templates', function() {
            var store = null;

            beforeEach(function() {
                store = setupPaletteTemplateStore(server, fixtures.defaultPaletteTemplateResponse);
            });

            afterEach(function() {
                Ext.data.StoreManager.remove(store);
                store = null;
            });

            it('should load with temporary data', function() {
                expect(store.getCount()).toBe(2);
                expect(store.getAt(0) instanceof Savanna.crumbnet.model.TemplateGroup).toBeTruthy();
            });
        });
    });

    describe('Views', function() {
        var view = null;
        var store = null;

        beforeEach(function() {
            store = setupPaletteTemplateStore(server, fixtures.defaultPaletteTemplateResponse);
            view = Ext.create('Savanna.crumbnet.view.CrumbnetComponent', { renderTo: 'test-html' });
            store.fireEvent('load'); // NOTE: we have to trigger the event to get the PaletteMenu to load
        });

        afterEach(function() {
            if (view && view.destroy) {
                view.destroy();
            }

            view = null;

            Ext.data.StoreManager.remove(store);

            store = null;
        });

        describe('Main Crumbnet View', function() {

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

            it('should create a link template menu using keys from the linkTemplateMap', function() {
                var linkStyleMenu = view.queryById('linkStyleMenu');

                expect(linkStyleMenu).not.toBeUndefined();

                var templateIds = Savanna.crumbnet.utils.ViewTemplates.getLinkTemplateNames();

                var firstLinkMenuItem = linkStyleMenu.menu.child('[type=' + templateIds[0] + ']');

                expect(firstLinkMenuItem).not.toBeUndefined();

                var lastLinkMenuItem = linkStyleMenu.menu.child('[type=' + templateIds[templateIds.length - 1] + ']');

                expect(lastLinkMenuItem).not.toBeUndefined();
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
            var paletteMenu = null;

            beforeEach(function() {
                paletteMenu = view.down('crumbnet_part_palette-menu');
            });

            afterEach(function() {
                paletteMenu = null;
            });

            it('should render view as an accordion', function() {
                expect(paletteMenu instanceof Savanna.crumbnet.view.part.PaletteMenu).toBeTruthy();
            });

            it('should update the palette canvas when we expand a panel in the Accordion', function() {
                var lastPalettePanel = paletteMenu.down('crumbnet_part_palette-group:last');
                var requestUpdateSpy = spyOn(lastPalettePanel, 'requestPaletteUpdate').andCallThrough();

                lastPalettePanel.expand();

                // NOTE: since expand() is asychronous, we have to wait for our spy to be called
                waitsFor(function() {
                    return requestUpdateSpy.wasCalled;
                }, 'requestPaletteUpdate toHaveBeenCalled');

                runs(function() {
                    expect(requestUpdateSpy).toHaveBeenCalled();
                });
            });

            describe('When there are no templates', function() {

                beforeEach(function() {
                    store.loadRawData(fixtures.noTemplatesResponse.groups);
                    store.fireEvent('load');
                });

                it('should display a panel indicating no results', function() {
                    var accordionPanels = paletteMenu.query('crumbnet_part_palette-group');

                    expect(accordionPanels.length).toBe(1);
                    expect(accordionPanels[0].title).toBe('NO PALETTE');
                });
            });
        });
    });

    function setupPaletteTemplateStore(server, fixture) {
        server.respondWith('GET', CRUMBNET_PALETTE_TEMPLATES_URL, fixture);

        var store = Ext.create('Savanna.crumbnet.store.Templates', { autoLoad: false });

        // NOTE: we have to disable caching or the URL gets a cache-busting query parameter which breaks the fake server
        var proxy = store.getProxy();
        proxy.noCache = false;
        proxy.startParam = undefined;
        proxy.limitParam = undefined;
        proxy.pageParam = undefined;

        store.load();

        server.respond({
            errorOnInvalidRequest: true
        });

        Ext.data.StoreManager.add('Savanna.crumbnet.store.Templates', store);

        return store;
    }
});