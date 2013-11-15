/**
 * Created with IntelliJ IDEA.
 * User: bjohnson
 * Date: 11/4/13
 * Time: 2:13 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.process.view.metadata.ProcessItemMetadata', {
    extend: 'Ext.container.Container',
    alias: 'widget.process_item_metadata',

    requires: [
        'Savanna.process.controller.ProcessItemMetadataController',
        'Savanna.itemView.view.itemQualities.EditItemQualities'
    ],

    controller: 'Savanna.process.controller.ProcessItemMetadataController',

    ui:'off-white',

    overflowY: 'auto',

    items: [
        {
            xtype: 'form',
            collapsible: true,
            title: "RNRM Item",
            ui: 'off-white',
            layout: 'vbox',
            width: '100%',
            defualts: {
                padding: '0 10'
            },
            items: [
                {
                    xtype: 'fieldcontainer',
                    itemId: 'rnrmDescriptionContainer',
                    layout: 'hbox',
                    width: '100%',
                    align: 'stretch',
                    height: 150,
                    items: [
                        {
                            xtype: 'textarea',
                            itemId: 'itemDescription',
                            grow: true,
                            growMax: 150,
                            overflowY: 'auto',
                            editable: false,
                            readOnly: true,
                            flex: 1,
                            margin: '0 5 0 0'
                        },
                        {
                            xtype: 'image',
                            itemId: 'itemPrimeImage',
                            alt: 'No Primary Image',
                            maxHeight: '100%',
                            flex: 1
                        }
                    ]
                }
            ],
            tbar: {
                ui: 'off-white',
                items: [{
                                xtype: 'tbtext',
                                itemId: 'itemTitle',
                                cls: 'heading2'
                            }, '->',
                            {
                                text: 'Open',
                                itemId: 'openBtn'
                        }]}
        },
        {
            xtype: 'form',
            ui: 'off-white',
            itemId: 'instancePanel',
            collapsible: true,
            title: 'Process Item',
            defualts: {
                padding: '0 10'
            },
            items: [
                {
                    xtype: 'fieldcontainer',
                    layout: 'vbox',
                    items: [{
                        xtype: 'textfield',
                        itemId: 'itemInstanceTitle',
                        fieldLabel: 'Title',
                        labelCls: 'label',
                        labelAlign: 'top',
                        width: '100%'
                    },
                    {
                        xtype: 'textarea',
                        itemId: 'itemInstanceDescription',
                        fieldLabel: 'Description',
                        labelCls: 'label',
                        labelAlign: 'top',
                        width: '100%'
                    }]
                },
                {
                    xtype: 'fieldset',
                    title: 'Role',
                    width: '100%',
                    border: false,
                    items: [{
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        width: '98%',
                        items: [
                            {
                                xtype: 'auto_complete',
                                labelType: 'Click to add a Role',
                                showTags: true,
                                itemId: 'roleAutoCompleteBox',
                                store: Ext.create('Savanna.itemView.store.AutoCompleteStore', {
                                    urlEndPoint: SavannaConfig.savannaUrlRoot + 'rest/model/search/keyword/property/' + 'lib%252EExtendedRelationOntology%253Ahas_role%252FModelPredicate',
                                    paramsObj: { pageStart:0, pageSize:20, alphabetical: false }
                                }),
                                flex: 1
                            },
                            {
                                xtype: 'button',
                                itemId: 'roleChooserButton',
                                glyph: 'searchBinoculars'
                            }
                        ]
                    }]
                },
                {
                    xtype: 'fieldset',
                    title: 'Quantity',
                    width: '100%',
                    border: false,
                    items: [{
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        width: '98%',
                        items: [{
                                    xtype: 'textfield',
                                    itemId: 'quantityValue',
                                    height: 26,
                                    margin: '0 3 0 0',
                                    flex: 1
                                },
                                {
                                    xtype: 'combo',
                                    itemId: 'quantityUnit',
                                    flex: 1,
                                    store: Ext.create('Ext.data.Store', {
                                        fields: ['abbr', 'val'],
                                        data: [{
                                            "abbr": "ampere",
                                            "val": 0
                                        }, {
                                            "abbr": "centigrade",
                                            "val": 1
                                        }, {
                                            "abbr": "centimeter",
                                            "val": 2
                                        }, {
                                            "abbr": "decibel",
                                            "val": 3
                                        }, {
                                            "abbr": "fahrenheit",
                                            "val": 4
                                        }, {
                                            "abbr": "feet",
                                            "val": 5
                                        }, {
                                            "abbr": "fluid ounces",
                                            "val": 6
                                        }, {
                                            "abbr": "gallons",
                                            "val": 7
                                        }, {
                                            "abbr": "grams",
                                            "val": 8
                                        }, {
                                            "abbr": "Inch",
                                            "val": 9
                                        }, {
                                            "abbr": "kilograms",
                                            "val": 10
                                        }, {
                                            "abbr": "kilometer",
                                            "val": 11
                                        }, {
                                            "abbr": "liters",
                                            "val": 12
                                        }, {
                                            "abbr": "meter",
                                            "val": 13
                                        }, {
                                            "abbr": "mile",
                                            "val": 14
                                        }, {
                                            "abbr": "milligrams",
                                            "val": 15
                                        }, {
                                            "abbr": "milliliters",
                                            "val": 16
                                        }, {
                                            "abbr": "millimeter",
                                            "val": 17
                                        }, {
                                            "abbr": "ohm",
                                            "val": 18
                                        }, {
                                            "abbr": "ounces",
                                            "val": 19
                                        }, {
                                            "abbr": "pounds",
                                            "val": 20
                                        }, {
                                            "abbr": "tons",
                                            "val": 21
                                        }, {
                                            "abbr": "tons, metric/ megagrams",
                                            "val": 22
                                        }, {
                                            "abbr": "volt",
                                            "val": 23
                                        }, {
                                            "abbr": "watt",
                                            "val": 24
                                        }, {
                                            "abbr": "yard",
                                            "val": 25
                                        }]
                                    }),
                                    queryMode: 'local', //Uses local store functionality and removes default remote on the input.
                                    displayField: 'abbr', //Sets the display field to use the abbr config from the store.
                                    valueField: 'val', //Sets the value field to use the val config from the store.
                                    scope: this,
                                    enableRegEx: true,
                                    enableKeyEvents: true,
                                    displayValue: null, //This is a custom config which sets the abbr that is currently selected.
                                    findInStore: function(){
                                        if ( this.getValue() !== "" && this.getValue() !== null ){
                                            this.setRawValue(this.getRawValue());
                                            if ( this.store.find("abbr",this.getRawValue()) === -1 ){
                                                this.markInvalid('Unit is Invalid!');
                                            }
                                        }
                                    },

                                    keyCount: 0,
                                    listeners: {
                                        select: function(checkbox, records) {
                                            //When the user makes a selection then it will update the displayValue so we can get the raw value.
                                            this.displayValue = this.getRawValue();
                                        },
                                        change: function() {
                                            //When the widget makes a change via setDefaultDate on init then it will update the displayValue so we can get the raw value.
                                            this.displayValue = this.getRawValue(); //this.store.getAt(this.getValue())['raw'].abbr;
                                        },
                                        keyup: function() {
                                            //As the user types in the combobox it will update all the characters to uppercase to follow the convention and allow the filter to work.
                                            if ( this.keyCount > 0 ){
                                                this.findInStore();
                                            } else {
                                                //The key count is used to maintain the focus on the tab into for the field else the initial highlighting will stop working because of the instant find to store lookup.
                                                this.keyCount = 1;
                                            }

                                        },
                                        focus: function() {
                                            //It must reset everytime on focus in order to know it was just entered into and then on the keyup event it will not call findInStore when focused into with the tab key.
                                            this.keyCount = 0;
                                        }
                                    }
                                }
                        ]
                    }]
                }
            ]
        },
        {
            xtype: 'itemview_edit_qualities',
            title: 'Properties',
            itemId: 'itemQualities',
            defualts: {
                padding: '0 10'
            },
            ui: 'off-white'
        }
    ]
});