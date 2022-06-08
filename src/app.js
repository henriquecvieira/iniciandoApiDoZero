import express from "express"
import Routes from "./routes/routes.js"
import * as dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config()

mongoose.connect(
    process.env.MONGO_URL, 
    {}, 
    error => {
        const message = error
        ? `falha ao conectar no mmongo ${error}` 
        : "conectado ao MONGO com sucesso"
        console.log(message)
    }
)

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