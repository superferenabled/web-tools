export declare class Mailer {
    private authProvider;
    private authUser;
    private authPass;
    private templatesDir;
    private transporter;
    constructor(authProvider: string, authUser: string, authPass: string, templatesDir: string);
    private initTransporter();
    sendAsHTML(to: any, subject: any, content: any, done: any): void;
    sendEmail(users: any[], subject: string, replyTo: string | undefined, fromName: string | undefined, templateName: string, attachments: any, data: any, done: Function): void;
}
