import express from "express";
import {
  adminUpdatePassword,
  fetchAllUser,
  getCurrentUser,
  login,
  logout,
  register,
  updateUser,
} from "../controller/user.ctrl.js";
import { isAdmin, isAuthenticated } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", register);


router.post("/login", login);

router.get("/logout", isAuthenticated, logout);

router.get("/me", isAuthenticated, getCurrentUser);

router.get("/all-user", isAuthenticated, isAdmin, fetchAllUser);

router.put("/update-password", isAuthenticated, isAdmin, adminUpdatePassword);

router.put("/:id", isAuthenticated, isAdmin, updateUser);

export default router;
