/* global
        Ext: false, ExtSpec: false,
        describe: false, beforeEach: false, afterEach: false, it: false, expect: false, spyOn: false, sinon: false,
        createTestDom: false, cleanTestDom: false, ThetusTestHelpers: false, setupNoCacheNoPagingStore: false,
        Savanna: false
 */
Ext.require('Savanna.Config');
Ext.require('Savanna.search.controller.SearchComponent');
Ext.require('Savanna.search.model.SearchHistory');
Ext.require('Savanna.search.model.SearchRequest');
Ext.require('Savanna.search.model.SearchResult');
Ext.require('Savanna.search.store.SearchHistory');
Ext.require('Savanna.search.store.SearchResults');
Ext.require('Savanna.search.view.SearchAdvancedTextfield');
Ext.require('Savanna.search.view.SearchBar');
Ext.require('Savanna.search.view.SearchForm');
Ext.require('Savanna.search.view.SearchBody');
Ext.require('Savanna.search.view.SearchComponent');
Ext.require('Savanna.search.view.SearchResults');
Ext.require('Savanna.search.view.SearchToolbar');

describe('Search Component', function () {

    var fixtures;
    var SEARCH_RESULTS_URL = '';
    var HISTORY_RESULTS_URL = '';

    beforeEach(function () {
        this.addMatchers(ExtSpec.Jasmine.Matchers);

        //SEARCH_RESULTS_URL = SEARCH_RESULTS_URL || (Savanna.Config.savannaUrlRoot + "rest/search;jsessionid=" + TEST_SESSION_ID);
        SEARCH_RESULTS_URL = SEARCH_RESULTS_URL || 'app/assets/data/testSearchResults.json';

        //HISTORY_RESULTS_URL = HISTORY_RESULTS_URL || (Savanna.Config.savannaUrlRoot + "rest/search/history;jsessionid=" + TEST_SESSION_ID);
        HISTORY_RESULTS_URL = 'app/assets/data/testSearchHistory.json';

        createTestDom();
    });

    afterEach(function () {
        fixtures = null;

        cleanTestDom();
    });

    describe('View', function () {
        var component = null;

        beforeEach(function () {
            component = Ext.create('Savanna.search.view.SearchComponent', { renderTo: 'test-html' });
        });

        afterEach(function () {
            if (component) {
                component.destroy();
                component = null;
            }
        });

        it('should have a toolbar instance', function () {
            expect(component.queryById('searchtoolbar') instanceof Savanna.search.view.SearchToolbar).toBeTruthy();
        });

        it('should have a searchbar instance', function () {
            expect(component.queryById('searchbar') instanceof Savanna.search.view.SearchBar).toBeTruthy();
        });

        it('search component should have a searchbody instance', function () {
            expect(component.queryById('searchbody') instanceof Savanna.search.view.SearchBody).toBeTruthy();
        });

        describe('SearchBar subview', function() {
            describe('buildSearchString method', function () {
                var searchbar = null;

                beforeEach(function () {
                    searchbar = component.queryById('searchbar');

                    searchbar.queryById('search_terms').setValue('search bar terms');
                    searchbar.queryById('all_words').setValue('some text');
                    searchbar.queryById('exact_phrase').setValue('other text');
                    searchbar.queryById('any_words').setValue('more and more text');
                    searchbar.queryById('none_words').setValue('bad terms');
                });

                it('should correctly assemble a search string from form fields', function () {
                    var result = searchbar.buildSearchString();
                    var expected = 'search bar terms AND some AND text AND "other text" AND more OR and OR more OR text NOT bad NOT terms';

                    expect(result).toEqual(expected);
                });

                it('should call getBooleanValue on each field', function () {
                    spyOn(searchbar.queryById('all_words'), 'getBooleanValue');
                    spyOn(searchbar.queryById('exact_phrase'), 'getBooleanValue');
                    spyOn(searchbar.queryById('any_words'), 'getBooleanValue');
                    spyOn(searchbar.queryById('none_words'), 'getBooleanValue');

                    searchbar.buildSearchString();

                    expect(searchbar.queryById('all_words').getBooleanValue).toHaveBeenCalled();
                    expect(searchbar.queryById('exact_phrase').getBooleanValue).toHaveBeenCalled();
                    expect(searchbar.queryById('any_words').getBooleanValue).toHaveBeenCalled();
                    expect(searchbar.queryById('none_words').getBooleanValue).toHaveBeenCalled();
                });
            });
        });
    });

    describe('Controller', function () {
        var component = null,
            toolbar = null,
            controller = null;

        beforeEach(function () {
            component = Ext.create('Savanna.search.view.SearchComponent', { renderTo: 'test-html' });
            toolbar = component.queryById('searchtoolbar');
            controller = Ext.create('Savanna.search.controller.SearchComponent');

            spyOn(controller, 'logHistory').andCallThrough();
        });

        afterEach(function () {
            if (controller) {
                controller.destroy();
                controller = null;
            }

            if (component) {
                component.destroy();
                component = null;
            }

            toolbar = null;
        });

        it('should do a search when onHistoryItemClick is called', function () {
            // TODO: make this into a real test...
            spyOn(controller, 'doSearch');

            controller.onHistoryItemClick();

            expect(controller.doSearch).toHaveBeenCalled();
        });

        describe('logHistory method', function() {
            var origErrorHandler,
                errorRaised = false,
                fixture = [
                    {query: 'Apples', date: 1375746974564},
                    {query: 'Oranges', date: 1375746974565}
                ];

            beforeEach(function() {
                origErrorHandler = Ext.Error.handle;

                Ext.Error.handle = function() {
                    errorRaised = true;

                    return true;
                };
            });

            afterEach(function() {
                Ext.Error.handle = origErrorHandler;

                origErrorHandler = null;
                errorRaised = false;
            });

            it('should sync the store', function () {
                var store = toolbar.getStore();

                expect(store).not.toBeUndefined();

                spyOn(store, 'sync');

                controller.logHistory(fixture, toolbar);

                expect(store.sync).toHaveBeenCalled();
            });

            it('should raise an error if we have no store', function() {
                spyOn(Ext.data.StoreManager, 'lookup').andReturn(null);

                controller.logHistory(fixture, toolbar);

                expect(errorRaised).toBeTruthy();
            });
        });

        xdescribe('handleSearchTermKeyUp', function () {
            beforeEach(function () {
                spyOn(controller, 'doSearch');
            });

            it('should call do search on keypress "Enter"', function () {
                controller.handleSearchTermKeyUp(null, {keyCode: 13 });

                expect(controller.doSearch).toHaveBeenCalled();
            });

            it('should not do search if not "Enter"', function () {
                controller.handleSearchTermKeyUp(null, { keyCode: 0 });

                expect(controller.doSearch).not.toHaveBeenCalled();
            });
        });

        xdescribe('searchbar', function () {
            var searchbar = null;

            beforeEach(function () {
                searchbar = Ext.create('Savanna.search.view.SearchBar', { renderTo: 'test-html' });
                searchbar.queryById('search_terms').setValue('search bar terms');
                searchbar.queryById('all_words').setValue('some text');
                searchbar.queryById('exact_phrase').setValue('other text');
                searchbar.queryById('any_words').setValue('more and more text');
                searchbar.queryById('none_words').setValue('bad terms');
                searchbar.doLayout();
            });

            afterEach(function () {
                if (searchbar) {
                    searchbar.destroy();
                }

                searchbar = null;
            });

            it('it hides the menu', function () {
                controller.hideMenu(searchbar.items.first());

                expect(searchbar.queryById('searchadvanced_menu').isVisible()).toBeFalsy();
            });

            it('should align the advanced menu below the simple search textfield', function () {
                var button = controller.getAdvancedButton();
                var menu = button.menu;

                spyOn(menu, 'alignTo');

                controller.alignMenuWithTextfield(button);

                expect(menu.alignTo).toHaveBeenCalled();
            });

            it('should build the search string', function () {
                spyOn(component.queryById('searchbar'), 'buildSearchString').andCallThrough();
                controller.doSearch(component.queryById('searchbar').items.first(), {});
                expect(component.queryById('searchbar').buildSearchString).toHaveBeenCalled();
            });

            it('should create the store', function () {
                controller.doSearch(searchbar.items.first(), {});
                expect(searchbar.store instanceof Savanna.search.store.SearchResults).toBeTruthy();
            });
        });

        xdescribe('SearchAdvancedTextfield', function()  {
            var field = null;

            beforeEach(function () {

            });

            afterEach(function () {
                if (field) {
                    field.destroy();
                }
                field = null;
            });

            it('getBooleanValue returns expected string for booleanType "all"', function() {
                field = Ext.create('Savanna.search.view.SearchAdvancedTextfield', {
                    configs: {join: '', booleanType: 'all'},
                    renderTo: 'test-html'
                });

                field.setValue('some   text');

                var expected = 'some AND text';
                var result = field.getBooleanValue();

                expect(result).toEqual(expected);
            });

            it('getBooleanValue returns expected string for booleanType "exact"', function() {
                field = Ext.create('Savanna.search.view.SearchAdvancedTextfield', {
                    configs: {join: '', booleanType: 'exact'},
                    renderTo: 'test-html'
                });

                field.setValue('some   text');

                var expected = '"some   text"';
                var result = field.getBooleanValue();

                expect(result).toEqual(expected);
            });

            it('getBooleanValue returns expected string for booleanType "any"', function() {
                field = Ext.create('Savanna.search.view.SearchAdvancedTextfield', {
                    configs: {join:'', booleanType: 'any'},
                    renderTo: 'test-html'
                });

                field.setValue('some   text');

                var expected = 'some OR text';
                var result = field.getBooleanValue();

                expect(result).toEqual(expected);
            });

            it('getBooleanValue returns expected string for booleanType "none"', function() {
                field = Ext.create('Savanna.search.view.SearchAdvancedTextfield', {
                    configs: {join: '', booleanType: 'none'},
                    renderTo: 'test-html'
                });

                field.setValue('some   text');

                var expected = 'some NOT text';
                var result = field.getBooleanValue();

                expect(result).toEqual(expected);
            });
        });

        xdescribe('onCallback', function () {

            beforeEach(function () {
                spyOn(controller, 'showResultsPage');
                fixtures = Ext.clone(ThetusTestHelpers.Fixtures.SearchResults);
            });

            afterEach(function () {
                fixtures = null;
            });

            it('calls showResultsPage', function () {
                controller.onCallback(fixtures.searchResults, {}, true);
                expect(controller.showResultsPage).toHaveBeenCalled();
            });

        });

        xdescribe('should call logHistory', function () {

            it('logHistory called', function () {
                controller.doSearch(component.queryById('searchbar').items.first(), {});
                expect(controller.logHistory).toHaveBeenCalled();
            });
        });

        xdescribe('Toolbar', function () {

            describe('onBodyToolbarClick', function () {
                it('should set currentPanel to "results" when "Results" is clicked', function () {
                    var resbutton = controller.getResultsButton();

                    component.queryById('searchbody').currentPanel = 'searchoptions';
                    spyOn(controller, 'onBodyToolbarClick');
                    resbutton.fireEvent('click', resbutton);
                });

                it('should set currentPanel to "searchoptions" when "Search Options" is clicked', function () {
                    var optsbutton = controller.getOptionsButton();
                    component.queryById('searchbody').currentPanel = 'results';
                    spyOn(controller, 'onBodyToolbarClick');
                    optsbutton.fireEvent('click', optsbutton);
                });
            });
        });
    });

    xdescribe('Models', function () {
        beforeEach(function () {
            fixtures = Ext.clone(ThetusTestHelpers.Fixtures.SearchResults);
        });

        afterEach(function () {
            fixtures = null;
        });

        describe('constructor', function () {
            it('should be able to create a model with canonical data', function () {
                var result = Ext.create('Savanna.search.model.SearchResult', fixtures.searchResults);
                expect(result instanceof Savanna.search.model.SearchResult).toBeTruthy();
            });
        });
    });

    xdescribe('SearchResults Store', function () {
        var server = null,
            store = null,
            searchObj = null;

        beforeEach(function () {
            fixtures = Ext.clone(ThetusTestHelpers.Fixtures.SearchResults);

            // NOTE: this has to happen BEFORE your create a FakeServer,
            searchObj = Ext.create('Savanna.search.model.SearchRequest', {
                textInputString: 'dogs',
                displayLabel: 'dogs'
            });
            store = setupNoCacheNoPagingStore('Savanna.search.store.SearchResults');
            server = new ThetusTestHelpers.FakeServer(sinon);
        });

        afterEach(function () {
            fixtures = null;
            store = null;
            searchObj = null;
        });

        describe('default data loading', function () {

            it('should load data', function () {
                expect(store.getTotalCount()).toBe(0);
                server.respondWith('POST', SEARCH_RESULTS_URL, fixtures.searchResults);

                store.proxy.jsonData = Ext.JSON.encode(searchObj.data);
                var me = this;
                me.onCallback = function(success)  {
                    expect(success).toBeTruthy();
                };

                store.load({
                    callback: function(records, operation, success) {
                        me.onCallback(success);
                    }
                });
                server.respond({
                    errorOnInvalidRequest: true
                });
            });

        });
    });

    describe('SearchHistory Store', function () {
        var server = null,
            store = null,
            fixtures = {};

        beforeEach(function() {
            fixtures = Ext.clone(ThetusTestHelpers.Fixtures.HistoryResults);
            store = setupNoCacheNoPagingStore('Savanna.search.store.SearchHistory');
            store.getProxy().addSessionId = false; // so our URL is clean
            server = new ThetusTestHelpers.FakeServer(sinon);
        });

        afterEach(function() {
            if (server) {
                server.restore();
                server = null;
            }

            store = null;
            fixtures = null;
        });

        describe('retrieving history data', function() {

            beforeEach(function() {
                server.respondWith('POST', store.getProxy().url, fixtures.historyResults);
                store.load();
                server.respond({
                    errorOnInvalidRequest: true
                })
            });

            it('should get same number of records as in our fixture', function() {
                expect(store.getCount()).toBe(fixtures.historyResults.length);
            });
        });

        describe('sending history data', function() {
            beforeEach(function() {
                server.respondWith('POST', store.getProxy().url, {});
            });

            it('should send our history records and get them back from the server', function() {
                Ext.Array.each(fixtures.historyResults, function(search) {
                    store.add(search);
                });

                store.sync();

                server.respond({
                    errorOnInvalidRequest: true,
                    returnBody: true, // since the service basically gives us back our searches...
                    reportBody: false, // enable if you want to see the request body in the console
                    testBody: function(body) {
                        var json = JSON.parse(body);
                        if (json.length !== fixtures.historyResults.length) {
                            return 'Expected request body to have ' + fixtures.historyResults.length + ' records, but had ' + json.length;
                        }

                        return '';
                    }
                });

                expect(store.getCount()).toBe(3);
            });

            it('should make sure data sent is sent as an array of records, even when sending one record', function() {
                store.add(fixtures.historyResults[0]);

                store.sync();

                server.respond({
                    errorOnInvalidRequest: true,
                    returnBody: true, // since the service basically gives us back our searches...
                    reportBody: false, // enable if you want to see the request body in the console
                    testBody: function(body) {
                        var json = JSON.parse(body);
                        if (!Array.isArray(json)) {
                            return 'Expected an array but got: ' + body;
                        }

                        return '';
                    }
                });

                expect(store.getCount()).toBe(1);
            });
        });
    });
});
