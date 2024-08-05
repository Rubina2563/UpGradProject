import express from "express";
import User from "../model/user.js";
import Product from "../model/product.js";
import { isAuthenticated } from "../middlewares/auth.js";
import AsyncErrorHandler from "../middlewares/AsyncErrorHandler.js";

const router = express.Router();

// Add item to cart
router.post(
  "/add",
  isAuthenticated,
  AsyncErrorHandler(async (req, res) => {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const product = await Product.findById(req.body.productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const cartProduct = user.cart.find(
      (item) => item.product.toString() === product._id.toString()
    );

    if (cartProduct) {
      cartProduct.quantity += req.body.quantity;
    } else {
      user.cart.push({ product: product._id, quantity: req.body.quantity });
    }

    await user.save();

    res.status(200).json({ message: "Product added to cart" });
  })
);

// Remove item from cart
router.post(
  "/remove",
  isAuthenticated,
  AsyncErrorHandler(async (req, res) => {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.cart = user.cart.filter(
      (item) => item.product.toString() !== req.body.productId
    );

    await user.save();

    res.status(200).json({ message: "Product removed from cart" });
  })
);

// Get user's cart
router.get(
  "/",
  isAuthenticated,
  AsyncErrorHandler(async (req, res) => {
    const user = await User.findById(req.user.id).populate("cart.product");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.cart);
  })
);

export default router;
