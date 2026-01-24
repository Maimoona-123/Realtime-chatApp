import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import { app, server } from "./lib/socket.js";

const corsOptions = {
  origin: true, // Dynamically allow the requesting origin
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

// Apply CORS to all routes
app.use(cors(corsOptions));

// Handle preflight for all routes using the new Express 5 syntax
app.options("{/*splat}", cors(corsOptions)); 
dotenv.config();

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

// const allowedOrigins = [
//   "*"
// ];


// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true,
//   })
// );

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  // app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/", (req, res) => {
    res.status(200).json({message:'Hello maimoona there, welcome to my server'})
  });
}


server.listen(PORT, () => {
  console.log("Server running on PORT:", PORT);
  connectDB();
});
