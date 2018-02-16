import * as nodemailer from 'nodemailer';
import * as smtpTransport from 'nodemailer-smtp-transport';
import * as EmailTemplates from 'email-templates';
import * as path from 'path';
import * as ejs from 'ejs';

export class Mailer {

    private transporter: any;

    constructor(private authProvider: string, private authUser: string, private authPass: string, private templatesDir: string) {
        this.initTransporter()
    }

    private initTransporter() {
        this.transporter = nodemailer.createTransport(
            smtpTransport({
                service: this.authProvider,
                auth: {
                    user: this.authUser,
                    pass: this.authPass
                }
            })
        );
    }

    public sendAsHTML(to, subject, content, done): void {
        this.transporter.sendMail({
            from: this.authUser,
            to,
            subject,
            html: content
        }, function(err, info) {
            if(err){
                done(err);
            } else {
                done(null, info);
            }
        })
    };

    public sendEmail (users: any[] , subject: string, replyTo: string = 'no-reply@goin.mx', fromName: string = 'Soporte de GOIN', templateName: string, attachments: any, data: any, done: Function): void {
        let emailTpl = new EmailTemplates({
            from: `${fromName} <${this.authUser}>`,
            views: {
                root: this.templatesDir,
                options: {
                    extension: 'ejs'
                }
            },
            send: true,
            transport: this.transporter
        });
        let usersEmails = users.map(usr => usr.email);
        emailTpl.send({
            template: templateName,
            locals: data,
            message: {
                from: `${fromName} <${this.authUser}>`,
                to: usersEmails.join(),
                bcc: 'superferenabled@gmail.com,rafaelebenezer@gmail.com',
                replyTo: replyTo,
                subject: subject,
                attachments: attachments
            }
        }).then((result) => {
            console.log('Email SUCCESS!', result);
            done(null);
        }).catch((err) => {
            console.log('Email FAIL!', err);
            done(err);
        });
    }

}




