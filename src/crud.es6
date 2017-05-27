import reqProcessor from './processRequest.js';
import mongoose from 'mongoose';
let ObjectId = mongoose.Types.ObjectId;

class CRUD {

    static create(model, req, extraData, cb) {

        let result = {'success' : true}, data, crud = this;
        cb = cb || function(){};
        extraData = extraData || {};

        data = reqProcessor.extractDataRequest(req, extraData);

        model.create(data, function (err, doc) {
            if (err) {
                cb(err);
                return;
            }
            cb(null, doc);
        });

    }

    static read(model, req, extraData, cb) {

        let data, query;
        cb = cb || function(){};
        extraData = extraData || {};

        data = reqProcessor.extractDataRequest(req, extraData);
        data = reqProcessor.cleanQueryOptions(data);

        query = model.find(data.where);

        if(data.project !== {}) {
            query.select(data.project);
        }
        if(data.sort !== {}) {
            query.sort(data.sort);
        }
        query.skip(data.skip);
        query.limit(data.limit);

        query.exec(function(err, docs) {
            var result = docs;
            if (err) {
                cb(err);
                return;
            }
            cb(null, result);
        });

    }

    static update(model, req, extraData, cb) {

        let data, query, updateInfo, crud = this, modelID;
        cb = cb || function(){};
        extraData = extraData || {};

        data = reqProcessor.extractDataRequest(req, extraData);
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
                if(doc !== null && doc !== undefined) {
                    if(data.id) {
                        delete data.id;
                    }
                    if(data._id) {
                        delete data._id;
                    }
                    for (var key in data) {
                        if (data.hasOwnProperty(key)) {
                            doc[key] = data[key];
                        }
                    }
                    doc.save(function(err, docUpdated){
                        if(err){
                            cb(err);
                            return;
                        }
                        cb(null, docUpdated);
                    })
                } else {
                    cb(new Error('Document doesn\'t exists'));
                }
            });
        } else {
            cb(new Error('No id defined'));
        }

    }

    static delete(model, req, extraData, cb) {

        let result = {'success' : true}, query, crud = this, modelID;
        cb = cb || function(){};
        extraData = extraData || {};

        modelID = req.params.id;
        query = { _id: modelID };
        //query = reqProcessor.extractDataRequest(req, extraData);

        if(modelID !== undefined) {
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

}

module.exports = CRUD;