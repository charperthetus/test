/*
 *	QuickTip Override
 *
 *	@author jlashley 9/19/2013
 *
 */

Ext.define('ThetusUikit.tip.QuickTip', {
    override: 'Ext.tip.QuickTip',

    /**
     * Overriding getTargetXY function from ToolTip.js ( ExtJS 4.2.1 )
     * Function is called in show and showAt function inside of ToolTip.js
     *
     * @getTargetXY
     * @this {QuickTip}
     * @return {Array} [x,y] The horizontal and vertical positioning of the QuickTip
     */
    beforeLayout: function() {
        this.callParent(arguments);
        if (Ext.isChrome){
            delete Ext.tip.Tip.prototype.minWidth;
        }
    },

    getTargetXY: function() {
        //Constant Values
        var constants = {
            'rlAnchorOffset': 12, //Right - Left Anchor Offset
            'tbAnchorOffset': 18, //Top - Bottom Anchor Offset
            'rlAnchorSizeAdjustmentXY': 8, //Right - Left ( XY Coord ) Adjust the whole tooltip to move the size of the anchor so the anchor is not sitting on top of the target
            'tbAnchorSizeAdjustmentX': 2, //Top - Bottom ( X Coord ) Adjust the whole tooltip to move the size of the anchor so the anchor is not sitting on top of the target
            'tAnchorSizeAdjustmentY': 12, //Top ( Y Coord ) Adjust the whole tooltip to move the size of the anchor so the anchor is not sitting on top of the target
            'bAnchorSizeAdjustmentY': 8, //Bottom ( Y Coord ) Adjust the whole tooltip to move the size of the anchor so the anchor is not sitting on top of the target
            'anchorRight': "right", //Right Anchor Tag Name     ( ExtJS 4.2.1 Default )
            'anchorLeft': "left", //Left Anchor Tag Name        ( ExtJS 4.2.1 Default )
            'anchorTop': "top", //Top Anchor Tag Name           ( ExtJS 4.2.1 Default )
            'anchorBottom': "bottom" //Bottom Anchor Tag Name   ( ExtJS 4.2.1 Default )
        };

        var me = this; //Store the this object which is the Quick Tip
        var target = me.activeTarget; //Get the target that triggered the Quick Tip so you can access the content of the QuickTip
        var header = me.header; //Get the head of the QuickTip

        me.suspendLayouts(); //Function stops the layout until the following code is completed

        if (target.title) {
            me.setTitle(target.title);  //If the target has a title then print it into the tooltip
            header.show();  //Then show the header that contains the title
        } else if (header) {
            header.hide();  //Else Hide the title ... the QuickTip will show the old header information if you do not hide it assuming anything previous had a title
        }
        me.update(target.text); //This updates the QuickTip text to show the targets content.

        me.setWidth(target.width); //This will update the width of the target with the default config

        me.resumeLayouts(true); //Layout will resume processing

        var t = me.targetXY; //Get the XY Coord of the QuickTip
        var args = Ext.Array.toArray(t); //Convert the Arguments of the function to any ExtJS 4.2.1 Array.

        var cursorX = args[0] - window.pageXOffset; //Get the X Argument subtracted by the window page off set to get the x position of the cursor
        var cursorY = args[1] - window.pageYOffset; //Get the Y Argument subtracted by the window page off set to get the x position of the cursor

        //Now that we have the mouse cursor with the correct offset applied we will locate the element the mouse is current on top of which is also
        //the element that triggered the QuickTip.  This returns the target html element so we know where the QuickTip was trigger in window scope.
        var targetHtmlElement = document.elementFromPoint(cursorX, cursorY);

        //A function to get the XY Coord of an html element adjusting the for the window offset (If document scrolling has taken place or not).

        /**
         * Get the Cumulative Offset of an HTML Element
         *
         * @getCumulativeOffset
         * @this {QuickTip}
         * @param {object} obj The HTML Element
         * @return {number} x The horizontal offset positioning of the HTML Element
         * @return {number} y The vertical offset positioning of the HTML Element
         */
        var getCumulativeOffset = function (obj) {
            var left, top;
            left = top = 0;
            if (obj.offsetParent) {
                do {
                    left += obj.offsetLeft;
                    top  += obj.offsetTop;
                } while (obj = obj.offsetParent);
            }
            return {
                x : left,
                y : top
            };
        };

        //Call the getCumulativeOffset function from above
        var cumulativeOffset = getCumulativeOffset(targetHtmlElement);

        //Get the offset height and width of the target HTML element
        var targetHtmlElementWidth = targetHtmlElement.offsetWidth;
        var targetHtmlElementHeight = targetHtmlElement.offsetHeight;

        //Convert the HTML Element into a ExtJS Component
        var extTargetCmp = Ext.get(targetHtmlElement['id']);

        //Set the default returned XY value to 0,0
        var rtn = [0,0];

        var meHeight = me.getBox()['height']; //Get the height of the QuickTip  using the ExtJS getBox function on the component
        var meWidth = me.getBox()['width'];  //Get the width of the QuickTip ...
        var extTargetCmpHeight = extTargetCmp.getBox()['height']; //Get the height of the target component ...
        var extTargetCmpWidth = extTargetCmp.getBox()['width']; //Get the width of the target component ...
        var extTargetCmpX = extTargetCmp.getBox()['x']; //Get the x coord of the target component ...
        var extTargetCmpY = extTargetCmp.getBox()['y']; //Get the y coord of the target component ...

        //Get the anchor element on the QuickTip and remove the anchor class from the QuickTip
        me.anchorEl.removeCls(me.anchorCls);

        //Check the positioning of the target element in correlation to the window screen
        if ( cursorX + meWidth > window.innerWidth ) {

            //If the QuickTip does not fit on top then bottom is assumed a fail also due to width issues so place the anchor on the right and align it to the left

            me.anchor = constants.anchorRight;
            me.anchorOffset = (meHeight/2) - constants.rlAnchorOffset;

            rtn = [extTargetCmpX - meWidth - constants.rlAnchorSizeAdjustmentXY,
                ( extTargetCmpY - meHeight/2 ) + constants.rlAnchorSizeAdjustmentXY];

        } else if ( cursorX < meWidth/2 ) {

            //If the QuickTip does not fit on top then bottom is assumed a fail also due to width issues so place the anchor on the left and align it to the right

            me.anchor = constants.anchorLeft;
            me.anchorOffset = (meHeight/2) - constants.rlAnchorOffset;

            rtn = [extTargetCmpX + extTargetCmpWidth + constants.rlAnchorSizeAdjustmentXY,
                ( extTargetCmpY - meHeight/2 ) + constants.rlAnchorSizeAdjustmentXY];

        } else if ( (meHeight + targetHtmlElementHeight) < cursorY ) {

            //Default case ... place the anchor on the bottom of the QuickTip and position it on top

            me.anchor = constants.anchorBottom;
            me.anchorOffset = (meWidth/2) - constants.tbAnchorOffset;

            rtn = [(cumulativeOffset.x + ((targetHtmlElementWidth/2)-(meWidth/2)) + constants.tbAnchorSizeAdjustmentX ),
                (cumulativeOffset.y - meHeight - constants.bAnchorSizeAdjustmentY )];

        } else {

            //This assumes the QuickTip's width is not an issue with the screen ... however no space is available above the element so it will position below it

            me.anchor = constants.anchorTop;
            me.anchorOffset = (meWidth/2) - constants.tbAnchorOffset;

            rtn = [(cumulativeOffset.x + ((targetHtmlElementWidth/2)-(meWidth/2)) + constants.tbAnchorSizeAdjustmentX ),
                (cumulativeOffset.y + extTargetCmpHeight + constants.tAnchorSizeAdjustmentY )];
        }

        //Now that the anchor config has been reset apply the correct class to the QuickTip so the anchor is the correct positioning
        me.anchorCls = Ext.baseCSSPrefix + 'tip-anchor-' + me.getAnchorPosition();
        me.anchorEl.addCls(me.anchorCls);

        //Returning an [x,y] array
        return rtn;
    }
});

/*
 *	@author jgriffith 9/17/2013
 *	@edits	astump	9/18/2013 - changed from 'colapsible' to 'closable' to take advantage
 *								of the already built UI
 *
*/

Ext.define('ThetusUikit.panel.Panel', {
	override: 'Ext.panel.Panel',
	
	initComponent: function() {
		var me = this;
		me.callParent(arguments);
		if (me.collapsible){
			me.addClsWithUI('closable');
		}
	}
});

/*
 *
 *  Panel Header Override. 
 *  Forces icons, tools, and glyphs to the left of the panel title.
 *
 *  based on a solution offered in the Sencha forums 
 *  http://www.sencha.com/forum/showthread.php?208036-Accordion-Header-Move-collapse-button-to-left-of-header-title
 *
 *  @author astump 8/20/2013
 *  @edits jgriffith 8/22/2013
 *  
*/
Ext.define('ThetusUikit.panel.Header', {
    override: 'Ext.panel.Header',
    initComponent: function() {
        var me = this;
        me.callParent(arguments);
        var toggleElemIndex = this.items.findIndex('type', /expand|collapse/g),
            toggleElem;
        if (toggleElemIndex > -1) {
            toggleElem = this.items.removeAt(toggleElemIndex);
            this.items.insert(0, toggleElem);
        }
    }
});

Ext.define('ThetusUikit.layout.component.Dock', {
    // override: 'ExtThemeNeptune.layout.component.Dock',
    override: 'Ext.layout.component.Dock',

    handleItemBorders: function() {
        return true;
    }
});

/*
 *
 *  Button (toolbar, arrow, regular) Overrides
 *
 *	As of 8/20/13 this file does nothing, however acts as a "bookmark"
 *	for when we do need to do some adjustments.
 *
 *	@author jgriffith
 */
Ext.define('ThetusUikit.button.Button', {
    override: 'Ext.button.Button'

    // Insert the override you want here!

});

Ext.define('ThetusUikit.toolbar.Separator', {
    override: 'Ext.toolbar.Separator',
  onRender: function(){
  		this.callParent(arguments);
  		var separator = Ext.ComponentQuery.query('pagingtoolbar > tbseparator');
        Ext.Array.each(separator, function(name){ name.hidden=true;});
  	}
});

/*
 *	@author eirby 8/29/2013
 *	@edits	astump 9/5/2013 - added this.callParent(arguments) to initComponent
 *
*/

Ext.define('ThetusUikit.form.field.Number', {
	override: 'Ext.form.field.Number',
	initComponent: function(){
		this.callParent(arguments);
	//Enables key event on comnpoent, these are disable by default.	
		enableKeyEvents=true;
		width=null;
	},
	onRender: function(){
		this.callParent(arguments);
		// Sets the scope of all function that follow
		var pagingtoolbar = this.findParentByType('pagingtoolbar');
		//Width set on render to be assed into keyup
		defaultWidth = this['width']; //Todo: figure out a better way to do this rather than a global scoped variable
		// Once the scope is set and is true the keyup listner is set
		if (pagingtoolbar) {
			var numberfields = pagingtoolbar.down('numberfield');

			if (numberfields['value'] > 0) {
				//numberfields is the item and keyup is onscreen event I'm listening for.
				numberfields.mon('keyup', this.monKeyUp, this);
			}
		}
	},

	//Keyup event listened for in line #17 
	onKeyUp: function(event, numberfields, options) {
		//Grab lentgth on input value
		var value = numberfields['value'].toString().length;
		if(value >= 3){
		this.setWidth((value-2)*7 + defaultWidth);
		}else{
			this.setWidth(defaultWidth);
		}
	}
});


/*
    Copied from Neptune 9/16/2013

This file is part of Ext JS 4.2

Copyright (c) 2011-2013 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial
Software License Agreement provided with the Software or, alternatively, in accordance with the
terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department
at http://www.sencha.com/contact.

Build date: 2013-03-11 22:33:40 (aed16176e68b5e8aa1433452b12805c0ad913836)
*/
Ext.define('ThemeDemoApp.picker.Month', {
    override:  'Ext.picker.Month',
    
    // Monthpicker contains logic that reduces the margins of the month items if it detects
    // that the text has wrapped.  This can happen in the classic theme  in certain
    // locales such as zh_TW.  In order to work around this, Month picker measures
    // the month items to see if the height is greater than "measureMaxHeight".
    // In neptune the height of the items is larger, so we must increase this value.
    // While the actual height of the month items in neptune is 24px, we will only 
    // determine that the text has wrapped if the height of the item exceeds 36px.
    // this allows theme developers some leeway to increase the month item size in
    // a neptune-derived theme.
    measureMaxHeight: 36
});

Ext.define('ThetusUikit.panel.Tool', {
	
	override: 'Ext.panel.Tool',
	onRender: function(){
        	this.callParent(arguments);
             var me = this['type'];
             if(me =='close'){
                this.setSize(16, 15);
                this.el.setStyle('left', '0');
             }
             if(me =='maximize'){
                this.setSize(20, 20);
             }
             if(me =='restore'){
                this.setSize(20, 20);
             }
        },
	renderTpl: [
        '<img id="{id}-toolEl" src="{blank}" class="{baseCls}-img {baseCls}-{type}' +
            '{childElCls}" role="presentation" data-wat="wat"/>'
    ]
});

/*
 *	Search Field Override
 *
 *	@author jlashley 9/26/2013
 *
 */

//TODO I willl add comments later after another task

Ext.define('ThetusUikit.ux.form.SearchField', {
    extend:  Ext.form.field.Trigger ,

    alias: 'widget.searchfield',

    trigger1Cls: Ext.baseCSSPrefix + 'form-clear-trigger',

    trigger2Cls: Ext.baseCSSPrefix + 'form-search-trigger',

    hasSearch : false,
    paramName : 'query',

    initComponent: function(){
        this.callParent(arguments);
        this.on("specialkey" , function(f, e){
            if(e.getKey() == e.ENTER){
                this.onTrigger2Click();
            }
            if(e.getKey() == e.ESC){
                Ext.getCmp(this.getEl()['id']).setValue('');
            }
        }, this);
    },

    checkChange: function(){
        var me = this;
        console.log(me);
        if ( me.triggerEl !== undefined  ){
            var str = Ext.getCmp(this.getEl()['id']).getValue();
            if (str.length > 0){
                me.triggerEl.item(0).setDisplayed('block');
            } else {
                me.triggerEl.item(0).setDisplayed('none');
            }
        }
    },

    afterRender: function(){
        this.callParent();
        var me = this;
        me.triggerEl.item(0).setDisplayed('none');
    },

    onTrigger1Click : function(event){
        var me = this;
        console.log(me);
        Ext.getCmp(this.getEl()['id']).setValue('');

        this.fireEvent("onclearclick", this, event);
    },

    onTrigger2Click : function(event){
        this.fireEvent("onsearchclick", this, event);
    }
});

