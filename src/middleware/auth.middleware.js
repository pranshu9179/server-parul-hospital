// middleware/auth.js
import jwt from "jsonwebtoken";
import User from "../models/user.models.js";
import config from "../config/env.config.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, config.JWT_SEC);

    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Invalid or expired token" });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user.role !== "Admin") {
    return res.status(403).json({ message: "Forbidden: Admins only" });
  }
  next();
};
