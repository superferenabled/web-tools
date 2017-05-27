"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _colors = require("colors");

var _colors2 = _interopRequireDefault(_colors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LogoPrompt = function () {
    function LogoPrompt() {
        _classCallCheck(this, LogoPrompt);
    }

    _createClass(LogoPrompt, null, [{
        key: "drawInitArt",
        value: function drawInitArt() {

            console.log(_colors2.default.cyan.bold("                ,----..                    ,--. "));
            console.log(_colors2.default.cyan.bold("  ,----..      /   /   \\     ,---,       ,--.\'| "));
            console.log(_colors2.default.cyan.bold(" /   /   \\    /   .     : ,`--.\' |   ,--,:  : | "));
            console.log(_colors2.default.cyan.bold("|   :     :  .   /   ;.  \\|   :  :,`--.\'`|  \' : "));
            console.log(_colors2.default.cyan.bold(".   |  ;. / .   ;   /  ` ;:   |  \'|   :  :  | | "));
            console.log(_colors2.default.cyan.bold(".   ; /--`  ;   |  ; \\ ; ||   :  |:   |   \\ | : "));
            console.log(_colors2.default.cyan.bold(";   | ;  __ |   :  | ; | \'\'   \'  ;|   : \'  \'; | "));
            console.log(_colors2.default.cyan.bold("|   : |.\' .\'.   |  \' \' \' :|   |  |\'   \' ;.    ; "));
            console.log(_colors2.default.cyan.bold(".   | \'_.\' :\'   ;  \\; /  |\'   :  ;|   | | \\   | "));
            console.log(_colors2.default.cyan.bold("\'   ; : \\  | \\   \\  \',  / |   |  \'\'   : |  ; .\' "));
            console.log(_colors2.default.cyan.bold("\'   | \'/  .\'  ;   :    /  \'   :  ||   | \'`--\'   "));
            console.log(_colors2.default.cyan.bold("|   :    /     \\   \\ .\'   ;   |.\' \'   : |       "));
            console.log(_colors2.default.cyan.bold(" \\   \\ .\'       `---`     \'---\'   ;   |.'       "));
            console.log(_colors2.default.cyan.bold("  `---`                           '---'         "));
        }
    }, {
        key: "insultingArt",
        value: function insultingArt() {

            console.log('   _____  ___________.____       _____ _____________________.____       _____    _________');
            console.log('  /     \\ \\_   _____/|    |     /  _  \\ \\______  \\_   _____/|    |     /  _  \\  /   _____/');
            console.log(' /  \\ /  \\ |    __)_ |    |    /  /_\\  \\|     ___/|    __)_ |    |    /  /_\\  \\ \\ _____  \\ ');
            console.log('/    Y    \\|        \\|    |___/    |    \\    |    |        \\|    |___/    |    \\/        \\ ');
            console.log('\\____|__  /_______  /|_______ \\____|__  /____|   /_______  /|_______ \\____|__  /_______  / ');
            console.log('        \\/        \\/         \\/       \\/                 \\/         \\/       \\/        \\/ ');
        }
    }]);

    return LogoPrompt;
}();

module.exports = LogoPrompt;