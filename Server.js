"use strict"
import express from "express";
import mongoose from "mongoose";
import Dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import adminroute from "./routes/admin_route.js";
import loginroute from "./routes/auth.js";
import staffroute from "./routes/staff_route.js";
import { errorHandler } from "./middleware/error_middleware.js";

Dotenv.config();
const server = express();
const upload = multer();

server.use(express.json());

server.use(cors());
// server.use(
//   cors({
//     origin: "https://space-management.vercel.app",
//   })
// );

server.use("/api/admin", adminroute);
server.use("/api", loginroute);
server.use("/api", staffroute);
server.use(errorHandler)

// Local Host
const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`Server Running in Port ${PORT}`);
});

// Connecting DB
mongoose
  .connect(process.env.DB, { dbName: "space-management" })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));
