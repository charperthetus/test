/**
 * Created with IntelliJ IDEA.
 * User: bcannon
 * Date: 10/3/13
 * Time: 8:11 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.process.model.Template', {
    extend: 'Ext.data.Model',

    belongsTo: 'Savanna.process.model.TemplateGroup',

    fields: ['category','title','figure']
});
