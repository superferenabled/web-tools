"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Strings = /** @class */ (function () {
    function Strings() {
    }
    /**
     * Pads an specified number of characters before a specified mixed var
     * @param  {var}    mixed       String to be padded
     * @param  {number} [count]     number of characters to be inserted before the mixed var
     * @param  {string} [character] character to be inserted
     * @return {string} Mixed var padded with characters at the beginning
     */
    Strings.pad = function (mixed, count, character) {
        count = count || 4;
        character = character || '0';
        mixed = "" + mixed;
        var pad = new Array(count + 1).join(character);
        return pad.substring(0, pad.length - mixed.length) + mixed;
    };
    Strings.repeat = function (mixed, count) {
        return new Array(count + 1).join(mixed);
    };
    /**
     * Clean a string of undesired white spaces at the end and beginning
     * @param  {string} s The string to be processed
     * @return {string}   The clean string
     */
    Strings.clean = function (s) {
        return ('string' != typeof s) ? '' : s.trim();
    };
    return Strings;
}());
exports.default = Strings;
module.exports = Strings;
