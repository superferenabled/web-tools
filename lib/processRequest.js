'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _deepmerge = require('deepmerge');

var _deepmerge2 = _interopRequireDefault(_deepmerge);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _validations = require('./validations.js');

var _validations2 = _interopRequireDefault(_validations);

var _uploads = require('./uploads.js');

var _uploads2 = _interopRequireDefault(_uploads);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProcessRequest = function () {
    function ProcessRequest() {
        _classCallCheck(this, ProcessRequest);
    }

    _createClass(ProcessRequest, null, [{
        key: 'extractDataRequest',
        value: function extractDataRequest(req, extraData) {

            var oRequest = void 0,
                rawData = void 0,
                outData = void 0;
            extraData = extraData || {};

            if (req.hasOwnProperty('_readableState')) {
                //verify that req is an instance of Request express object
                oRequest = req.method === 'GET' ? req.query : req.body;
            } else {
                // otherwise just treat req as an ordinary object
                oRequest = req;
            }

            rawData = JSON.parse(JSON.stringify(oRequest)); //cloning data request
            outData = (0, _deepmerge2.default)(rawData, extraData);
            return outData;
        }
    }, {
        key: 'cleanQueryOptions',
        value: function cleanQueryOptions(options) {

            var key = void 0;

            options.where = _typeof(options.where) !== undefined && _typeof(options.where) === 'object' ? options.where : {};
            options.project = _typeof(options.project) !== undefined && _typeof(options.project) === 'object' ? options.project : {};
            options.sort = _typeof(options.sort) !== undefined && _typeof(options.sort) === 'object' ? options.sort : {};
            options.skip = _typeof(options.skip) !== undefined && typeof options.skip === 'number' ? parseInt(options.skip) : isNaN(parseInt(options.skip)) ? 0 : parseInt(options.skip);
            options.limit = _typeof(options.limit) !== undefined && typeof options.limit === 'number' ? parseInt(options.limit) : isNaN(parseInt(options.limit)) ? 0 : parseInt(options.limit);

            for (key in options.project) {
                options.project[key] = isNaN(parseInt(options.project[key])) ? 0 : parseInt(options.project[key]) === 0 ? 0 : 1;
            }

            for (key in options.sort) {
                options.sort[key] = isNaN(parseInt(options.sort[key])) ? 1 : parseInt(options.sort[key]) === 1 ? 1 : -1;
            }

            return options;
        }
    }, {
        key: 'processPicture',
        value: function processPicture(Model, doc, fieldName, cb) {
            // eliminar el uso de esta funcion en el futuro, por que ya no hace nada
            cb({
                'success': true,
                'doc': doc
            });
        }
    }, {
        key: 'processPicture2',
        value: function processPicture2(Model, doc, fieldName, cb) {
            // eliminar el uso de esta funcion en el futuro, por que ya no hace nada
            cb({
                'success': true,
                'doc': doc
            });
        }
    }]);

    return ProcessRequest;
}();

module.exports = ProcessRequest;