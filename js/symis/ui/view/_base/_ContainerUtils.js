/**
 * Created by bona on 2015/4/14.
 */
define([
    "dojo/_base/declare",//declare
    "dojo/dom-geometry",//geom.getContentBox,geom.setMarginBox
    "dojo/_base/lang",  //mixin
    "dijit/layout/utils", //layoutUtils.marginBox2contentBox
    //"dijit/_Container",
    "dijit/Viewport"
], function (declare,
             geom,
             lang,
             layoutUtils,
             //container,
             Viewport
) {

    //module:
    // symis/ui/view/_base/_ContainerUtils

    var utils = declare(
        "symis.ui.view._base._ContainerUtils", null,
        {
            startup: function(){
                // summary:
                //		See `dijit/layout/_LayoutWidget.startup()` for description.
                //		Although ContentPane doesn't extend _LayoutWidget, it does implement
                //		the same API.

                if(this._started){
                    return;
                }

                var parent = this.getParent();
                this._childOfLayoutWidget = parent && parent.isLayoutContainer;

                this.inherited(arguments);

                if(!this._childOfLayoutWidget){
                    // Since my parent isn't a layout container, and my style *may be* width=height=100%
                    // or something similar (either set directly or via a CSS class),
                    // monitor when viewport size changes so that I can re-layout.
                    this.own(Viewport.on("resize", lang.hitch(this, "resize")));
                }
            },
            resize: function (changeSize,resultSize) {
                // Set margin box size, unless it wasn't specified, in which case use current size.
                if (changeSize) {
                    geom.setMarginBox(this.domNode, changeSize);
                }
                // Compute content box size of containerNode in case we [later] need to size our single child.
                var cn = this.containerNode;
                if (cn === this.domNode) {
                    var mb = resultSize||{};
                    lang.mixin(mb, changeSize || {}); // changeSize
                    if (!("h" in mb) || !("w" in mb)) {
                        mb = lang.mixin(geom.getMarginBox(cn), mb); // just use geom.setMarginBox() to fill in missing values
                    }
                    this._contentBox = layoutUtils.marginBox2contentBox(cn, mb);
                } else {
                    this._contentBox = geom.getContentBox(cn);
                }
                this._layoutChildren();
            },
            _layoutChildren:function(){
                // All my child widgets are independently sized (rather than matching my size),
                // but I still need to call resize() on each child to make it layout.
                var children = this.getChildren(),
                    widget,
                    i = 0;
                while(widget = children[i++]){
                    if(widget.resize){
                        widget.resize();
                    }
                }
            }
        }
    );

    return utils;
});
