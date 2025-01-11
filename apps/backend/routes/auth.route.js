// routes/auth.routes.js
import express from "express";
import * as authController from "../controllers/auth.controller.js";
import {
  googleAuthMiddleware,
  googleCallbackMiddleware,
} from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/login", authController.loginUser);
router.post("/register", authController.registerUser);
router.get("/google", googleAuthMiddleware);
router.get(
  "/google/callback",
  googleCallbackMiddleware,
  authController.googleCallback
);
router.post("/logout", authController.logout);
router.get("/status", authController.checkAuthStatus);

export default router;
