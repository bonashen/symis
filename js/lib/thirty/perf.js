/**
 * Created by bona on 2015/4/5.
 */
define(null,[],function(){
    var testTime = function (callback, msg, logger) {
        // Take a timestamp at the beginning.
        logger = logger || console;
        //logger.log(msg, '-test time starting.....');
        var start = performance.now();
        // Execute the code being timed.
        var ret = callback();
        // Take a final timestamp.
        var end = performance.now();
        // logger.log(msg, '-test time end.');
        // Calculate the time taken and output the result in the console
        logger.log(msg, ' took ' + (end - start) + ' milliseconds to execute.');
        return ret;
    };
    return testTime;
});