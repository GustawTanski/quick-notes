"use strict";
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
var mongoose_1 = __importStar(require("mongoose"));
var joi_1 = __importDefault(require("joi"));
var crypto_random_string_1 = __importDefault(require("crypto-random-string"));
var userSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true, minlength: 5, maxlength: 255 },
    password: { type: String, required: true, minlength: 5, maxlength: 1024 },
    accountVerificationToken: { type: String, default: crypto_random_string_1.default({ length: 64, type: "url-safe" }) },
    isVerified: { type: Boolean, default: false },
    passwordRecoveryToken: String,
    passwordRecoveryExpiration: Date
});
exports.validate = function (user) {
    var validationSchema = {
        email: joi_1.default.string().min(5).max(255).required().email(),
        password: joi_1.default.string().min(5).max(255).required()
    };
    return joi_1.default.validate(user, validationSchema);
};
var User = mongoose_1.default.model("User", userSchema);
exports.default = User;
