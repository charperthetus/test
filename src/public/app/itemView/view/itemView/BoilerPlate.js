/**
 * Created with IntelliJ IDEA.
 * User: amartin
 * Date: 9/23/13
 * Time: 4:37 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.itemView.view.itemView.Boilerplate', {
    extend: 'Ext.grid.PropertyGrid',

    cls: 'boilerplate',

    alias: 'widget.itemview_boilerplate',

    hideHeaders: true,

    margin: 10,

    source: {} // Start with an empty data source (we are expecting ItemView.buildBoilerplate() to populate this)
});
