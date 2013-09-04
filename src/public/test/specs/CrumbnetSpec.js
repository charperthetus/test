/* global Ext: false, describe: false,
          beforeEach: false, afterEach: false, it: false, expect: false, spyOn: false, runs: false, sinon: false, waitsFor: false,
          ThetusTestHelpers: false, Savanna: false,
          go: false */
Ext.require('Savanna.crumbnet.controller.CrumbnetController');
Ext.require('Savanna.crumbnet.utils.ViewTemplates');

describe('Savanna.crumbnet', function() {
    var fixtures = {},
        server = null;

    beforeEach(function() {
        ThetusTestHelpers.ExtHelpers.createTestDom();

        fixtures = Ext.clone(ThetusTestHelpers.Fixtures.Crumbnet);
        server = new ThetusTestHelpers.FakeServer(sinon);

        Savanna.Config.resourcesPathPrefix = '/';
    });

    afterEach(function() {
        ThetusTestHelpers.ExtHelpers.cleanTestDom();

        fixtures = {};
        server.restore();

        server = null;
    });

    describe('Controller', function() {
        var controller = null,
            diagram = null,
            errorRaised = false,
            origErrorHandleFn = null,
            view = null;

        beforeEach(function() {
            controller = Ext.create('Savanna.crumbnet.controller.CrumbnetController');
            view = Ext.create('Savanna.crumbnet.view.CrumbnetComponent', { renderTo: ThetusTestHelpers.ExtHelpers.TEST_HTML_DOM_ID, width: 500, height: 500 });
            diagram = view.down('go-graph_canvas').diagram;

            origErrorHandleFn = Ext.Error.handle;

            Ext.Error.handle = function() {
                errorRaised = true;
                return true;
            };
        });

        afterEach(function() {
            controller = null;

            diagram = null;

            errorRaised = false;
            Ext.Error.handle = origErrorHandleFn;

            if (view) {
                view.destroy();
            }

            view = null;
        });

        it('should have a controller instance', function() {
            expect(controller instanceof Savanna.crumbnet.controller.CrumbnetController).toBeTruthy();
        });

        describe('zoomTo', function() {

            it('should change diagram viewportBounds uniformly when calling zoomTo', function () {
                var origViewportBounds = diagram.viewportBounds.copy();

                controller.zoomTo(diagram, 2.0);

                var changedViewportBounds = diagram.viewportBounds.copy();

                expect(changedViewportBounds.width / changedViewportBounds.height).toBe(origViewportBounds.width / origViewportBounds.height);
            });

            // NOTE: I tried to test that the center-point remained the same, but there is some race condition where it will sometimes come out different...
        });

        describe('handleGraphToolbarButtonClick', function() {

            afterEach(function() {
                var modals = Ext.ComponentQuery.query('print-modal');

                if (modals) {
                    for (var i = 0; i < modals.length; ++i) {
                        modals[i].close();
                        modals[i].destroy();
                    }
                }
            });

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

            it('should zoom in on the diagram when we click "zoomIn"', function() {
                var button = view.down('button[type="zoomIn"]');

                //noinspection JSValidateTypes
                spyOn(controller, 'zoomTo');

                controller.handleGraphToolbarButtonClick(button);

                var zoomToArg = controller.zoomTo.mostRecentCall.args[1];

                expect(zoomToArg).toBeLessThan(1.0);
            });

            it('should zoom out on the diagram when we click "zoomOut"', function() {
                var button = view.down('button[type="zoomOut"]');

                //noinspection JSValidateTypes
                spyOn(controller, 'zoomTo');

                controller.handleGraphToolbarButtonClick(button);

                var zoomToArg = controller.zoomTo.mostRecentCall.args[1];

                expect(zoomToArg).toBeGreaterThan(0.9);
            });

            it('should spawn the PrintModal window when we click "print"', function() {
                var button = view.down('button[type="print"]');

                expect(button).not.toBeNull();

                controller.handleGraphToolbarButtonClick(button);

                expect(Ext.ComponentQuery.query('print-modal')).not.toBeNull();
            });

            it('should do nothing if we click a button it does not understand', function() {
                var button = view.down('button[type="zoomOut"]');
                button.type = 'UNKNOWN_TOOLBAR';

                controller.handleGraphToolbarButtonClick(button);

                // should not even throw an error...
                expect(errorRaised).toBeFalsy();
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

            it('should raise an Ext.Error if we pass an unknown diagram layout', function() {
                var menuButton = view.down('menuitem[type="force"]');
                menuButton.type = 'UNKNOWN_LAYOUT';
                var menu = view.down('#layoutMenu');
                controller.handleLayoutMenuClick(menu, menuButton);

                expect(errorRaised).toBeTruthy();
            });
        });

        describe('handleAlignmentMenuClick', function() {

            it('should change diagram alignment when we click "right"', function() {
                var menuButton = view.down('menuitem[type="right"]');
                var menu = view.down('#alignmentMenu');
                controller.handleAlignmentMenuClick(menu, menuButton);

                // We always set the alignment back to default after changing it
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

            it('should raise an Ext.Error if we pass an unknown alignment', function() {
                var menuButton = view.down('menuitem[type="center"]');
                menuButton.type = 'UNKNOWN';
                var menu = view.down('#alignmentMenu');
                controller.handleAlignmentMenuClick(menu, menuButton);

                expect(errorRaised).toBeTruthy();
            });
        });

        describe('handleLinkStyleClick', function() {
            var menuButton = null,
                linkStyleMenu = null,
                diagram = null;

            beforeEach(function() {
                linkStyleMenu = view.down('#linkStyleMenu');
                menuButton = linkStyleMenu.menu.down('menuitem'); // should return the first menu button
                diagram = controller.getDiagramForMenu(linkStyleMenu);
            });

            afterEach(function() {
                menuButton = null;
                linkStyleMenu = null;
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

                    controller.handleLinkStyleMenuClick(linkStyleMenu, menuButton);

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

                    controller.handleLinkStyleMenuClick(linkStyleMenu, menuButton);

                    linkIterator = diagram.links;
                    linkStylesSeen = {};

                    while (linkIterator.next()) {
                        linkStylesSeen[linkIterator.value.category] = true;
                    }

                    expect(Object.keys(linkStylesSeen).length).toBeGreaterThan(1);
                });

                it('should only change the style for the selected links', function() {
                    var linkIterator = diagram.links,
                        beforeLinkStyleCounts = {},
                        firstLinkStyle = null,
                        secondLinkStyle = null,
                        linkStyle = null,
                        nodeCategory = null,
                        node = null;

                    // gather a count of links styles and select one link whose style will change
                    while (linkIterator.next()) {
                        linkStyle = linkIterator.value.category;

                        if (!firstLinkStyle) {
                            firstLinkStyle = secondLinkStyle = linkStyle;
                        }
                        if (secondLinkStyle === firstLinkStyle && linkStyle !== firstLinkStyle) {
                            secondLinkStyle = linkStyle;
                            linkIterator.value.isSelected = true;
                        }

                        beforeLinkStyleCounts[linkStyle] = 'undefined' === typeof beforeLinkStyleCounts[linkStyle] ?  1 : beforeLinkStyleCounts[linkStyle] + 1;
                    }

                    expect(firstLinkStyle).not.toBe(secondLinkStyle);

                    // also select a non-link node (to show we don't alter it's style)
                    node = diagram.nodes.first();
                    nodeCategory = node.category;

                    node.isSelected = true;

                    // make sure we made a selection and have more than one style
                    expect(diagram.selection.count).toBe(2);
                    expect(Object.keys(beforeLinkStyleCounts).length).toBeGreaterThan(1);
                    expect(secondLinkStyle).toBeDefined();

                    // select the menu to change the selected link to the first link style we found
                    menuButton = view.down('menuitem[type="' + firstLinkStyle + '"]');

                    expect(menuButton).toBeDefined();

                    controller.handleLinkStyleMenuClick(linkStyleMenu, menuButton);

                    // get a count of link styles after we made our change
                    var afterLinkStyleCounts = {};
                    linkIterator = diagram.links;

                    while (linkIterator.next()) {
                        linkStyle = linkIterator.value.category;

                        afterLinkStyleCounts[linkStyle] = 'undefined' === typeof afterLinkStyleCounts[linkStyle] ? 1 : afterLinkStyleCounts[linkStyle] + 1;
                    }

                    expect(node.category).toBe(nodeCategory);
                    expect(afterLinkStyleCounts[firstLinkStyle]).toBe(beforeLinkStyleCounts[firstLinkStyle] + 1);
                    expect(afterLinkStyleCounts[secondLinkStyle]).toBe(beforeLinkStyleCounts[secondLinkStyle] - 1);
                });
            });
        });

        describe('handleLinkTypeClick', function() {
            var menuButton = null,
                linkTypeMenu = null,
                diagram = null;

            beforeEach(function() {
                linkTypeMenu = view.down('#linkTypeMenu');
                menuButton = linkTypeMenu.menu.down('menuitem'); // should return the first menu item
                diagram = controller.getDiagramForMenu(linkTypeMenu);
            });

            afterEach(function() {
                menuButton = null;
                linkTypeMenu = null;
                diagram = null;
            });

            describe('error conditions', function() {
                it('should log an error if we send a link style that is not understood', function() {
                    menuButton.type = 'UNKNOWN_TYPE';

                    controller.handleLinkTypeMenuClick(linkTypeMenu, menuButton);

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

                    controller.handleLinkTypeMenuClick(linkTypeMenu, menuButton);

                    linkIterator = diagram.links;
                    linkStylesSeen = {};

                    while (linkIterator.next()) {
                        linkStylesSeen[linkIterator.value.category] = true;
                    }

                    expect(Object.keys(linkStylesSeen).length).toBeGreaterThan(1);
                });

                it('should only change the style for the selected links', function() {
                    var linkIterator = diagram.links,
                        beforeLinkTypeCounts = {},
                        afterLinkTypeCounts = {},
                        firstLinkType = null,
                        secondLinkType = null,
                        linkType = null,
                        nodeText = null,
                        node = null;

                    // gather a count of links styles and select one link whose style will change
                    while (linkIterator.next()) {
                        linkType = linkIterator.value.data.text;
                        console.log('linkType', linkType);

                        if (!firstLinkType) {
                            console.log('found')
                            firstLinkType = secondLinkType = linkType;
                        }

                        if (secondLinkType === firstLinkType && linkType !== firstLinkType) {
                            secondLinkType = linkType;
                            linkIterator.value.isSelected = true;
                        }

                        beforeLinkTypeCounts[linkType] = typeof beforeLinkTypeCounts[linkType] === 'undefined' ?  1 : beforeLinkTypeCounts[linkType] + 1;
                    }

                    expect(firstLinkType).not.toBe(secondLinkType);

                    // also select a non-link node (to show we don't alter it's style)
                    node = diagram.nodes.first();
                    nodeText = node.data.text;

                    node.isSelected = true;

                    // make sure we made a selection and have more than one style
                    expect(diagram.selection.count).toBe(2);
                    expect(secondLinkType).toBeDefined();

                    // select the menu to change the selected link to the first link style we found
                    menuButton = view.down('menuitem[type="' + firstLinkType + '"]');

                    expect(menuButton).toBeDefined();

                    controller.handleLinkTypeMenuClick(linkTypeMenu, menuButton);

                    // get a count of link styles after we made our change
                    linkIterator = diagram.links;

                    while (linkIterator.next()) {
                        linkType = linkIterator.value.data.text;

                        afterLinkTypeCounts[linkType] = typeof afterLinkTypeCounts[linkType] === 'undefined' ? 1 : afterLinkTypeCounts[linkType] + 1;
                    }

                    expect(node.data.text).toBe(nodeText);
                    expect(afterLinkTypeCounts[firstLinkType]).toBe(beforeLinkTypeCounts[firstLinkType] + 1);
                    expect(afterLinkTypeCounts[secondLinkType]).toBe(beforeLinkTypeCounts[secondLinkType] - 1);
                });
            });
        });

        describe('handleNodeColorSelect', function() {
            var menu;

            beforeEach(function() {
                // NOTE: we are drilling down to a menu because there is voodoo afoot where we can go "down" to our
                //       picker, but cannot get back "up" to the canvas...
                menu = view.down('crumbnet_part_toolbar');
            });

            afterEach(function() {
                menu = null;
            });

            it('should update the color of all the selected nodes', function() {
                //Select the first node
                var firstNode = diagram.nodes.first();
                firstNode.isSelected = true;
                expect(firstNode.data.color).not.toBe('#badddd');
                controller.handleNodeColorSelect(menu, 'badddd');
                expect(firstNode.data.color).toBe('#badddd');
            });
        });

        describe('DropImage', function(){
            var canvasView,
                origFileReader;

            beforeEach(function() {
                canvasView = view.down('go-graph_canvas');

                origFileReader = window && window.FileReader ? window.FileReader : null;
            });

            afterEach(function() {
                canvasView = null;

                window.FileReader = origFileReader;
            });

            it('should add the ondrop and ondragover properties to the view', function() {
                controller.setupImageDrop(canvasView);
                expect(canvasView.ondragover).not.toBeNull();
                expect(canvasView.ondrop).not.toBeNull();
            });

            it ('should add a new node on a file drop', function () {
                var testReader;

                window.FileReader = function() {
                    this.readAsDataURL = function() {};
                    testReader = this;
                };

                controller.imageDropHandler({
                    preventDefault: function() {},
                    dataTransfer: { files: ['DOES NOT MATTER'] },
                    layerX: 10,
                    layerY: 20
                }, diagram);

                expect(testReader.onload).not.toBeNull();

                spyOn(diagram.model, 'addNodeData');

                testReader.onload({ target: { result: 'DOES NOT MATTER'} });

                expect(diagram.model.addNodeData).toHaveBeenCalled();
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
            view = Ext.create('Savanna.crumbnet.view.CrumbnetComponent', { renderTo: ThetusTestHelpers.ExtHelpers.TEST_HTML_DOM_ID });

            store.fireEvent('load'); // NOTE: we have to trigger the event to get the PaletteMenu to load
        });

        afterEach(function() {
            if (view && view.destroy) {
                view.destroy();
                view = null;
            }

            Ext.data.StoreManager.remove(store);

            store = null;
        });

        describe('Main Crumbnet View', function() {

            it('should set up a canvas node template', function() {
                var canvas = view.down('go-graph_canvas');

                expect(canvas.diagram.nodeTemplateMap).not.toBeUndefined();

                var nodeTemplateMap = canvas.diagram.nodeTemplateMap;

                var iter = nodeTemplateMap.iterator;
                iter.next();
                var firstItem = iter.value;

                expect(firstItem.findObject('icon')).not.toBeNull();
                expect(firstItem.findObject('descText')).not.toBeNull();
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

        describe('Crumbnet Canvas View', function() {
            var canvas;

            beforeEach(function() {
                canvas = view.down('go-graph_canvas');
            });

            afterEach(function() {
                canvas = null;
            });

            it('should have a store and a diagram', function() {
                expect(canvas.store instanceof Savanna.crumbnet.store.Graph).toBeTruthy();

                //This could be brittle because the diagram is created in the onRender function which is async
                expect(canvas.diagram).not.toBeNull();
            });

            it('should not attempt to load data into a diagram if it does not exist', function() {
                var store = canvas.getStore();

                canvas.diagram = null;

                spyOn(go.GraphObject, 'make');

                canvas.onStoreLoad(store);

                expect(go.GraphObject.make).not.toHaveBeenCalled();
            });

            describe('setupImageDrop', function() {
                var dropArea;

                beforeEach(function() {
                    dropArea = {}; // TODO: does this need to be mocked out any further?
                });

                afterEach(function() {
                    dropArea = null;
                });

                it('should handlers to the drop area passed in if we have a FileReader', function() {
                    // TODO: write the test...
                });

                it('should do nothing if we do NOT have a FileReader', function() {
                    // TODO: write the test...
                });
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

            it('should be a subclass of a panel so it can be made collapsible', function() {
                expect(paletteMenu instanceof Ext.panel.Panel).toBeTruthy();
            });

            it('should update the palette canvas when we expand a panel in the Accordion', function() {
                var lastPalettePanel = paletteMenu.down('crumbnet_part_palette-group:last');
                var requestUpdateSpy = spyOn(lastPalettePanel, 'requestPaletteUpdate');

                lastPalettePanel.fireEvent('expand');

                // NOTE: since expand() is asychronous, we have to wait for our spy to be called
                waitsFor(function() {
                    return requestUpdateSpy.wasCalled;
                }, 'requestPaletteUpdate toHaveBeenCalled');

                runs(function() {
                    expect(requestUpdateSpy).toHaveBeenCalled();
                });
            });

            it('should be shown initially', function() {
                expect(paletteMenu.getCollapsed()).toBeFalsy();
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

            describe('PaletteGroup', function() {
                var paletteGroup = null;

                beforeEach(function() {
                    paletteGroup = paletteMenu.items.first();
                });

                afterEach(function() {
                    paletteGroup = null;
                });

                it('should get the underlying palette to update when needed', function () {
                    spyOn(paletteGroup.palette, 'requestUpdate');

                    paletteGroup.requestPaletteUpdate();

                    expect(paletteGroup.palette.requestUpdate).toHaveBeenCalled();
                });

                it('should update the archetype used for creating a node when the selectionChanged handler is invoked', function() {
                    var eventObject = new go.DiagramEvent(),
                        diagram = view.down('go-graph_canvas').diagram,
                        firstNode = diagram.nodes.first(),
                        firstNodeData = firstNode.data;

                    firstNode.isSelected = true;
                    eventObject.diagram = diagram;

                    expect(diagram.toolManager.clickCreatingTool.archetypeNodeData).not.toBe(firstNodeData);

                    paletteGroup.selectionChanged(eventObject);

                    expect(diagram.toolManager.clickCreatingTool.archetypeNodeData).toBe(firstNodeData);
                });
            });
        });

        describe('Crumbnet Overview', function() {

            it('should not set up a diagram if we do not pass one in', function() {
                var overview = Ext.create('Savanna.crumbnet.view.part.Overview');

                expect(overview.diagram).toBeNull();
            });

            it('should NOT attempt to set the overview.observed property', function() {
                var overview = Ext.create('Savanna.crumbnet.view.part.Overview', { renderTo: ThetusTestHelpers.ExtHelpers.TEST_HTML_DOM_ID });

                expect(overview.diagram).toBeNull();

                spyOn(overview, 'callParent'); // just to prevent it from calling through to parent
                spyOn(Ext.DomHelper, 'insertHtml');

                overview.onRender();

                expect(Ext.DomHelper.insertHtml).not.toHaveBeenCalled();
            });

            it('should set the "observed" property of the overview to whatever is passed in', function() {
                // create a diagram....
                var domElem = Ext.DomHelper.insertHtml('afterBegin', view.getEl().dom, '<div id="test-diagram" style="width: 100px; height: 100px;"></div>');
                var testDiagram = new go.Diagram(domElem);
                var overview = Ext.create('Savanna.crumbnet.view.part.Overview', {
                    renderTo: 'test-html',
                    diagram: view.down('go-graph_canvas').diagram
                });

                overview.onRender();

                expect(overview.overview).not.toBeNull();

                overview.setDiagram(testDiagram);

                expect(overview.overview.observed).toEqual(testDiagram);
            });
        });

        describe('Crumbnet Toolbar', function() {
            var toolbar = null;

            beforeEach(function() {
                toolbar = view.down('toolbar');
            });

            afterEach(function() {
                toolbar = null;
            });

            it('should have a toolbar extracted from the main crumbnet view', function() {
                expect(toolbar).not.toBeNull();
            });
        });
    });

    describe('Utils', function() {
        var view = null,
            diagram = null;

        beforeEach(function() {
            view = Ext.create('Savanna.crumbnet.view.CrumbnetComponent', { renderTo: ThetusTestHelpers.ExtHelpers.TEST_HTML_DOM_ID, width: 500, height: 500 });
            diagram = view.down('go-graph_canvas').diagram;
        });

        afterEach(function() {
            if (diagram) {
                diagram = null;
            }

            if (view) {
                view.destroy();
                view = null;
            }

        });

        var portVisible = function(port) {
            if (port instanceof go.Panel) {
                return port.opacity !== 0;
            } else { // it's a shape
                return port.stroke !== null || port.fill !== null;
            }
        };

        describe('nodeMouseEnter', function() {

            it('should set ports to be visible if we are part of a diagram that is not readOnly and is linkable', function() {
                var node = diagram.nodes.first();

                expect(diagram.isReadOnly).toBeFalsy();
                expect(diagram.allowLink).toBeTruthy();

                Savanna.crumbnet.utils.ViewTemplates.nodeMouseEnter(null, node);

                var it = Savanna.crumbnet.utils.ViewTemplates.getPorts(node);

                expect(it.count).toBeGreaterThan(0);

                var port = it.next() ? it.value : null;

                expect(port).not.toBeNull();
                expect(portVisible(port)).toBeTruthy();
            });

            it('should NOT set ports to be visible if we are part of a diagram that is readOnly', function() {
                var node = diagram.nodes.first();

                diagram.isReadOnly = true;

                Savanna.crumbnet.utils.ViewTemplates.nodeMouseEnter(null, node);

                var it = Savanna.crumbnet.utils.ViewTemplates.getPorts(node);

                expect(it.count).toBeGreaterThan(0);

                var port = it.next() ?it.value : null;

                expect(port).not.toBeNull();
                expect(portVisible(port)).toBeFalsy();
            });

            it('should NOT set ports to be visible if we are part of a diagram that does not allowLink', function() {
                var node = diagram.nodes.first();

                diagram.allowLink = false;

                Savanna.crumbnet.utils.ViewTemplates.nodeMouseEnter(null, node);

                var it = Savanna.crumbnet.utils.ViewTemplates.getPorts(node);

                expect(it.count).toBeGreaterThan(0);

                var port = it.next() ?it.value : null;

                expect(port).not.toBeNull();
                expect(portVisible(port)).toBeFalsy();
            });
        });

        describe('nodeMouseLeave', function() {

            beforeEach(function() {
                // make sure at least one node has visible ports
                Savanna.crumbnet.utils.ViewTemplates.nodeMouseEnter(null, diagram.nodes.first());
            });

            it('should set ports to NOT be visible if we are part of a diagram that is not readOnly and is linkable', function() {
                var node = diagram.nodes.first();

                expect(diagram.isReadOnly).toBeFalsy();
                expect(diagram.allowLink).toBeTruthy();

                Savanna.crumbnet.utils.ViewTemplates.nodeMouseLeave(null, node);

                var it = Savanna.crumbnet.utils.ViewTemplates.getPorts(node);

                expect(it.count).toBeGreaterThan(0);

                var port = it.next() ?it.value : null;

                expect(port).not.toBeNull();
                expect(portVisible(port)).toBeFalsy();
            });

            it('should NOT set ports to be visible if we are part of a diagram that is readOnly', function() {
                var node = diagram.nodes.first();

                diagram.isReadOnly = true;

                Savanna.crumbnet.utils.ViewTemplates.nodeMouseLeave(null, node);

                var it = Savanna.crumbnet.utils.ViewTemplates.getPorts(node);

                expect(it.count).toBeGreaterThan(0);

                var port = it.next() ?it.value : null;

                expect(port).not.toBeNull();
                expect(portVisible(port)).toBeTruthy();
            });

            it('should NOT set ports to be visible if we are part of a diagram that does not allowLink', function() {
                var node = diagram.nodes.first();

                diagram.allowLink = false;

                Savanna.crumbnet.utils.ViewTemplates.nodeMouseLeave(null, node);

                var it = Savanna.crumbnet.utils.ViewTemplates.getPorts(node);

                expect(it.count).toBeGreaterThan(0);

                var port = it.next() ?it.value : null;

                expect(port).not.toBeNull();
                expect(portVisible(port)).toBeTruthy();
            });
        });

        describe('addNodeLink', function() {

            it('should not do anything if we pass a node with that is not part of any larger graph', function() {
                var origNodeCount = diagram.nodes.count;

                expect(diagram.part).toBeUndefined();

                // NOTE: the only thing I could find that is not part of a larger graph is the diagram itself...
                Savanna.crumbnet.utils.ViewTemplates.addNodeAndLink(null, diagram);

                expect(diagram.nodes.count).toBe(origNodeCount);
            });

            it('should add a node with a link between the new node and the given node', function() {
                var node = diagram.nodes.first(),
                    origNodeCount = diagram.nodes.count,
                    origLinkCount = diagram.links.count,
                    inputEvent = new go.InputEvent();

                Savanna.crumbnet.utils.ViewTemplates.addNodeAndLink(inputEvent, node);

                expect(diagram.nodes.count).toBe(origNodeCount + 1);
                expect(diagram.links.count).toBe(origLinkCount + 1);
            });

            it('should add a node with a link between the new node and the given node in the case the node has no siblings', function() {

                diagram.clear();
                diagram.startTransaction('setupTest'); // because we are manipulating the diagram to get to a testable state (without user input)

                var model = diagram.model;
                model.addNodeData({ text: 'TEST NODE' });

                var node = diagram.nodes.first(),
                    origNodeCount = diagram.nodes.count,
                    origLinkCount = diagram.links.count,
                    inputEvent = new go.InputEvent();

                diagram.commitTransaction('setupTest');

                Savanna.crumbnet.utils.ViewTemplates.addNodeAndLink(inputEvent, node);

                expect(diagram.nodes.count).toBe(origNodeCount + 1);
                expect(diagram.links.count).toBe(origLinkCount + 1);
            });

            it('should offset the new node from lowest/most-right sibling node, accounting for node who is off the canvas', function() {
                var node = diagram.nodes.first(),
                    inputEvent = new go.InputEvent();

                diagram.startTransaction('setupTest'); // because we are manipulating the diagram to get to a testable state (without user input)

                // Make sure we have at least two siblings...
                Savanna.crumbnet.utils.ViewTemplates.addNodeAndLink(inputEvent, node);
                Savanna.crumbnet.utils.ViewTemplates.addNodeAndLink(inputEvent, node);

                // Make all siblings have the same location to test that we move beyond them...
                var siblings = node.findNodesOutOf();
                var prevSibling = null;
                var x = node.location.x;
                while (siblings.next()) {
                    if (prevSibling) {
                        x = prevSibling.location.x + 1;
                    }

                    siblings.value.location = new go.Point(x, node.location.y);

                    prevSibling = siblings.value;
                }

                var origNodeCount = diagram.nodes.count,
                    origLinkCount = diagram.links.count;

                expect(node.findNodesOutOf().count).toBeGreaterThan(2);

                diagram.commitTransaction('setupTest');

                Savanna.crumbnet.utils.ViewTemplates.addNodeAndLink(inputEvent, node);

                expect(diagram.nodes.count).toBe(origNodeCount + 1);
                expect(diagram.links.count).toBe(origLinkCount + 1);
            });
        });

        describe('makeTextBlock', function() {

            it('should not set the default font treatment to bold', function() {
                var textBlock = Savanna.crumbnet.utils.ViewTemplates.makeTextBlock();

                expect(textBlock.font).not.toMatch(/^bold/);
            });

            it('should allow us to bold the font', function() {
                var textBlock = Savanna.crumbnet.utils.ViewTemplates.makeTextBlock({ bold: true });

                expect(textBlock.font).toMatch(/^bold/);
            });
        });
    });

    function setupPaletteTemplateStore(server, fixture) {
        var readMethod = 'GET',
            store = ThetusTestHelpers.ExtHelpers.setupNoCacheNoPagingStore('Savanna.crumbnet.store.Templates'),
            testUrl = ThetusTestHelpers.ExtHelpers.buildTestProxyUrl(store.getProxy(), 'read', readMethod);

        server.respondWith(readMethod, testUrl, fixture);

        store.load();

        server.respond({
            errorOnInvalidRequest: true
        });

        Ext.data.StoreManager.add('Savanna.crumbnet.store.Templates', store);

        return store;
    }
});