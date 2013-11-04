/*
 * Programmer: jlashley 
 * Date: Oct. 17. 2013
 * Description: Define Styler Class , put all configs/methods as closure inside of the constructor to maintain private functionality.
 */
Ext.define('Savanna.process.utils.Styler', {

    singleton: true,

    /*
     * constructor
     * Create the styler object.
     * 
     * API
     * - Define a Styler
     * In your ExtJS class create a config such as ... styler: Ext.create('Savanna.process.utils.Styler'),
     * styler then becomes a reference to the Styler.js utility class for handling palettes, properties, and styling JSONs.
     *
     * - Getting Colors
     * Say you have a shape and need to apply a color to it.  You can just call this.styler.darkText and it will grab the color from the palette assuming that identifier has been defined in the palette.
     * 
     * - Defining Shapes
     * Say you create a shape and now you need to apply the default style to it.  gmake(go.Shape, 'Rectangle', this.styler.rectangle().outline),
     * That will grab the outline default configs from the rectangle and return it as a JSON to apply to the Go Shape.
     *  
     *  - Overridding when Defining Shapes
     * You can override a JSON property by passing a JSON parameter with the rectangle call.  gmake(go.Shape, 'Rectangle', this.styler.rectangle( {"fillColor":"red"} ).outline),
     * You will need to make sure the function supports then property you want to override.  Use the rectangle class as an example to add / extend this concept to other JSON.
     *  
     * - Adding to a JSON
     * You can add properties to a JSON.  Before you call the actual function to define the shape you will need to call the addTo function if lets say you want to 
     * go into the linker JSON and in the linkpath then add isPanelMain = true.  styler.addTo('linker','linkpath', 'isPanelMain', true);
     *
     * - Removing from a JSON
     * You can remove properties from a JSON.  Before you call the actual function to define the shape you will need to call the removeFrom function if lets say you want to 
     * go into the linker JSON and in the linkpath then remove strokeWidth which would then fallback to GoJS default. styler.removeFrom('linker','linkpath', 'strokeWidth');
     *
     * - Chaining Commands
     * You can chain the add and remove commands when defining the shape.  Lets say you want to remove stroke from the rectangles json in the textblock.
     * this.styler.removeFrom('rectangle','textblock', 'stroke').rectangle().textblock ... maybe you feel like adding it back as red right after you removed it ...
     * this.styler.removeFrom('rectangle','textblock', 'stroke').addTo('rectangle','textblock', 'stroke', this.styler.red).rectangle().textblock
     *
     * - Adding more JSON/Shapes
     * If you want to add more JSON and shapes the following is required.  You create the JSON and a function that return/modify that JSON.    
     * You will then also be required to include it in the buildJSONListLinks function which will allow you to use the addTo and removeFrom functions.
     * Lastly you are required to then include it in the return list so you can access it else it will always be private to the styler class.
     */
    constructor: function () {
        /* 
         * @private
         * Define a palette of brushes and colors for the user to select from.  
         * Notes: Not Included -> Adding colors on runtime would require setter functions.
         */
        var palette = {
            "lightText": "whitesmoke",
            "darkText": "#454545",
            "lightgreen": "lightgreen",
            "blue": "blue",
            "yellow": "#EFFAB4",
            "red": "red",
            "white": "#F8F8F8",
            "aqua": "#dbf7fe",
            "gray": "#999999",
            "lightgray": "#f2f2f2",
            "fade": "#353535",
            "black": "#454545",
            "startColor": "#7cc19d",
            "mainColor": "#00A9C9",
            "endColor": "#DC3C00",
            "graygrad": {
                0: "rgb(150, 150, 150)",
                0.5: "rgb(86, 86, 86)",
                1: "rgb(86, 86, 86)"
            },
            "greengrad": {
                0: "rgb(150, 150, 150)",
                0.5: "rgb(86, 86, 86)",
                1: "rgb(86, 86, 86)"
            },
            "redgrad": {
                0: "rgb(150, 150, 150)",
                0.5: "rgb(86, 86, 86)",
                1: "rgb(86, 86, 86)"
            },
            "yellowgrad": {
                0: "rgb(150, 150, 150)",
                0.5: "rgb(86, 86, 86)",
                1: "rgb(86, 86, 86)"
            }
        };

        /* 
         * @private
         * Defines default properties.  These can be overridden via passing them as function parameter for the object.
         */
        var properties = {
            "font": "OpenSansRegular, OpenSansRegular, 'Helvetica Neue', Helvetica, Arial, sans-serif ",
            "fontSize": "10pt ",
            "fontSizeSmall": "9pt ",
            "fontSizeSmaller": "8pt ",
            "fontWeight": "bold "
        };

        /* 
         * @private
         * jsonDriller
         * Finds if a key exist inside a JSON.
         * @param p - JSON - Is JSON we will be looking for a key in
         * @param a - String - Is the key/path we will be looking for in the JSON
         */
        function jsonDriller(p, a) {
            //Use dot notation to parse a passed in JSON lookup
            a = a.split(".");
            for (var i in a) {
                var key = a[i];
                //Check for null or undefined on key lookup and return empty string.
                if ((p[key] === null) || (p[key] === undefined))
                    return '';
                //Else return the value of the key
                p = p[key];
            }
            return p;
        }

        /* 
         * @private
         * buildJSONListLinks
         * Defines default JSON for rectangle.  This can be overridden via using the addTo and removeFrom JSON modifier functions in the return statement.
         *
         * @param tag - String - This is a string lookup for the json object you are calling in the addTo, removeFrom JSON Manipulator functions in the return.
         *
         * !!! IMPORTANT !!!
         * Notes: If you include more JSON objects you are required to add them into the linker below.
         */
        function buildJSONListLinks(tag) {
            if (tag === 'linker') {
                return linker;
            } else if (tag === 'rectangle') {
                return rectangle;
            } else if (tag === 'circle') {
                return circle;
            } else if (tag === 'custom') {
                return custom;
            } else if (tag === 'start') {
                return start;
            } else if (tag === 'end') {
                return end;
            } else if (tag === 'comment') {
                return comment;
            } else if (tag === 'diamond') {
                return diamond;
            } else if (tag === 'processModel') {
                return processModel;
            } else if (tag === 'internalGroup') {
                return internalGroup;
            } else if (tag === 'paletteCircle') {
                return circlePalette;
            } else if (tag === 'paletteRectangle') {
                return rectanglePalette;
            } else if (tag === 'paletteDiamond') {
                return diamondPalette;
            } else if (tag === 'stepGadget') {
                return stepGadget;
            } else if (tag === 'decisionGadget') {
                return decisionGadget;
            } else if (tag === 'topPort') {
                return topPort;
            } else if (tag === 'adornments') {
                return adornments;
            } else {
                //Returns back in the log you are not passing a tag that exists.
                return null;
            }
        }

        /* 
         * @private
         * rectangle - JSON Object
         * Defines default JSON for rectangle.  This can be overridden via using the addTo and removeFrom JSON modifier functions in the return statement.
         */
        var rectangle = {
            "outline": {
                fill: 'white',
                strokeWidth: 1,
                stroke: 'black',
                width: 32,
                height: 32,
                portId: "", // now the Shape is the port, not the whole Node
                fromSpot: go.Spot.Right,
                toSpot: go.Spot.Left
            },
            "textblock": {
                font: properties.fontWeight + properties.fontSize + properties.font,
                stroke: palette.darkText,
                margin: 4,
                maxSize: new go.Size(160, NaN),
                wrap: go.TextBlock.WrapFit,
                editable: true,
                name: "TEXT",
                isMultiline: false

            }
        };

        /* 
         * @private
         * rectangleShape
         * Allows you to manipulate JSON for the shape and then returns the JSON you called to be used.
         * @param json - JSON - Accepted Lookup keys defined below. ( Optional Parameter )
         *      - fillColor
         *      - textStroke
         * @return JSON
         */
        var rectangleShape = function (json) {

            // Provide JSON as a parameter for functions when overridding JSON properties, if nothing is passed it will be undefined and considered an optional parameter.  
            if (json !== undefined) {

                //jsonDriller looks into the JSON to find the key you are passing.  If the key was in the passed JSON then it will override the JSON with your parameter.
                if (jsonDriller(json, "fillColor") !== '') {
                    rectangle['outline'].fill = json['fillColor'];
                }

                if (jsonDriller(json, "textStroke") !== '') {
                    rectangle['textblock'].stroke = json['textStroke'];
                }
            }

            return rectangle;
        };


        /* 
         * @private
         * rectanglePalette - JSON Object
         * Defines default JSON for rectangle in the palette.  This can be overridden via using the addTo and removeFrom JSON modifier functions in the return statement.
         */
        var rectanglePalette = {
            "outline": {
                width: 12,
                height: 16,
                fill: palette.mainColor,
                stroke: null
            },
            "textblock": {
                font: properties.fontWeight + properties.fontSizeSmaller + properties.font,
                stroke: palette.darkText,
                margin: 4,
                maxSize: new go.Size(160, NaN),
                wrap: go.TextBlock.WrapFit,
                editable: true,
                name: "TEXT"
            }
        };

        /* 
         * @private
         * rectanglePalette
         * Allows you to manipulate JSON for the shape and then returns the JSON you called to be used.
         * @return JSON
         */
        var paletteInternalRectangle = function () {
            return rectanglePalette;
        };

        /* 
         * @private
         * x - JSON Object
         * Defines default JSON for circle.  This can be overridden via using the addTo and removeFrom JSON modifier functions in the return statement.
         */
        var stepGadget = {
            "panel": {
                name: 'StepGadget',
                opacity: 0.0,
                click: null,
                alignment: new go.Spot(1, 0.5, -22, 0)
            },
            "circle": {
                figure: 'Circle',
                stroke: null,
                fill: '#3d8060',
                desiredSize: new go.Size(13, 13),
                name: 'circleme'
            },
            "plusLine": {
                figure: 'PlusLine',
                strokeWidth: 2,
                stroke: 'white',
                desiredSize: new go.Size(8, 8)
            }
        };

        /* 
         * @private
         * x
         * Allows you to manipulate JSON for the shape and then returns the JSON you called to be used.
         * @return JSON
         */
        var stepGadgetShape = function (json) {
            // Provide JSON as a parameter for functions when overridding JSON properties, if nothing is passed it will be undefined and considered an optional parameter.  
            if (json !== undefined) {

                if (jsonDriller(json, "click") !== '') {
                    //This will be adding the click handler to the JSON
                    stepGadget["panel"].click = json["click"];

                }
            }

            return stepGadget;
        };

        /* 
         * @private
         * x - JSON Object
         * Defines default JSON for circle.  This can be overridden via using the addTo and removeFrom JSON modifier functions in the return statement.
         */
        var decisionGadget = {
            "panel": {
                name: 'DecisionGadget',
                opacity: 0.0,
                click: null,
                alignment: new go.Spot(1, 0.5, -7, 0)
            },
            "diamond": {
                figure: 'Diamond',
                stroke: null,
                fill: '#f9aa41',
                desiredSize: new go.Size(14, 14)
            },
            "plusLine": {
                figure: 'PlusLine',
                strokeWidth: 2,
                stroke: 'white',
                desiredSize: new go.Size(8, 8)
            }
        };

        /* 
         * @private
         * x
         * Allows you to manipulate JSON for the shape and then returns the JSON you called to be used.
         * @return JSON
         */
        var decisionGadgetShape = function (json) {

            // Provide JSON as a parameter for functions when overridding JSON properties, if nothing is passed it will be undefined and considered an optional parameter.  
            if (json !== undefined) {

                if (jsonDriller(json, "click") !== '') {
                    //This will be adding the click handler to the JSON
                    decisionGadget["panel"].click = json["click"];

                }
            }

            return decisionGadget;
        };


        /* 
         * @private
         * x - JSON Object
         * Defines default JSON for circle.  This can be overridden via using the addTo and removeFrom JSON modifier functions in the return statement.
         */
        var topPort = {
            "shape": {
                alignment: go.Spot.Top,
                desiredSize: new go.Size(0, 0),
                fromSpot: go.Spot.Bottom,
                toSpot: go.Spot.Top,
                toLinkable: true,
                portId: "Top"
            }
        };

        /* 
         * @private
         * x
         * Allows you to manipulate JSON for the shape and then returns the JSON you called to be used.
         * @return JSON
         */
        var topPortShape = function () {
            return topPort;
        };

        /* 
         * @private
         * x - JSON Object
         * Defines default JSON for circle.  This can be overridden via using the addTo and removeFrom JSON modifier functions in the return statement.
         */
        var adornments = {
            "panel": {
                alignment: null, //alignmentSpot,
                alignmentFocus: go.Spot.Center,
                width: 72,
                height: 72
            },
            "HalfEllipse": {
                background: 'transparent',
                fill: null,
                stroke: null,
                angle: null, //gooAngle,
                width: 36,
                height: 72,
                position: null, //gooPoint,
                isActionable: true,
                mouseDragEnter: function (e, obj) {
                    obj.fill = '#ededed';
                },
                mouseDragLeave: function (e, obj) {
                    obj.fill = null;
                },
                mouseDrop: null //dropHandler
            },
            "circlePanel": {
                isActionable: true,
                position: new go.Point(24, 24),
                click: null, //clickHandler,
                actionDown: function (e, obj) {
                    obj.elt(0).fill = '#63d9f5'; //#63d9f5 //#99e7fa //#c7f4ff
                },
                actionUp: function (e, obj) {
                    obj.elt(0).fill = '#c7f4ff';
                },
                mouseEnter: function (e, obj) {
                    obj.elt(0).fill = '#99e7fa';
                },
                mouseLeave: function (e, obj) {
                    // should only change the hover color if we are moving outside, not if we are moving over the glyph
                    obj.elt(0).fill = '#c7f4ff';
                },
                mouseDragEnter: function (e, obj) {
                    obj.elt(0).fill = '#99e7fa ';
                },
                mouseDragLeave: function (e, obj) {
                    obj.elt(0).fill = '#c7f4ff ';
                },
                mouseDrop: null //dropHandler
            },
            "circle": {
                fill: '#c7f4ff',
                stroke: 'white',
                strokeWidth: 3,
                width: 30,
                height: 30,
                position: new go.Point(0, 0)
            },
            "mainIcon": {
                font: '10pt thetus-icons',
                stroke: '#3ca8c8',
                position: new go.Point(10, 10)
            },
            "addIcon": {
                font: '7pt SickFont',
                stroke: '#008bb9',
                position: new go.Point(18, 0)
            },
            "label": {
                font: '7pt  OpenSansRegular, OpenSansRegular, Helvetica Neue, Helvetica, Arial, sans-serif ',
                background: 'white',
                position: null //labelPoint 
            }

        };

        /* 
         * @private
         * x
         * Allows you to manipulate JSON for the shape and then returns the JSON you called to be used.
         * @return JSON
         */
        var adornmentsShape = function (json) {
            // Provide JSON as a parameter for functions when overridding JSON properties, if nothing is passed it will be undefined and considered an optional parameter.
            if (json !== undefined) {
                if (jsonDriller(json, "angle") !== '') {
                    adornments['HalfEllipse'].angle = json['angle'];
                }

                if (jsonDriller(json, "position") !== '') {
                    adornments['HalfEllipse'].position = json['position'];
                }

                if (jsonDriller(json, "mouseDrop") !== '') {
                    //This will be adding the click handler to the JSON
                    adornments["HalfEllipse"].mouseDrop = json["mouseDrop"];
                }

                if (jsonDriller(json, "alignment") !== '') {
                    //This will be adding the click handler to the JSON
                    adornments["panel"].alignment = json["alignment"];
                }

                if (jsonDriller(json, "click") !== '') {
                    //This will be adding the click handler to the JSON
                    adornments["circlePanel"].click = json["click"];
                }

                if (jsonDriller(json, "mouseDrop") !== '') {
                    //This will be adding the click handler to the JSON
                    adornments["circlePanel"].mouseDrop = json["mouseDrop"];
                }

                if (jsonDriller(json, "position") !== '') {
                    //This will be adding the click handler to the JSON
                    adornments["label"].position = json["position"];
                }
            }

            return adornments;
        };

        /* 
         * @private
         * circle - JSON Object
         * Defines default JSON for circle.  This can be overridden via using the addTo and removeFrom JSON modifier functions in the return statement.
         */
        var circle = {
            "outline": {
                width: 32,
                height: 32,
                fill: palette.mainColor,
                stroke: null
            },
            "textblock": {
                font: properties.fontSize + properties.font,
                stroke: palette.darkText,
                margin: 4,
                maxSize: new go.Size(160, NaN),
                wrap: go.TextBlock.WrapFit,
                editable: true,
                name: "TEXT"
            }
        };

        /* 
         * @private
         * circleShape
         * Allows you to manipulate JSON for the shape and then returns the JSON you called to be used.
         * @return JSON
         */
        var circleShape = function () {
            return circle;
        };

        /* 
         * @private
         * circlePalette - JSON Object
         * Defines default JSON for circle in the palette.  This can be overridden via using the addTo and removeFrom JSON modifier functions in the return statement.
         */
        var circlePalette = {
            "outline": {
                width: 16,
                height: 16,
                fill: palette.mainColor,
                stroke: null
            },
            "textblock": {
                font: properties.fontSizeSmaller + properties.font,
                stroke: palette.darkText,
                margin: 4,
                maxSize: new go.Size(160, NaN),
                wrap: go.TextBlock.WrapFit,
                editable: true,
                name: "TEXT"
            }
        };

        /* 
         * @private
         * circlePalette
         * Allows you to manipulate JSON for the shape and then returns the JSON you called to be used.
         * @return JSON
         */
        var paletteInternalCircle = function () {
            return circlePalette;
        };

        /* 
         * @private
         * custom - JSON Object
         * Defines default JSON for custom shape to demo SVG.  This can be overridden via using the addTo and removeFrom JSON modifier functions in the return statement.
         * Notes: Dummy JSON/Function pair delete if needed.
         */
        var custom = {
            "outline": {
                geometryString: "F M0 0 L80 0 B-90 90 80 20 20 20 L100 100 20 100 B90 90 20 80 20 20z",
                fill: palette.lightgreen
            }
        };

        /* 
         * @private
         * customShape
         * Allows you to manipulate JSON for the shape and then returns the JSON you called to be used.
         * @return JSON
         */
        var customShape = function () {
            return custom;
        };

        /* 
         * @private
         * start - JSON Object
         * Defines default JSON for start shape.  This can be overridden via using the addTo and removeFrom JSON modifier functions in the return statement.
         */
        var start = {
            "outline": {
                fill: palette.startColor,
                stroke: null,
                width: 48,
                height: 48,
                portId: "", // now the Shape is the port, not the whole Node
                fromSpot: go.Spot.Right,
                toSpot: go.Spot.Left,
                margin: new go.Margin(0, 7, 0, 0)
            },
            "textblock": {
                margin: 0,
                font: properties.fontSize + properties.font,
                stroke: palette.white
            },
            "selectionAdornment": {
                fill: null,
                stroke: null,
                strokeWidth: 0
            }
        };

        /* 
         * @private
         * startShape
         * Allows you to manipulate JSON for the shape and then returns the JSON you called to be used.
         * @return JSON
         */
        var startShape = function () {
            return start;
        };

        /* 
         * @private
         * end - JSON Object
         * Defines default JSON for end shape.  This can be overridden via using the addTo and removeFrom JSON modifier functions in the return statement.
         */
        var end = {
            "outline": {
                fill: palette.endColor,
                stroke: null,
                width: 48,
                height: 48
            },
            "textblock": {
                margin: 4,
                font: properties.fontSize + properties.font,
                stroke: palette.lightText
            }
        };

        /* 
         * @private
         * endShape
         * Allows you to manipulate JSON for the shape and then returns the JSON you called to be used.
         * @return JSON
         */
        var endShape = function () {
            return end;
        };

        /* 
         * @private
         * diamond - JSON Object
         * Defines default JSON for diamond shape.  This can be overridden via using the addTo and removeFrom JSON modifier functions in the return statement.
         */
        var diamond = {
            "outline": {
                fill: '#f9aa41',
                stroke: null,
                width: 42,
                height: 42,
                row: 0,
                column: 1,
                margin: 0,
                portId: "", // now the Shape is the port, not the whole Node
                fromSpot: go.Spot.Right,
                toSpot: go.Spot.Left
            },
            "xline": {
                fill: null,
                stroke: palette.black,
                width: 10,
                height: 10,
                row: 0,
                column: 1,
                margin: 0
            },
            "textblock": {
                font: properties.fontSize + properties.font,
                stroke: palette.darkText,
                margin: new go.Margin(6, 6, 6, 6),
                maxSize: new go.Size(150, NaN),
                wrap: go.TextBlock.WrapFit,
                editable: true,
                name: "TEXT",
                row: 0,
                column: 2
            }
        };

        /* 
         * @private
         * diamondShape
         * Allows you to manipulate JSON for the shape and then returns the JSON you called to be used.
         * @return JSON
         */
        var diamondShape = function () {
            return diamond;
        };


        /* 
         * @private
         * diamond - JSON Object
         * Defines default JSON for diamond shape.  This can be overridden via using the addTo and removeFrom JSON modifier functions in the return statement.
         */
        var mergeDiamond = {
            "outline": {
                fill: null,
                stroke: 'gray',
                strokeWidth: 1,
                width: 26,
                height: 26,
                row: 0,
                column: 1,
                margin: new go.Margin(0, 18, 0, 0),
                portId: "", // now the Shape is the port, not the whole Node
                fromSpot: go.Spot.Right,
                toSpot: go.Spot.Left
            },
            "xline": {
                fill: null,
                stroke: palette.black,
                width: 10,
                height: 10,
                row: 0,
                column: 1,
                margin: 0
            },
            "textblock": {
                font: properties.fontSize + properties.font,
                stroke: palette.darkText,

                maxSize: new go.Size(150, NaN),
                wrap: go.TextBlock.WrapFit,
                editable: true,
                name: "TEXT",
                row: 0,
                column: 2,
                margin: 0
            }
        };

        /* 
         * @private
         * diamondShape
         * Allows you to manipulate JSON for the shape and then returns the JSON you called to be used.
         * @return JSON
         */
        var mergeDiamondShape = function () {
            return mergeDiamond;
        };


        /* 
         * @private
         * diamondPalette - JSON Object
         * Defines default JSON for diamond in the palette.  This can be overridden via using the addTo and removeFrom JSON modifier functions in the return statement.
         */
        var diamondPalette = {
            "outline": {
                width: 16,
                height: 16,
                fill: palette.mainColor,
                stroke: null
            },
            "textblock": {
                font: properties.fontSizeSmaller + properties.font,
                stroke: palette.darkText,
                margin: 4,
                maxSize: new go.Size(160, NaN),
                wrap: go.TextBlock.WrapFit,
                editable: true,
                name: "TEXT"
            }
        };

        /* 
         * @private
         * diamondPalette
         * Allows you to manipulate JSON for the shape and then returns the JSON you called to be used.
         * @return JSON
         */
        var paletteInternalDiamond = function () {
            return diamondPalette;
        };

        /* 
         * @private
         * comment - JSON Object
         * Defines default JSON for linker shape that links two shapes.  This can be overridden via using the addTo and removeFrom JSON modifier functions in the return statement.
         */
        var comment = {
            "outline": {
                fill: palette.yellow,
                stroke: null
            },
            "textblock": {
                margin: 5,
                maxSize: new go.Size(200, NaN),
                wrap: go.TextBlock.WrapFit,
                textAlign: "center",
                editable: true,
                font: properties.fontSize + properties.font,
                stroke: palette.black
            }
        };

        /* 
         * @private
         * commentShape
         * Allows you to manipulate JSON for the shape and then returns the JSON you called to be used.
         * @return JSON
         */
        var commentShape = function () {
            return comment;
        };

        /* 
         * @private
         * processModel - JSON Object
         * Defines default JSON for process model.  This can be overridden via using the addTo and removeFrom JSON modifier functions in the return statement.
         */
        var processModel = {
            "roundedRectangle": {
                fill: '#FFFFFF',
                stroke: '#999999',
                margin: 0,
                strokeWidth: 1,
                portId: "", // now the Shape is the port, not the whole Node
                fromSpot: go.Spot.Right,
                toSpot: go.Spot.Left
            },
            "textblock": {
                margin: new go.Margin(0, 0, 0, 4),
                maxSize: new go.Size(200, NaN),
                wrap: go.TextBlock.WrapFit,
                textAlign: "center",
                editable: true,
                font: properties.fontWeight + properties.fontSize + properties.font,
                stroke: palette.black,
                name: "TEXT"
            },
            "selectionAdornment": {
                fill: null,
                stroke: '#63d9f5',
                strokeWidth: 3,
                margin: 2,
                isPanelMain: true
            },
            "panelVertical": {
                defaultAlignment: go.Spot.Center,
                padding: new go.Margin(5, 5, 5, 5)
            },
            "panelHorizontal": {
                defaultAlignment: go.Spot.Top,
                stretch: go.GraphObject.Horizontal,
                background: 'transparent'
            },
            "placeholder": {
                padding: new go.Margin(0, 10)
            },
            "panelPlaceholder": {
                desiredSize: new go.Size(10, 10)
            }
        };

        /* 
         * @private
         * processModelShape
         * Allows you to manipulate JSON for the shape and then returns the JSON you called to be used.
         * @return JSON
         */
        var processModelShape = function () {
            return processModel;
        };
        /* 
         * @private
         * internalGroup - JSON Object
         * Defines default JSON for internal group.  This can be overridden via using the addTo and removeFrom JSON modifier functions in the return statement.
         */
        var internalGroup = {
            "roundedRectangle": {
                fill: '#dbf7fe',
                stroke: null,
                minSize: new go.Size(110, 90)
            },
            "textblockTools": {
                angle: 270,
                alignment: go.Spot.Center,
                font: properties.fontWeight + properties.fontSizeSmall + properties.font,
                stroke: palette.blue,
                isUnderline: true,
                margin: 2,
                editable: false,
                click: null,
                mouseDragEnter: null,
                mouseDragLeave: null,
                mouseDrop: null
            },
            "textblockByproducts": {
                angle: 270,
                font: properties.fontWeight + properties.fontSizeSmall + properties.font,
                stroke: palette.blue,
                isUnderline: true,
                margin: 2,
                editable: false,
                click: null
            },
            "gridLayout": {
                wrappingWidth: 1,
                alignment: go.GridLayout.Position,
                cellSize: new go.Size(1, 1)
            },
            "placeholder": {
                padding: new go.Margin(16, 16),
                background: 'transparent',
                mouseDragEnter: function (e, obj) {
                    obj.background = 'orange';
                },
                mouseDragLeave: function (e, obj) {
                    obj.background = 'transparent';
                },
                mouseDrop: null
            }
        };

        /*
         * @private
         * altsGroup - JSON Object
         * Defines default JSON for internal group.  This can be overridden via using the addTo and removeFrom JSON modifier functions in the return statement.
         */
        var altsGroup = {
            "roundedRectangle": {
                fill: palette.white,
                stroke: palette.black
            },
            "textblock": {
                margin: new go.Margin(0, 0, 0, 4),
                maxSize: new go.Size(200, NaN),
                wrap: go.TextBlock.WrapFit,
                textAlign: "center",
                editable: true,
                font: properties.fontWeight + properties.fontSize + properties.font,
                stroke: palette.black,
                name: "TEXT"
            },
            "gridLayout": {
                wrappingWidth: 3,
                alignment: go.GridLayout.Position,
                cellSize: new go.Size(1, 1),
                spacing: new go.Size(4, 4)
            },
            "placeholder": {
                padding: new go.Margin(16, 16),
                background: 'transparent',
                mouseDragEnter: function (e, obj) {
                    obj.background = 'orange';
                },
                mouseDragLeave: function (e, obj) {
                    obj.background = 'transparent';
                },
                mouseDrop: null
            }
        };

        /*
         * @private
         * internalGroupShape
         * Allows you to manipulate JSON for the shape and then returns the JSON you called to be used.
         * @param json - JSON - Accepted Lookup keys defined below. ( Optional Parameter )
         *      - clickByproduct
         *      - mouseDragEnter
         *      - mouseDragLeave
         *      - mouseDrop
         *      - clickTools
         * @return JSON
         */
        var internalGroupShape = function (json) {

            // Provide JSON as a parameter for functions when overridding JSON properties, if nothing is passed it will be undefined and considered an optional parameter.  
            if (json !== undefined) {

                //jsonDriller looks into the JSON to find the key you are passing.  If the key was in the passed JSON then it will override the JSON with your parameter.                
                if (jsonDriller(json, "clickByproduct") !== '') {
                    //This will be adding the click handler to the JSON
                    internalGroup["textblockByproducts"].click = json["clickByproduct"];
                }
                if (jsonDriller(json, "mouseDragEnter") !== '') {
                    //This will be adding the click handler to the JSON
                    internalGroup["textblockTools"].mouseDragEnter = json["mouseDragEnter"];
                }
                if (jsonDriller(json, "mouseDragLeave") !== '') {
                    //This will be adding the click handler to the JSON
                    internalGroup["textblockTools"].mouseDragLeave = json["mouseDragLeave"];
                }
                if (jsonDriller(json, "mouseDrop") !== '') {
                    //This will be adding the click handler to the JSON
                    internalGroup["textblockTools"].mouseDrop = json["mouseDrop"];
                }
                if (jsonDriller(json, "clickTools") !== '') {
                    //This will be adding the click handler to the JSON
                    internalGroup["textblockTools"].click = json["clickTools"];
                }
                if (jsonDriller(json, "mouseDrop") !== '') {
                    //This will be adding the click handler to the JSON
                    internalGroup["placeholder"].mouseDrop = json["mouseDrop"];
                }
            }

            return internalGroup;
        };

        /*
         * @private
         * altsGroupShape
         * Allows you to manipulate JSON for the shape and then returns the JSON you called to be used.
         * @param json - JSON - Accepted Lookup keys defined below. ( Optional Parameter )
         *      - mouseDrop
         * @return JSON
         */
        var altsGroupShape = function (json) {

            // Provide JSON as a parameter for functions when overridding JSON properties, if nothing is passed it will be undefined and considered an optional parameter.
            if (json !== undefined) {

                //jsonDriller looks into the JSON to find the key you are passing.  If the key was in the passed JSON then it will override the JSON with your parameter.
                if (jsonDriller(json, "mouseDrop") !== '') {
                    //This will be adding the click handler to the JSON
                    altsGroup["placeholder"].mouseDrop = json["mouseDrop"];
                }
            }

            return altsGroup;
        };

        /*
         * @private
         * linker - JSON Object
         * Defines default JSON for linker shape that links two shapes.  This can be overridden via using the addTo and removeFrom JSON modifier functions in the return statement.
         */
        var linker = {
            "handler": {
                font: properties.fontWeight + properties.fontSizeSmall + properties.font,
                stroke: palette.blue,
                isUnderline: true,
                margin: 2,
                editable: false,
                click: null
            },
            "textblockProcess": {
                font: properties.fontWeight + properties.fontSizeSmall + properties.font,
                textAlign: 'center',
                stroke: palette.gray,
                margin: 2,
                editable: true
            },
            "arrowheadProcess": {
                toArrow: "circle",
                stroke: palette.gray,
                strokeWidth: 1,
                fill: palette.white
            },
            "shapeProcess": {
                fill: palette.white,
                stroke: null
            },
            "roundedRectangle": {
                fill: palette.white,
                stroke: null
            },
            "linkpathProcess": {
                stroke: palette.gray,
                strokeWidth: 1

            },
            "textblockTool": {
                font: properties.fontWeight + properties.fontSizeSmall + properties.font,
                textAlign: 'center',
                stroke: palette.gray,
                margin: 2,
                editable: true
            },
            "arrowheadTool": {
                toArrow: "none",
                fromArrow: "none",
                stroke: null,
                fill: null
            },
            "shapeTool": {
                fill: palette.gray,
                strokeWidth: 1
            },
            "linkpathTool": {
                stroke: palette.gray,
                strokeWidth: 1
            },
            "textblockInput": {
                font: properties.fontWeight + properties.fontSizeSmall + properties.font,
                textAlign: 'center',
                stroke: palette.gray,
                margin: 2,
                editable: true
            },
            "arrowheadInput": {
                toArrow: 'none',
                fromArrow: 'backward',
                stroke: null,
                fill: null
            },
            "shapeInput": {
                fill: palette.gray,
                strokeWidth: 1
            },
            "linkpathInput": {
                stroke: palette.gray,
                strokeWidth: 1
            },
            "textblockByProduct": {
                font: properties.fontWeight + properties.fontSizeSmall + properties.font,
                textAlign: 'center',
                stroke: palette.gray,
                margin: 2,
                editable: true
            },
            "arrowheadByProduct": {
                toArrow: 'none',
                stroke: null,
                fill: null
            },
            "shapeByProduct": {
                fill: palette.gray,
                strokeWidth: 1
            },
            "linkpathByProduct": {
                stroke: palette.gray,
                strokeWidth: 1
            }
        };


        /* 
         * @private
         * linkTemplate
         * Allows you to manipulate JSON for the shape and then returns the JSON you called to be used.
         * @param json - JSON - Accepted Lookup keys defined below. ( Optional Parameter )
         *      - click
         * @return JSON
         */
        var linkTemplate = function (json) {

            // Provide JSON as a parameter for functions when overridding JSON properties, if nothing is passed it will be undefined and considered an optional parameter.  
            if (json !== undefined) {

                //jsonDriller looks into the JSON to find the key you are passing.  If the key was in the passed JSON then it will override the JSON with your parameter.
                /* Overridding font-size example
                if ( jsonDriller(json, "font") !== '' ){
                    linker["textblock"].font = properties.fontWeight + json["font"] + properties.font;
                }
                */

                if (jsonDriller(json, "click") !== '') {
                    //This will be adding the click handler to the JSON
                    linker["handler"].click = json["click"];

                }
            }

            return linker;
        };

        return {
            /*
             * @Read-Only
             * Color Properties
             * These will return you the color from the palette you wish to use.
             */

            lightText: palette.lightText,
            darkText: palette.darkText,
            startColor: palette.startColor,
            mainColor: palette.mainColor,
            blue: palette.blue,
            gray: palette.gray,
            lightgray: palette.lightgray,
            black: palette.black,
            aqua: palette.aqua,
            yellow: palette.yellow,
            endColor: palette.endColor,
            graygrad: palette.graygrad,
            greengrad: palette.greengrad,
            yellowgrad: palette.yellowgrad,
            red: palette.red,
            lightgreen: palette.lightgreen,
            white: palette.white,

            /*
             * Shape Functions / Getters
             * Functions for all of the Shapes
             * @param - json - JSON - This is an optional parameter.  It can contain only items the function allows you to override else they will be ignored.
             * @return - JSON - This returns the JSON of the shape you are calling.
             */

            rectangle: function (json) {
                return rectangleShape(json);
            },
            circle: function () {
                return circleShape();
            },
            custom: function () {
                return customShape();
            },
            start: function () {
                return startShape();
            },
            end: function () {
                return endShape();
            },
            comment: function () {
                return commentShape();
            },
            linker: function (json) {
                return linkTemplate(json);
            },
            diamond: function () {
                return diamondShape();
            },
            merge: function () {
                return mergeDiamondShape();
            },
            processModel: function () {
                return processModelShape();
            },
            internalGroup: function (json) {
                return internalGroupShape(json);
            },
            altsGroup: function (json) {
                return altsGroupShape(json);
            },
            paletteCircle: function () {
                return paletteInternalCircle();
            },
            paletteRectangle: function () {
                return paletteInternalRectangle();
            },
            paletteDiamond: function () {
                return paletteInternalDiamond();
            },
            stepGadget: function (json) {
                return stepGadgetShape(json);
            },
            decisionGadget: function (json) {
                return decisionGadgetShape(json);
            },
            topPort: function () {
                return topPortShape();
            },
            adornments: function (json) {
                return adornmentsShape(json);
            },

            /*
             * JSON Manipulator Functions
             */

            /* 
             * addTo - JSON Object
             * Defines default JSON for rectangle.  This can be overridden via using the addTo and removeFrom JSON modifier functions in the return statement.
             * Example: styler.addTo('linker','linkpath', 'isPanelMain', true);
             * The example will add isPanelMain with the value of true to the JSON path of linker.linkpath
             *
             * @param jsonObj - JSON - This is the JSON you want to add an item to.
             * @param idx - String - This is the index of the JSON you are adding an item to.
             * @param prop - String - This is the item you are adding to the JSON.
             * @param val - * - This is the value you want to give the item you are adding to the JSON.
             *
             * @return this - Allows you to chain the addTo with the lookup
             */
            addTo: function (jsonObj, idx, prop, val) {
                buildJSONListLinks(jsonObj)[idx][prop] = val;
                return this;
            },

            /* 
             * removeFrom - JSON Object
             * Defines default JSON for rectangle.  This can be overridden via using the addTo and removeFrom JSON modifier functions in the return statement.
             * Example: styler.removeFrom('linker','linkpath', 'strokeWidth');
             * The example will remove strokeWidth from JSON path of linker.linkpath.strokeWidth
             *
             * @param jsonObj - JSON - This is the JSON you want to add an item to.
             * @param idx - String - This is the index of the JSON you are adding an item to.
             * @param prop - String - This is the item you are adding to the JSON.
             *
             * @return this - Allows you to chain the removeFrom with the lookup
             */
            removeFrom: function (jsonObj, idx, prop) {
                delete buildJSONListLinks(jsonObj)[idx][prop];
                return this;
            }

        };
    }

});