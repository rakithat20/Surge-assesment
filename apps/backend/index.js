import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";

dotenv.config({ path: "../../.env" });
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use("/api/auth", authRoutes);

app.get("/health", (req, res) => {
  res.send({ status: "UP" });
});

app.listen(port, () => {
  console.log(`Server  listening on port ${port}`);
});
