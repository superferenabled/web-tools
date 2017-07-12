import ArrowDB from 'arrowdb';
import mongoose from 'mongoose';

//const arrowDBApp = new ArrowDB('AJceOUFZ9yPVvp5rQ7LpDyOOr5dOopZ0'); //desarrollo
//const arrowDBApp = new ArrowDB('nsJi3JGHGLsqpWfhCtLw61ESPZEie3pz'); //produccion
//const Plans = mongoose.model('Plans');
//const UsersApp = mongoose.model('UsersApp');

/*
    para el plan nuevo, mensaje : "Nuevo plan [nombre plan] de [nombre creador], en el data el id del plan
    para la respuesta, msg : "[nombre usuario] ha [status], para [nombre del plan]", data el id del plan
*/

class Push {

    static Plans;
    static UsersApp;
    static arrowDBApp;

    static init(params) {
        Push.Plans = params.Plans;
        Push.UsersApp = params.UsersApp;
        Push.arrowDBApp = new ArrowDB(params.arrowApiKey);
    }

    static messages(type, planId, idUser, cb) {
        Plans.findOne({ _id: planId }, (err, plan) => {
            console.log(plan);
            if (err || !plan) {
                cb({message: '', title: ''});
            }
            if (type === 'newPlan') {
                cb({
                    message: 'Nuevo plan ' + plan.name + ' de ' + plan.host.name + ' ' + plan.host.lastName,
                    title: 'Un amigo te ha invitado a una reunión'
                });
            }
            if (type === 'confirmationPlan' || type === 'rejectPlan') {
                UsersApp.findOne({_id: idUser}, (err, user) => {
                    if (err || user === null) {
                        cb({message: '', title: ''});
                    }
                    cb({
                        message: user.name + ' ' + user.lastName + ' ha decidido ' + (type === 'confirmationPlan' ? '' : 'no ') + 'aceptar tu invitacion.',
                        title: 'Respuesta de invitado.' 
                    });
                });
            }
        });
    }

    static setData (type, data, idUser, cb) {
        Push.messages(type, data.planId, idUser, (texts) => {
            const payload = {
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

    static sendPush (ids, type, data, idUser) {
        Push.setData(type, data, idUser, (payload) => {
            arrowDBApp.pushNotificationsNotifyTokens({
                'channel': 'plans',
                'to_tokens': ids,
                'payload': payload
            }, (err, result) => {
                if (err)
                    console.error(err.message);
                else
                    console.log('Notification sent!', result);
            });
        });
    }

}

module.exports = Push;
