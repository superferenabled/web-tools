"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var colors_1 = require("colors");
var LogoPrompt = /** @class */ (function () {
    function LogoPrompt() {
    }
    LogoPrompt.drawInitArt = function () {
        console.log(colors_1.default.cyan.bold("                ,----..                    ,--. "));
        console.log(colors_1.default.cyan.bold("  ,----..      /   /   \\     ,---,       ,--.\'| "));
        console.log(colors_1.default.cyan.bold(" /   /   \\    /   .     : ,`--.\' |   ,--,:  : | "));
        console.log(colors_1.default.cyan.bold("|   :     :  .   /   ;.  \\|   :  :,`--.\'`|  \' : "));
        console.log(colors_1.default.cyan.bold(".   |  ;. / .   ;   /  ` ;:   |  \'|   :  :  | | "));
        console.log(colors_1.default.cyan.bold(".   ; /--`  ;   |  ; \\ ; ||   :  |:   |   \\ | : "));
        console.log(colors_1.default.cyan.bold(";   | ;  __ |   :  | ; | \'\'   \'  ;|   : \'  \'; | "));
        console.log(colors_1.default.cyan.bold("|   : |.\' .\'.   |  \' \' \' :|   |  |\'   \' ;.    ; "));
        console.log(colors_1.default.cyan.bold(".   | \'_.\' :\'   ;  \\; /  |\'   :  ;|   | | \\   | "));
        console.log(colors_1.default.cyan.bold("\'   ; : \\  | \\   \\  \',  / |   |  \'\'   : |  ; .\' "));
        console.log(colors_1.default.cyan.bold("\'   | \'/  .\'  ;   :    /  \'   :  ||   | \'`--\'   "));
        console.log(colors_1.default.cyan.bold("|   :    /     \\   \\ .\'   ;   |.\' \'   : |       "));
        console.log(colors_1.default.cyan.bold(" \\   \\ .\'       `---`     \'---\'   ;   |.'       "));
        console.log(colors_1.default.cyan.bold("  `---`                           '---'         "));
    };
    LogoPrompt.insultingArt = function () {
        console.log('   _____  ___________.____       _____ _____________________.____       _____    _________');
        console.log('  /     \\ \\_   _____/|    |     /  _  \\ \\______  \\_   _____/|    |     /  _  \\  /   _____/');
        console.log(' /  \\ /  \\ |    __)_ |    |    /  /_\\  \\|     ___/|    __)_ |    |    /  /_\\  \\ \\ _____  \\ ');
        console.log('/    Y    \\|        \\|    |___/    |    \\    |    |        \\|    |___/    |    \\/        \\ ');
        console.log('\\____|__  /_______  /|_______ \\____|__  /____|   /_______  /|_______ \\____|__  /_______  / ');
        console.log('        \\/        \\/         \\/       \\/                 \\/         \\/       \\/        \\/ ');
    };
    return LogoPrompt;
}());
exports.default = LogoPrompt;
