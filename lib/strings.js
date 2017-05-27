'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Strings = function () {
    function Strings() {
        _classCallCheck(this, Strings);
    }

    _createClass(Strings, null, [{
        key: 'pad',

        /**
         * Pads an specified number of characters before a specified mixed var
         * @param  {var}    mixed       String to be padded
         * @param  {number} [count]     number of characters to be inserted before the mixed var
         * @param  {string} [character] character to be inserted
         * @return {string} Mixed var padded with characters at the beginning
         */
        value: function pad(mixed, count, character) {
            count = count || 4;
            character = character || '0';
            mixed = "" + mixed;
            var pad = new Array(count + 1).join(character);
            return pad.substring(0, pad.length - mixed.length) + mixed;
        }
    }, {
        key: 'repeat',
        value: function repeat(mixed, count) {
            return new Array(count + 1).join(mixed);
        }

        /**
         * Clean a string of undesired white spaces at the end and beginning
         * @param  {string} s The string to be processed
         * @return {string}   The clean string
         */

    }, {
        key: 'clean',
        value: function clean(s) {
            return 'string' != typeof s ? '' : s.trim();
        }
    }]);

    return Strings;
}();

module.exports = Strings;