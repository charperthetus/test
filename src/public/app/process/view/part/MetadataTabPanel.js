/**
 * Created with IntelliJ IDEA.
 * User: bcannon
 * Date: 10/3/13
 * Time: 11:57 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Savanna.process.view.part.MetadataTabPanel', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.process_metadata',

    requires: [
        'Ext.tab.Panel'
    ],

    enableTabScroll: true,
    items: [
        { title: 'Details' }, //todo: fill in details
        { title: 'Comments' },
        { title: 'Selection' },
        { title: 'JSON',
            xtype:'panel',
            layout:'vbox',
            items: [
                {
                    xtype:'panel',
                    layout:'hbox',
                    items: [
                        {
                            xtype: 'button',
                            text: 'Load',
                            itemId: 'loadJSON'
                        },
                        {
                            xtype: 'button',
                            text: 'Save',
                            itemId: 'saveJSON'
                        },
                        {
                            xtype: 'button',
                            text: 'Clear',
                            itemId: 'clearJSON'
                        }
                    ]
                },
                {
                    xtype: 'textarea',
                    itemId: 'JSONtextarea',
                    grow: true,
                    width: '100%',
                    maxHeight: '100%',
                    value: '{ "class": "go.GraphLinksModel",\n' +
    '"nodeDataArray": [\n' +
    '{"category":"Start", "key":-1},\n' +
    '{"category":"Step", "isGroup":true, "key":0, "text":"Preheat oven to 375° F"},\n' +
    '{"category":"ActionsGroup", "isGroup":true, "key":10, "group":"0", "text":""},\n' +
    '{"category":"Action", "text":"Preheat", "key":-23, "group":"10"},\n' +
    '{"category":"Step", "isGroup":true, "key":1, "text":"In a bowl, blend: 1 cup margarine, 1.5 teaspoon vanilla, 1 teaspoon salt"},\n' +
    '{"category":"ActionsGroup", "isGroup":true, "key":11, "group":"1", "text":""},\n' +
    '{"category":"Action", "text":"Blend", "key":-27, "group":"11"},\n' +
    '{"category":"Step", "isGroup":true, "key":2, "text":"Gradually beat in 1 cup sugar and 2 cups sifted flour"},\n' +
    '{"category":"ActionsGroup", "isGroup":true, "key":12, "group":"2", "text":""},\n' +
    '{"category":"Action", "text":"Beat\\nGradually", "key":-32, "group":"12"},\n' +
    '{"category":"Step", "isGroup":true, "key":3, "text":"Mix in 6 oz (1 cup) Nestle\'s Semi-Sweet Chocolate Morsels"},\n' +
    '{"category":"ActionsGroup", "isGroup":true, "key":13, "group":"3", "text":""},\n' +
    '{"category":"Action", "text":"Mix", "key":-34, "group":"13"},\n' +
    '{"category":"Step", "isGroup":true, "key":-41, "text":"Chop 6 oz Baker\'s Chocolate Bar"},\n' +
    '{"category":"ActionsGroup", "isGroup":true, "key":20, "group":"-41", "text":""},\n' +
    '{"category":"Action", "text":"Chop", "key":-44, "group":"20"},\n' +
    '{"category":"Step", "isGroup":true, "key":-42, "text":"Mix in\\nchopped\\nchocolate"},\n' +
    '{"category":"ActionsGroup", "isGroup":true, "key":21, "group":"-42", "text":""},\n' +
    '{"category":"Action", "text":"Mix", "key":-45, "group":"21"},\n' +
    '{"category":"Step", "isGroup":true, "key":4, "text":"Press evenly into ungreased 15x10x1 pan"},\n' +
    '{"category":"ActionsGroup", "isGroup":true, "key":14, "group":"4", "text":""},\n' +
    '{"category":"Action", "text":"Press\\nevenly", "key":-36, "group":"14"},\n' +
    '{"category":"Step", "isGroup":true, "key":5, "text":"Finely chop 1/2 cup of your choice of nuts"},\n' +
    '{"category":"ActionsGroup", "isGroup":true, "key":15, "group":"5", "text":""},\n' +
    '{"category":"Action", "text":"Chop\\nFinely", "key":-29, "group":"15"},\n' +
    '{"category":"Step", "isGroup":true, "key":6, "text":"Sprinkle nuts on top"},\n' +
    '{"category":"ActionsGroup", "isGroup":true, "key":16, "group":"6", "text":""},\n' +
    '{"category":"Action", "text":"Sprinkle", "key":-37, "group":"16"},\n' +
    '{"category":"Step", "isGroup":true, "key":7, "text":"Bake for 25 minutes and let cool"},\n' +
    '{"category":"ActionsGroup", "isGroup":true, "key":17, "group":"7", "text":""},\n' +
    '{"category":"Action", "text":"Bake", "key":-38, "group":"17"},\n' +
    '{"category":"Step", "isGroup":true, "key":8, "text":"Cut into rectangular grid"},\n' +
    '{"category":"ActionsGroup", "isGroup":true, "key":18, "group":"8", "text":""},\n' +
    '{"category":"Action", "text":"Cut", "key":-39, "group":"18"},\n' +
    '{"category":"End", "key":-2},\n' +
    '{"category":"FinalResult", "text":"Hot Oven", "key":-3},\n' +
    '{"category":"Tool", "text":"Bowl", "key":-4, "group":"1"},\n' +
    '{"category":"FinalResult", "text":"Chopped nuts", "key":-14},\n' +
    '{"category":"FinalResult", "text":"Kookie Brittle Cookies", "key":-15},\n' +
    '{"category":"FinalResult", "text":"Baked Cookie Dough", "key":-16},\n' +
    '{"category":"FinalResult", "text":"Nut Covered Raw Cookie Dough", "key":-17},\n' +
    '{"category":"FinalResult", "text":"Cookie Dough in pan", "key":-18},\n' +
    '{"category":"FinalResult", "text":"Dough Mixed with Chocolate", "key":-19},\n' +
    '{"category":"FinalResult", "text":"Blended wet Ingredients", "key":-20},\n' +
    '{"category":"FinalResult", "text":"Raw Cookie Dough", "key":-21},\n' +
    '{"category":"Tool", "text":"Oven", "key":-22, "group":"0"},\n' +
    '{"category":"Item", "text":"Margarine", "key":-24, "group":"1"},\n' +
    '{"category":"Item", "text":"Vanilla", "key":-25, "group":"1"},\n' +
    '{"category":"Item", "text":"Salt", "key":-26, "group":"1"},\n' +
    '{"category":"Item", "text":"Nuts", "key":-28, "group":"5"},\n' +
    '{"category":"Item", "text":"Sugar", "key":-30, "group":"2"},\n' +
    '{"category":"Item", "text":"Sifted Flour", "key":-31, "group":"2"},\n' +
    '{"category":"Item", "text":"Semi-Sweet\\nChocolate\\nMorsels", "key":-33, "group":"3"},\n' +
    '{"category":"Tool", "text":"ungreased\\n15x10x1 pan", "key":-35, "group":"4"},\n' +
    '{"category":"Decision", "text":"Available\\nChocolate", "key":"pub://DecisionPoint/-40"},\n' +
    '{"category":"FinalResult", "text":"Chopped Chocolate", "key":-43},\n' +
    '{"category":"Item", "text":"Baker\'s\\nChocolate", "key":-46, "group":"-41"}\n' +
    '],\n' +
    '"linkDataArray": [\n' +
    '{"from":1, "to":-20},\n' +
    '{"from":2, "to":-21},\n' +
    '{"from":3, "to":-19},\n' +
    '{"from":4, "to":-18},\n' +
    '{"from":6, "to":-17},\n' +
    '{"from":7, "to":-16},\n' +
    '{"from":8, "to":-15},\n' +
    '{"from":-1, "to":0},\n' +
    '{"from":-1, "to":1},\n' +
    '{"from":-1, "to":5},\n' +
    '{"from":5, "to":-14},\n' +
    '{"from":0, "to":-3},\n' +
    '{"from":-3, "to":7},\n' +
    '{"from":-14, "to":6},\n' +
    '{"from":-15, "to":-2},\n' +
    '{"from":-16, "to":8},\n' +
    '{"from":-17, "to":7},\n' +
    '{"from":-18, "to":6},\n' +
    '{"from":-19, "to":4},\n' +
    '{"from":-20, "to":2},\n' +
    '{"from":-21, "to":"pub://DecisionPoint/-40"},\n' +
    '{"from":10, "to":-22, "category":"backLink"},\n' +
    '{"from":11, "to":-4, "category":"backLink"},\n' +
    '{"from":11, "to":-24, "category":"backLink"},\n' +
    '{"from":11, "to":-25, "category":"backLink"},\n' +
    '{"from":11, "to":-26, "category":"backLink"},\n' +
    '{"from":15, "to":-28, "category":"backLink"},\n' +
    '{"from":12, "to":-30, "category":"backLink"},\n' +
    '{"from":12, "to":-31, "category":"backLink"},\n' +
    '{"from":13, "to":-33, "category":"backLink"},\n' +
    '{"from":14, "to":-35, "category":"backLink"},\n' +
    '{"from":"pub://DecisionPoint/-40", "to":3, "text":"Chocolate Chips", "visible":true},\n' +
    '{"from":"pub://DecisionPoint/-40", "to":-41, "text":"Baker\'s Chocolate", "visible":true},\n' +
    '{"from":-41, "to":-43},\n' +
    '{"from":-43, "to":-42},\n' +
    '{"from":-42, "to":-19},\n' +
    '{"from":20, "to":-46, "category":"backLink"}\n' +
']}'
                }
            ]
        }
    ]
});