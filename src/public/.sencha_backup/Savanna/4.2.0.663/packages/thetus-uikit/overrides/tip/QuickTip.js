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