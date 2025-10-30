const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true, // Prevent duplicate usernames
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "department", "user"], // Allowed roles
      default: "user",
    },
      gmail: {
      type: String,
    }
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

const Login = mongoose.model("Login", loginSchema);
module.exports = Login;
