/**
 * Created by bona on 2015/3/20.
 */
/*
 *主要用于主程序加载后，自动加载symis/ui/resource/commands.json配置文件的加载列表
 *列表中所有的对象必须实现execute方法。
 */

define([
        "dojo/_base/array",
        "dojo/_base/lang",
        "dojo/json",
        "dojo/text!symis/ui/resources/commands.json"
    ],
    function (array,
              lang,
              json,
              commands) {

        //model:
        //symis/ui/cmd/CommandLoader

        var cmds = [];

        return {
            //当command加载后被程序调用
            execute: function () {
                console.log("CommandLoader start execute.");
                if (cmds.length === 0)
                    cmds = json.parse(commands).commands;
                //console.log(commands);

                array.forEach(cmds, function (item) {//遍历commands命令数组
                    if (item.package !== "" && lang.isString(item.package)) {
                        console.debug("loading ", item);
                        require([item.package], function (cmd) {//加载package指向的命令
                            console.debug("execute ", cmd);
                            if (lang.isFunction(cmd["execute"]))
                                cmd.execute();   //执行cmd命令
                        });
                        console.debug("command:", item.name, "has been executed.");
                    }
                });

            }

        };


    });