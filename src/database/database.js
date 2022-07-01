import * as dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

export default {
  connectToDatabase: () => {
    mongoose.connect(
      process.env.MONGO_URL,
      {},
      error => {
        const message = error
          ? `falha ao conectar no mmongo ${error}`
          : 'conectado ao MONGO com sucesso'
        console.log(message)
      }
    )
  }
}
