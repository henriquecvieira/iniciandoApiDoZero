import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config();

const generationToken = async (params) => {
    const token = jwt.sign(
        {
            id: params._id,
        },
        process.env.SECRET,
        { expiresIn: 86400 }
    )
    return token
}
export default {generationToken}