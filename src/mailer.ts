import * as nodemailer from 'nodemailer';
import * as smtpTransport from 'nodemailer-smtp-transport';
import * as EmailTemplates from 'email-templates';
import * as path from 'path';
import * as ejs from 'ejs';

export class Mailer {

    static templatesDir = path.resolve(__dirname, '..', 'templates');

    static transporter = nodemailer.createTransport(
        smtpTransport({
            service: 'Gmail',
            auth: {
                user: 'no-reply@goin.mx',
                pass: '3964eef4ec2c75c1e3cf99ddb1535982'
            }
        })
    );

    static locals = {
        email: 'no-reply@goin.mx',
        name: {
            first: 'Sin',
            last: 'Respuesta'
        }
    };

    static sendAsHTML(to, subject, content, cb): void {
        //console.log(this.transporter.transporter.options)
        Mailer.transporter.sendMail({
            'from': 'no-reply@goin.mx',
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
        let email = new EmailTemplates({
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
        let usersEmails = users.map(usr => usr.email);
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
        }).then((result) => {
            console.log('Email SUCCESS!', result);
            cb(null);
        }).catch((err) => {
            console.log('Email FAIL!', err);
            cb(err);
        });
    }

}




