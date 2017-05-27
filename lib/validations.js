'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _atob = require('atob');

var _atob2 = _interopRequireDefault(_atob);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ObjectId = _mongoose2.default.Types.ObjectId;

var Validations = function () {
    function Validations() {
        _classCallCheck(this, Validations);
    }

    _createClass(Validations, null, [{
        key: 'email',
        value: function email(emailText) {
            var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            return emailRegex.test(emailText);
        }
    }, {
        key: 'base64',
        value: function base64(str) {
            try {
                str = str.replace('data:image/jpeg;base64,', '', str);
                str = str.replace('data:image/png;base64,', '', str);
                (0, _atob2.default)(str);
                return str !== '';
            } catch (err) {
                return false;
            }
        }
    }, {
        key: 'objectId',
        value: function objectId(str) {
            return ObjectId.isValid(str);
        }
    }, {
        key: 'integer',
        value: function integer(num) {
            num = parseInt(num);
            return num === parseInt(num, 10);
        }
    }, {
        key: 'date',
        value: function date(_date) {
            return _date instanceof Date && !isNaN(_date.valueOf());
        }
    }, {
        key: 'phone',
        value: function phone(number) {
            return (/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/.test(number)
            );
        }
    }, {
        key: 'securePassword',
        value: function securePassword(pass) {
            return (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\!\"\#\$\%\&\'\(\)\*\+\,\-\.\/\:\;\<\=\>\?\@\[\\\]\^\_\`\{\|\}\~\)]).+$/.test(pass)
            );
        }
    }]);

    return Validations;
}();

module.exports = Validations;