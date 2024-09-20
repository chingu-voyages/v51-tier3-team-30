import * as process from "process";


export default () => ({
    port: process.env.PORT ? parseInt(process.env.PORT,10) : 3000,
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRE_IN
    },
    nodeEnv: process.env.NODE_ENV,
    google: {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL
    }
})
