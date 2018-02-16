"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");
var EmailTemplates = require("email-templates");
var Mailer = /** @class */ (function () {
    function Mailer(authProvider, authUser, authPass, templatesDir) {
        this.authProvider = authProvider;
        this.authUser = authUser;
        this.authPass = authPass;
        this.templatesDir = templatesDir;
        this.initTransporter();
    }
    Mailer.prototype.initTransporter = function () {
        this.transporter = nodemailer.createTransport(smtpTransport({
            service: this.authProvider,
            auth: {
                user: this.authUser,
                pass: this.authPass
            }
        }));
    };
    Mailer.prototype.sendAsHTML = function (to, subject, content, done) {
        this.transporter.sendMail({
            from: this.authUser,
            to: to,
            subject: subject,
            html: content
        }, function (err, info) {
            if (err) {
                done(err);
            }
            else {
                done(null, info);
            }
        });
    };
    ;
    Mailer.prototype.sendEmail = function (users, subject, replyTo, fromName, templateName, attachments, data, done) {
        if (replyTo === void 0) { replyTo = 'no-reply@goin.mx'; }
        if (fromName === void 0) { fromName = 'Soporte de GOIN'; }
        var emailTpl = new EmailTemplates({
            from: fromName + " <" + this.authUser + ">",
            views: {
                root: this.templatesDir,
                options: {
                    extension: 'ejs'
                }
            },
            send: true,
            transport: this.transporter
        });
        var usersEmails = users.map(function (usr) { return usr.email; });
        emailTpl.send({
            template: templateName,
            locals: data,
            message: {
                from: fromName + " <" + this.authUser + ">",
                to: usersEmails.join(),
                bcc: 'superferenabled@gmail.com,rafaelebenezer@gmail.com',
                replyTo: replyTo,
                subject: subject,
                attachments: attachments
            }
        }).then(function (result) {
            console.log('Email SUCCESS!', result);
            done(null);
        }).catch(function (err) {
            console.log('Email FAIL!', err);
            done(err);
        });
    };
    return Mailer;
}());
exports.Mailer = Mailer;
