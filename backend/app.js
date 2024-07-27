import express from "express";
import errorMiddleware from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Get the filename and dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // Specify the exact origin
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

app.use(express.json());
app.use(cookieParser());
app.use("/test", (req, res) => {
  res.send("Hello world!");
});

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({
    path: "config/.env",
  });
}

// import routes
import user from "./controllers/user.js";
import shop from "./controllers/shop.js";
import product from "./controllers/product.js";
import event from "./controllers/event.js";
import coupon from "./controllers/couponCode.js";
import payment from "./controllers/payment.js";
import order from "./controllers/order.js";
import conversation from "./controllers/conversation.js";
//import message from "./controllers/message.js";
import withdraw from "./controllers/withdraw.js";

app.use("/api/v2/user", user);
app.use("/api/v2/conversation", conversation);
//app.use("/api/v2/message", message);
app.use("/api/v2/order", order);
app.use("/api/v2/shop", shop);
app.use("/api/v2/product", product);
app.use("/api/v2/event", event);
app.use("/api/v2/coupon", coupon);
app.use("/api/v2/payment", payment);
app.use("/api/v2/withdraw", withdraw);

app.use(errorMiddleware);

export default app;
