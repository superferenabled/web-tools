"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var atob = require("atob");
var mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;
var Validations = /** @class */ (function () {
    function Validations() {
    }
    Validations.email = function (emailText) {
        var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailRegex.test(emailText);
    };
    Validations.base64 = function (str) {
        try {
            str = str.replace('data:image/jpeg;base64,', '', str);
            str = str.replace('data:image/png;base64,', '', str);
            atob(str);
            return str !== '';
        }
        catch (err) {
            return false;
        }
    };
    Validations.objectId = function (str) {
        return ObjectId.isValid(str);
    };
    Validations.integer = function (num) {
        num = parseInt(num);
        return (num === parseInt(num, 10));
    };
    Validations.date = function (date) {
        return date instanceof Date && !isNaN(date.valueOf());
    };
    Validations.phone = function (number) {
        return /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/.test(number);
    };
    Validations.securePassword = function (pass) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\!\"\#\$\%\&\'\(\)\*\+\,\-\.\/\:\;\<\=\>\?\@\[\\\]\^\_\`\{\|\}\~\)]).+$/.test(pass);
    };
    return Validations;
}());
exports.Validations = Validations;
