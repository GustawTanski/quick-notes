import express, { Application } from "express";
import mongoose from "mongoose";
import uri from "./dbAdminData";
import users from "./routes/users";
import auth from "./middlewares/auth";
import cors from "cors";
import path from "path";

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 5000;

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/", users);

app.use(auth);

// all routes which require authentication should be placed here



app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`)

    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
        .then(() => console.log("Connected to database..."))
        .catch(console.error);
});