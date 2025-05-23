import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
// import cookieParser from "cookie-parser";
import router from "./routes/authRouts.js";
import userRoutes from "./routes/userRoutes.js";

//Middleware
const app = express();
app.use(express.json());
// app.use(cookieParser());

//Env values
const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 5000;

//mongodeb databse connection
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB Databse");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });

//Routes
app.use("/api/auth", router);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is runing at port number ${PORT}`);
});
