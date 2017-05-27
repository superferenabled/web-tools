'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _processRequest = require('./processRequest.js');

var _processRequest2 = _interopRequireDefault(_processRequest);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ObjectId = _mongoose2.default.Types.ObjectId;

var CRUD = function () {
    function CRUD() {
        _classCallCheck(this, CRUD);
    }

    _createClass(CRUD, null, [{
        key: 'create',
        value: function create(model, req, extraData, cb) {

            var result = { 'success': true },
                data = void 0,
                crud = this;
            cb = cb || function () {};
            extraData = extraData || {};

            data = _processRequest2.default.extractDataRequest(req, extraData);

            model.create(data, function (err, doc) {
                if (err) {
                    cb(err);
                    return;
                }
                cb(null, doc);
            });
        }
    }, {
        key: 'read',
        value: function read(model, req, extraData, cb) {

            var data = void 0,
                query = void 0;
            cb = cb || function () {};
            extraData = extraData || {};

            data = _processRequest2.default.extractDataRequest(req, extraData);
            data = _processRequest2.default.cleanQueryOptions(data);

            query = model.find(data.where);

            if (data.project !== {}) {
                query.select(data.project);
            }
            if (data.sort !== {}) {
                query.sort(data.sort);
            }
            query.skip(data.skip);
            query.limit(data.limit);

            query.exec(function (err, docs) {
                var result = docs;
                if (err) {
                    cb(err);
                    return;
                }
                cb(null, result);
            });
        }
    }, {
        key: 'update',
        value: function update(model, req, extraData, cb) {

            var data = void 0,
                query = void 0,
                updateInfo = void 0,
                crud = this,
                modelID = void 0;
            cb = cb || function () {};
            extraData = extraData || {};

            data = _processRequest2.default.extractDataRequest(req, extraData);
            modelID = req.params.id;
            query = { _id: modelID };
            //updateInfo = reqProcessor.extractDataRequest(req, extraData);
            //data = (typeof updateInfo.data !== undefined && typeof updateInfo.data === 'object') ? updateInfo.data : {};
            //query = (typeof updateInfo.queryUpdate !== undefined && typeof updateInfo.queryUpdate === 'object') ? updateInfo.queryUpdate : {};

            if (modelID !== undefined) {
                model.findOne(query, function (err, doc) {
                    if (err) {
                        cb(err);
                    }
                    if (doc !== null && doc !== undefined) {
                        if (data.id) {
                            delete data.id;
                        }
                        if (data._id) {
                            delete data._id;
                        }
                        for (var key in data) {
                            if (data.hasOwnProperty(key)) {
                                doc[key] = data[key];
                            }
                        }
                        doc.save(function (err, docUpdated) {
                            if (err) {
                                cb(err);
                                return;
                            }
                            cb(null, docUpdated);
                        });
                    } else {
                        cb(new Error('Document doesn\'t exists'));
                    }
                });
            } else {
                cb(new Error('No id defined'));
            }
        }
    }, {
        key: 'delete',
        value: function _delete(model, req, extraData, cb) {

            var result = { 'success': true },
                query = void 0,
                crud = this,
                modelID = void 0;
            cb = cb || function () {};
            extraData = extraData || {};

            modelID = req.params.id;
            query = { _id: modelID };
            //query = reqProcessor.extractDataRequest(req, extraData);

            if (modelID !== undefined) {
                model.remove(query, function (err, post) {
                    if (err) {
                        cb(err);
                        return;
                    }
                    cb();
                });
            } else {
                cb(new Error('No id for deletion'));
            }
        }
    }]);

    return CRUD;
}();

module.exports = CRUD;