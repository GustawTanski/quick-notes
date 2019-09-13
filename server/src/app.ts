import express = require("express");

const app = express();

const PORT: number = Number(process.env.PORT) || 5000;

app.listen(PORT, () => {
    console.log(`Listening on ${PORT} port...`)
})

