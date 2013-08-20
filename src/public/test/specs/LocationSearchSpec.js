Ext.require('Savanna.Config');
Ext.require('Savanna.search.model.SearchLocation');
Ext.require('Savanna.search.store.SearchLocation');
Ext.require('Savanna.search.view.SearchBody');
Ext.require('Savanna.search.view.SearchComponent');
Ext.require('Savanna.search.view.SearchLocationForm');
Ext.require('Savanna.search.view.SearchLocationItem');


describe('Search Location', function() {
    var fixtures = {};

    beforeEach(function() {
        fixtures = Ext.clone(ThetusTestHelpers.Fixtures.LocationSources);

        ThetusTestHelpers.ExtHelpers.createTestDom();
    });

    afterEach(function() {
        fixtures = null;
        ThetusTestHelpers.ExtHelpers.cleanTestDom();
    });

    describe('Savanna.search.model.SearchLocation', function() {

        describe('constructor', function() {

            it('should be able to create a model with canonical data', function() {
                var loc = Ext.create('Savanna.search.model.SearchLocation', fixtures.locationRecord);
                expect(loc instanceof Savanna.search.model.SearchLocation).toBeTruthy();
                expect(loc.get('administrativeNames').length).toBeGreaterThan(0);
            });
        });
    });

    describe('Savanna.search.store.SearchLocation', function() {
        var server = null,
            store = null;

        beforeEach(function() {
            // NOTE: this has to happen BEFORE your create a FakeServer,
            store = ThetusTestHelpers.ExtHelpers.setupNoCacheNoPagingStore('Savanna.search.store.SearchLocation');

            server = new ThetusTestHelpers.FakeServer(sinon);
        });

        afterEach(function() {
            server.restore();

            server = null;
            store = null;
        });

        describe('default data loading', function() {

            it('should load data', function() {
                var readMethod = 'GET';

                expect(store.getTotalCount()).toBe(0);

                var testUrl = ThetusTestHelpers.ExtHelpers.buildTestProxyUrl(store.getProxy(), 'read', readMethod);

                server.respondWith(readMethod, testUrl, fixtures.locationData);

                store.load();

                server.respond({
                    errorOnInvalidRequest: true
                });

                expect(store.getTotalCount()).toBe(10);
                expect(store.data.items[0].data.population).toBe(9854000);
            });
        });
    });

    describe('Savanna.search.view.SearchDals', function() {
        var view = null;

        beforeEach(function() {
            //noinspection JSValidateTypes
            view = Ext.create('Savanna.search.view.SearchLocationForm', { renderTo: ThetusTestHelpers.ExtHelpers.TEST_HTML_DOM_ID });
        });

        afterEach(function() {
            if (view && view.destroy) {
                view.destroy();
            }

            view = null;
        });

        describe('createSearchLocationItemPanel', function() {
            it('should create an instance of the SearchLocationItem panel', function() {
                var model = new Savanna.search.model.SearchLocation(fixtures.locationRecord);

                var panelView = view.createSearchLocationItemPanel(model);

                expect(panelView instanceof Savanna.search.view.SearchLocationItem).toBeTruthy();
            });
        });

        describe('createSearchLocationItems', function() {
            var server = null,
                store = null;

            beforeEach(function() {
                // NOTE: this has to happen BEFORE your create a FakeServer,
                store = ThetusTestHelpers.ExtHelpers.setupNoCacheNoPagingStore('Savanna.search.store.SearchLocation');

                server = new ThetusTestHelpers.FakeServer(sinon);

                var readMethod = 'GET',
                    testUrl = ThetusTestHelpers.ExtHelpers.buildTestProxyUrl(store.getProxy(), 'read', readMethod);

                server.respondWith(readMethod, testUrl, fixtures.locationData);

                store.load();

                server.respond({
                    errorOnInvalidRequest: true
                });
            });

            afterEach(function() {
                server.restore();

                server = null;
                store = null;
            });

            it('should create a Panel for every record in the store', function() {
                var view = Ext.create('Savanna.search.view.SearchLocationForm', { renderTo: ThetusTestHelpers.ExtHelpers.TEST_HTML_DOM_ID });

                //noinspection JSValidateTypes
                spyOn(view, 'add');

                view.createSearchLocationItems();

                expect(view.add.callCount).toBe(view.getStore().count());
            });
        });

    });
    /*
    describe('Savanna.search.controller.SearchDals', function() {
        var controller = null,
            server = null,
            store = null,
            topView = null;

        beforeEach(function() {
            // Set up the store first as it is autovivified by our main view
            store = ThetusTestHelpers.ExtHelpers.setupNoCacheNoPagingStore('Savanna.search.store.DalSources', { autoLoad: false });

            // Store it in the store manager so when the view goes to create it, it's already there
            Ext.data.StoreManager.add('Savanna.search.store.DalSources', store);

            // now set up server to get store data
            server = new ThetusTestHelpers.FakeServer(sinon);

            var readMethod = 'GET',
                testUrl = ThetusTestHelpers.ExtHelpers.buildTestProxyUrl(store.getProxy(), 'read', readMethod);

            server.respondWith(readMethod, testUrl, fixtures.allDals);

            // set up the view (it should pull in the store we just created)
            topView = Ext.create('Savanna.search.view.SearchDals', { renderTo: ThetusTestHelpers.ExtHelpers.TEST_HTML_DOM_ID });

            // load the store now (should trigger event to render the view)
            store.load();

            server.respond({
                errorOnInvalidRequest: true
            });

            // finally, set up our controller to test against
            controller = Ext.create('Savanna.search.controller.SearchDals');
        });

        afterEach(function() {
            if (topView && topView.destroy) {
                topView.destroy();
                topView = null;
            }

            if (controller && controller.destroy) {
                controller.destroy();
                controller = null;
            }

            server.restore();

            server = null;
            store = null;
        });

        describe('createCustomSearchGroupPanel', function() {
            it('should create an instance of the Savanna.search.view.searchDals.CustomSearchGroupForm', function() {
                var store = Ext.create('Savanna.search.store.DalSources', {
                    autoload: false
                });
                store.loadData(fixtures.allDals);
                var view = controller.createCustomSearchGroupPanel(store);

                expect(view instanceof Savanna.search.view.searchDals.CustomSearchGroupForm).toBeTruthy();
            });
        });

        describe('renderCustomOptions', function() {
            var testView = null;
            var button = null;

            beforeEach(function() {
                testView = topView.down('search_searchDals_searchoptions:last');
                button = testView.down('#searchOptionsToggle');

                //noinspection JSValidateTypes
                spyOn(testView, 'add').andCallThrough();
                spyOn(testView, 'doLayout'); // don't necessarily need to redo the layout...
                spyOn(button, 'setText').andCallThrough();
            });

            afterEach(function() {
                testView = null;
                button = null;
            });

            it('should render a group form if it has not been built yet', function() {
                controller.renderCustomOptions(button);

                expect(testView.add).toHaveBeenCalled();
                expect(button.setText).toHaveBeenCalledWith('Hide Search Options');
                expect(testView.doLayout).toHaveBeenCalled();

                // "click" the button again to validate that we change the button text to "show"
                button.setText.reset();
                testView.add.reset();
                testView.doLayout.reset();

                controller.renderCustomOptions(button);

                expect(testView.add).not.toHaveBeenCalled();
                expect(button.setText).toHaveBeenCalledWith('Show Search Options');
                expect(testView.doLayout).toHaveBeenCalled();
            });
        });

        describe('dalCheckBoxClicked', function() {
            var testView = null;
            var checkbox = null;
            var button = null;

            beforeEach(function() {
                testView = topView.down('search_searchDals_searchoptions:last');

                checkbox = testView.queryById('includeDalCheckBox');
                button = topView.queryById('selectAllDals');

                //noinspection JSValidateTypes
                spyOn(testView, 'doLayout'); // don't necessarily need to redo the layout...
                spyOn(checkbox, 'getValue').andCallThrough();
                spyOn(checkbox, 'up').andCallThrough();
                spyOn(button, 'setText').andCallThrough();
            });

            afterEach(function() {
                topView = null;
                testView = null;
                checkbox = null;
                button = null;
            });

            it('checkbox.getValue, checkbox.up and button.setText to be called', function() {
                controller.dalCheckBoxClicked(checkbox);

                expect(checkbox.getValue).toHaveBeenCalled();
                expect(checkbox.up).toHaveBeenCalled();
                expect(button.setText).toHaveBeenCalledWith('Select All');
            });

            it('button.setText should be called with Unselect All if all checkboxes are checked', function() {
                var checkboxes = topView.query('#includeDalCheckBox'),
                    i = 0;

                topView.settingAllDalCheckBoxes = true;

                for (i = 0; i < checkboxes.length; ++i) {
                    checkboxes[i].setValue(true);
                }

                topView.settingAllDalCheckBoxes = false;
                checkbox.setValue(true);
                controller.dalCheckBoxClicked(checkbox);

                expect(button.setText).toHaveBeenCalledWith('Unselect All');
            });

            it('should do nothing if called while we are in the process of setting all the dal checkboxes', function() {
                topView.settingAllDalCheckBoxes = true;

                controller.dalCheckBoxClicked(checkbox);

                expect(checkbox.up).toHaveBeenCalled();
                expect(checkbox.getValue).not.toHaveBeenCalled();
                expect(button.setText).not.toHaveBeenCalled();
            });

            it('should change button text to indicate that clicking it will check all boxes if at least one is checked and one is unchecked', function() {
                // NOTE: we assume all are unchecked, so we only need to set one to checked...
                topView.down('search_searchDals_searchoptions:first').queryById('includeDalCheckBox').setValue(true);

                controller.dalCheckBoxClicked(checkbox);

                expect(checkbox.getValue).toHaveBeenCalled();
                expect(checkbox.up).toHaveBeenCalled();
                expect(button.setText).toHaveBeenCalledWith('Select All');
            });
        });

        describe('setAllDalCheckboxValues', function() {
            var testView = null;
            var button = null;

            beforeEach(function() {
                testView = topView.down('search_searchDals_searchoptions:last');
                button = topView.queryById('selectAllDals');

                //noinspection JSValidateTypes
                spyOn(testView, 'doLayout'); // don't necessarily need to redo the layout...
                spyOn(topView, 'query').andCallThrough();
            });

            afterEach(function() {
                topView = null;
                testView = null;
                button = null;
            });

            it('expect all the dal checkboxes to get checked and unchecked with selectOrUnselectAllButtonClicked', function() {
                controller.selectOrUnselectAllButtonClicked(button);

                var checkboxes = topView.query('#includeDalCheckBox'),
                    i = 0;

                for (i = 0; i < checkboxes.length; ++i) {
                    expect(checkboxes[i].getValue()).toBeTruthy();
                }

                controller.selectOrUnselectAllButtonClicked(button);

                for (i = 0; i < checkboxes.length; ++i) {
                    expect(checkboxes[i].getValue()).toBeFalsy();
                }

                expect(topView.query).toHaveBeenCalled();
            });
        });

        describe('resetAllSearchOptions', function() {
            var testView = null;
            var button = null;

            beforeEach(function() {
                testView = topView.down('search_searchDals_searchoptions:last');
                button = topView.queryById('resetAllSearchOptions');

                //noinspection JSValidateTypes
                spyOn(testView, 'doLayout'); // don't necessarily need to redo the layout...
                spyOn(topView, 'removeAll').andCallThrough();
                spyOn(topView, 'createDalPanels').andCallThrough();
            });

            afterEach(function() {
                topView = null;
                testView = null;
                button = null;
            });

            it('expect resetAllSearchOptions to call removeAll and createDalPanels', function() {
                var checkboxes = topView.query('#includeDalCheckBox'),
                    i = 0;

                topView.settingAllDalCheckBoxes = true;

                for (i = 0; i < checkboxes.length; ++i) {
                    checkboxes[i].setValue(true);
                }

                topView.settingAllDalCheckBoxes = false;

                var allCheckBoxesChecked = true;

                // after resetAllSearchOptions all checkboxes should no longer be checked.
                controller.resetAllSearchOptions(button);

                for (i = 0; i < checkboxes.length; ++i) {
                    if (checkboxes[i].getValue !== true) {
                        allCheckBoxesChecked = false;
                    }
                }

                expect(allCheckBoxesChecked).toBeFalsy();
                expect(topView.removeAll).toHaveBeenCalled();
                expect(topView.createDalPanels).toHaveBeenCalled();
            });
        });

        describe('resetSingleDal', function() {
            var testView = null;
            var button = null;

            beforeEach(function() {
                testView = topView.down('search_searchDals_searchoptions:last');

                button = testView.queryById('resetSingleDal');

                //noinspection JSValidateTypes
                spyOn(testView, 'doLayout'); // don't necessarily need to redo the layout...
                spyOn(topView, 'remove').andCallThrough();
            });

            afterEach(function() {
                testView = null;
                button = null;
            });

            it('expect resetSingleDal to remove CustomSearchGroupForm', function() {
                var store = Ext.create('Savanna.search.store.DalSources', {
                    autoload: false
                });

                store.loadData(fixtures.allDals);

                var childSearchDalsPanel =  Ext.create('Savanna.search.view.searchDals.CustomSearchGroupForm', { store: store });

                testView.add(childSearchDalsPanel);

                expect(testView.down('search_searchDals_custom-search-group-form')).toBeTruthy();

                controller.resetSingleDal(button);

                expect(testView.down('search_searchDals_custom-search-group-form')).toBeFalsy();
            });
        });
    });
    */
});