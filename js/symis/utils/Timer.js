/**
 * Created by bona on 2015/4/16.
 */

define([
        "dojo/Evented",  //Evented
        "dojo/_base/lang",  //mixin
        "dojo/on",    //on.once
        "dojo/_base/declare"  //declare
    ],
    function (Evented, lang, on,declare) {
        //module:
        //     symis/utils/Timer

        //example:
        // Create an instance
        //var timer = new Timer();
        //
        //// Set event handlers
        //timer.on("start", function () {
        //    domConst.place("<p>start</p>", "output");
        //})
        //timer.on("tick", function () {
        //    domConst.place("<p>tick</p>", "output");
        //});
        //timer.on("stop", function () {
        //    domConst.place("<p>stop</p>", "output");
        //});
        //
        //// Setup button click handlers
        //on(dom.byId("startButton"), "click", function () {
        //    timer.start();
        //});
        //on(dom.byId("stopButton"), "click", function () {
        //    timer.stop();
        //});


        // Declare the new Timer class
        var Timer = declare("symis.utils.Timer",[Evented], {
            timeout: 1000,
            constructor: function (option) {
                lang.mixin(this, option);
            },
            start: function () {
                this.stop();
                this.emit("start", {sender:this});
                var self = this;
                this._handle = setInterval(function () {
                    self.emit("tick", {sender:self});
                }, this.timeout);
            },
            stop: function () {
                if (this._handle) {
                    clearInterval(this._handle);
                    delete this._handle;
                    this.emit("stop", {sender:this});
                }
            }
        });

        //example:
        // | Timer.once({timeout:1200,run:function(){ do somthing... }});

        Timer.once = function (option) {
            //define default callback,the callback nothing do.
            var callback = function () {

            };
            if ("run"in option && lang.isFunction(option.run))
                callback = option.run;

            var timer = new Timer(lang.mixin({timeout:1000},option ||{}));

            on.once(timer, "tick", function () {
                timer.stop();
                callback.apply(null, arguments);
                delete timer;
            });

            timer.start();

        };
        return Timer;

    });
