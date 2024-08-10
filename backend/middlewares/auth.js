import ErrorHandler from "../utils/ErrorHandler.js";
import AsyncErrorHandler from "./AsyncErrorHandler.js";
import jwt from "jsonwebtoken";
import User from "../model/user.js";
import Shop from "../model/shop.js";



export const isAuthenticated = AsyncErrorHandler(async (req, res, next) => {
  const { token } = req.cookies;
  

  if (!token) {
    return next(new ErrorHandler("Please login to continue", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  req.user = await User.findById(decoded.id);
  if (!req.user) {
    return next(new ErrorHandler("User not found", 404));
  }

  console.log("User from middleware:", req.user); // Debugging line
  next();
});

export const isSeller = AsyncErrorHandler(async (req, res, next) => {
  const { seller_token } = req.cookies;
  if (!seller_token) {
    return next(new ErrorHandler("Please login to continue", 401));
  }

  const decoded = jwt.verify(seller_token, process.env.JWT_SECRET_KEY);

  req.seller = await Shop.findById(decoded.id);

  next();
});

