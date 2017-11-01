"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var arrowdb_1 = require("arrowdb");
//const arrowDBApp = new ArrowDB('aDltAONfs9jIwrhBrRxqzfb7k9FSbfWx'); //desarrollo
//const arrowDBApp = new ArrowDB('dBej3VguM1fnMnPuJnrtlqkD2LYRWHWO'); //produccion
//const Plans = mongoose.model('Plans');
//const UsersApp = mongoose.model('UsersApp');
/*
    para el plan nuevo, mensaje : "Nuevo plan [nombre plan] de [nombre creador], en el data el id del plan
    para la respuesta, msg : "[nombre usuario] ha [status], para [nombre del plan]", data el id del plan
*/
var Push = /** @class */ (function () {
    function Push() {
    }
    Push.init = function (params) {
        Push.Plans = params.Plans;
        Push.UsersApp = params.UsersApp;
        Push.arrowDBApp = new arrowdb_1.default(params.arrowApiKey);
    };
    Push.messages = function (type, planId, idUser, cb) {
        Plans.findOne({ _id: planId }, function (err, plan) {
            console.log(plan);
            if (err || !plan) {
                cb({ message: '', title: '' });
            }
            if (type === 'newPlan') {
                cb({
                    message: 'Nuevo plan ' + plan.name + ' de ' + plan.host.name + ' ' + plan.host.lastName,
                    title: 'Un amigo te ha invitado a una reunión'
                });
            }
            if (type === 'confirmationPlan' || type === 'rejectPlan') {
                UsersApp.findOne({ _id: idUser }, function (err, user) {
                    if (err || user === null) {
                        cb({ message: '', title: '' });
                    }
                    cb({
                        message: user.name + ' ' + user.lastName + ' ha decidido ' + (type === 'confirmationPlan' ? '' : 'no ') + 'aceptar tu invitacion.',
                        title: 'Respuesta de invitado.'
                    });
                });
            }
        });
    };
    Push.setData = function (type, data, idUser, cb) {
        Push.messages(type, data.planId, idUser, function (texts) {
            var payload = {
                alert: texts.message,
                badge: 1,
                title: texts.title,
                vibrate: false,
                info: data,
                icon: 'appicon',
                typeEmit: type
            };
            cb(payload);
        });
        // return JSON.stringify(payload);
    };
    Push.sendPush = function (ids, type, data, idUser) {
        Push.setData(type, data, idUser, function (payload) {
            arrowDBApp.pushNotificationsNotifyTokens({
                'channel': 'plans',
                'to_tokens': ids,
                'payload': payload
            }, function (err, result) {
                if (err)
                    console.error(err.message);
                else
                    console.log('Notification sent!', result);
            });
        });
    };
    return Push;
}());
module.exports = Push;
