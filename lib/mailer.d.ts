export declare class Mailer {
    static templatesDir: string;
    static transporter: any;
    static authProvider: string;
    static authUser: string;
    static authPass: string;
    static locals: {
        email: string;
        name: {
            first: string;
            last: string;
        };
    };
    static initTransporter(): void;
    static sendAsHTML(to: any, subject: any, content: any, cb: any): void;
    static sendEmail(users: any, subject: any, replyTo: string | undefined, fromName: string | undefined, templateName: any, attachments: any, data: any, cb: any): void;
}
