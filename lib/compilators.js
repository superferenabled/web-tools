'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _less = require('less');

var _less2 = _interopRequireDefault(_less);

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Compilators = function () {
    function Compilators() {
        _classCallCheck(this, Compilators);
    }

    _createClass(Compilators, null, [{
        key: 'lessCompile',
        value: function lessCompile(params) {
            if (_fs2.default.existsSync(params.appPath + '/../' + params.frontendDir + '/' + params.lessDir + '/styles.less')) {
                _fs2.default.readFile(params.appPath + '/../' + params.frontendDir + '/' + params.lessDir + '/styles.less', 'utf8', function (err, lessFile) {
                    if (err) {
                        throw err;
                    }

                    _less2.default.render(lessFile, {
                        paths: [params.appPath + '/../' + params.frontendDir + '/' + params.lessDir + ''], // Specify search paths for @import directives
                        filename: 'styles.less', // Specify a filename, for better error messages
                        compress: true // Minify CSS output
                    }, function (e, output) {
                        _fs2.default.writeFile(params.appPath + '/../' + params.frontendDir + '/' + params.lessDir + '/styles.css', output.css, function (err) {
                            if (err) {
                                throw err;
                            }
                            console.log(_colors2.default.green.bold('Less files compiled successfully!'));
                        });
                    });
                });
            } else {
                console.log(_colors2.default.yellow.bold('No less files found to compile!'));
            }
        }
    }]);

    return Compilators;
}();

module.exports = Compilators;