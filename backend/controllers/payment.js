import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import AsyncErrorHandler from "../middleware/AsyncErrorHandler.js";
import stripePackage from "stripe";
import dotenv from "dotenv";

// Determine the directory of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from a .env file
dotenv.config({ path: path.join(__dirname, "../.env") });

const router = express.Router();
const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);

router.post(
  "/process",
  AsyncErrorHandler(async (req, res, next) => {
    try {
      const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "inr",
        metadata: {
          company: "Becodemy",
        },
      });
      res.status(200).json({
        success: true,
        client_secret: myPayment.client_secret,
      });
    } catch (error) {
      next(error);
    }
  })
);

router.get(
  "/stripeapikey",
  AsyncErrorHandler(async (req, res, next) => {
    res.status(200).json({ stripeApikey: process.env.STRIPE_API_KEY });
  })
);

export default router;
