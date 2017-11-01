"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("any-promise/register/q");
var rp = require("request-promise-any");
var Q = require("q");
var Scrapper = /** @class */ (function () {
    function Scrapper() {
    }
    Scrapper.getCities = function (state, cb) {
        var options = {
            uri: 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=ciudades-de-mexico&rows=0&start=1&facet=name_1&facet=name_2&refine.name_1=' + state,
            json: true // Automatically parses the JSON string in the response
        };
        var arrPetitions = [], arrResults = [];
        rp(options)
            .then(function (cities) {
            console.log(cities.nhits);
            var steps = Math.ceil(cities.nhits / 5);
            for (var rows = 0; rows < steps; rows++) {
                var request = rp({
                    uri: 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=ciudades-de-mexico&rows=5&start=' + (rows * 5 + 1) + '&facet=name_1&facet=name_2&refine.name_1=' + state,
                    json: true
                });
                arrPetitions.push(Q(request));
            }
            Q.allSettled(arrPetitions).then(function (citiesResult) {
                for (var index = 0; index < citiesResult.length; index++) {
                    var cityResult = citiesResult[index];
                    if (cityResult.state === "fulfilled" && cityResult.value) {
                        //console.log(cityResult.state);
                        for (var i = 0; i < cityResult.value.records.length; i++) {
                            var city = cityResult.value.records[i], cityClean = void 0;
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
        })
            .catch(function (err) {
            cb(err);
        });
    };
    return Scrapper;
}());
exports.Scrapper = Scrapper;
