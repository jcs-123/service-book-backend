const Login = require("../model/loginmodel");
const nodemailer = require("nodemailer");

// In-memory OTP store (can be replaced with Redis)
let otpStore = {};

// ✅ Register New User
exports.registerUser = async (req, res) => {
  try {
    const { username, password, role, gmail } = req.body;

    if (!username || !password)
      return res.status(400).json({ message: "Username and password are required" });

    const existingUser = await Login.findOne({ username });
    if (existingUser)
      return res.status(400).json({ message: "Username already exists" });

    const newUser = new Login({ username, password, role, gmail });
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully ✅",
      user: { username: newUser.username, role: newUser.role, gmail: newUser.gmail },
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ success: false, message: "Error registering user ❌", error: error.message });
  }
};

// ✅ Login Controller
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ message: "Please enter both username and password" });

    const user = await Login.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found ❌" });

    if (user.password !== password)
      return res.status(401).json({ message: "Invalid credentials ❌" });

    res.status(200).json({
      success: true,
      message: "Login successful ✅",
      user: { username: user.username, role: user.role, gmail: user.gmail || "" },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: "Error during login ❌", error: error.message });
  }
};

// ✅ Get All Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await Login.find().select("-password");
    res.status(200).json({ success: true, count: users.length, users });
  } catch (error) {
    console.error("GetAllUsers Error:", error);
    res.status(500).json({ success: false, message: "Error fetching users ❌", error: error.message });
  }
};



// ✅ 1️⃣ Forgot Password — Send OTP to Gmail
exports.forgotPassword = async (req, res) => {
  try {
    const { gmail } = req.body;
    if (!gmail) return res.status(400).json({ message: "Gmail is required" });

    const user = await Login.findOne({ gmail });
    if (!user) return res.status(404).json({ message: "No user found with this Gmail ❌" });

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[gmail] = { otp, expires: Date.now() + 5 * 60 * 1000 }; // expires in 5 min

    // Send Email using Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "jcs@jecc.ac.in", // 🔐 replace with your Gmail
        pass: "wsgz cpao robq zkpt",   // 🔐 use App Password, not your Gmail password
      },
    });

    const mailOptions = {
      from: "Service Book <yourgmail@gmail.com>",
      to: gmail,
      subject: "Password Reset OTP 🔐",
      html: `
        <h3>Hello ${user.username},</h3>
        <p>Your password reset OTP is:</p>
        <h2 style="color:#007bff;">${otp}</h2>
        <p>This OTP will expire in 5 minutes.</p>
        <br/>
        <p>Regards,<br/>JEC Service Book Team</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "OTP sent to your Gmail ✅" });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ success: false, message: "Error sending OTP ❌", error: error.message });
  }
};


// ✅ 2️⃣ Verify OTP
exports.verifyOtp = async (req, res) => {
  try {
    const { gmail, otp } = req.body;
    const stored = otpStore[gmail];

    if (!stored) return res.status(400).json({ message: "No OTP found or expired" });
    if (stored.expires < Date.now()) {
      delete otpStore[gmail];
      return res.status(400).json({ message: "OTP expired ❌" });
    }
    if (stored.otp !== otp) return res.status(401).json({ message: "Invalid OTP ❌" });

    res.status(200).json({ success: true, message: "OTP verified successfully ✅" });
  } catch (error) {
    console.error("Verify OTP Error:", error);
    res.status(500).json({ success: false, message: "Error verifying OTP ❌", error: error.message });
  }
};


// ✅ 3️⃣ Reset Password — after OTP verification
exports.resetPassword = async (req, res) => {
  try {
    const { gmail, otp, newPassword } = req.body;
    const stored = otpStore[gmail];

    if (!stored) return res.status(400).json({ message: "OTP not found or expired" });
    if (stored.otp !== otp) return res.status(401).json({ message: "Invalid OTP" });

    const user = await Login.findOne({ gmail });
    if (!user) return res.status(404).json({ message: "User not found" });

    user.password = newPassword;
    await user.save();

    delete otpStore[gmail];
    res.status(200).json({ success: true, message: "Password reset successfully ✅" });
  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({ success: false, message: "Error resetting password ❌", error: error.message });
  }
};


exports .changePassword = async (req, res) => {
  try {
    const { gmail, oldPassword, newPassword } = req.body;

    // 1️⃣ Check required fields
    if (!gmail || !oldPassword || !newPassword) {
      return res.status(400).json({ message: "All fields are required ❌" });
    }

    // 2️⃣ Find user by Gmail
    const user = await Login.findOne({ gmail });
    if (!user) {
      return res.status(404).json({ message: "User not found ❌" });
    }

    // 3️⃣ Verify old password
    if (user.password !== oldPassword) {
      return res.status(401).json({ message: "Old password is incorrect ❌" });
    }

    // 4️⃣ Update new password
    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "✅ Password changed successfully!",
    });
  } catch (error) {
    console.error("Change Password Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while changing password ❌",
      error: error.message,
    });
  }
};