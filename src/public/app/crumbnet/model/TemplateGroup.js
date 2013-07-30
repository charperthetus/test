/**
 * Created with IntelliJ IDEA.
 * User: thille
 * Date: 7/25/13
 * Time: 5:24 PM
 * To change this template use File | Settings | File Templates.
 */
/* Ext: false */
Ext.define('Savanna.crumbnet.model.TemplateGroup', {
    extend: 'Ext.data.Model',

    requires: [
        'Savanna.crumbnet.model.Template'
    ],

    fields: ['title', 'templates'],

    // NOTE: the model class must be fully qualififed in your relationship definition
    hasMany: [
        { model: 'Savanna.crumbnet.model.Template', name: 'templates' }
    ]
});