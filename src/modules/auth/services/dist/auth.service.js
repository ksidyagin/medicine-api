"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.AuthService = exports.EmailSend = void 0;
var common_1 = require("@nestjs/common");
var rxjs_1 = require("rxjs");
var bcrypt = require('bcrypt');
var moment = require("moment");
var EmailSend = /** @class */ (function () {
    function EmailSend() {
    }
    return EmailSend;
}());
exports.EmailSend = EmailSend;
var AuthService = /** @class */ (function () {
    function AuthService(jwtService, tokenService, mailerService) {
        this.jwtService = jwtService;
        this.tokenService = tokenService;
        this.mailerService = mailerService;
    }
    AuthService.prototype.generateJWT = function (user) {
        return rxjs_1.from(this.jwtService.signAsync({ user: user }));
    };
    AuthService.prototype.hashPassword = function (password) {
        return rxjs_1.from(bcrypt.hash(password, 12));
    };
    AuthService.prototype.comparePasswords = function (newPassword, passwortHash) {
        return rxjs_1.from(bcrypt.compare(newPassword, passwortHash));
    };
    AuthService.prototype.verifyToken = function (token) {
        try {
            var data = this.jwtService.verify(token);
            var tokenExists = this.tokenService.findOne(data.id, token);
            if (tokenExists) {
                return data;
            }
            throw new common_1.UnauthorizedException();
        }
        catch (error) {
            throw new common_1.UnauthorizedException();
        }
    };
    AuthService.prototype.saveToken = function (UserToken) {
        return __awaiter(this, void 0, void 0, function () {
            var userToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.tokenService.create(UserToken)];
                    case 1:
                        userToken = _a.sent();
                        return [2 /*return*/, userToken];
                }
            });
        });
    };
    AuthService.prototype.generateToken = function (data, options) {
        return this.jwtService.sign(data, options);
    };
    AuthService.prototype.sendEmail = function (user) {
        var expiresIn = 60 * 60 * 24; // 24 hours
        var tokenPayload = {
            id: user.id,
            status: user.status,
            role: user.role
        };
        var expireAt = moment()
            .add(1, 'day')
            .toISOString();
        var token = this.generateToken(tokenPayload, { expiresIn: expiresIn });
        var confirmLink = process.env.API_URL + "/users/confirm?token=" + token;
        this.saveToken({ token: token, uId: user.id, expireAt: expireAt });
        this.mailerService.sendMail({
            to: "" + user.email,
            from: "" + process.env.MAILDEV_USER,
            subject: 'Testing Nest MailerModule ✔',
            text: 'welcome!',
            html: "<b>Welcome!</b> \n           <p>Please use this <a href=\"" + confirmLink + "\">link</a> to confirm your account.</p>\n           Don't tell it anyone!"
        })
            .then(function () { })["catch"](function () { });
    };
    AuthService = __decorate([
        common_1.Injectable()
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
