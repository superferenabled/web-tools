"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var s3 = require("s3");
var path = require("path");
var uuid = require("uuid");
var request = require("request");
var RT = require("rand-token");
var randtoken = RT.generator();
var Uploads = /** @class */ (function () {
    function Uploads() {
    }
    Uploads.mkdirSync = function (path, cb) {
        try {
            fs.mkdirSync(path, '0766');
            cb(null);
        }
        catch (err) {
            if (err.code != 'EEXIST') {
                cb(err);
                return;
            }
        }
    };
    Uploads.checkDir = function (dirPath) {
        return function (req, res, next) {
            if (!fs.existsSync(dirPath)) {
                Uploads.mkdirSync(dirPath, function (err) {
                    if (err) {
                        res.send({ success: false, 'error': err });
                        return;
                    }
                    next();
                });
            }
            else {
                next();
            }
        };
    };
    Uploads.checkDirFromParams = function (dirPath, paramName) {
        return function (req, res, next) {
            if (!fs.existsSync(path.join(dirPath, req.params[paramName]))) {
                Uploads.mkdirSync(path.join(dirPath, req.params[paramName]), function (err) {
                    if (err) {
                        res.send({ success: false, 'error': err });
                        return;
                    }
                    next();
                });
            }
            else {
                next();
            }
        };
    };
    Uploads.copyFiles = function (oFiles, previousPath, DestinyPath, cb) {
        if (oFiles !== undefined && oFiles.length > 0) {
            for (var files in oFiles) {
                fs.rename(path.join(previousPath, oFiles[files].sFile), path.join(DestinyPath, oFiles[files].sFile), function (err) {
                    if (err) {
                        cb(err);
                        return;
                    }
                });
            }
        }
        cb(null);
        return;
    };
    Uploads.copyMoveFiles = function (oFiles, previousPath, DestinyPath, cb) {
        if (oFiles !== undefined && oFiles.length > 0) {
            var _loop_1 = function (files) {
                if (oFiles[files].active === "true") {
                    if (oFiles[files].replace === "true") {
                        fs.rename(path.join(previousPath, oFiles[files].sFile), path.join(DestinyPath, oFiles[files].sFile), function (err) {
                            if (err) {
                                cb({
                                    'accion': 'copy',
                                    'id': (path.join(previousPath, oFiles[files].sFile)),
                                    'comments': err
                                });
                                return;
                            }
                        });
                        if (path.join(DestinyPath, oFiles[files].FileActual) !== "") {
                            Uploads.removeFile(path.join(DestinyPath, oFiles[files].FileActual), function (err) {
                                if (err) {
                                    cb({
                                        'accion': 'delete',
                                        'id': path.join(DestinyPath, oFiles[files].FileActual),
                                        'comments': err
                                    });
                                    return;
                                }
                            });
                        }
                    }
                    else {
                        fs.rename(path.join(previousPath, oFiles[files].sFile), path.join(DestinyPath, oFiles[files].sFile), function (err) {
                            if (err) {
                                cb({
                                    'accion': 'copy',
                                    'id': path.join(previousPath, oFiles[files].sFile),
                                    'comments': err
                                });
                                return;
                            }
                        });
                    }
                }
            };
            for (var files in oFiles) {
                _loop_1(files);
            }
        }
        cb(null);
    };
    Uploads.moveFile = function (files, destination, cb) {
        if (!!!files) {
            cb(new Error('First parameter is mandatory (req.files)'));
            return;
        }
        destination = destination || '';
        cb = cb || function () { };
        var Upload = this, fullDestinyPath = path.join(Upload.resourcesPath, destination), fileName = uuid.v1();
        for (var file in files) {
            fileName = fileName + '.' + files[file].extension;
            fs.rename(files[file].path, path.join(fullDestinyPath, fileName), function (err) {
                if (err) {
                    cb(err);
                    return;
                }
                cb(null, fileName);
            });
            break;
        }
    };
    Uploads.replaceFile = function (files, destination, previousPath, previousFile, cb) {
        destination = destination || '';
        previousFile = previousFile || '';
        cb = cb || function () { };
        Uploads.moveFile(files, destination, function (err, fileName) {
            if (err) {
                cb(err);
                return;
            }
            Uploads.removeFile(path.join(Uploads.resourcesPath, previousPath, previousFile), function (err) {
                if (err) {
                    cb(err);
                    return;
                }
                cb(null, fileName);
            });
        });
    };
    Uploads.removeFile = function (path, cb) {
        fs.readFile(path, 'utf8', function (err) {
            if (err) {
                cb();
                return;
            }
            fs.unlink(path, function (err) {
                if (err) {
                    cb(err);
                    return;
                }
                cb();
            });
        });
    };
    Uploads.saveBase64ToImage = function (strB64, dir) {
        try {
            var eregJPG = /^data:image\/jpeg;base64,/, eregPNG = /^data:image\/png;base64,/, eregImage = strB64.search('data:image/png') !== -1 ? eregPNG : eregJPG, extension = strB64.search('data:image/png') !== -1 ? 'png' : 'jpg', base64Data = strB64.replace(eregImage, ''), binaryData = new Buffer(base64Data, 'base64').toString('binary'), randName = randtoken.generate(32), writeTo = path.join(dir, randName + "." + extension);
            fs.writeFileSync(writeTo, binaryData, 'binary');
            return {
                'err': null,
                'filename': randName + '.' + extension
            };
        }
        catch (err) {
            return {
                'err': err
            };
        }
    };
    Uploads.prototype.downloadImage = function (uri, newName, callback) {
        try {
            request.head(uri, function (err, res, body) {
                var fileName = newName, writeTo = path.join('public', 'resources', 'tmp', fileName);
                request(uri)
                    .pipe(fs.createWriteStream(writeTo))
                    .on('close', function () {
                    callback(null, fileName);
                });
            });
        }
        catch (err) {
            callback(err);
        }
    };
    Uploads.prototype.uploadToS3 = function (params, cb) {
        var options = {
            s3Options: {
                accessKeyId: params.s3['access-key-id'],
                secretAccessKey: params.s3['secret-access-key'],
                region: params.s3['region']
            }
        };
        var client = s3.createClient(options);
        var s3params = {
            localFile: params.localFile,
            s3Params: {
                Bucket: params.s3['bucket'],
                Key: params.saveAsFile,
            },
        };
        var uploader = client.uploadFile(s3params);
        uploader.on('error', function (err) {
            cb(new Error('Hubo un error al subir la imagen.'));
        });
        uploader.on('end', function () {
            cb(null, params.saveAsFile);
        });
    };
    Uploads.resourcesPath = path.join(__dirname, '..', 'public', 'app', 'resources');
    return Uploads;
}());
exports.default = Uploads;
