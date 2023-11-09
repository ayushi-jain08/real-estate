import { errorHandler } from "./Error.js";
import  Jwt from "jsonwebtoken";

export const VerifyToken = (req,res,next) => {
    const token = req.cookies.access_token
    console.log("tokjen", token)
    if(!token) return next(errorHandler(401, "unauthorized"))
 Jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
if(err) return next(errorHandler(403, "Forbdiden"));

req.user = user
next()
})
    
}