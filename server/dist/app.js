"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
var PORT = Number(process.env.PORT) || 5000;
app.listen(PORT, function () {
    console.log("Listening on " + PORT + " port...");
});
