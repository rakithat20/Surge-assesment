import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import db from "./config/db.config.js";

dotenv.config({ path: "../../.env" });
const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

app.get("/health", (req, res) => {
  res.send({ status: "UP" });
});
try {
  db.connect();
  console.log("DB connection succesfull ");
} catch (error) {
  console.error("DB Not connected ", error);
}
app.listen(port, () => {
  console.log(`Server  listening on port ${port}`);
});
