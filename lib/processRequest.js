"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var deepMerge = require("deepmerge");
var ProcessRequest = /** @class */ (function () {
    function ProcessRequest() {
    }
    ProcessRequest.extractDataRequest = function (req, extraData) {
        var oRequest, rawData, outData;
        extraData = extraData || {};
        if (req.hasOwnProperty('_readableState')) {
            oRequest = req.method === 'GET' ? req.query : req.body;
        }
        else {
            oRequest = req;
        }
        rawData = (JSON.parse(JSON.stringify(oRequest))); //cloning data request
        outData = deepMerge(rawData, extraData);
        return outData;
    };
    ProcessRequest.cleanQueryOptions = function (options) {
        var key;
        options.where = (typeof options.where !== undefined && typeof options.where === 'object') ? options.where : {};
        options.project = (typeof options.project !== undefined && typeof options.project === 'object') ? options.project : {};
        options.sort = (typeof options.sort !== undefined && typeof options.sort === 'object') ? options.sort : {};
        options.skip = (typeof options.skip !== undefined && typeof options.skip === 'number') ? parseInt(options.skip) : (isNaN(parseInt(options.skip)) ? 0 : parseInt(options.skip));
        options.limit = (typeof options.limit !== undefined && typeof options.limit === 'number') ? parseInt(options.limit) : (isNaN(parseInt(options.limit)) ? 0 : parseInt(options.limit));
        for (key in options.project) {
            options.project[key] = isNaN(parseInt(options.project[key])) ? 0 : (parseInt(options.project[key]) === 0 ? 0 : 1);
        }
        for (key in options.sort) {
            options.sort[key] = isNaN(parseInt(options.sort[key])) ? 1 : (parseInt(options.sort[key]) === 1 ? 1 : -1);
        }
        return options;
    };
    ProcessRequest.processPicture = function (Model, doc, fieldName, cb) {
        cb({
            'success': true,
            'doc': doc
        });
    };
    ProcessRequest.processPicture2 = function (Model, doc, fieldName, cb) {
        cb({
            'success': true,
            'doc': doc
        });
    };
    return ProcessRequest;
}());
exports.default = ProcessRequest;
