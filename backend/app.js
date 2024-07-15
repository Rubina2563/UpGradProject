import express from "express";
import dotenv from "dotenv";
import ErrorHandler from "./utils/ErrorHandler.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import user from "./controllers/user.js";
import cors from "cors";

// Initialize the express app
const app = express();

app.use("/", express.static("uploads"));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors());

app.use(bodyParser.urlencoded({extended: true, limit:"50mb"}));

app.use(ErrorHandler);

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({
    path: "config/.env",
  });
}

app.use("/api/v2/user", user);

export default app;
