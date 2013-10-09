/**
 * Created with IntelliJ IDEA.
 * User: mfawver
 * Date: 10/9/13
 * Time: 7:01 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.metadata.view.DetailsEdit', {
    extend: 'Ext.view.View',
    alias: 'widget.metadata_details_edit',

    mixins: {
        storeable: 'Savanna.mixin.Storeable'
    },

    store: 'Savanna.metadata.store.Metadata',

    requires: [
        'Savanna.metadata.controller.FieldTypes',
        'Savanna.metadata.store.Metadata',
        'Savanna.controller.Factory'
    ],

    autoScroll: true,
    editMode: false,

    itemURI: '',

    itemSelector: 'div.detail-item',
    tpl: null,
    emptyText: 'No metadata available',

    initComponent: function () {
        this.mixins.storeable.initStore.call(this);
        this.callParent(arguments);
        Savanna.controller.Factory.getController('Savanna.metadata.controller.FieldTypes');

        var config = this.initialConfig || {};
        this.itemURI = config.itemURI;

        var metadataStore = Ext.data.StoreManager.lookup('metadata');
        metadataStore.itemURI = config.itemURI;
        metadataStore.load();

        var detailsItemTpl = new Ext.XTemplate(
            '<tpl for=".">',
                '<div class="detail-item">',
                // if is visible
                '<tpl if="values.visible">',
                    '<br/><span>{displayLabel}</span>',
                    //'<input type="text" value="{value}" autocomplete="off" name="value" style="width: 100%;">',
                    '<tpl if="this.isListType(values.type)">',
                        '<tpl for="values.value">',
                            //'<br/><span>{.}</span>',
                            '<br/><span>{[this.formatValue(parent.type,values)]}</span>',
                        '</tpl></p>',
                    '<tpl else>',
                        '<br/><span>{[this.formatValue(values.type,values.value)]}</span>',
                    '</tpl>',
                '</tpl>',
                '</div>',
            '</tpl>',
            {
                formatValue: function(type, value) {
                    var formattedValue = '';
                    //console.log('type', type);
                    switch(type){
                        case 'Integer_List':// fall through
                        case 'Integer':     // fall through
                        case 'Double_List': // fall through
                        case 'Double':
                            formattedValue = value.toLocaleString();
                            break;
                        case 'Boolean_List': // fall through
                        case 'Boolean':
                            formattedValue = value.toLocaleString();
                            break;
                        case 'Date_List':   // fall through
                        case 'Date':
                            var myDate = new Date(value);
                            formattedValue = Ext.Date.format(myDate,'F j, Y, g:i a');
                            break;
                        case 'String_List': // fall through
                        case 'String':      // fall through
                        default:
                            formattedValue = value;
                            break
                    }
                    return formattedValue;
                },
                isListType: function(type) {
                    //console.log('type', type);
                    return 0 <= (['Boolean_List'
                                , 'Date_List'
                                , 'Double_List'
                                , 'String_List'
                                , "Integer_List"
                                , "Uri_List"].indexOf(type));
                }
            }
        );
        this.tpl = detailsItemTpl;
    }

});