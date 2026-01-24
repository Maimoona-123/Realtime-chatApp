import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import { app, server } from "./lib/socket.js";

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // In development/testing, this effectively allows ALL origins
    // by reflecting the requesting origin back to the browser
    callback(null, true); 
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
}));

// 2. Explicitly handle Preflight (OPTIONS) requests
app.options("*", cors());
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
