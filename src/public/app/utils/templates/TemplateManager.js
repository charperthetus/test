/**
 * Created with JetBrains WebStorm.
 * User: ksonger
 * Date: 6/21/13
 * Time: 11:19 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.search.utils.templates.TemplateManager', {

    extend: 'Ext.app.Controller',

    singleton: true,

    init:function() {

    },

    tpl: {
        templates: {},
        loadTemplates: function (names, callback) {
            var utils = this;

            var loadTemplate = function (index) {
                var name = names[index];
                //console.log('Loading template: ' + name);
                Ext.Ajax.request({
                    url: 'tpl/' + name + '.html',
                    method: 'GET',
                    success: function (response) {
                        utils.templates[name] = response.responseText;
                        index++;
                        if (index < names.length) {
                            loadTemplate(index);
                        } else {
                            callback();
                        }
                    },
                    failure: function () {
                        Ext.Error.raise({
                            msg: 'failed to load template: ' + name
                        });
                    }
                });
            };
            loadTemplate(0);
        },
        // Get template by name from hash of preloaded templates
        get: function (name) {
            return this.templates[name];
        }
    }
});