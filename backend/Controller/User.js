import { errorHandler } from "../Utils/Error.js"
import User from "../Model/User.js"
import cloudinary from "../Cloudinary.js"
import Listing from "../Model/Listing.js"

export const DeleteUser = async(req, res, next) => {
if(req.user.id !== req.params.id){
    return next(errorHandler(401, 'You can only delete your own account!'))
}
console.log("oo", req.params.id)
    try {
     const user = await User.findByIdAndDelete(req.params.id)
     await cloudinary.uploader.destroy(user.pic);
        res.clearCookie('access_token');
        res.status(200).json('User has been deleted!')
    } catch (error) {
        next(error)
    }
}
// ===================SIGN OUT USER==========================
export const SignOut = async(req,res,next) => {
    try {
        res.clearCookie('access_token')
        res.status(200).json("User has been logged out")
    } catch (error) {
        next(error)
    }
}
// =======================GET USER LISTINGS==========================
export const GetUserListing = async(req,res,next) => {
    const {id} = req.params
    if(req.user.id === id){
try {
    const listing = await Listing.find({ userRef: id})
    res.status(200).json(listing)
} catch (error) {
    next(error)
}
    }else{
        return next(errorHandler(401, 'You can only view your own listings!'))
    }

}

