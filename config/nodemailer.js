import dotenv from "dotenv"
import nodemiler from "nodemailer"

dotenv.config()
const transport  = nodemiler.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    }
})

export default transport