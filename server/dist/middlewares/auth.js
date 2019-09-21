"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.default = (function (req, res, next) {
    var token = req.headers["x-auth-token"];
    var jwt_secret = process.env.JWT_SECRET;
    if (!jwt_secret)
        return res
            .status(500)
            .send("Environmental variable JWT_SECRET is missing.");
    if (token && typeof token == "string") {
        _verify(token, jwt_secret, res, next);
    }
    else {
        return res.status(401).send("Auth token has not been supplied.");
    }
});
var _verify = function (token, key, res, next) {
    jsonwebtoken_1.default.verify(token, key, function (err) {
        if (err)
            return res.status(401).send("Token is invalid");
        else
            next();
    });
};
