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
        var str = this.getValue();
        str.trim();
        switch(this.configs.booleanType)    {
            case "all":
                return str.replace(/\s+/g, ' AND ');
            break;
            case "exact":
                return '"' + str + '"';
            break;
            case "any":
                return str.replace(/\s+/g, ' OR ');
            break;
            case "none":
                return str.replace(/\s+/g, ' NOT ');
            break;
        }
    }
})