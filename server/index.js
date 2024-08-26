import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import auth from "./routes/auth.js";
import bodyParser from "body-parser";

dotenv.config();
const app = express();

// Configure CORS to allow requests from localhost:5173
const corsOptions = {
  origin: "*", // Allow only this origin

  
};

app.use(cors(corsOptions)); // Use the CORS middleware with options
app.use(express.json());
app.use(express.static("public"));

app.use("/api/v1/auth", auth);

const PORT = process.env.PORT || 3001;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`App running on port ${PORT}`))
  )
  .catch((err) => console.log(err));
