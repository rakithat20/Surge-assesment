// middleware/auth.middleware.js
import passport from "passport";
export const authenticate = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
};

export const optionalAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.user = null;
  next();
};

export const googleAuthMiddleware = passport.authenticate("google", {
  scope: ["profile", "email"],
});

export const googleCallbackMiddleware = passport.authenticate("google", {
  failureRedirect: "/login",
  failureMessage: true,
});
