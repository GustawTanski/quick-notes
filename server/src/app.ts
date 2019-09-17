import express, { Application } from "express";
import mongoose from "mongoose";
import uri from "./dbAdminData";
import users from "./routes/users";
import auth from "./middlewares/auth";
import notesModule from "./notesModule/notesModule";

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 5000;

const notesApi = notesModule.init();
app.use("/", notesApi.router);

app.use("/", users);

app.use(auth);

// all routes which require authentication should be placed here



app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`)

    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log("Connected to database..."))
        .catch(console.error);
});