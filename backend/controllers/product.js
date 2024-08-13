import express from "express";
import { isSeller, isAuthenticated} from "../middlewares/auth.js";
import AsyncErrorHandler from "../middlewares/AsyncErrorHandler.js";
import Product from "../model/product.js";
import Order from "../model/order.js";
import Shop from "../model/shop.js";
import cloudinary from "cloudinary";
import ErrorHandler from "../utils/ErrorHandler.js";
import { fileURLToPath } from "url";
import path from "path";

const router = express.Router();

// Get the filename and dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create product
router.post(
  "/create-product",
  AsyncErrorHandler(async (req, res, next) => {
    try {
      const shopId = req.body.shopId;
      const shop = await Shop.findById(shopId);
      if (!shop) {
        return next(new ErrorHandler("Shop Id is invalid!", 400));
      } else {
        let images = [];

        if (typeof req.body.images === "string") {
          images.push(req.body.images);
        } else {
          images = req.body.images;
        }

        const imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
          const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "products",
          });

          imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
          });
        }

        const productData = req.body;
        productData.images = imagesLinks;
        productData.shop = shop;

        const product = await Product.create(productData);

        res.status(201).json({
          success: true,
          product,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Get all products of a shop
router.get(
  "/get-all-products-shop/:id",
  AsyncErrorHandler(async (req, res, next) => {
    try {
      const products = await Product.find({ shopId: req.params.id });

      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

router.delete(
  "/delete-shop-product/:id",
  isSeller,
  AsyncErrorHandler(async (req, res, next) => {
    try {
      // Find the product by ID
      const product = await Product.findById(req.params.id);

      if (!product) {
        return next(new ErrorHandler("Product not found with this ID", 404));
      }

      // Remove associated images from Cloudinary
      for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
      }

      // Delete the product
      await Product.deleteOne({ _id: req.params.id });

      res.status(200).json({
        success: true,
        message: "Product deleted successfully!",
      });
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// Get all products
router.get(
  "/get-all-products",
  AsyncErrorHandler(async (req, res, next) => {
    try {
      const products = await Product.find().sort({ createdAt: -1 });

      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Review for a product
router.put(
  "/create-new-review",
  isAuthenticated,
  AsyncErrorHandler(async (req, res, next) => {
    try {
      const { user, rating, comment, productId, orderId } = req.body;

      const product = await Product.findById(productId);

      const review = {
        user,
        rating,
        comment,
        productId,
      };

      const isReviewed = product.reviews.find(
        (rev) => rev.user._id === req.user._id
      );

      if (isReviewed) {
        product.reviews.forEach((rev) => {
          if (rev.user._id === req.user._id) {
            rev.rating = rating;
            rev.comment = comment;
            rev.user = user;
          }
        });
      } else {
        product.reviews.push(review);
      }

      let avg = 0;

      product.reviews.forEach((rev) => {
        avg += rev.rating;
      });

      product.ratings = avg / product.reviews.length;

      await product.save({ validateBeforeSave: false });

      await Order.findByIdAndUpdate(
        orderId,
        { $set: { "cart.$[elem].isReviewed": true } },
        { arrayFilters: [{ "elem._id": productId }], new: true }
      );

      res.status(200).json({
        success: true,
        message: "Reviewed successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);



export default router;
