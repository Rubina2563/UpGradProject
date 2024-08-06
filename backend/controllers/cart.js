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
      return res.status(400).json({ message: "Item already present in cart" });
    } else {
      user.cart.push({ product: product._id, quantity: req.body.quantity });
      await user.save();
      res.status(200).json({ message: "Product added to cart" });
    }
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
router.get("/", isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: "cart.product", // The path to the product reference in the cart
      model: "Product", // Ensure this matches the name of your Product model
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.cart); // Sending the cart directly like the wishlist
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Increase quantity of item in cart
router.post(
  "/increase-quantity",
  isAuthenticated,
  AsyncErrorHandler(async (req, res) => {
    console.log("Request Body:", req.body); // Log request body for debugging

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the cart item
    const cartProduct = user.cart.find(
      (item) => item.product.toString() === req.body.productId
    );

    if (!cartProduct) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    // Fetch the product to get the stock value
    const product = await Product.findById(req.body.productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the quantity is less than the stock
    if (cartProduct.quantity < product.stock) {
      cartProduct.quantity += 1;
      await user.save();
      res.status(200).json({
        message: "Product quantity increased",
        cart: user.cart,
      });
    } else {
      res.status(400).json({
        message: "Cannot increase quantity. Stock limit reached.",
      });
    }
  })
);

// Decrease quantity of item in cart
router.post(
  "/decrease-quantity",
  isAuthenticated,
  AsyncErrorHandler(async (req, res) => {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cartProduct = user.cart.find(
      (item) => item.product.toString() === req.body.productId
    );

    if (cartProduct) {
      if (cartProduct.quantity > 1) {
        cartProduct.quantity -= 1;
        await user.save();
        res
          .status(200)
          .json({ message: "Product quantity decreased", cart: user.cart });
      } else {
        res.status(400).json({ message: "Quantity cannot be less than 1" });
      }
    } else {
      res.status(404).json({ message: "Product not found in cart" });
    }
  })
);

export default router;
