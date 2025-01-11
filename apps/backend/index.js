import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import db from "./config/db.config.js";

dotenv.config({ path: "../../.env" });
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

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
