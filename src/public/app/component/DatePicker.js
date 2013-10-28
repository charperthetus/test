
/*
 * author: jlashley
 * date: Oct. 22 2013
 * summary: Custom Date Picker Component that extends Ext.panel.Panel
 *
 * Example of Usage
 *
 * var demo = Ext.create('Savanna.components.DatePicker', {          // Create a new instance of the date picker
 *     renderTo: Ext.getBody(),                     // Render it to the body or any desired location
 *     unixDate: Date.parse((new Date())) / 1000,   // *OPTIONAL CONFIG* Pass in a unix timestamp and it will display this as the default time on widget render
 *     jsDate: new Date()                           // *OPTIONAL CONFIG* Pass in a JavaScript Object timestamp and it will display this as the default time on widget render.  jsDate takes priority over unixDate.
 * });
 *
 * API
 *
 * getDay() -> This will return the day from the input field.
 *
 * getHour() -> This will return the hour from the input field.
 *
 * getMinute() -> This will return the minute from the input field.
 *
 * getMonth() -> This will return the month value from the input field.
 *
 * getMonthAbbr() -> This will return the month html text/abbr value from the input field.
 *
 * getYear() -> This will return the year from the input field.
 *
 * getJsDate() -> This will convert the date from the input fields and return it as a JavaScript Date/Timestamp Object.
 *
 * getDtgDate() -> This will convert the date from the input fields and return it as a DTG Timestamp as a String.
 *
 * getUnixDate() -> This will convert the date from the input fields and return it as a Unix Timestamp.
 *
 * isDateValid() -> This will return True or False depending if the user has given a valid date.
 *                  Current Validation checks:
 *                      - Are inputs empty
 *                      - Is date valid, day exist in month, mintues do not exceed hour, all basic clock/date checks.
 *
 * setDefaultDate() -> You can provide a date to set the input values to.  Formats include JavaScript Date/Timestamp Object or Unix Timestamp.
 *                     Examples: yourObj.setDefaultDate(new Date()) or yourObj.setDefaultDate(1359712980) , yourObj.setDefaultDate(Date.parse((new Date())) / 1000)
 *
 * Listeners 
 * 
 * focusLost
 * @param - cmp - This returns the component that fired the event.
 * Calling this will return the DateTime object and cmp will return the object that fired the event.
 * The example below shows grabbing the event then doing any processing required.
 * 
 * Example: 
 * yourDateTimeObj.on('focusLost', function(cmp) {
 *      if (this.isDateValid() === true){ return this.getJsDate(); }
 *      else { return null; }
 * }
 */

Ext.define('Savanna.component.DatePicker', {
    extend: 'Ext.panel.Panel',

    //Default Dimensions
    width: 400,
    height: 70,



    //Configs for passing
    unixDate: null,
    jsDate: null,


    /*
     * setDefaultDate
     * This function will take a date (unix or js timestamp) and check the type, look for valid conversion and then set it as the default date shown on render.
     * @param val - int || JavaScript Date
     * @return - no value is returned unless the parameter is not a valid unix or js timestamp then it will return null
     */
    setDefaultDate: function(val) {
        var me = this;

        /*
         * buildDefaultDate
         * This will put values into the date input fields.
         * @param m - this - scope of object
         * @param d - js timestamp object
         */
        var buildDefaultDate = function(m, d) {
            //This will lookup the input object and provide them with values.
            m.items.items[5].setValue(d.getDate());
            m.items.items[6].setValue(d.getHours());
            m.items.items[7].setValue(d.getMinutes());
            m.items.items[8].setValue(d.getMonth());
            m.items.items[9].setValue(d.getFullYear());
        };

        //This checks val for a function called getMonth, if this is true then a JavaScript Date is valid
        if (typeof val.getMonth === 'function') {
            buildDefaultDate(me, val); //Run the function passing the scope and timestamp object

        } else {
            var unixTest = new Date(val * 1000); //If the object is not a js timestamp then convert it to one because we are assuming it is a unix timestamp which we will validate next.

            //Check if the new Date object converted correctly into a js timestamp object.
            if (Object.prototype.toString.call(unixTest) === "[object Date]") {

                //Test what the timestamp returns when it calls the getTime function.  If it returns a valid time then we will run the values in the display function.
                if (isNaN(unixTest.getTime())) {
                    return null;
                } else {
                    buildDefaultDate(me, unixTest);
                    return true;
                }
            } else {
                return null;
            }
        }

    },

    /*
     * initComponent
     * This function will initilize the component.
     */
    initComponent: function() {
        var me = this;
        me.callParent(arguments);

        //If you passed in a jsDate Config on construction then we will parse that date and display it as the default date.
        //jsDate is the default Config so if you pass in a unixDate and jsDate it will ignore the unixDate.
        if (me.jsDate !== null) {
            me.setDefaultDate(me.jsDate);

        } else if (me.unixDate !== null) {
            //This converts the unix date to a js timestamp and then runs as normal setting the inputs with the values.
            me.setDefaultDate(new Date(me.unixDate * 1000));
        }
    },

    //Layout to fit the wireframes shown. This lays out how the label and inputs are shown.
    layout: {
        type: 'table',
        columns: 5,
        border: false,
        tdAttrs: {
            align: 'center',
            border: false
        }
    },

    //Defaults to fit the wireframes shown. This applies padding to all the content in the panel of the date picker.
    defaults: {
        bodyStyle: 'padding:10px 25px 10px 25px',
        border: false
    },

    //Items array which are the labels and the inputs.
    items: [{
        html: 'Day'
    }, {
        html: 'Hour'
    }, {
        html: 'Min.'
    }, {
        html: 'Month'
    }, {
        html: 'Year'
    }, {
        //Day Input Field
        xtype: 'textfield',
        width: 35,
        allowBlank: false, //Requires you to enter something, else invalid
        maxLength: 2, //Sets the max characters you can type in the box
        enforceMaxLength: true, //This forces the max length rule in all cases
        maskRe: /[0-9.]/, //This only allows you to input numbers
        listeners: {
            //Listner for when the object loses focus
            blur: function(){
                if ( this.getValue() !== "" && this.getValue() !== null ){
                    var n = parseInt(this.getValue()); //Gets the value
                    this.setValue((n < 10) ? ("0" + n) : n); //If the value is a single digit then add a leading zero
                }
                //When the field loses focus then fire this event.
                this.up().fireEvent('focusLost', this);
            }
        }
    }, {
        //Hour Input Field
        xtype: 'textfield',
        width: 35,
        allowBlank: false,
        maxLength: 2,
        enforceMaxLength: true,
        maskRe: /[0-9.]/,
        listeners: {
            blur: function(){
                if ( this.getValue() !== "" && this.getValue() !== null ){
                    var n = parseInt(this.getValue());
                    this.setValue((n < 10) ? ("0" + n) : n);
                }
                this.up().fireEvent('focusLost', this);
            }
        }
    }, {
        //Minute Input Field
        xtype: 'textfield',
        width: 35,
        allowBlank: false,
        maxLength: 2,
        enforceMaxLength: true,
        maskRe: /[0-9.]/,
        listeners: {
            blur: function(){
                if ( this.getValue() !== "" && this.getValue() !== null ){
                    var n = parseInt(this.getValue());
                    this.setValue((n < 10) ? ("0" + n) : n);
                }
                this.up().fireEvent('focusLost', this);
            }
        }
    }, {
        //Month ComboBox
        xtype: 'combobox',
        width: 65,
        //This is the store that holds the JavaScript month value as val and the wireframe abbr. text.
        store: Ext.create('Ext.data.Store', {
            fields: ['abbr', 'val'],
            data: [{
                "abbr": "JAN",
                "val": 0
            }, {
                "abbr": "FEB",
                "val": 1
            }, {
                "abbr": "MAR",
                "val": 2
            }, {
                "abbr": "APR",
                "val": 3
            }, {
                "abbr": "MAY",
                "val": 4
            }, {
                "abbr": "JUN",
                "val": 5
            }, {
                "abbr": "JUL",
                "val": 6
            }, {
                "abbr": "AUG",
                "val": 7
            }, {
                "abbr": "SEP",
                "val": 8
            }, {
                "abbr": "OCT",
                "val": 9
            }, {
                "abbr": "NOV",
                "val": 10

            }, {
                "abbr": "DEC",
                "val": 11

            }]
        }),
        queryMode: 'local', //Uses local store functionality and removes default remote on the input.
        displayField: 'abbr', //Sets the display field to use the abbr config from the store.
        valueField: 'val', //Sets the value field to use the val config from the store.
        scope: this,
        allowBlank: false,
        minLength: 3,
        maxLength: 3,
        enforceMaxLength: true,
        enableRegEx: true,
        enableKeyEvents: true,
        displayValue: null, //This is a custom config which sets the abbr that is currently selected.
        findInStore: function(){
            if ( this.getValue() !== "" && this.getValue() !== null ){
                this.setRawValue(this.getRawValue().toUpperCase());
                if ( this.store.find("abbr",this.getRawValue().toUpperCase()) === -1 ){
                    this.markInvalid('Month is Invalid!');
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
            },
            blur: function() {
                this.up().fireEvent('focusLost', this);
            }

        }
    }, {
        //Year Input Field
        xtype: 'numberfield', //Only allows numbers and gives you the stepper functionality
        width: 65,
        allowBlank: false,
        maxLength: 4,
        enforceMaxLength: true,
        maskRe: /[0-9.]/,
        listners: {
            blur: function() {
                this.up().fireEvent('focusLost', this);
            }
        }
    }],

    /*
     * getDay
     * @return - this returns the current day from the day input field
     */
    getDay: function() {
        return this.items.items[5].value;
    },

    /*
     * getHour
     * @return - this returns the current hour from the hour input field
     */
    getHour: function() {
        return this.items.items[6].value;
    },

    /*
     * getMinute
     * @return - this returns the current minute from the minute input field
     */
    getMinute: function() {
        return this.items.items[7].value;
    },

    /*
     * getMonth
     * @return - this returns the current month from the month input field
     */
    getMonth: function() {
        return this.items.items[8].value;
    },

    /*
     * getMonthAbbr
     * @return - this returns the abbr value/ html text shown from the month input field
     */
    getMonthAbbr: function() {
        return this.items.items[8].displayValue;
    },

    /*
     * getYear
     * @return - this returns the current year from the year input field
     */
    getYear: function() {
        return this.items.items[9].value;
    },

    /*
     * getUnixDate
     * @return - this returns the unix timestamp of the date from the input fields
     */
    getUnixDate: function() {
        return Date.parse(this.getJsDate()) / 1000;
    },

    /*
     * getDtgDate
     * @return - this returns the DTG ( 011612ZDEC12 / DDHHMMZFEB09 )  timestamp string of the date from the input fields
     */
    getDtgDate: function() {
        return this.getDay() + this.getHour() + this.getMinute() + "Z" + this.getMonthAbbr() + String(this.getYear()).slice(-2);
    },

    /*
     * getUnixDate
     * @return - this returns the JavaScript timestamp of the date from the input fields
     */
    getJsDate: function() {
        return new Date(this.getYear(), this.getMonth(), this.getDay(), this.getHour(), this.getMinute(), 0, 0);
    },

    /*
     * isDateValid
     * @return - Boolean value if the date input is valid,  Currently checks for:
     *         - empty inputs
     *         - if date is valid that has been entered
     */
    isDateValid: function() {
        var me = this;
        /*
         * validateMe
         * This function will run all the error checking functions and keep a count of all the errors and return the count.
         *
         * @param d - string - This is the day value
         * @param h - string - This is the hour value
         * @param m - string - This is the minute value
         * @param n - string - This is the month value
         * @param y - string - This is the year value
         *
         * @return - error - int - This is the total count of errors the validtor found.
         */
        var validateMe = function(d, h, m, n, y) {

            /*
             * isEmpty
             * This will check to see if the input has a value.
             *
             * @param - itm - string - This is the string value of an input field.
             * @return - int - This returns a 1 if an error is found or a 0.
             */
            var isEmpty = function(itm) {
                if (itm === "" || itm === undefined || itm === null) {
                    return 1;
                } else {
                    return 0;
                }
            };

            /*
             * checkHour
             * This will check to see if the input has a value.
             *
             * @param - t - int - This is the int value of an input field.
             * @return - int - This returns a 1 if an error is found or a 0.
             */
            var checkHour = function(t){
                if ( t > 24 ){
                    me.items.items[6].markInvalid('Hour is Invalid!');
                    return 1;
                } else {
                    return 0;
                }
            };

            /*
             * checkMinute
             * This will check to see if the input has a value.
             *
             * @param - t - int - This is the int value of an input field.
             * @return - int - This returns a 1 if an error is found or a 0.
             */
            var checkMinute = function(t){
                if ( t > 60 ){
                    me.items.items[7].markInvalid('Hour is Invalid!');
                    return 1;
                } else {
                    return 0;
                }
            };

            /*
             * checkDate
             * This function will check for a valid date.
             *
             * @param - str - string - This ia string that was created to hold the month-day-year and then valid it with regex.
             * @return - int - This returns a 1 if an error is found or a 0.
             */
            var checkDate = function(str) {
                var matches = str.match(/(\d{1,2})[- \/](\d{1,2})[- \/](\d{4})/);
                if (!matches) return 1;

                // convert pieces to numbers, make a date object out of it.
                var month = parseInt(matches[1], 10);
                var day = parseInt(matches[2], 10);
                var year = parseInt(matches[3], 10);
                var date = new Date(year, month - 1, day);
                if (!date || !date.getTime()) return 1;

                // make sure we did not have any illegal, month or day values that the date constructor, coerced into valid values.
                if (date.getMonth() + 1 != month || date.getFullYear() != year || date.getDate() != day) {
                    if ( date.getDate() != day ){
                        me.items.items[5].markInvalid('Day is Invalid!');
                    }
                    else if ( date.getMonth() + 1 != month ){
                        me.items.items[8].markInvalid('Month is Invalid!');
                    }
                    else if ( date.getFullYear() != year ){
                        me.items.items[9].markInvalid('Year is Invalid!');
                    }


                    return 1;
                }
                return 0;
            };

            //Error value to keep count of how many errors have been found.
            var error = 0;

            error += isEmpty(d);
            error += isEmpty(h);
            error += isEmpty(m);
            error += isEmpty(n);
            error += isEmpty(y);

            error += checkHour(h);
            error += checkMinute(m);

            //Create a string date out of the input values to use in the date is valid check.
            var combineDateTest = n + "-" + d + "-" + y;
            error += checkDate(combineDateTest);

            return error;
        };

        //Variables to hold all the date input field values.
        var d = this.getDay(),
            h = this.getHour(),
            m = this.getMinute(),
            n = this.getMonth(),
            y = this.getYear();

        //Run the validtion checker passing in all the inputs.
        e = validateMe(d, h, m, n, y);

        me.items.items[8].findInStore();

        //Checks the error count and if 0 errors then return true that the date is valid.
        if (e > 0) {
            return false;
        } else {
            return true;
        }
    }
});