export declare class Mailer {
    static templatesDir: string;
    static transporter: any;
    static locals: {
        email: string;
        name: {
            first: string;
            last: string;
        };
    };
    static sendAsHTML(to: any, subject: any, content: any, cb: any): void;
    static sendEmail(users: any, subject: any, replyTo: any, fromName: any, templateName: any, attachments: any, data: any, cb: any): void;
}
