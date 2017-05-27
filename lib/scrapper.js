'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

require('any-promise/register/q');

var _requestPromiseAny = require('request-promise-any');

var _requestPromiseAny2 = _interopRequireDefault(_requestPromiseAny);

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Scrapper = function () {
    function Scrapper() {
        _classCallCheck(this, Scrapper);
    }

    _createClass(Scrapper, null, [{
        key: 'getCities',
        value: function getCities(state, cb) {
            var options = {
                uri: 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=ciudades-de-mexico&rows=0&start=1&facet=name_1&facet=name_2&refine.name_1=' + state,
                json: true // Automatically parses the JSON string in the response
            };

            var arrPetitions = [],
                arrResults = [];
            (0, _requestPromiseAny2.default)(options).then(function (cities) {
                console.log(cities.nhits);
                var steps = Math.ceil(cities.nhits / 5);
                for (var rows = 0; rows < steps; rows++) {
                    var request = (0, _requestPromiseAny2.default)({
                        uri: 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=ciudades-de-mexico&rows=5&start=' + (rows * 5 + 1) + '&facet=name_1&facet=name_2&refine.name_1=' + state,
                        json: true
                    });
                    arrPetitions.push((0, _q2.default)(request));
                }
                _q2.default.allSettled(arrPetitions).then(function (citiesResult) {
                    for (var index = 0; index < citiesResult.length; index++) {
                        var cityResult = citiesResult[index];
                        if (cityResult.state === "fulfilled" && cityResult.value) {
                            //console.log(cityResult.state);
                            for (var i = 0; i < cityResult.value.records.length; i++) {
                                var city = cityResult.value.records[i],
                                    cityClean = void 0;
                                cityClean = {
                                    name: city.fields.name_2,
                                    state: state,
                                    country: city.fields.name_0,
                                    code: city.fields.hasc_2 === undefined ? city.fields.id_2 : city.fields.hasc_2,
                                    geoShape: city.fields.geo_shape
                                };
                                arrResults.push(cityClean);
                            }
                        }
                    }
                    cb(null, arrResults);
                });
            }).catch(function (err) {
                cb(err);
            });
        }
    }]);

    return Scrapper;
}();

module.exports = Scrapper;