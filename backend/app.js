import express from "express";
import dotenv from "dotenv";
import ErrorHandler from "./middlewares/error.js";
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
  cors({
    origin: "http://localhost:3000", // Specify the exact origin
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);
app.use(bodyParser.urlencoded({extended: true, limit:"50mb"}));



// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({
    path: "config/.env",
  });
}

app.use("/api/v2/user", user);

app.use(ErrorHandler);

export default app;
