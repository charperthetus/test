/**
 * Created with IntelliJ IDEA.
 * User: bcannon
 * Date: 10/3/13
 * Time: 8:12 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.process.model.TemplateGroup', {
    extend: 'Ext.data.Model',

    requires: [
        'Savanna.process.model.Template'
    ],

    fields: ['id', 'title', 'templates'],

    // NOTE: the model class must be fully qualififed in your relationship definition
    hasMany: [
        { model: 'Savanna.process.model.Template', name: 'templates' }
    ],

    // CUSTOM METHODS

    /**
     * retrieve the templates data as raw JSON
     *
     * @returns Array
     */
    templatesAsJson: function() {
        var json = [];

        this.templates().each(function(template) {
            json.push(template.raw);
        });

        return json;
    }
});