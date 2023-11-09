import express from 'express'
import { CreateListing, DeleteListing, GetSingleListing, UpdateListing } from '../Controller/Listing.js'
const router = express.Router()
import { VerifyToken } from '../Utils/VerifyUser.js'

router.post("/create", VerifyToken, CreateListing )
router.delete("/delete/:id", VerifyToken, DeleteListing )
router.patch("/update/:id", VerifyToken, UpdateListing)
router.get("/get/:id",GetSingleListing )
export default router