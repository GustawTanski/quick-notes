"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (req, res, next) {
    var b64auth = (req.headers.authorization || "").split(" ")[1] || "";
    var _a = new Buffer(b64auth, "base64")
        .toString()
        .split(":"), username = _a[0], password = _a[1];
    req.body = { email: username, password: password };
    return next();
});
