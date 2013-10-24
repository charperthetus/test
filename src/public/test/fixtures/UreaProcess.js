/**
 * Created with IntelliJ IDEA.
 * User: bcannon
 * Date: 10/21/13
 * Time: 12:12 PM
 * To change this template use File | Settings | File Templates.
 */
var ThetusTestHelpers;

(function (ThetusHelpers) {
    'use strict';

    var testUreaProcessResponse = {
        "class": "go.GraphLinksModel",
        "nodeDataArray":[
            {
                "category":"Start",
                "key":"x00/Start"
            },
            {
                "category":"DecisionPoint",
                "key":"x10/DecisionPoint",
                "text":"Use UAN or Urea Fertilizer"
            },
            {
                "category":"ProcessModel",
                "key":"x11/ProcessModel",
                "text":"Mix UAN with a Strong Acid",
                "isGroup":"true"
            },
            {
                "category":"InternalGroup",
                "key":"x51/InternalGroup",
                "group":"x11/ProcessModel",
                "isGroup":"true"
            },
            {
                "category":"ProcessAction",
                "key":"x12/ProcessAction",
                "text":"Mix",
                "group":"x51/InternalGroup"
            },
            {
                "category":"ProcessItem",
                "key":"x14/ProcessItem",
                "text":"Urea Ammonium Nitrate",
                "group":"x11/ProcessModel"
            },
            {
                "category":"ProcessItem",
                "key":"x13/ProcessItem",
                "text":"Strong Acid",
                "group":"x11/ProcessModel"
            },
            {
                "category":"ProcessItem",
                "text":"Urea Nitrate",
                "key":"x43/ProcessItem"
            },
            {
                "category":"ProcessModel",
                "key":"x02/ProcessModel",
                "text":"Dissolve Urea in Water",
                "isGroup":"true"
            },
            {
                "category":"InternalGroup",
                "key":"x52/InternalGroup",
                "group":"x02/ProcessModel",
                "isGroup":"true"
            },
            {
                "category":"ProcessAction",
                "key":"x01/ProcessAction",
                "text":"Dissolve",
                "group":"x52/InternalGroup"
            },
            {
                "category":"ProcessItem",
                "key":"x03/ProcessItem",
                "text":"Heat Source",
                "group":"x02/ProcessModel"
            },
            {
                "category":"ProcessItem",
                "key":"x04/ProcessItem",
                "text":"Water",
                "group":"x02/ProcessModel"
            },
            {
                "category":"ProcessItem",
                "key":"x05/ProcessItem",
                "text":"Urea Fertilizer",
                "group":"x02/ProcessModel"
            },
            {
                "category":"ProcessItem",
                "key":"x06/ProcessItem",
                "text":"Solution"
            },
            {
                "category":"DecisionPoint",
                "key":"x07/DecisionPoint",
                "text":"Is NitricAcid available?"
            },
            {
                "category":"ProcessModel",
                "key":"x15/ProcessModel",
                "text":"Mix in Nitric Acid",
                "isGroup":"true"
            },
            {
                "category":"InternalGroup",
                "key":"x55/InternalGroup",
                "group":"x15/ProcessModel",
                "isGroup":"true"
            },
            {
                "category":"ProcessAction",
                "key":"x08/ProcessAction",
                "text":"Mix",
                "group":"x55/InternalGroup"
            },
            {
                "category":"ProcessItem",
                "key":"x16/ProcessItem",
                "text":"Nitric Acid",
                "group":"x15/ProcessModel"
            },
            {
                "category":"ProcessItem",
                "key":"x17/ProcessItem",
                "text":"Stirrer Rod",
                "group":"x15/ProcessModel"
            },
            {
                "category":"ProcessItem",
                "key":"x44/ProcessItem",
                "text":"Urea Nitrate"
            },
            {
                "category":"ProcessModel",
                "key":"x18/ProcessModel",
                "text":"Dissolve Nitrate Salt",
                "isGroup":"true"
            },
            {
                "category":"InternalGroup",
                "key":"x58/InternalGroup",
                "group":"x18/ProcessModel",
                "isGroup":"true"
            },
            {
                "category":"ProcessAction",
                "key":"x19/ProcessAction",
                "text":"Dissolve",
                "group":"x58/InternalGroup"
            },
            {
                "category":"ProcessItem",
                "key":"x20/ProcessItem",
                "text":"Mixing Container",
                "group":"x18/ProcessModel"
            },
            {
                "category":"ProcessItem",
                "key":"x21/ProcessItem",
                "text":"Water",
                "group":"x18/ProcessModel"
            },
            {
                "category":"ProcessItem",
                "key":"x22/ProcessItem",
                "text":"Nitrate Salt",
                "group":"x18/ProcessModel"
            },
            {
                "category":"ProcessItem",
                "key":"x23/ProcessItem",
                "text":"Nitrate Salt"
            },
            {
                "category":"ProcessModel",
                "key":"x24/ProcessModel",
                "text":"Mix Urea, Nitrate Salt, and Acid",
                "isGroup":"true"
            },
            {
                "category":"InternalGroup",
                "key":"x54/InternalGroup",
                "group":"x24/ProcessModel",
                "isGroup":"true"
            },
            {
                "category":"ProcessAction",
                "key":"x09/ProcessAction",
                "text":"Mix",
                "group":"x54/InternalGroup"
            },
            {
                "category":"ProcessItem",
                "key":"x25/ProcessItem",
                "text":"Strong Acid",
                "group":"x24/ProcessModel"
            },
            {
                "category":"ProcessItem",
                "key":"x26/ProcessItem",
                "text":"Stirrer Rod",
                "group":"x24/ProcessModel"
            },
            {
                "category":"ProcessItem",
                "key":"x27/ProcessItem",
                "text":"Urea Nitrate"
            },
            {
                "category":"ProcessItem",
                "key":"x28/ProcessItem",
                "text":"Urea Nitrate"
            },
            {
                "category":"ProcessModel",
                "key":"x29/ProcessModel",
                "text":"Filter out urea Nitrate Precipitate",
                "isGroup":"true"
            },
            {
                "category":"InternalGroup",
                "key":"x59/InternalGroup",
                "group":"x29/ProcessModel",
                "isGroup":"true"
            },
            {
                "category":"ProcessAction",
                "key":"x30/ProcessAction",
                "text":"Filter",
                "group":"x59/InternalGroup"
            },
            {
                "category":"ProcessItem",
                "key":"x31/ProcessItem",
                "text":"Filter",
                "group":"x29/ProcessModel"
            },
            {
                "category":"ProcessItem",
                "key":"x32/ProcessItem",
                "text":"Filtrate",
                "group":"x29/ProcessModel"
            },
            {
                "category":"ProcessItem",
                "key":"x33/ProcessItem",
                "text":"Urea Nitrate"
            },
            {
                "category":"DecisionPoint",
                "key":"x34/DecisionPoint",
                "text":"Dry Indoors or Out"
            },
            {
                "category":"ProcessModel",
                "key":"x35/ProcessModel",
                "text":"Dry Outdoors",
                "isGroup":"true"
            },
            {
                "category":"InternalGroup",
                "key":"x65/InternalGroup",
                "group":"x35/ProcessModel",
                "isGroup":"true"
            },
            {
                "category":"ProcessAction",
                "key":"x36/ProcessAction",
                "text":"Dry",
                "group":"x65/InternalGroup"
            },
            {
                "category":"ProcessItem",
                "key":"x37/ProcessItem",
                "text":"Drying Surface",
                "group":"x35/ProcessModel"
            },
            {
                "category":"ProcessModel",
                "key":"x38/ProcessModel",
                "text":"Dry Indoors",
                "isGroup":"true"
            },
            {
                "category":"InternalGroup",
                "key":"x68/InternalGroup",
                "group":"x38/ProcessModel",
                "isGroup":"true"
            },
            {
                "category":"ProcessAction",
                "key":"x39/ProcessAction",
                "text":"Dry",
                "group":"x68/InternalGroup"
            },
            {
                "category":"ProcessItem",
                "key":"x40/ProcessItem",
                "text":"Drying Source",
                "group":"x38/ProcessModel"
            },
            {
                "category":"ProcessItem",
                "key":"x41/ProcessItem",
                "text":"Urea Nitrate"
            },
            {
                "category":"ProcessItem",
                "key":"x42/ProcessItem",
                "text":"Urea Nitrate"
            },
            {
                "category":"ProcessItem",
                "key":"x45/ProcessItem",
                "text":"Urea Nitrate"
            },
            {
                "category":"End",
                "key":"x99/End"
            }

        ],
        "linkDataArray":[
            {
                "from":"x00/Start",
                "to":"x10/DecisionPoint",
                "category":"ProcessLink"
            },
            {
                "from":"x10/DecisionPoint",
                "to":"x11/ProcessModel",
                "category":"ProcessLink",
                "text":"Use UAN",
                "visible":true
            },
            {
                "from":"x51/InternalGroup",
                "to":"x14/ProcessItem",
                "category":"InputLink"
            },
            {
                "from":"x51/InternalGroup",
                "to":"x13/ProcessItem",
                "category":"InputLink"
            },
            {
                "from":"x11/ProcessModel",
                "to":"x43/ProcessItem",
                "category":"ProcessLink"
            },
            {
                "from":"x52/InternalGroup",
                "to":"x03/ProcessItem",
                "category":"ToolLink"
            },
            {
                "from":"x52/InternalGroup",
                "to":"x04/ProcessItem",
                "category":"InputLink"
            },
            {
                "from":"x52/InternalGroup",
                "to":"x05/ProcessItem",
                "category":"InputLink"
            },
            {
                "from":"x02/ProcessModel",
                "to":"x06/ProcessItem",
                "category":"ProcessLink"
            },
            {
                "from":"x06/ProcessItem",
                "to":"x07/DecisionPoint",
                "category":"ProcessLink"
            },
            {
                "from":"x07/DecisionPoint",
                "to":"x15/ProcessModel",
                "category":"ProcessLink",
                "text":"Nitric Acid is Available.",
                "visible":true
            },
            {
                "from":"x10/DecisionPoint",
                "to":"x02/ProcessModel",
                "category":"ProcessLink",
                "text":"Use Urea Fertilizer",
                "visible":true
            },
            {
                "from":"x55/InternalGroup",
                "to":"x16/ProcessItem",
                "category":"InputLink"
            },
            {
                "from":"x55/InternalGroup",
                "to":"x17/ProcessItem",
                "category":"ToolLink"
            },
            {
                "from":"x15/ProcessModel",
                "to":"x44/ProcessItem",
                "category":"ProcessLink"
            },
            {
                "from":"x58/InternalGroup",
                "to":"x20/ProcessItem",
                "category":"ToolLink"
            },
            {
                "from":"x58/InternalGroup",
                "to":"x21/ProcessItem",
                "category":"InputLink"
            },
            {
                "from":"x58/InternalGroup",
                "to":"x22/ProcessItem",
                "category":"InputLink"
            },
            {
                "from":"x18/ProcessModel",
                "to":"x23/ProcessItem",
                "category":"ProcessLink"
            },
            {
                "from":"x07/DecisionPoint",
                "to":"x18/ProcessModel",
                "category":"ProcessLink",
                "text":"Nitric Acid is NOT Available.",
                "visible":true
            },
            {
                "from":"x54/InternalGroup",
                "to":"x25/ProcessItem",
                "category":"InputLink"
            },
            {
                "from":"x54/InternalGroup",
                "to":"x26/ProcessItem",
                "category":"ToolLink"
            },
            {
                "from":"x23/ProcessItem",
                "to":"x24/ProcessModel",
                "category":"ProcessLink"
            },
            {
                "from":"x43/ProcessItem",
                "to":"x28/ProcessItem",
                "category":"ProcessLink"
            },
            {
                "from":"x44/ProcessItem",
                "to":"x28/ProcessItem",
                "category":"ProcessLink"
            },
            {
                "from":"x24/ProcessModel",
                "to":"x27/ProcessItem",
                "category":"ProcessLink"
            },
            {
                "from":"x28/ProcessItem",
                "to":"x29/ProcessModel",
                "category":"ProcessLink"
            },
            {
                "from":"x59/InternalGroup",
                "to":"x31/ProcessItem",
                "category":"ToolLink"
            },
            {
                "from":"x59/InternalGroup",
                "to":"x32/ProcessItem",
                "category":"ByproductLink"
            },
            {
                "from":"x29/ProcessModel",
                "to":"x33/ProcessItem",
                "category":"ProcessLink"
            },
            {
                "from":"x33/ProcessItem",
                "to":"x34/DecisionPoint",
                "category":"ProcessLink"
            },
            {
                "from":"x65/InternalGroup",
                "to":"x37/ProcessItem",
                "category":"ToolLink"
            },
            {
                "from":"x34/DecisionPoint",
                "to":"x35/ProcessModel",
                "category":"ProcessLink",
                "text":"Outdoors",
                "visible":true
            },
            {
                "from":"x68/InternalGroup",
                "to":"x40/ProcessItem",
                "category":"ToolLink"
            },
            {
                "from":"x34/DecisionPoint",
                "to":"x38/ProcessModel",
                "category":"ProcessLink",
                "text":"Indoors",
                "visible":true
            },
            {
                "from":"x38/ProcessModel",
                "to":"x41/ProcessItem",
                "category":"ProcessLink"
            },
            {
                "from":"x35/ProcessModel",
                "to":"x42/ProcessItem",
                "category":"ProcessLink"
            },
            {
                "from":"x41/ProcessItem",
                "to":"x45/ProcessItem",
                "category":"ProcessLink"
            },
            {
                "from":"x42/ProcessItem",
                "to":"x45/ProcessItem",
                "category":"ProcessLink"
            },
            {
                "from":"x45/ProcessItem",
                "to":"x99/End",
                "category":"ProcessLink"
            },
            {
                "from":"x27/ProcessItem",
                "to":"x28/ProcessItem",
                "category":"ProcessLink"
            }
        ]
    };

    var noUreaProcessResponse = [];

    ThetusHelpers.Fixtures = ThetusHelpers.Fixtures || {};
    ThetusHelpers.Fixtures.UreaProcess = ThetusHelpers.Fixtures.UreaProcess || {};

    ThetusHelpers.Fixtures.UreaProcess.json = testUreaProcessResponse;
    ThetusHelpers.Fixtures.UreaProcess.noUreaProcessResponse = noUreaProcessResponse;

})(ThetusTestHelpers || (ThetusTestHelpers = {}));