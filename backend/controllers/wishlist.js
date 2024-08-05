import express from "express";
import User from "../model/user.js";
import Product from "../model/product.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// Add item to wishlist
router.post("/add", isAuthenticated, async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Debugging line
    console.log("User from request:", req.user); // Debugging line

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const product = await Product.findById(req.body.productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (user.wishlist.includes(product._id)) {
      return res.status(400).json({ message: "Product already in wishlist" });
    }

    user.wishlist.push(product._id);
    await user.save();

    res.status(200).json({ message: "Product added to wishlist" });
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Remove item from wishlist
router.post("/remove", isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.wishlist = user.wishlist.filter(
      (productId) => productId.toString() !== req.body.productId
    );

    await user.save();

    res.status(200).json({ message: "Product removed from wishlist" });
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get user's wishlist
router.get("/", isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("wishlist");
   
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.wishlist);
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
