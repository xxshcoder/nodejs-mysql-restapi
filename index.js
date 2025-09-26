// index.js
import express from "express";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import usersRouter from "./routes/users.js";
import errorHandler from "./middleware/errorHandler.js";

config();
const app = express();

app.use(express.json());
app.use(cookieParser());

// Health
app.get("/", (req, res) =>
  res.json({ status: "ok", timestamp: new Date().toISOString() })
);

// API routes
app.use("/api/users", usersRouter);

// error handler (should come after routes)
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
