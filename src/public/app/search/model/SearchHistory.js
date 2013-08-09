/* global Ext: false */
/**
 * Created with IntelliJ IDEA.
 * User: ksonger
 * Date: 7/25/13
 * Time: 1:19 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.search.model.SearchHistory', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'query', type: 'string'},
        {name: 'date', type: 'int'}
    ]
});
