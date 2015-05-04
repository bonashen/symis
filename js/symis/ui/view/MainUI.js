/**
 * Created by bona on 2014/9/16.
 */
define(
    //"symis/ui/view/MainUI",
    [
        "dojo/_base/declare",   //declare
        "symis/ui/view/utils/MessageBox",//msgBox.tooltip
        "thirty/fromq",  //fromq
        "symis/ui/view/_base/_WidgetsInTemplate",
        "dijit/layout/ContentPane",
        "dijit/layout/BorderContainer",
        "dijit/layout/TabContainer",
        "dojo/text!./templates/MainUI.html",
        "dijit/form/TextBox",
        "dojo/data/ItemFileReadStore",
        "dijit/tree/TreeStoreModel",
        "dijit/Tree",
        "dojo/dom-construct",
        "dojo/on",
        "dojo/topic",
        "dojo/aspect",
        "dijit/_Container",
        "dijit/form/Button"

    ], function (declare,
                 msgBox,
                 fromq,
                 _WidgetsInTemplate,
                 ContentPane,
                 BorderContainer,
                 TabContainer,
                 template,
                 textbox, dataStore, storeModel, Tree, domConstruct, on, topic, aspect, container) {

// module:
// symis/ui/view/MainUI

        var topicName = "/mainui/menu/click", closeChildTopicName = "/mainui/workspace/closeChild";

        return declare("symis.ui.view.MainUI",
            [_WidgetsInTemplate, container], {
                //	get our template
                templateString: template,

                //	some properties
                baseClass: "MainUIBase",

                menuStore: null,

                // Create the model
                myModel: null,

                menuUrl: null,

                constructor: function () {
                    this.inherited(arguments);
                    //console.log(arguments);
                    this.menuUrl = arguments[0].menuUrl;
                    //console.log(this.menuUrl);

                    this.menuStore = new dataStore({
                        url: this.menuUrl
                    });

                    // Create the model
                    this.myModel = new storeModel({
                        store: this.menuStore,
                        query: {name: '*'}
                    });
                },


                buildRendering: function () {
                    //this.myModel.store = this.menuStore;

                    //console.log(this.menuStore);
                    //console.log(this.myModel);

                    this.inherited(arguments);
                    /*
                     this.tree = new Tree({
                     model: this.myModel,
                     region:"center"
                     });
                     domConstruct.place(this.tree.domNode,this.myTree,"replace");

                     console.log(this.myTree);
                     */
                },

                postCreate: function () {
                    var _this = this;

                    _this.inherited(arguments);

                    this.initCommand();

                    aspect.after(_this.workspacePanel, "closeChild", function (page) {
                        //当workspacePanel.closeChild被调用后

                        //console.debug(page);
                        if (_this.workspacePanel.getIndexOfChild(page) == -1)//当page不在workspacePanel中
                            topic.publish(closeChildTopicName, page);
                    }, true);

                },
                initCommand:function(){
                    var _this = this;

                    this.own(on(_this.myTree, "click", function (item) {
                        //console.log(item);
                        topic.publish(topicName, item);
                    }));

                    this.own(on(_this.quickCommand, "keyPress", function (event) {
                        //if (event.key.toLowerCase() == 'enter') {
                        if(event.keyCode==13){
                            //console.log(event);
                            _this.executeByCode();
                        }
                    }));
                    //
                    //this.own(on(_this.quickCommandButton,"click",function(){
                    //    _this.executeByCode();
                    //}));

                },
                executeByCode:function(){
                    var _this = this;
                    var findItemByCmdCode = function (cmdCode) {
                        var model = _this.myModel;
                        var root = null;
                        model.getRoot(function (item) {
                            root = item;
                        });
                        var checkCode = fromq("(o,cmd,q)=>o['cmdCode']?!q(o['cmdCode']).let(cmd).where('(o,i,cmd)=>o===cmd').isEmpty():false");
                        var fetch = function (parent) {
                            var ret = null;
                            model.getChildren(parent, function (items) {
                                fromq(items).each(function (item) {
                                    if (checkCode(item, cmdCode, fromq)) {
                                        ret = item;
                                        return true;
                                    }
                                    if (!ret)ret = fetch(item);
                                });
                            });
                            return ret;
                        };
                        return fetch(root);
                    };
                    var code = this.quickCommand.get("value");
                    if (code.length > 0) {
                        var item = findItemByCmdCode(code);
                        if (item) {
                            topic.publish(topicName, item);
                            return;
                        }
                        msgBox.tooltip(this.quickCommand,"没有找到快捷命令 <b>"+code+"</b>, 请查看系统操作手册！");
                    }
                }


            });


    });