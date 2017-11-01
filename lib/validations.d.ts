export default class Validations {
    static email(emailText: any): boolean;
    static base64(str: any): boolean;
    static objectId(str: any): boolean;
    static integer(num: any): boolean;
    static date(date: any): boolean;
    static phone(number: any): boolean;
    static securePassword(pass: any): boolean;
}
