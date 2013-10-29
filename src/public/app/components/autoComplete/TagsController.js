Ext.define('Savanna.components.autoComplete.TagsController',{
    extend: 'Deft.mvc.ViewController',

    control: {
        view: {
            click: 'onCloseButton'
        }
    },
    init: function () {
        return this.callParent(arguments);
    },
    onCloseButton: function (closeButton) {
        this.getView().fireEvent('Tag:RemoveSearchTerm', this.getView().text, this.getView());
    }
});