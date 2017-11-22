import * as mongoose from 'mongoose';
import * as Q from 'q';

export class Scrapper {

    static getCities(state, cb): void {
        let options = {
            uri: 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=ciudades-de-mexico&rows=0&start=1&facet=name_1&facet=name_2&refine.name_1=' + state,
            json: true // Automatically parses the JSON string in the response
        };
        require('any-promise/register/q');
        let arrPetitions: any = [],
            arrResults: any = [],
            rp = require('request-promise-any');
        rp(options)
            .then(function (cities) {
                console.log(cities.nhits);
                let steps = Math.ceil(cities.nhits / 5);    
                for (let rows = 0; rows < steps; rows++) {
                    let request: any = rp({
                        uri: 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=ciudades-de-mexico&rows=5&start=' + (rows * 5 + 1) + '&facet=name_1&facet=name_2&refine.name_1=' + state, 
                        json: true
                    });
                    arrPetitions.push(Q(request));
                }
                Q.allSettled(arrPetitions).then((citiesResult) => {
                    for (let index = 0; index < citiesResult.length; index++) {
                        let cityResult = citiesResult[index];
                        if (cityResult.state === "fulfilled" && cityResult.value) {
                            //console.log(cityResult.state);
                            for (let i = 0; i < cityResult.value.records.length; i++) {
                                let city = cityResult.value.records[i], cityClean;
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
    }

}