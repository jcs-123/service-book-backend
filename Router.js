const express = require('express');
const router = express.Router();

const logincontroller = require('./Controller/logincontroller')

// login rourter
router.post("/register", logincontroller.registerUser);
router.post("/login", logincontroller.loginUser);
router.get("/", logincontroller.getAllUsers);
router.post("/forgot-password", logincontroller.forgotPassword);
router.post("/verify-otp", logincontroller.verifyOtp);
router.post("/reset-password", logincontroller.resetPassword);
router.put("/change-password", logincontroller.changePassword);
module.exports = router;