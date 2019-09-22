"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var users_1 = __importDefault(require("./routes/users"));
var auth_1 = __importDefault(require("./middlewares/auth"));
var notesModule_1 = __importDefault(require("./notesModule/notesModule"));
var cors_1 = __importDefault(require("cors"));
var path_1 = __importDefault(require("path"));
require("dotenv").config();
var app = express_1.default();
var PORT = Number(process.env.PORT) || 5000;
app.set("view engine", "pug");
app.set("views", path_1.default.join(__dirname, "/views"));
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.use(cors_1.default({ exposedHeaders: ["x-auth-token"] }));
var notesApi = notesModule_1.default.init();
app.use("/", notesApi.router);
app.use("/", users_1.default);
app.use(auth_1.default);
app.listen(PORT, function () {
    console.log("Listening on port " + PORT + "...");
    var uri = process.env.DB_URI;
    if (!uri)
        throw new Error("Environmental variable DB_URI is missing.");
    mongoose_1.default
        .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
        .then(function () { return console.log("Connected to database..."); })
        .catch(console.error);
});
