import express from 'express'
const router = express.Router()
import { DeleteUser, GetUserListing, SignOut} from '../Controller/User.js'
import { VerifyToken } from '../Utils/VerifyUser.js'

router.delete("/delete/:id",VerifyToken,DeleteUser )
router.get("/signout", SignOut )
router.get("/getlisting/:id", VerifyToken, GetUserListing)
export default router