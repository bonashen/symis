/**
 * Created with JetBrains WebStorm.
 * User: bona
 * Date: 12-5-25
 * Time: 下午4:10
 * To change this template use File | Settings | File Templates.
 */
/**
 * The _WidgetsInTemplate mixin flowing the class:
 *  "dijit/_WidgetBase"
 *  "dijit/_TemplatedMixin"
 *  "dijit/_WidgetsInTemplateMixin"
 *
 *  don't declare property "widgetsInTemplate:true"
 *
 */
define(
   // "symis/ui/view/_base/_WidgetsInTemplate",
[
    "dojo/_base/declare",
    //"dijit/_WidgetBase",
    "dijit/_Widget",
    "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin",
    "dijit/_Contained"
], function(
    declare, widget, templatedMixin, widgetsInTemplateMixin
    ,_contained
    ) {

    // module:
    // symis/ui/view/_base/_WidgetsInTemplate

    var o = {};
    o = declare(
        "symis.ui.view._base._WidgetsInTemplate",
        [widget, templatedMixin, widgetsInTemplateMixin,_contained], {

        });
    return o;
});