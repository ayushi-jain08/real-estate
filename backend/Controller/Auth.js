import User from '../Model/User.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../Utils/Error.js'
import jwt from 'jsonwebtoken'
import cloudinary from '../Cloudinary.js'

// ==================USER REGISTER======================
export const signup = async(req,res, next) => {
   try {
    const file = req.files.photo

    console.log("pic", file)
    const {username, email, password} = req.body
    const folder = "images";
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
        folder,
      });
    const hashPassword = bcryptjs.hashSync(password,10)
    const newUser = new User({
username,
email,
password:hashPassword,
pic: (await result).url
    })
    await newUser.save()
    res.status(201).json("User Created Successfully")
   } catch (error) {
    console.log(error)
 next(error)
   }
}

// =======================USER LOGIN===========================
export const LoginUser = async(req,res,next) => {
const {email, password} = req.body
try {
    const ValidUser = await User.findOne({email})
if(!ValidUser) return next(errorHandler(404, "User not found!"))
const validPassword = bcryptjs.compareSync(password, ValidUser.password)
if(!validPassword) return next(errorHandler(401, "Invalid credentials"))
const token = jwt.sign({id: ValidUser._id}, process.env.JWT_SECRET)
const { password: pass, ...otherDeatils } = ValidUser._doc;
res.cookie('access_token', token, {httpOnly: true}).status(200).json(otherDeatils)
} catch (error) {
    next(error)
}
}