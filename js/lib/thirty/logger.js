/**
 * Created by bona on 2015/4/5.
 */
define(null,[],function(){
var Logger = (function () {

    var isString = function (it) {
        return (typeof it == "string" || it instanceof String);
    };
    var Logger = function (/*string*/type) {
        return new Logger.fn.init(type);
    };

    var append = function (/*string*/msgType, /*arguments*/args, /*function(item)*/formatter) {

        formatter = formatter || function (item) {
            return item;
        };

        if (!isString(msgType)) {
            msgType = "log";
        }
        var _args = Array.prototype.slice.call(args);

        /*for (var i = 0; i < args.length; i++)
         _args.push(args[i]);*/
        this.msgs.push(formatter({msgType: msgType, args: _args, date: new Date()}));

        return this;
    };

    Logger.fn = Logger.prototype = {
        init: function (/*string*/session) {
            this.session = session;
            this.msgs = [];
        },
        log: function () {
            return append.call(this, "log", arguments, this.formatter);
        },
        error: function () {
            return append.call(this, "error", arguments, this.formatter);
        },
        debug: function () {
            return append.call(this, "debug", arguments, this.formatter);
        },
        warn: function () {
            return append.call(this, "warn", arguments, this.formatter);
        },
        formatter: function (msgItem) {
            return msgItem;
        },
        flush: function (/*function(msgItem){return msgItem;}*/formatter) {
            if (this.count() == 0) return;
            formatter = formatter || this.formatter;
            if (this.hasType())console.log("==================session:", this.session, "==================");
            for (var i = 0; i < this.count(); i++) {
                var msg = formatter(this.msgs[i]);
                if (msg.msgType == "log") {
                    console.log.apply(console, msg.args);
                }
                else if (msg.msgType == "error") {
                    console.error.apply(console, msg.args);
                }
                else if (msg.msgType == "warn") {
                    console.warn.apply(console, msg.args);
                } else
                    console.debug.apply(console, msg.args);
            }
            if (this.hasType())console.log("==================session:", this.session, "==================");
            return this.clear();
        },
        clear: function () {
            this.msgs = [];
            return this;
        },
        hasType: function () {
            var it = this.session;
            return isString(it) && it.length > 0;
        },
        count: function () {
            return this.msgs.length;
        }
    };

    Logger.fn.init.prototype = Logger.fn;
    return Logger;
})();
  return Logger;
})