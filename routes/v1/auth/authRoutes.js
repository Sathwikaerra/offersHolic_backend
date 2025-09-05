import express from "express";
import { adminLogin, verifyotp, sendOtpforRegistration, register, UserEmailLogin, UserMobileLogin } from "../../../controllers/auth/authController.js";


const router = express.Router();


//admin routes
router.post("/admin-login", adminLogin);

//user routes
// -------------------login routes-------------------
router.post("/user-email-login", UserEmailLogin);
router.post("/user-mobile-login", UserMobileLogin);
router.post("/verify-otp", verifyotp);

// -------------------register routes-------------------
router.post("/send-register-otp", sendOtpforRegistration);
router.post("/register", register);







export default router;

