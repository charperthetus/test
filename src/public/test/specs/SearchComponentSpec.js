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
Ext.require('Savanna.search.view.SearchAdvancedTextfield');
Ext.require('Savanna.search.view.SearchBar');
Ext.require('Savanna.search.view.SearchForm');
Ext.require('Savanna.search.view.SearchBody');
Ext.require('Savanna.search.view.SearchComponent');
Ext.require('Savanna.search.view.SearchToolbar');

describe('Search Component', function () {

    var dalFixtures;
    var dalStore;
    var server;

    beforeEach(function () {

        /*
         NOTE: because the search component is comprised of the SearchDals component which autoLoads the dalSources,
         we need to set up our mockServer so that it will respond to that request when it happens...
         */
        dalFixtures = Ext.clone(ThetusTestHelpers.Fixtures.DalSources);
        server = new ThetusTestHelpers.FakeServer(sinon);
        dalStore = ThetusTestHelpers.ExtHelpers.setupNoCacheNoPagingStore('Savanna.search.store.DalSources');
        server.respondWith('GET', dalStore.getProxy().url, dalFixtures.allDals);

        // Even though the request will happen later (at some point when the component is instantiated), we set the
        // server to respond now so that it's ready for that future call
        server.respond({
            errorOnInvalidRequest: true
        });

        ThetusTestHelpers.ExtHelpers.createTestDom();
    });

    afterEach(function () {
        if (server) {
            server.restore();
            server = null;
        }

        dalFixtures = null;
        dalStore = null;

        ThetusTestHelpers.ExtHelpers.cleanTestDom();
    });

    describe('View', function () {
        var component = null;

        beforeEach(function () {
            component = Ext.create('Savanna.search.view.SearchComponent', { renderTo: ThetusTestHelpers.ExtHelpers.TEST_HTML_DOM_ID });
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

        describe('SearchBar subview', function () {
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
            component = Ext.create('Savanna.search.view.SearchComponent', { renderTo: ThetusTestHelpers.ExtHelpers.TEST_HTML_DOM_ID });
            toolbar = component.queryById('searchtoolbar');
            controller = Savanna.controller.Factory.getController('Savanna.search.controller.SearchComponent');

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

        describe('logHistory method', function () {
            var origErrorHandler,
                errorRaised = false,
                fixture = [
                    {query: 'Apples', date: 1375746974564},
                    {query: 'Oranges', date: 1375746974565}
                ];

            beforeEach(function () {
                origErrorHandler = Ext.Error.handle;

                Ext.Error.handle = function () {
                    errorRaised = true;

                    return true;
                };
            });

            afterEach(function () {
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

            it('should raise an error if we have no store', function () {
                spyOn(Ext.data.StoreManager, 'lookup').andReturn(null);

                controller.logHistory(fixture, toolbar);

                expect(errorRaised).toBeTruthy();
            });
        });

        describe('handleSearchTermKeyUp callback', function () {

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

        describe('managing SearchBar subview events', function () {
            var searchbar = null;

            beforeEach(function () {
                searchbar = component.queryById('searchbar');
                searchbar.queryById('search_terms').setValue('search bar terms');
                searchbar.queryById('all_words').setValue('some text');
                searchbar.queryById('exact_phrase').setValue('other text');
                searchbar.queryById('any_words').setValue('more and more text');
                searchbar.queryById('none_words').setValue('bad terms');
            });

            afterEach(function () {
                searchbar = null;
            });

            it('should be able to hide the menu', function () {
                controller.hideMenu(searchbar.items.first());

                expect(searchbar.queryById('searchadvanced_menu').isVisible()).toBeFalsy();
            });

            it('should align the advanced menu below the simple search textfield', function () {
                var button = component.queryById('searchadvanced_btn');
                var menu = button.menu;

                spyOn(menu, 'alignTo');

                controller.alignMenuWithTextfield(button);

                expect(menu.alignTo).toHaveBeenCalled();
            });

            it('should build the search string', function () {
                spyOn(searchbar, 'buildSearchString').andCallThrough();

                controller.doSearch(searchbar);

                expect(searchbar.buildSearchString).toHaveBeenCalled();
            });

            it('should remove search field values when "Start New Search" is selected', function () {
                var form = searchbar.queryById("search_form");
                controller.handleNewSearch(component.queryById('searchbar'));

                expect(form.queryById('search_terms').getValue()).toEqual('');
                expect(form.queryById('all_words').getValue()).toEqual('');
                expect(form.queryById('exact_phrase').getValue()).toEqual('');
                expect(form.queryById('any_words').getValue()).toEqual('');
                expect(form.queryById('none_words').getValue()).toEqual('');
            });
        });

        describe('managing SearchAdvancedTextfield subview events', function () {
            var field = null; // set up in each test, but we want to be sure and destroy it, even if the test fails

            afterEach(function () {
                if (field) {
                    field.destroy();
                    field = null;
                }
            });

            it('getBooleanValue returns expected string for booleanType "all"', function () {
                field = Ext.create('Savanna.search.view.SearchAdvancedTextfield', {
                    configs: { join: '', booleanType: 'all' },
                    renderTo: ThetusTestHelpers.ExtHelpers.TEST_HTML_DOM_ID
                });

                field.setValue('some   text');

                var expected = 'some AND text',
                    result = field.getBooleanValue();

                expect(result).toEqual(expected);
            });

            it('getBooleanValue returns expected string for booleanType "exact"', function () {
                field = Ext.create('Savanna.search.view.SearchAdvancedTextfield', {
                    configs: { join: '', booleanType: 'exact' },
                    renderTo: ThetusTestHelpers.ExtHelpers.TEST_HTML_DOM_ID
                });

                field.setValue('some   text');

                var expected = '"some   text"',
                    result = field.getBooleanValue();

                expect(result).toEqual(expected);
            });

            it('getBooleanValue returns expected string for booleanType "any"', function () {
                field = Ext.create('Savanna.search.view.SearchAdvancedTextfield', {
                    configs: { join: '', booleanType: 'any' },
                    renderTo: ThetusTestHelpers.ExtHelpers.TEST_HTML_DOM_ID
                });

                field.setValue('some   text');

                var expected = 'some OR text',
                    result = field.getBooleanValue();

                expect(result).toEqual(expected);
            });

            it('getBooleanValue returns expected string for booleanType "none"', function () {
                field = Ext.create('Savanna.search.view.SearchAdvancedTextfield', {
                    configs: { join: '', booleanType: 'none' },
                    renderTo: ThetusTestHelpers.ExtHelpers.TEST_HTML_DOM_ID
                });

                field.setValue('some   text');

                var expected = 'some NOT text',
                    result = field.getBooleanValue();

                expect(result).toEqual(expected);
            });
        });

        describe('searchCallback', function () {
            var origErrorHandler,
                errorRaised = false;

            beforeEach(function () {
                spyOn(controller, 'showResultsPage');

                fixtures = Ext.clone(ThetusTestHelpers.Fixtures.SearchResults);

                origErrorHandler = Ext.Error.handle;

                Ext.Error.handle = function () {
                    errorRaised = true;

                    return true;
                };

                var readMethod = 'GET',
                    testUrl = ThetusTestHelpers.ExtHelpers.buildTestProxyUrl(dalStore.getProxy(), 'read', readMethod);

                server.respondWith(readMethod, testUrl, dalFixtures.allDals);

                dalStore.getProxy().addSessionId = false; // so our URL is clean
                dalStore.load();

                server.respond({
                    errorOnInvalidRequest: true
                });
            });

            afterEach(function () {
                fixtures = {};

                Ext.Error.handle = origErrorHandler;

                origErrorHandler = null;
                errorRaised = false;

                if (server) {
                    server.restore();
                    server = null;
                }
                dalStore = null;
                dalFixtures = null;
            });

            it('should raise an error if success is false', function () {

                server = new ThetusTestHelpers.FakeServer(sinon);

                // Even though the request will happen later (at some point when the component is instantiated), we set the
                // server to respond now so that it's ready for that future call
                server.respond({
                    errorOnInvalidRequest: true
                });

                component.down("#resultsdals").store = dalStore;
                component.down("#resultsdals").createDalPanels();

                controller.searchCallback(fixtures.searchResults, {}, false, component.down("#resultsdals"), 'mockDAL');

                expect(errorRaised).toBeTruthy();
            });
        });

        describe('doSearch method', function () {

            it('should call logHistory', function () {
                controller.doSearch(component.queryById('searchbar').items.first(), {});

                expect(controller.logHistory).toHaveBeenCalled();
            });
        });

        describe('managing Toolbar subview events', function () {

            describe('onBodyToolbarClick', function () {
                it('should set currentPanel to "results" when "Results" is clicked', function () {
                    var resbutton = component.queryById('resultsbutton');

                    component.queryById('searchbody').currentPanel = 'searchoptions';

                    spyOn(controller, 'onBodyToolbarClick');

                    resbutton.fireEvent('click', resbutton);

                    expect(component.queryById('searchbody').currentPanel).not.toBe('searchoptions');
                });

                it('should set currentPanel to "searchoptions" when "Search Options" is clicked', function () {
                    var optsbutton = component.queryById('optionsbutton');

                    component.queryById('searchbody').currentPanel = 'results';

                    spyOn(controller, 'onBodyToolbarClick');

                    optsbutton.fireEvent('click', optsbutton);

                    expect(component.queryById('searchbody').currentPanel).not.toBe('results');
                });
            });
        });
    });

    describe('Models', function () {
        beforeEach(function () {
            fixtures = Ext.clone(ThetusTestHelpers.Fixtures.SearchResults);
        });

        afterEach(function () {
            fixtures = {};
        });

        describe('constructor', function () {
            it('should be able to create a model with canonical data', function () {
                var result = Ext.create('Savanna.search.model.SearchResult', fixtures.searchResults);

                expect(result instanceof Savanna.search.model.SearchResult).toBeTruthy();
            });
        });
    });

    describe('SearchResults Store', function () {


        describe('retrieving results data', function () {

            beforeEach(function () {

            });

            afterEach(function () {
                if (server) {
                    server.restore();
                    server = null;
                }
            });


            it('should get same number of records as in our fixture', function () {

                var resultsFixture = Ext.clone(ThetusTestHelpers.Fixtures.SearchResults),
                    readMethod = 'POST',
                    resultsStore = ThetusTestHelpers.ExtHelpers.setupNoCacheNoPagingStore('Savanna.search.store.SearchResults'),
                    testUrl = ThetusTestHelpers.ExtHelpers.buildTestProxyUrl(resultsStore.getProxy(), 'read', readMethod);


                resultsStore.getProxy().addSessionId = false; // so our URL is clean

                server.respondWith(readMethod, testUrl, resultsFixture.searchResults.results);

                resultsStore.load();

                server.respond({
                    errorOnInvalidRequest: true
                });

                expect(resultsStore.getCount()).toBe(resultsFixture.searchResults.results.length);
            });
        });
    });

    describe('SearchHistory Store', function () {


        describe('retrieving history data', function () {

            var historyFixture,
                readMethod,
                historyStore,
                testUrl;

            beforeEach(function () {

                historyFixture = Ext.clone(ThetusTestHelpers.Fixtures.HistoryResults);

                readMethod = 'GET';

                historyStore = ThetusTestHelpers.ExtHelpers.setupNoCacheNoPagingStore('Savanna.search.store.SearchHistory');

                testUrl = ThetusTestHelpers.ExtHelpers.buildTestProxyUrl(historyStore.getProxy(), 'read', readMethod);

                historyStore.getProxy().addSessionId = false; // so our URL is clean

                server.respondWith(readMethod, testUrl, historyFixture.historyResults);

                historyStore.load();

                server.respond({
                    errorOnInvalidRequest: true
                });
            });

            afterEach(function () {

                if (server) {
                    server.restore();
                    server = null;
                }

                historyFixture = null;
                historyStore = null;
            });

            it('should get same number of records as in our fixture', function () {
                expect(historyStore.getCount()).toBe(historyFixture.historyResults.length);
            });
        });

        describe('sending history data', function () {

            var historyFixture,
                readMethod,
                historyStore,
                testUrl;

            beforeEach(function () {
                historyFixture = Ext.clone(ThetusTestHelpers.Fixtures.HistoryResults);
                readMethod = 'POST';
                historyStore = ThetusTestHelpers.ExtHelpers.setupNoCacheNoPagingStore('Savanna.search.store.SearchHistory');
                testUrl = ThetusTestHelpers.ExtHelpers.buildTestProxyUrl(historyStore.getProxy(), 'read', readMethod);

                historyStore.getProxy().addSessionId = false; // so our URL is clean
                server.respondWith(readMethod, testUrl, historyFixture.historyResults);

            });

            afterEach(function () {
                if (server) {
                    server.restore();
                    server = null;
                }

                historyFixture = null;
                historyStore = null;
            });

            it('should send our history records and get them back from the server', function () {

                Ext.Array.each(historyFixture.historyResults, function (search) {
                    historyStore.add(search);
                });

                historyStore.getProxy().addSessionId = false; // so our URL is clean
                historyStore.sync();

                server.respond({
                    returnBody: true, // since the service basically gives us back our searches...
                    //reportBody: true, // enable if you want to see the request body in the console
                    testBody: function (body) {
                        var json = JSON.parse(body);
                        if (json.length !== historyFixture.historyResults.length) {
                            return 'Expected request body to have ' + historyFixture.historyResults.length + ', but got ' + json.length;
                        }

                        return '';
                    },
                    errorOnInvalidRequest: true
                });

                expect(historyStore.getCount()).toBe(3);
            });

            it('should make sure data sent is sent as an array of records, even when sending one record', function () {
                historyStore.add(historyFixture.historyResults[0]);

                historyStore.sync();

                server.respond({
                    returnBody: true, // since the service basically gives us back our searches...
                    //reportBody: false, // enable if you want to see the request body in the console
                    testBody: function (body) {
                        var json = JSON.parse(body);
                        if (!Array.isArray(json)) {
                            return 'Expected an array but got ' + body;
                        }

                        return '';
                    },
                    errorOnInvalidRequest: true
                });

                expect(historyStore.getCount()).toBe(1);
            });
        });
    });
});
