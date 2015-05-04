/**
 * Created by bona on 2015/3/16.
 * 主菜单功能的执行器
 */

//监听topic ""/mainui/menu/click",传入item{name,url}


define([
        "symis/ui/view/utils/CommonUtils",
        "dojo/on",
        "dojo/topic",
//        "symis/ui/cmd/_base/_Commandbase",
//        "dojo/_base/declare",
        "dojo/_base/array",
        "dojo/_base/lang"
    ],
    function (utils,
              on, topic,
              //cmdbase,
              //declare,
              array, lang) {

        var loadBusinessClickTopic = "/mainui/menu/click", closeChildTopicName = "/mainui/workspace/closeChild";

        //store workspace list array;
        var wps = [];

        //workspace object
        var WorkspaceItem = function (workspace) {
            this.name = workspace.name;
            this.widgetId = workspace.widgetId;
            this.widget = workspace.widget;
        };

        WorkspaceItem.prototype.nameIs = function (name) {
            return this.name == name;
        };

        WorkspaceItem.prototype.widgetIs = function (widget) {
            return this.widget == widget;
        };

        //加载业务功能模块
        var loadBusiness = function (url,title) {

                //通过require功能加载业务功能
                require([url], function (business) {
                    var b = new business();

                    lang.mixin(b, {
                        selected: true,
                        title: lang.isString(b.title)&& b.title!==""? b.title:title
                        //region:'center',
                        //height:'100%'
                    });

                    getWorkspace().addChild(b);

                    wps = wps.concat(new WorkspaceItem({name: b.declaredClass, widgetId: b.id, widget: b}));

                    console.debug(wps);

                    activeBusiness(urltoClassname(url));
                });
            },

            hasBusiness = function (className) {

                return array.some(wps, function (item) {
                    return item.nameIs(className);
                });

            },

        /*
         getMainUI = (function () {
         //指向主页面Widget
         var mainui = null;
         return function () {
         if (mainui == null)
         require(["dijit/registry"], function (reg) {
         mainui = reg.byId("mainui");
         });
         return mainui;
         }
         })(),

         */
            //getMainUI = utils.getMainUI,

            getWorkspace = utils.getWorkspace,

            activeBusiness = function (className) {
                //显示或激活指定的功能
                array.forEach(array.filter(wps, function (item) {
                        return item.nameIs(className)
                    }),
                    function (item) {
                        console.debug(item);
                        getWorkspace().selectChild(item.widget);
                    });
            },

            urltoClassname = function (url) {
                return url.replace(/\//g, ".");
            },


            removeBusiness = function (widget) {
                wps = array.filter(wps, function (item) {
                    return !item.widgetIs(widget)
                });
                console.debug("remove widget:", widget);
                //console.debug(wps);
            };

        return {

            //model:
            //symis/ui/cmd/CommandBus
            execute: function () {

                //订阅loadBusinessClickTopic主题消息
                topic.subscribe(loadBusinessClickTopic, function (item) {

                    console.debug(item);

                    //点击功能分类
                    if (item.children) {

                    } else
                    //点击功能项
                    if (item.url && lang.isArray(item.url)) {
                        var url = item.url[0];

                        if (hasBusiness(urltoClassname(url))) {//判断是否已加载该功能
                            activeBusiness(urltoClassname(url));//激活业务功能
                        } else
                            loadBusiness(url,item.name[0]);//一般URL属性指向一个类，调用功能加载类来加载该功能

                    }
                });

                topic.subscribe(closeChildTopicName, function (page) {
                    removeBusiness(page);
                });
            }
        };
    });