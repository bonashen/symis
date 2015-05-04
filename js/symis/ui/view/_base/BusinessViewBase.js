/**
 * Created by bona on 2015/3/18.
 */
define(
    //"symis/ui/view/sys/UserManager",
    [
        "symis/ui/view/utils/CommonUtils",
        "dijit/registry",//byId
        //"dojo/_base/lang",
        "dojo/_base/declare",//declare,declare.safeMixin
        "./_ContainerUtils",
        "dijit/_Container",
        "symis/ui/view/_base/_WidgetsInTemplate"


    ], function (utils,
                 registry,
                 //lang,
                 declare,
                 cUtils,
                 container,
                 widget) {

// module:
// symis/ui/view/_base/BusinessViewBase
//该类混入symis/ui/view/utils/CommonUtils

        return declare("symis.ui.view._base.BusinessViewBase",
            [
                widget,
                container,
                cUtils
            ], {
                //	get our template
                // templateString: template,

                //	some properties
                baseClass: "BuainessViewBase",//样式表类

                //title:"title", //页面标签命名

                constructor: function () {
                    //混入utils方法
                    declare.safeMixin(this, utils);
                },


                closable: true,//when true then show close [X] button

                onClose: function () {
                    return true; //when true then can be closed.
                },

                postCreate: function () {
                    this.inherited(arguments);
                    this.initView();
                },

                //当Widget创建后被自动调用
                initView: function () {
                    console.debug(this.declaredClass, "initView");
                },
                buildRendering: function(){
                    this.inherited(arguments);

                    // Since we have no template we need to set this.containerNode ourselves, to make getChildren() work.
                    // For subclasses of BuainessViewBase that do have a template, does nothing.
                    if(!this.containerNode){
                        this.containerNode = this.domNode;
                    }
                }


            });
    });
