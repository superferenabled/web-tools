import * as fs from 'fs';
import * as s3 from 's3';
import * as path from 'path';
import * as uuid from 'uuid';
import * as request from 'request';
import * as RT from 'rand-token';

let randtoken = RT.generator();

export default class Uploads {

    static resourcesPath = path.join(__dirname, '..', 'public', 'app', 'resources');

    static mkdirSync (path, cb): void {
        try {
            fs.mkdirSync(path, '0766');
            cb(null);
        } catch (err) {
            if (err.code != 'EEXIST') {
                cb(err);
                return;
            }
        }
    }

    static checkDir(dirPath): any {
        return function(req, res, next) {

            if (!fs.existsSync(dirPath)) {
                Uploads.mkdirSync(dirPath, function(err) {
                    if (err) {
                        res.send( { success: false, 'error': err } );
                        return;
                    }
                    next();
                });
            } else {
                next();
            }
        }
    }

    static checkDirFromParams(dirPath, paramName): any {
        return (req, res, next) => {
            if (!fs.existsSync(path.join(dirPath, req.params[paramName]))) {
                Uploads.mkdirSync(path.join(dirPath, req.params[paramName]), function(err) {
                    if (err) {
                        res.send( { success: false, 'error': err } );
                        return;
                    }
                    next();
                });
            } else {
                next();
            }
        }
    }

    static copyFiles(oFiles, previousPath, DestinyPath, cb): any {
        if (oFiles !== undefined && oFiles.length > 0) {
            for (let files in oFiles) {
                fs.rename(path.join(previousPath, oFiles[files].sFile), path.join(DestinyPath, oFiles[files].sFile),
                    function(err) {
                        if (err) {
                            cb(err);
                            return;
                        }
                    });
            }
        }
        cb(null);
        return;
    }

    static copyMoveFiles(oFiles, previousPath, DestinyPath, cb): void {
        if (oFiles !== undefined && oFiles.length > 0) {
            for (let files in oFiles) {
                if (oFiles[files].active === "true") {
                    if (oFiles[files].replace === "true") {
                        fs.rename(path.join(previousPath, oFiles[files].sFile), path.join(DestinyPath, oFiles[files].sFile),
                            function(err) {
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
                            Uploads.removeFile(path.join(DestinyPath, oFiles[files].FileActual), function(err) {
                                if (err) {
                                    cb({
                                        'accion': 'delete',
                                        'id': path.join(DestinyPath, oFiles[files].FileActual),
                                        'comments': err
                                    });
                                    return;
                                }
                            })
                        }

                    } else {
                        fs.rename(path.join(previousPath, oFiles[files].sFile), path.join(DestinyPath, oFiles[files].sFile),
                            function(err) {
                                if (err) {
                                    cb({
                                        'accion': 'copy',
                                        'id': path.join(previousPath, oFiles[files].sFile),
                                        'comments': err
                                    });
                                    return;
                                }
                            })

                    }

                }
            }
        }
        cb(null);
    }

    static moveFile(files, destination, cb): void {
        if (!!!files) {
            cb(new Error('First parameter is mandatory (req.files)'));
            return;
        }
        destination = destination || '';
        cb = cb || function() {};

        var Upload = this,
            fullDestinyPath = path.join(Upload.resourcesPath, destination),
            fileName = uuid.v1();

        for (let file in files) {
            fileName = fileName + '.' + files[file].extension;

            fs.rename(files[file].path, path.join(fullDestinyPath, fileName),
                function(err) {
                    if (err) {
                        cb(err);
                        return;
                    }
                    cb(null, fileName);
                });
            break
        }

    }

    static replaceFile(files, destination, previousPath, previousFile, cb): void {
        destination = destination || '';
        previousFile = previousFile || '';
        cb = cb || function() {};

        Uploads.moveFile(files, destination, function(err, fileName) {
            if (err) {
                cb(err);
                return;
            }
            Uploads.removeFile(path.join(Uploads.resourcesPath, previousPath, previousFile), function(err) {
                if (err) {
                    cb(err);
                    return;
                }
                cb(null, fileName);
            })
        })

    }

    static removeFile(path, cb): void {
        fs.readFile(path, 'utf8', function(err) {
            if (err) {
                cb();
                return;
            }
            fs.unlink(path, function(err) {
                if (err) {
                    cb(err);
                    return;
                }
                cb();
            });
        });
    }

    static saveBase64ToImage(strB64, dir): any {
        try {
            var eregJPG = /^data:image\/jpeg;base64,/,
                eregPNG = /^data:image\/png;base64,/,
                eregImage = strB64.search('data:image/png') !== -1 ? eregPNG : eregJPG,
                extension = strB64.search('data:image/png') !== -1 ? 'png' : 'jpg',
                base64Data = strB64.replace(eregImage, ''),
                binaryData = new Buffer(base64Data, 'base64').toString('binary'),
                randName = randtoken.generate(32),
                writeTo = path.join(dir, randName + "." + extension);
            fs.writeFileSync(writeTo, binaryData, 'binary');
            return {
                'err': null,
                'filename': randName + '.' + extension
            };
        } catch (err) {
            return {
                'err': err
            };
        }
    }

    downloadImage(uri, newName, callback): void {
        try {
            request.head(uri, function(err, res, body) {
                var fileName = newName,
                    writeTo = path.join('public', 'resources', 'tmp', fileName);
                request(uri)
                    .pipe(fs.createWriteStream(writeTo))
                    .on('close', function() {
                        callback(null, fileName)
                    });
            });
        } catch (err) {
            callback(err);
        }
    }

    uploadToS3(params, cb): void {
        let options = {
            s3Options: {
                accessKeyId: params.s3['access-key-id'],
                secretAccessKey: params.s3['secret-access-key'],
                region: params.s3['region']
            }
        };
        let client = s3.createClient(options);

        let s3params = {
            localFile: params.localFile,

            s3Params: {
                Bucket: params.s3['bucket'],
                Key: params.saveAsFile,
            },
        };
        let uploader = client.uploadFile(s3params);
        uploader.on('error', function(err) {
            cb(new Error('Hubo un error al subir la imagen.'));
        });
        uploader.on('end', function() {
            cb(null, params.saveAsFile);
        });
    }

}

