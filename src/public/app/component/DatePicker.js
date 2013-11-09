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
 * @param - cmp - This returns the datepicker itself.
 *  * The example below shows grabbing the event then doing any processing required.
 * 
 * Example: 
 * yourDateTimeObj.on('focusLost', function(cmp) {
 *      if (cmp.isDateValid() === true){ return cmp.getJsDate(); }
 *      else { return null; }
 * }
 */

Ext.define('Savanna.component.DatePicker', {
    extend: 'Ext.form.FieldContainer',

    // Defualt Configs
    layout: 'hbox',
    width: '100%',
    minwidth: 315,

    //Configs for passing
    unixDate: null,
    jsDate: null,
    border: false,


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
            m.down('#DatePicker-Day').setValue(d.getDate());
            m.down('#DatePicker-Hour').setValue(d.getHours());
            m.down('#DatePicker-Min').setValue(d.getMinutes());
            m.down('#DatePicker-Month').setValue(d.getMonth());
            m.down('#DatePicker-Year').setValue(d.getFullYear());
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

    //Defaults to fit the wireframes shown. This applies padding to all the content in the panel of the date picker.
    defaults: {
        allowBlank: true, //Requires you to enter something, else invalid
        maxLength: 2, //Sets the max characters you can type in the box
        enforceMaxLength: true, //This forces the max length rule in all cases
        columnWidth: 0.20,
        layout: 'vbox',
        flex: 1,
        padding: '0 3px'
    },



    defaultType: 'textfield',

    fieldDefaults: {
        labelAlign: 'top'
    },

    //Items array which are the labels and the inputs.
    items: [{
        //Day Input Field
        fieldLabel: 'Day',
        itemId: 'DatePicker-Day',
        maxWidth: 32,
        maskRe: /[0-9.]/, //This only allows you to input numbers
        listeners: {
            //Listner for when the object loses focus
            blur: function(){
                if ( this.getValue() !== "" && this.getValue() !== null ){
                    var n = parseInt(this.getValue()); //Gets the value
                    this.setValue((n < 10) ? ("0" + n) : n); //If the value is a single digit then add a leading zero
                }
                //When the field loses focus then fire this event.
                this.up().fireEvent('focusLost', this.up());
            }
        }
    }, {
        //Hour Input Field
        fieldLabel: 'Hour',
        itemId: 'DatePicker-Hour',
        maxWidth: 32,
        maskRe: /[0-9.]/,
        listeners: {
            blur: function(){
                if ( this.getValue() !== "" && this.getValue() !== null ){
                    var n = parseInt(this.getValue());
                    this.setValue((n < 10) ? ("0" + n) : n);
                }
                this.up().fireEvent('focusLost', this.up());
            }
        }
    }, {
        //Minute Input Field
        fieldLabel: 'Min',
        itemId: 'DatePicker-Min',
        maxWidth: 32,
        maskRe: /[0-9.]/,
        listeners: {
            blur: function(){
                if ( this.getValue() !== "" && this.getValue() !== null ){
                    var n = parseInt(this.getValue());
                    this.setValue((n < 10) ? ("0" + n) : n);
                }
                this.up().fireEvent('focusLost', this.up());
            }
        }
    }, {
        //Month ComboBox
        xtype: 'combobox',
        fieldLabel: 'Month',
        itemId: 'DatePicker-Month',
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
        minLength: 3,
        maxLength: 3,
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
                this.up().fireEvent('focusLost', this.up());
            }

        }
    }, {
        //Year Input Field
        xtype: 'numberfield', //Only allows numbers and gives you the stepper functionality
        fieldLabel: 'Year',
        itemId: 'DatePicker-Year',
        maxLength: 4,
        maskRe: /[0-9.]/,
        listeners: {
            blur: function() {
                this.up().fireEvent('focusLost', this.up());
            }
        }
    }],

    /*
     * getDay
     * @return - this returns the current day from the day input field
     */
    getDay: function() {
        return this.down('#DatePicker-Day').getValue();
    },

    /*
     * getHour
     * @return - this returns the current hour from the hour input field
     */
    getHour: function() {
        return this.down('#DatePicker-Hour').getValue();
    },

    /*
     * getMinute
     * @return - this returns the current minute from the minute input field
     */
    getMinute: function() {
        return this.down('#DatePicker-Min').getValue();
    },

    /*
     * getMonth
     * @return - this returns the current month from the month input field
     */
    getMonth: function() {
        return this.down('#DatePicker-Month').getValue();
    },

    /*
     * getMonthAbbr
     * @return - this returns the abbr value/ html text shown from the month input field
     */
    getMonthAbbr: function() {
        return this.down('#DatePicker-Month').displayValue;
    },

    /*
     * getYear
     * @return - this returns the current year from the year input field
     */
    getYear: function() {
        return this.down('#DatePicker-Year').getValue();
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
                    me.down('#DatePicker-Hour').markInvalid('Hour is Invalid!');
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
                    me.down('#DatePicker-Min').markInvalid('Minute is Invalid!');
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
                var date = new Date(year, month, day);
                if (!date || !date.getTime()) return 1;

                // make sure we did not have any illegal, month or day values that the date constructor, coerced into valid values.
                if (date.getMonth() != month || date.getFullYear() != year || date.getDate() != day) {
                    if ( date.getDate() != day ){
                        me.down('#DatePicker-Day').markInvalid('Day is Invalid!');
                    }
                    else if ( date.getMonth() != month ){
                        me.down('#DatePicker-Month').markInvalid('Month is Invalid!');
                    }
                    else if ( date.getFullYear() != year ){
                        me.down('#DatePicker-Year').markInvalid('Year is Invalid!');
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

        me.down('#DatePicker-Month').findInStore();

        //Checks the error count and if 0 errors then return true that the date is valid.
        return e <= 0;
    }
});