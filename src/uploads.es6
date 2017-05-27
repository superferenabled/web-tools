var fs = require('fs'),
    path = require('path'),
    uuid = require('uuid'),
    request = require('request'),
    randtoken = require('rand-token').generator();

module.exports = (function() {

    return {

        'resourcesPath': path.join(__dirname, '..', 'public', 'app', 'resources'),

        'mkdirSync': function(path, cb) {
            try {
                fs.mkdirSync(path, '0766');
                cb(null);
            } catch (err) {
                if (err.code != 'EEXIST') {
                    cb(err);
                    return;
                }
            }
        },

        'checkDir': function(dirPath) {
            var Uploads = this;
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
        },

        'copyFiles': function(oFiles, previousPath, DestinyPath, cb) {
            if (oFiles !== undefined && oFiles.length > 0) {
                for (files in oFiles) {
                    //if(){
                    fs.rename(path.join(previousPath, oFiles[files].sFile), path.join(DestinyPath, oFiles[files].sFile),
                        function(err) {
                            if (err) {
                                cb(err);
                                return;
                            }
                        });
                    //}
                }
            }
            cb(null);
            return;
            //}
            //cb(null)
        },

        'copyMoveFiles': function(oFiles, previousPath, DestinyPath, cb) {
            var Upload = this;
            //console.log("antes de--------------->",oFiles)
            if (oFiles !== undefined && oFiles.length > 0) {
                for (files in oFiles) {
                    //console.log("PEDORRETEEEEEEEEEE _---------------->",typeof oFiles[files].active,"<------------------------------------------")
                    if (oFiles[files].active === "true") {
                        console.log("--------->SI esta Activo<---------");
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
                                Upload.removeFile(path.join(DestinyPath, oFiles[files].FileActual), function(err) {
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
                            console.log("Only Copy");
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

        },

        'moveFile': function(files, destination, cb) {

            if (!!!files) {
                cb(new Error('First parameter is mandatory (req.files)'));
                return;
            }
            destination = destination || '';
            cb = cb || function() {};

            var Upload = this,
                fullDestinyPath = path.join(Upload.resourcesPath, destination),
                fileName = uuid.v1();

            for (file in files) {
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

        },

        'replaceFile': function(files, destination, previousPath, previousFile, cb) {
            var Upload = this;
            destination = destination || '';
            previousFile = previousFile || '';
            cb = cb || function() {};

            Upload.moveFile(files, destination, function(err, fileName) {
                if (err) {
                    cb(err);
                    return;
                }
                Upload.removeFile(path.join(Upload.resourcesPath, previousPath, previousFile), function(err) {
                    if (err) {
                        cb(err);
                        return;
                    }
                    cb(null, fileName);
                })
            })

        },

        'removeFile': function(path, cb) {
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
        },


        'saveBase64ToImage': function(strB64, dir) {
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
        },

        'downloadImage': function(uri, callback) {
            try {
                request.head(uri, function(err, res, body) {
                    var fileName = randtoken.generate(32) + '.jpg',
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

    }

}());