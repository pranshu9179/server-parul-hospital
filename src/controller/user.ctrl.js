import config from "../config/env.config.js";
import User from "../models/user.models.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      res.status(400).json({ message: "User Already Exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    await user.save();
    res.status(201).json({ message: "Register Successfully", user });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials e" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials p" });
    }

    const token = await user.generateAuthToken();

    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: config.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
      })
      .json({
        success: true,
        message: "Login successful",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      });
  } catch (error) {
    next(error);
  }
};

export const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(400).json({ message: "User Not found" });
    }

    res.status(200).json({ message: "fetch Successfully", user });
  } catch (error) {
    next(error);
  }
};

// ! admin only
export const fetchAllUser = async (req, res, next) => {
  try {
    const user = await User.find().select("-password");
    if (!user) {
      res.status(400).json({ message: "User Not found" });
    }

    res.status(200).json({ message: "fetch Successfully", user });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      res.status(400).json({ message: "User Not found" });
    }
    res.status(200).json({ message: "Update Successfully", user });
  } catch (error) {
    next(error);
  }
};

export const adminUpdatePassword = async (req, res, next) => {
  try {
    const { userId, newPassword, oldPassword } = req.body;

    // Only allow admins (should already be checked by middleware)
    const targetUser = await User.findById(userId);
    if (!targetUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // If admin is changing their own password, verify old password
    const isSelf = req.user._id.toString() === userId.toString();

    if (isSelf) {
      const isMatch = await targetUser.comparePassword(oldPassword);
      if (!isMatch) {
        return res.status(400).json({ message: "Old password is incorrect" });
      }
    }

    // Change password
    targetUser.password = newPassword;
    await targetUser.save();

    res.status(200).json({
      success: true,
      message: `Password updated successfully for ${
        isSelf ? "yourself" : targetUser.email
      }`,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res
      .status(200)
      .clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .json({
        success: true,
        message: "Logout successful",
      });
  } catch (error) {
    next(error);
  }
};
