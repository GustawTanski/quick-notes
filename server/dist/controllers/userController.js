"use strict";
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = __importStar(require("../models/User"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var crypto_random_string_1 = __importDefault(require("crypto-random-string"));
var nodemailer_1 = __importDefault(require("nodemailer"));
var nodemailer_smtp_transport_1 = __importDefault(require("nodemailer-smtp-transport"));
var userController = {
    registerUser: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var error;
            return __generator(this, function (_a) {
                error = User_1.validate(req.body).error;
                if (error)
                    return [2 /*return*/, res.status(400).send(error.details[0].message)];
                _saveNewUser(req, res);
                return [2 /*return*/];
            });
        });
    },
    verifyEmail: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, User_1.default.findOne({ accountVerificationToken: req.params.token })];
                    case 1:
                        user = _a.sent();
                        if (!(user && req.params.token === user.accountVerificationToken)) return [3 /*break*/, 3];
                        user.isVerified = true;
                        user.accountVerificationToken = "";
                        return [4 /*yield*/, user.save()];
                    case 2:
                        _a.sent();
                        res.status(200).send("Your account has been successfuly verified. You can start using it now!");
                        return [3 /*break*/, 4];
                    case 3:
                        res.status(400).send("Invalid validation token or your account has already been verified.");
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
    loginUser: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var error, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        error = User_1.validate(req.body).error;
                        if (error)
                            return [2 /*return*/, res.status(400).send(error.details[0].message)];
                        return [4 /*yield*/, User_1.default.findOne({ email: req.body.email })];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            return [2 /*return*/, res.status(401).send("User with this e-mail address doesn't exist.")];
                        return [4 /*yield*/, _verifyAndGenerateJWT(req, res, user)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    },
    renderInputEmailForm: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                res.render("inputEmailForm");
                return [2 /*return*/];
            });
        });
    },
    passwordRecoveryEmail: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, User_1.default.findOne({ email: req.body.email })];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            return [2 /*return*/, res.status(401).send("User with this e-mail address doesn't exist.")];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, _generateRecoveryToken(user)];
                    case 3:
                        user = _a.sent();
                        return [4 /*yield*/, _sendRecoveryMail(res, user)];
                    case 4:
                        _a.sent();
                        res.render("passwordRecoveryEmailSent");
                        return [3 /*break*/, 6];
                    case 5:
                        e_1 = _a.sent();
                        res.status(500).send();
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    },
    renderPasswordRecoveryForm: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                res.render("passwordRecoveryForm");
                return [2 /*return*/];
            });
        });
    },
    updateUserPassword: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, User_1.default.findOne({ passwordRecoveryToken: req.body.token })];
                    case 1:
                        user = _a.sent();
                        if (!(user && _isRecoveryTokenValid(user, req.body.token))) return [3 /*break*/, 3];
                        if (req.body.password !== req.body.password2)
                            res.status(400).send("Provided passwords don't match.");
                        return [4 /*yield*/, _deleteValidationTokenAndUpdatePassword(user, req.body.password)
                                .catch(function (e) { return res.status(400).send("You have not provided enough data."); })];
                    case 2:
                        _a.sent();
                        res.render("finishPasswordRecovery");
                        return [3 /*break*/, 4];
                    case 3:
                        res.status(400).send("Invalid password recovery token.");
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
};
exports.default = userController;
var _saveNewUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, _a, _b, e_2;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, User_1.default.findOne({ email: req.body.email })];
            case 1:
                user = _c.sent();
                if (user)
                    return [2 /*return*/, res.status(400).send("User with this e-mail address already exists.")];
                _a = User_1.default.bind;
                _b = {
                    email: req.body.email
                };
                return [4 /*yield*/, _hashPassword(req.body.password)];
            case 2:
                user = new (_a.apply(User_1.default, [void 0, (_b.password = _c.sent(),
                        _b)]))();
                _c.label = 3;
            case 3:
                _c.trys.push([3, 6, , 7]);
                return [4 /*yield*/, _sendVerificationEmail(res, user)];
            case 4:
                _c.sent();
                return [4 /*yield*/, user.save()];
            case 5:
                _c.sent();
                res.status(200).send("Successfuly registered user " + user.email + ".");
                return [3 /*break*/, 7];
            case 6:
                e_2 = _c.sent();
                res.status(400).send("Unable to send a verification e-mail or to register a new user.");
                console.log(e_2);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
var _hashPassword = function (password) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, bcryptjs_1.default.hash(password, 10)];
    });
}); };
var _verifyAndGenerateJWT = function (req, res, user) { return __awaiter(void 0, void 0, void 0, function () {
    var isPasswordCorrect, jwt_secret;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, bcryptjs_1.default.compare(req.body.password, user.password)];
            case 1:
                isPasswordCorrect = _a.sent();
                if (!isPasswordCorrect)
                    return [2 /*return*/, res.status(400).send("Incorrect password.")];
                if (!user.isVerified)
                    return [2 /*return*/, res.status(401).send("This account isn't verified yet.")];
                jwt_secret = process.env.JWT_SECRET;
                if (!jwt_secret)
                    return [2 /*return*/, res.status(500).send("Environmental variable JWT_SECRET is missing.")];
                res.header("x-auth-token", jsonwebtoken_1.default.sign({ email: user.email }, jwt_secret))
                    .status(200)
                    .send("Logged in successfuly.");
                return [2 /*return*/];
        }
    });
}); };
var _sendVerificationEmail = function (res, user) {
    var url = "https://quick-notes-253112.appspot.com/verify/" + user.accountVerificationToken;
    var mailOptions = {
        from: "quicknotes.bootcamp@gmail.com",
        to: user.email,
        subject: "Quick-notes account verification",
        html: "\n            Your Quick-notes account needs to be verified before you start using it.\n            You can do so by clicking <a href=" + url + ">here</a>, or opening the link below:<br><br>\n            <a href=" + url + ">" + url + "</a>\n            "
    };
    return _sendMail(mailOptions);
};
var _sendRecoveryMail = function (res, user) {
    var url = "https://quick-notes-253112.appspot.com/recover?token=" + user.passwordRecoveryToken;
    var mailOptions = {
        from: "quicknotes.bootcamp@gmail.com",
        to: user.email,
        subject: "Quick-notes password recovery",
        html: "\n            To change your forgotten password click <a href=" + url + ">here</a>, or open the link below:<br><br>\n            <a href=" + url + ">" + url + "</a>\n            "
    };
    return _sendMail(mailOptions);
};
var _generateRecoveryToken = function (user) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user.passwordRecoveryToken = crypto_random_string_1.default({ length: 64, type: "url-safe" });
                user.passwordRecoveryExpiration = new Date(Date.now() + 1000 * 60 * 60);
                return [4 /*yield*/, user.save()];
            case 1:
                _a.sent();
                return [2 /*return*/, user];
        }
    });
}); };
var _isRecoveryTokenValid = function (user, token) { return __awaiter(void 0, void 0, void 0, function () {
    var expiration, hasTokenExpired, isTokenValid;
    return __generator(this, function (_a) {
        expiration = user.passwordRecoveryExpiration;
        if (!expiration)
            return [2 /*return*/, false];
        hasTokenExpired = expiration.getMilliseconds() > Date.now();
        isTokenValid = user.passwordRecoveryToken === token;
        return [2 /*return*/, hasTokenExpired && isTokenValid];
    });
}); };
var _deleteValidationTokenAndUpdatePassword = function (user, password) { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                user.passwordRecoveryToken = "";
                user.passwordRecoveryExpiration = new Date(0);
                _a = user;
                return [4 /*yield*/, _hashPassword(password)];
            case 1:
                _a.password = _b.sent();
                return [4 /*yield*/, user.save()];
            case 2:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); };
var _sendMail = function (mailOptions) {
    var transporter = nodemailer_1.default.createTransport(nodemailer_smtp_transport_1.default({
        service: "gmail",
        host: "smtp.gmail.com",
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS
        }
    }));
    return transporter.sendMail(mailOptions);
};
