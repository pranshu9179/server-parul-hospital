import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import config from "../config/env.config.js";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Name is required"],
    },
    email: {
      type: String,
      trim: true,
      lowerCase: true,
      unique: true,
      require: [true, "Email is required"],
    },
    password: {
      type: String,
      require: [true, "Password is required"],
    },
    role: {
      type: String,
      enum: ["Admin", "User"],
      default: "User",
    },
    status: {
      type: String,
      enum: ["pending", "Contacted", "Visit Scheduled", "Admitted", "Treatment Done", "Discharged"],
      default: "pending"
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ _id: this._id }, config.JWT_SEC, {
    expiresIn: "15m",
  });

  return token;
};

const User = mongoose.model("User", userSchema);

export default User;
