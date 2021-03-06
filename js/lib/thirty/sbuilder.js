/**
 * Created by bona on 2015/4/4.
 */
// Initializes a new instance of the StringBuilder class
// and appends the given value if supplied

//example:
// StringBuilder("one").append("two").append("three").toString();
define(null, [], function () {

    var StringBuilder = function (value) {
        return new StringBuilder.fn.init(value);
    };

    var isArrayLike = function (it) {
        return it && it['length'] !== undefined;
    };

    StringBuilder.fn = StringBuilder.prototype = {
        init: function (value) {
            this.strings = new Array("");
            this.append(value);
        },
        // Appends the given value to the end of this instance.
        append: function (value) {
            if(isArrayLike(value)){
                for (var i = 0, l = value.length; i < l; i++)
                    this.strings[this.strings.length] = value[i];
                return this;
            }
            if (value) {
                this.strings.push(value);
            }
            return this;
        },

        // Clears the string buffer
        clear: function () {
            this.strings.length = 1;
            return this;
        },

        // Converts this instance to a String.
        toString: function (/*String*/separator) {
            return this.strings.join(separator || "");
        },
        toArray: function (/*Array*/it) {
            if (isArrayLike(it))
                for (var i = 0, l = this.strings.length; i < l; i++)
                    it[it.length] = this.strings[i];
            return this.strings;
        }
    };

    StringBuilder.fn.init.prototype = StringBuilder.fn;

    return StringBuilder;
});