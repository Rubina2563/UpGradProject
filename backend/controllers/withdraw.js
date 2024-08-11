import express from "express";
import Shop from "../model/shop.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import AsyncErrorHandler from "../middlewares/AsyncErrorHandler.js";
import { isSeller, isAuthenticated } from "../middlewares/auth.js";
import Withdraw from "../model/withdraw.js";
import sendMail from "../utils/sendMail.js";

const router = express.Router();

// Create withdraw request --- only for seller
router.post(
  "/create-withdraw-request",
  isSeller,
  AsyncErrorHandler(async (req, res, next) => {
    try {
      const { amount } = req.body;

      const data = {
        seller: req.seller,
        amount,
      };

      try {
        await sendMail({
          email: req.seller.email,
          subject: "Withdraw Request",
          message: `Hello ${req.seller.name}, Your withdraw request of ${amount} Rs is processing. It will take 3 days to 7 days to process!`,
        });
        res.status(201).json({
          success: true,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }

      const withdraw = await Withdraw.create(data);

      const shop = await Shop.findById(req.seller._id);

      shop.availableBalance -= amount;

      await shop.save();

      res.status(201).json({
        success: true,
        withdraw,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);



export default router;
