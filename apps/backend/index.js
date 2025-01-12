import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import db from "./config/db.config.js";
import { configurePassport } from "./config/auth.config.js";
import connectPgSimple from "connect-pg-simple";

dotenv.config({ path: "../../.env" });

const app = express();
const port = process.env.BACKEND_PORT;
const corsOptions = {
  origin: "http://localhost:5172", // Replace with your frontend URL
  credentials: true, // Allow cookies to be sent with the request
};

// Initialize pg-simple store
const PgSession = connectPgSimple(session);

app.use(express.json());

app.use(
  session({
    store: new PgSession({
      pool: db, // Reuse the existing db connection pool
      tableName: "session", // Name of the table to store sessions
    }),
    secret: "your-secret-key", // Replace with a strong secret
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production", // Set to true in production
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(cors(corsOptions));

// Initialize passport
configurePassport();

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

app.get("/health", (req, res) => {
  res.send({ status: "UP" });
});

try {
  db.connect();
  console.log("DB connection successful");
} catch (error) {
  console.error("DB Not connected", error);
}

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
