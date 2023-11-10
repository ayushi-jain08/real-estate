import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
import userRouter from './Routes/Users.js'
import authRouter from './Routes/Auth.js'
const app = express()
import fileUpload from 'express-fileupload'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from "cookie-parser";
import listing from './Routes/Listing.js'
import path from 'path'

const PORT = process.env.PORT || 4000
const mongo = async() => {
   try {
    await  mongoose.connect(process.env.CONNECTION )
    console.log("mongodb connected")
   } catch (error) {
    console.log(error)
   }
}
mongo()

const __dirname = path.resolve()

const myMiddleware = (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://peaceful-cassata-229eca.netlify.app");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type");
    next(); // Call next to pass control to the next middleware
};
app.use(cookieParser());
app.use(cors({
    origin: 'https://peaceful-cassata-229eca.netlify.app', // Allow requests from this origin
    credentials: true // Allow credentials (cookies, authorization headers, etc.)
  }));

app.use(myMiddleware);
app.use(bodyParser.json());
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload({
    useTempFiles:true
}))

app.use("/api/user", userRouter)
app.use("/api/auth", authRouter)
app.use("/api/listing", listing) 

app.use(express.static(path.join(__dirname, './frontend/dist')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './frontend/dist/index.html'));
})
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal Server Error"
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})
app.listen(PORT, async() => {
    console.log("server is running on Port 3000")
})