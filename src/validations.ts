import * as atob from 'atob';
import * as mongoose from 'mongoose';
let ObjectId = mongoose.Types.ObjectId;

export class Validations {

    static email(emailText) {
        var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailRegex.test(emailText);
    }

    static base64(str) {
        try {
            str = str.replace('data:image/jpeg;base64,', '', str);
            str = str.replace('data:image/png;base64,', '', str);
            atob(str);
            return str !== '';
        } catch (err) {
            return false;
        }
    }

    static objectId(str) {
        return ObjectId.isValid(str);
    }

    static integer(num) {
        num = parseInt(num);
        return (num === parseInt(num, 10));
    }

    static date(date) {
        return date instanceof Date && !isNaN(date.valueOf());
    }
    
    static phone(number) {
        return /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/.test(number);
    }

    static securePassword(pass) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\!\"\#\$\%\&\'\(\)\*\+\,\-\.\/\:\;\<\=\>\?\@\[\\\]\^\_\`\{\|\}\~\)]).+$/.test(pass);
    }

}
