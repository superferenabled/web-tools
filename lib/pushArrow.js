'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _arrowdb = require('arrowdb');

var _arrowdb2 = _interopRequireDefault(_arrowdb);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//const arrowDBApp = new ArrowDB('aDltAONfs9jIwrhBrRxqzfb7k9FSbfWx'); //desarrollo
//const arrowDBApp = new ArrowDB('dBej3VguM1fnMnPuJnrtlqkD2LYRWHWO'); //produccion
//const Plans = mongoose.model('Plans');
//const UsersApp = mongoose.model('UsersApp');

/*
    para el plan nuevo, mensaje : "Nuevo plan [nombre plan] de [nombre creador], en el data el id del plan
    para la respuesta, msg : "[nombre usuario] ha [status], para [nombre del plan]", data el id del plan
*/

var Push = function () {
    function Push() {
        _classCallCheck(this, Push);
    }

    _createClass(Push, null, [{
        key: 'init',
        value: function init(params) {
            Push.Plans = params.Plans;
            Push.UsersApp = params.UsersApp;
            Push.arrowDBApp = new _arrowdb2.default(params.arrowApiKey);
        }
    }, {
        key: 'messages',
        value: function messages(type, planId, idUser, cb) {
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
        }
    }, {
        key: 'setData',
        value: function setData(type, data, idUser, cb) {
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
        }
    }, {
        key: 'sendPush',
        value: function sendPush(ids, type, data, idUser) {
            Push.setData(type, data, idUser, function (payload) {
                arrowDBApp.pushNotificationsNotifyTokens({
                    'channel': 'plans',
                    'to_tokens': ids,
                    'payload': payload
                }, function (err, result) {
                    if (err) console.error(err.message);else console.log('Notification sent!', result);
                });
            });
        }
    }]);

    return Push;
}();

module.exports = Push;