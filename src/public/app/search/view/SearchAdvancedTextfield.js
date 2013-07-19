/**
 * Created with IntelliJ IDEA.
 * User: ksonger
 * Date: 7/18/13
 * Time: 4:42 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define("Savanna.search.view.SearchAdvancedTextfield", {
    extend: "Ext.form.field.Text",
    alias: "widget.searchadvanced_textfield",
    width: 380,
    fieldLabel: 'All of these words:',
    name: 'all_words',
    enableKeyEvents: true,
    itemId: "all_words",
    labelWidth: 120,
    tabIndex: 1,

    getBooleanValue: function () {
        switch(this.configs.booleanType)    {
            case "all":
                return this.getValue().replace(/\s+/g, ' AND ');
            break;
            case "exact":
                return '"' + this.getValue() + '"';
            break;
            case "any":
                return this.getValue().replace(/\s+/g, ' OR ');
            break;
            case "none":
                return this.getValue().replace(/\s+/g, ' NOT ');
            break;
        }
    }
})