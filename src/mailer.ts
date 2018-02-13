import * as nodemailer from 'nodemailer';
import * as smtpTransport from 'nodemailer-smtp-transport';
import * as EmailTemplates from 'email-templates';
import * as path from 'path';
import * as ejs from 'ejs';

export class Mailer {

    static templatesDir = path.resolve(__dirname, '..', 'templates');

    static transporter: any;

    static authProvider: string;
    static authUser: string;
    static authPass: string;

    static locals = {
        email: 'no-reply@goin.mx',
        name: {
            first: 'Sin',
            last: 'Respuesta'
        }
    };

    static initTransporter() {
        Mailer.transporter = nodemailer.createTransport(
            smtpTransport({
                service: Mailer.authProvider,
                auth: {
                    user: Mailer.authUser,
                    pass: Mailer.authPass
                }
            })
        );
    }

    static sendAsHTML(to, subject, content, cb): void {
        //console.log(this.transporter.transporter.options)
        Mailer.initTransporter();

        Mailer.transporter.sendMail({
            'from': Mailer.authUser,
            'to': to,
            'subject': subject,
            'html': content
        }, function(err, info) {
            if(err){
                cb(err);
            } else {
                cb(null, info);
            }
        })
    };

    static sendEmail (users, subject, replyTo = 'no-reply@goin.mx', fromName = 'Soporte de GOIN', templateName, attachments, data, cb): void {
        Mailer.initTransporter();
        let emailTpl = new EmailTemplates({
            from: `${fromName} <${Mailer.authUser}>`,
            views: {
                root: Mailer.templatesDir,
                options: {
                    extension: 'ejs'
                }
            },
            send: true,
            transport: Mailer.transporter
        });
        let usersEmails = users.map(usr => usr.email);
        emailTpl.send({
            template: templateName,
            locals: data,
            message: {
                from: `${fromName} <${Mailer.authUser}>`,
                to: usersEmails.join(),
                bcc: 'superferenabled@gmail.com,rafaelebenezer@gmail.com',
                replyTo: replyTo,
                subject: subject,
                attachments: attachments
            }
        }).then((result) => {
            console.log('Email SUCCESS!', result);
            cb(null);
        }).catch((err) => {
            console.log('Email FAIL!', err);
            cb(err);
        });
    }

}




