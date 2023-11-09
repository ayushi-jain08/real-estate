import express from 'express'
const router = express.Router()
import { LoginUser, signup } from "../Controller/Auth.js"

router.post("/signup", signup)
router.post("/signin", LoginUser)
export default router