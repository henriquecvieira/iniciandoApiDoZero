import express from "express"
import Routes from "./routes/routes.js"
import database from "./database/database.js"
import User from "./models/user.js"


database.connectToDatabase()

const app = express()

app.use(express.json())

app.route("/healthcheck").get((_, res) => {
    res.json({
        status: "ok!"
    })
});

app.use("/v1", Routes)

app.all("*", (_, res) => {
    res.status(404).json({
        message: "rota inexistente"
    })
    
});

app.listen(process.env.PORT, () => {
    console.log(`backend started at http://localhost:${process.env.PORT}`)
});