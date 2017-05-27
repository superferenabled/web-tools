'use strict';

var nodemailer = require('nodemailer'),
    smtpTransport = require('nodemailer-smtp-transport'),
    emailTemplates = require('email-templates'),
    path = require('path');

module.exports = function () {

    return {

        'templatesDir': path.resolve(__dirname, '..', 'templates'),

        'transporter': nodemailer.createTransport(smtpTransport({
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
        })),

        'locals': {
            email: 'no-response@go-in.mx',
            name: {
                first: 'Sin',
                last: 'Respuesta'
            }
        },

        'sendAsHTML': function sendAsHTML(to, subject, content, cb) {
            //console.log(this.transporter.transporter.options)
            this.transporter.sendMail({
                'from': 'no-response@go-in.mx',
                'to': to,
                'subject': subject,
                'html': content
            }, function (err, info) {
                if (err) {
                    cb(err);
                } else {
                    cb(null, info);
                }
            });
        },

        'sendEmail': function sendEmail(users, subject, replyTo, fromName, templateName, attachments, data, cb) {
            //console.log(arguments)
            var mailer = this,
                messageStatus = [];
            replyTo = replyTo || 'no-response@go-in.mx';
            fromName = fromName || 'Soporte de GOIN';
            //console.log(users, mailer.templatesDir)
            emailTemplates(mailer.templatesDir, { open: '{{', close: '}}' }, function (err, template) {
                //console.log(users)
                if (err) {
                    cb(err);
                } else {
                    // Load the template and send the emails
                    template(templateName, true, function (err, batch) {
                        if (err) {
                            cb(err);
                            return;
                        } else {
                            for (var key in users) {
                                batch(data, mailer.templatesDir, function (err, html, text) {
                                    if (err) {
                                        //console.log('Before_err:',err)
                                        cb(err);
                                        return;
                                    } else {
                                        //console.log(users[key].email);
                                        mailer.transporter.sendMail({
                                            'from': fromName + ' ' + '<no-response@go-in.mx>',
                                            'to': users[key].email,
                                            'bcc': 'superferenabled@gmail.com,rafaelebenezer@gmail.com',
                                            'replyTo': replyTo,
                                            'subject': subject,
                                            'html': html,
                                            //'generateTextFromHTML': true,
                                            //'text': generatextFromHTML,
                                            'attachments': attachments
                                        }, function (err, responseStatus) {
                                            if (err) {
                                                cb(err);
                                                //console.log('err:',err);
                                            } else {
                                                //console.log('bien: ', responseStatus);
                                                cb(null);
                                            }
                                        });
                                    }
                                });
                            }
                        }
                    });
                }
            });
        }

    };
}();

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