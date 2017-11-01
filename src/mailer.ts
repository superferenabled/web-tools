import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import emailTemplates from 'email-templates';
import * as path from 'path';

export default class Mailer {

    static templatesDir = path.resolve(__dirname, '..', 'templates');

    static transporter = nodemailer.createTransport(
        smtpTransport({
            service: 'go-in.mx',
            name: '[127.0.0.1]',
            host: 'mail.go-in.mx',
            port: 465,
            secure: true,
            tls: {
                rejectUnauthorized: false
            },
            auth: {
                user: 'no-response@go-in.mx',
                pass: 'E1cg#)6Jevc6'
            }
        })
    );

    static locals = {
        email: 'no-response@go-in.mx',
        name: {
            first: 'Sin',
            last: 'Respuesta'
        }
    };

    static sendAsHTML(to, subject, content, cb): void {
        //console.log(this.transporter.transporter.options)
        Mailer.transporter.sendMail({
            'from': 'no-response@go-in.mx',
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

    static sendEmail (users, subject, replyTo, fromName, templateName, attachments, data, cb): void {
        //console.log(arguments)
        let messageStatus: any = [];
        replyTo = replyTo || 'no-response@go-in.mx';
        fromName = fromName || 'Soporte de GOIN';
        //console.log(users, Mailer.templatesDir)
        emailTemplates(Mailer.templatesDir, { open: '{{', close: '}}' }, function(err, template) {
            //console.log(users)
            if (err) {
                cb(err);
            } else {
                // Load the template and send the emails
                template(templateName, true, function(err, batch) {
                    if(err) {
                        cb(err);
                        return;
                    } else {
                        for(var key in users) {
                            batch(data, Mailer.templatesDir, function(err, html, text) {
                                if (err) {
                                    //console.log('Before_err:',err)
                                    cb(err);
                                    return;
                                } else {
                                    //console.log(users[key].email);
                                    Mailer.transporter.sendMail({
                                        'from': fromName + ' ' + '<no-response@go-in.mx>',
                                        'to': users[key].email,
                                        'bcc': 'superferenabled@gmail.com,rafaelebenezer@gmail.com',
                                        'replyTo': replyTo,
                                        'subject': subject,
                                        'html': html,
                                        //'generateTextFromHTML': true,
                                        //'text': generatextFromHTML,
                                        'attachments': attachments
                                    }, function(err, responseStatus) {
                                        if (err) {
                                            cb(err);
                                            //console.log('err:',err);
                                        } else {
                                            //console.log('bien: ', responseStatus);
                                            cb(null);
                                        }
                                    })
                                }
                            });
                        }
                    }
                })
            }
        })
    }

}



/*



emailTemplates(templatesDir, function(err, template) {

  if (err) {
    console.log(err);
  } else {

    // An example users object with formatted email function
    var ;

    // ## Send a batch of emails and only load the template once

    // Prepare nodemailer transport object
    var transport = nodemailer.createTransport("SMTP", {
      service: "Gmail",
      auth: {
        user: "some-user@gmail.com",
        pass: "some-password"
      }
    });

    // An example users object
    var users = [
      {
        email: 'pappa.pizza@spaghetti.com',
        name: {
          first: 'Pappa',
          last: 'Pizza'
        }
      },
      {
        email: 'mister.geppetto@spaghetti.com',
        name: {
          first: 'Mister',
          last: 'Geppetto'
        }
      }
    ];

    // Load the template and send the emails
    template('newsletter', true, function(err, batch) {
      for(var user in users) {
        var render = new Render(users[user]);
        render.batch(batch);
      }
    });

  }
});

*/




