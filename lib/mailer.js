"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");
var EmailTemplates = require("email-templates");
var path = require("path");
var Mailer = /** @class */ (function () {
    function Mailer() {
    }
    Mailer.sendAsHTML = function (to, subject, content, cb) {
        //console.log(this.transporter.transporter.options)
        Mailer.transporter.sendMail({
            'from': 'no-reply@goin.mx',
            'to': to,
            'subject': subject,
            'html': content
        }, function (err, info) {
            if (err) {
                cb(err);
            }
            else {
                cb(null, info);
            }
        });
    };
    ;
    Mailer.sendEmail = function (users, subject, replyTo, fromName, templateName, attachments, data, cb) {
        if (replyTo === void 0) { replyTo = 'no-reply@goin.mx'; }
        if (fromName === void 0) { fromName = 'Soporte de GOIN'; }
        var email = new EmailTemplates({
            from: fromName + ' ' + '<no-reply@goin.mx>',
            views: {
                root: Mailer.templatesDir,
                options: {
                    extension: 'ejs'
                }
            },
            send: true,
            transport: Mailer.transporter
        });
        var usersEmails = users.map(function (usr) { return usr.email; });
        email.send({
            template: templateName,
            locals: data,
            message: {
                from: fromName + ' ' + '<no-reply@goin.mx>',
                to: usersEmails.join(),
                bcc: 'superferenabled@gmail.com,rafaelebenezer@gmail.com',
                replyTo: replyTo,
                subject: subject,
                attachments: attachments
            }
        }).then(function (result) {
            console.log('Email SUCCESS!', result);
            cb(null);
        }).catch(function (err) {
            console.log('Email FAIL!', err);
            cb(err);
        });
    };
    Mailer.templatesDir = path.resolve(__dirname, '..', 'templates');
    Mailer.transporter = nodemailer.createTransport(smtpTransport({
        service: 'Gmail',
        auth: {
            user: 'no-reply@goin.mx',
            pass: '3964eef4ec2c75c1e3cf99ddb1535982'
        }
    }));
    Mailer.locals = {
        email: 'no-reply@goin.mx',
        name: {
            first: 'Sin',
            last: 'Respuesta'
        }
    };
    return Mailer;
}());
exports.Mailer = Mailer;
