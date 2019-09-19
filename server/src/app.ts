import express, { Application } from "express";
import mongoose from "mongoose";
import users from "./routes/users";
import auth from "./middlewares/auth";
import cors from "cors";
import path from "path";
require("dotenv").config();

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 5000;

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors({ exposedHeaders: ["x-auth-token"] }));

app.use("/", users);

app.use(auth);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`)

    const uri = process.env.DB_URI;
    if (!uri) throw new Error("Environmental variable DB_URI is missing.");

    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
        .then(() => console.log("Connected to database..."))
        .catch(console.error);
});