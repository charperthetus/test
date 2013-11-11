/**
 * Created with IntelliJ IDEA.
 * User: bjohnson
 * Date: 11/4/13
 * Time: 2:13 PM
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Savanna.process.view.metadata.ProcessItemMetadata', {
    extend: 'Ext.form.Panel',
    alias: 'widget.process_item_metadata',

    requires: [
        'Savanna.process.controller.ProcessItemMetadataController',
        'Savanna.itemView.view.itemQualities.EditItemQualities'
    ],

    controller: 'Savanna.process.controller.ProcessItemMetadataController',

    overflowY: 'auto',

    items: [
        {
            xtype: 'container',
            layout: 'hbox',
            items: [
                {
                    xtype: 'textfield',
                    value: 'RNRM Item Name',
                    itemId: 'itemTitle'
                },
                {
                    xtype: 'button',
                    text: 'Open',
                    itemId: 'openBtn'
                }
            ]
        },
        {
            xtype: 'container',
            layout: 'hbox',
            items: [
                {
                    xtype: 'textarea',
                    text: 'Body Paragraph Closed.  Content far far away.',
                    itemId: 'itemDescription'
                },
                {
                    xtype: 'image',
                    itemId: 'itemPrimeImage',
                    alt: 'No Primary Image'
                }
            ]
        },
        {
            xtype: 'panel',
            layout: 'vbox',
            border: 3,
            items: [
                {
                    xtype: 'textfield',
                    value: 'Individual Title',
                    itemId: 'itemInstanceTitle'
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    width: '90%',
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
                },
                {
                    xtype: 'label',
                    text: 'Quantity'
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'textfield',
                            itemId: 'quantityValue'
                        },
                        {
                            xtype: 'combo',
                            itemId: 'quantityUnit',
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
                                }
                                ]
                            }),
                            queryMode: 'local', //Uses local store functionality and removes default remote on the input.
                            displayField: 'abbr', //Sets the display field to use the abbr config from the store.
                            valueField: 'val', //Sets the value field to use the val config from the store.
                            scope: this,
                            //minLength: 3,
                            //maxLength: 3,
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
                }/*,
                {
                    xtype: 'textarea',
                    fieldLabel: 'Description',
                    labelAlign: 'top',
                    text: 'Far far away, behind the word mountains',
                    itemId: 'itemInstanceDescription'
                }*/
            ]
        },
        {
            xtype: 'itemview_edit_qualities',
            collapsible: true,
            title: 'Properties',
            itemId: 'itemQualities'
        }
    ]
});