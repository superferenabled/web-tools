import deepMerge from 'deepmerge';
import path from 'path';
import Validations from './validations.js';
import Uploads from './uploads.js';

class ProcessRequest {

    static extractDataRequest(req, extraData) {

        let oRequest, rawData, outData;
        extraData = extraData || {};

        if(req.hasOwnProperty('_readableState')) { //verify that req is an instance of Request express object
            oRequest = req.method === 'GET' ? req.query : req.body;
        } else { // otherwise just treat req as an ordinary object
            oRequest = req;
        }

        rawData = (JSON.parse(JSON.stringify(oRequest))); //cloning data request
        outData = deepMerge(rawData, extraData);
        return outData;

    }

    static cleanQueryOptions(options) {

        let key;

        options.where   = (typeof options.where !== undefined && typeof options.where === 'object') ? options.where : {};
        options.project = (typeof options.project !== undefined && typeof options.project === 'object') ? options.project : {};
        options.sort    = (typeof options.sort !== undefined && typeof options.sort === 'object') ? options.sort : {};
        options.skip    = (typeof options.skip !== undefined && typeof options.skip === 'number') ? parseInt(options.skip) : (isNaN(parseInt(options.skip)) ? 0 : parseInt(options.skip));
        options.limit   = (typeof options.limit !== undefined && typeof options.limit === 'number') ? parseInt(options.limit) : (isNaN(parseInt(options.limit)) ? 0 : parseInt(options.limit));

        for(key in options.project) {
            options.project[key] = isNaN(parseInt(options.project[key])) ? 0 : (parseInt(options.project[key]) === 0 ? 0 : 1);
        }

        for(key in options.sort) {
            options.sort[key] = isNaN(parseInt(options.sort[key])) ? 1 : (parseInt(options.sort[key]) === 1 ? 1 : -1);
        }

        return options;

    }

    static processPicture(Model, doc, fieldName, cb) { // eliminar el uso de esta funcion en el futuro, por que ya no hace nada
        cb({
            'success': true,
            'doc': doc
        });
    }

    static processPicture2(Model, doc, fieldName, cb) { // eliminar el uso de esta funcion en el futuro, por que ya no hace nada
        cb({
            'success': true,
            'doc': doc
        });
    }

}

module.exports = ProcessRequest;