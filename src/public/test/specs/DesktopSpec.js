/* global Ext: false,
 describe: false, beforeEach: false, afterEach: false, it: false, expect: false, spyOn: false,
 Savanna: false, ThetusTestHelpers: false
 */
Ext.require('Savanna.desktop.controller.DesktopController');
Ext.require('Savanna.desktop.view.SavannaDesktop');
Ext.require('Savanna.desktop.view.SavannaWorkspace');
Ext.require('Savanna.desktop.view.SearchWindow');
Ext.require('Savanna.crumbnet.controller.CrumbnetController');
Ext.require('Savanna.map.controller.MapController');

describe('Savanna.desktop', function () {

    beforeEach(function() {
        ThetusTestHelpers.ExtHelpers.createTestDom();
    });

    afterEach(function() {
        ThetusTestHelpers.ExtHelpers.cleanTestDom();

    });

    describe('Desktop View', function() {
        var componentView = null;

        beforeEach(function() {
            componentView = Ext.create('Savanna.desktop.view.SavannaDesktop', { renderTo: ThetusTestHelpers.ExtHelpers.TEST_HTML_DOM_ID });
        });

        afterEach(function() {
            if (componentView) {
                componentView.destroy();
                componentView = null;
            }
        });

        it('desktop view should not be null', function () {
            expect(componentView).not.toBeNull();
        });

        it('should have a workspace view', function () {
            expect(componentView.down('desktop_savannaworkspace') instanceof Savanna.desktop.view.SavannaWorkspace).toBeTruthy();
        });
    });

    describe('Desktop Controller', function() {
        var controller = null,
            componentView = null;

        beforeEach(function() {
            componentView = Ext.create('Savanna.desktop.view.SavannaDesktop', { renderTo: ThetusTestHelpers.ExtHelpers.TEST_HTML_DOM_ID });
            controller = componentView.getController();
        });

        afterEach(function() {
            if (controller) {
                controller.destroy();
                controller = null;
            }

            if (componentView) {
                componentView.destroy();
                componentView = null;
            }
        });

        it('controller should not be null', function() {
            expect(controller).not.toBeNull();
        });
        it('the controller should be of the correct type instantiated', function() {
            expect(controller instanceof Savanna.desktop.controller.DesktopController).toBeTruthy();
        });
        describe('displayAboutDialog()', function() {
            it('about dialog should begin null', function() {
                //access the static var through the class name...don't need an instance
                expect(Savanna.desktop.controller.DesktopController.aboutwindow).toBeNull();
            });
            it('about dialog should be valid after function call', function() {
                controller.displayAboutDialog();
                expect(Savanna.desktop.controller.DesktopController.aboutwindow).not.toBeNull();
            });
        });
        describe('displaySearch()', function() {
            it('search dialog should begin null', function() {
                //access the static var through the class name...don't need an instance
                expect(Savanna.desktop.controller.DesktopController.searchwindow).toBeNull();
            });
            it('search dialog should be valid after function call', function() {
                controller.displaySearch();
                expect(Savanna.desktop.controller.DesktopController.searchwindow).not.toBeNull();
            });
        });
    });

    describe('Workspace View', function() {
        var componentView = null;

        beforeEach(function() {
            componentView = Ext.create('Savanna.desktop.view.SavannaWorkspace', { renderTo: ThetusTestHelpers.ExtHelpers.TEST_HTML_DOM_ID });
        });

        afterEach(function() {
            if (componentView) {
                componentView.destroy();
                componentView = null;
            }
        });

        it('workspace view should not be null', function () {
            expect(componentView).not.toBeNull();
        });
        it('should have a single view button', function() {
            expect(componentView.down('#singleviewbutton')).not.toBeNull();
        });
        it('should have a split view button', function() {
            expect(componentView.down('#splitviewbutton')).not.toBeNull();
        });
        it('the single view button and split view button should have the same toggle group', function() {
            var t1 = componentView.down('#singleviewbutton').toggleGroup;
            var t2 = componentView.down('#splitviewbutton').toggleGroup;
            expect(t1).toEqual(t2);
        });
        it('the single view button should be pressed', function() {
            expect(componentView.down('#singleviewbutton').pressed).toBeTruthy();
        });
    });

    describe('Workspace Controller', function() {
        var controller = null,
        componentView = null;

        beforeEach(function() {
            componentView = Ext.create('Savanna.desktop.view.SavannaWorkspace', { renderTo: ThetusTestHelpers.ExtHelpers.TEST_HTML_DOM_ID });
            controller = componentView.getController();
        });

        afterEach(function() {
            if (controller) {
                controller.destroy();
                controller = null;
            }

            if (componentView) {
                componentView.destroy();
                componentView = null;
            }
        });

        it('controller should not be null', function() {
            expect(controller).not.toBeNull();
        });
        it('the controller should be of the correct type instantiated', function() {
            expect(controller instanceof Savanna.desktop.controller.WorkspaceController).toBeTruthy();
        });
        it('it should have a view', function() {
            expect(controller.getView()).not.toBeNull();
        });
        it('the view should be of the correct type', function() {
            expect(controller.getView() instanceof Savanna.desktop.view.SavannaWorkspace).toBeTruthy();
        });
        it('it should have a single view button', function() {
            expect(controller.getSingleviewbutton()).not.toBeNull();
        });
        it('it should have a split view button', function() {
            expect(controller.getSplitviewbutton()).not.toBeNull();
        });
        it('it should have a main tab panel', function() {
            expect(controller.getMaintabpanel()).not.toBeNull();
        });
        it('the main tab panel should be of the correct type', function() {
            expect(controller.getMaintabpanel() instanceof Savanna.desktop.view.SavannaTabPanel).toBeTruthy();
        });
        it('the secondary tab panel should be null', function() {
            expect(controller.getSecondarytabpanel()).toBeNull();
        });

        describe('setupSecondaryTabPanel()', function() {
            it('should return the correct type', function() {
                expect(controller.setupSecondaryTabPanel() instanceof Savanna.desktop.view.SavannaTabPanel).toBeTruthy();
            });
            it('the secondary tab panel should be set to split view mode', function() {
                var secondaryTabPanel = controller.setupSecondaryTabPanel();
                expect(secondaryTabPanel.config.view).toEqual('split');
            });
        });
        describe('onSplitViewToggle()', function() {
            it('setSplitViewMode should be called when the split view button is toggled', function() {
                spyOn(controller, 'setSplitViewMode');
                controller.getSplitviewbutton().toggle();
                expect(controller.setSplitViewMode).toHaveBeenCalled();
            });

            it('setSplitViewMode should not be called if the split view button was pressed', function() {
                spyOn(controller, 'setSplitViewMode');
                controller.getSplitviewbutton().pressed = true;
                controller.getSplitviewbutton().toggle();
                expect(controller.setSplitViewMode).not.toHaveBeenCalled();
            });
        });
        describe('onSingleViewToggle()', function() {
            beforeEach(function() {
                spyOn(controller, 'setSingleViewMode');
            });

            it('setSingleViewMode should be called when the single view button is toggled', function() {
                controller.getSplitviewbutton().toggle();
                controller.getSingleviewbutton().toggle();
                expect(controller.setSingleViewMode).toHaveBeenCalled();
            });
            it('setSingleViewMode should not be called if the single view button was pressed', function() {
                controller.getSingleviewbutton().toggle();
                expect(controller.setSingleViewMode).not.toHaveBeenCalled();
            });
        });

        describe('setSplitViewMode()', function() {

            var nBefore = 0,
                nAfter = 0;

            beforeEach(function() {
                nBefore = controller.getMaintabpanel().items.getCount();
                controller.setSplitViewMode();
            });

            it('the view config of the main tab panel should be set to split view mode', function() {
                expect(controller.getMaintabpanel().config.view).toEqual('split');
            });
            it('secondary tab panel should be created', function() {
                expect(controller.getSecondarytabpanel()).not.toBeNull();
            });
            it('the number of components before and after the operation should be equal', function() {
                nAfter = controller.getMaintabpanel().items.getCount()
                       + controller.getSecondarytabpanel().items.getCount();
                expect(nBefore).toEqual(nAfter);
            });
        });

        describe('setSingleViewMode()', function() {

            var nBefore = 0,
                nAfter = 0;

            beforeEach(function() {
               controller.setSplitViewMode();
               nBefore = controller.getMaintabpanel().items.getCount()
                       + controller.getSecondarytabpanel().items.getCount();
               controller.setSingleViewMode();
            });

            it('secondary tab panel should be removed', function() {
                expect(controller.getSecondarytabpanel()).toBeNull();
            });
            it('the view config of the main tab panel should be set to single', function() {
                expect(controller.getMaintabpanel().config.view).toEqual('single');
            });
            it('the number of components before and after the operation should be equal', function() {
                nAfter = controller.getMaintabpanel().items.getCount();
                expect(nBefore).toEqual(nAfter);
            });
        });

        describe('createDetails()', function() {

            it('the item added should be of the correct type', function() {
                var tabpanel = controller.getMaintabpanel();
                expect(controller.createDetails(tabpanel) instanceof Savanna.metadata.view.Details).toBeTruthy();
            });
        });

        describe('createProcess()', function() {
            it('the item added should be of the correct type', function() {
                var tabpanel = controller.getMaintabpanel();
                expect(controller.createProcess(tabpanel) instanceof Savanna.process.view.ProcessEditorComponent).toBeTruthy();
            });
        });

        describe('createItem()', function() {
            it('the item added should be of the correct type', function() {
                var tabpanel = controller.getMaintabpanel();
                expect(controller.createProcess(tabpanel) instanceof Ext.panel.Panel).toBeTruthy();
            });
        });

        describe('onTabClose()', function() {

            beforeEach(function() {
                controller.getSplitviewbutton().toggle();
            });

            it('closing the last tab in the secondary tab panel should remove the secondary tab panel', function() {
                var item = controller.createItem(controller.getSecondarytabpanel());
                item.close();
                expect(controller.getSecondarytabpanel()).toBeNull();
            });
        });

    });

});
