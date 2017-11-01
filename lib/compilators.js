"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var less_1 = require("less");
var colors = require("colors");
var fs = require("fs");
var Compilators = /** @class */ (function () {
    function Compilators() {
    }
    Compilators.lessCompile = function (params) {
        if (fs.existsSync(params.appPath + '/../' + params.frontendDir + '/' + params.lessDir + '/styles.less')) {
            fs.readFile(params.appPath + '/../' + params.frontendDir + '/' + params.lessDir + '/styles.less', 'utf8', function (err, lessFile) {
                if (err) {
                    throw err;
                }
                less_1.default.render(lessFile, {
                    paths: [params.appPath + '/../' + params.frontendDir + '/' + params.lessDir + ''],
                    filename: 'styles.less',
                    compress: true // Minify CSS output
                }, function (e, output) {
                    fs.writeFile(params.appPath + '/../' + params.frontendDir + '/' + params.lessDir + '/styles.css', output.css, function (err) {
                        if (err) {
                            throw err;
                        }
                        console.log(colors.green.bold('Less files compiled successfully!'));
                    });
                });
            });
        }
        else {
            console.log(colors.yellow.bold('No less files found to compile!'));
        }
    };
    return Compilators;
}());
exports.default = Compilators;
