import express from "express";
import AsyncErrorHandler from "../middlewares/AsyncErrorHandler.js";
import Order from "../model/order.js";
import Shop from "../model/shop.js";
import Product from "../model/product.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { isAuthenticated, isSeller} from "../middlewares/auth.js";

const router = express.Router();

// create new order
router.post(
  "/create-order",
  AsyncErrorHandler(async (req, res, next) => {
    try {
      const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body;

      //   group cart items by shopId
      const shopItemsMap = new Map();

      for (const item of cart) {
        const shopId = item.shopId;
        if (!shopItemsMap.has(shopId)) {
          shopItemsMap.set(shopId, []);
        }
        shopItemsMap.get(shopId).push(item);
      }

      // create an order for each shop
      const orders = [];

      for (const [shopId, items] of shopItemsMap) {
        const order = await Order.create({
          cart: items,
          shippingAddress,
          user,
          totalPrice,
          paymentInfo,
        });
        orders.push(order);
      }

      res.status(201).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get all orders of user
router.get(
  "/get-all-orders/:userId",
  AsyncErrorHandler(async (req, res, next) => {
    try {
      const orders = await Order.find({ "user._id": req.params.userId }).sort({
        createdAt: -1,
      });

      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get all orders of seller
router.get(
  "/get-seller-all-orders/:shopId",
  AsyncErrorHandler(async (req, res, next) => {
    console.log("req body", req.params);
    try {
      const orders = await Order.find({
        "cart.product.shopId": req.params.shopId,
      }).sort({
        createdAt: -1,
      });

      console.log("orders", orders);
      res.status(200).json({
        success: true,
        orders: orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update order status for seller
router.put(
  "/update-order-status/:id",
  isSeller,
  AsyncErrorHandler(async (req, res, next) => {
    try {
      console.log("req.body update order status", req.body);
      console.log("req.params.id update", req.params.id);
      const order = await Order.findById(req.params.id);

      if (!order) {
        return next(new ErrorHandler("Order not found with this id", 400));
      }

      order.status = req.body.status;

      if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
        order.paymentInfo.status = "Succeeded";
        const sellerId = req.body.sellerId;
        order.cart
          .filter((o) => o.product.shopId.toString() === sellerId.toString()) // Filter by sellerId
          .forEach(async (o) => {
            await updateOrderDelivered(o.product._id, o.quantity);
          });

        const serviceCharge = req.body.totalPrice * 0.1;
        await updateSellerInfo(req.body.totalPrice - serviceCharge);
      }

      await order.save({ validateBeforeSave: false });

      res.status(200).json({
        success: true,
        order,
      });

      async function updateOrderDelivered(id, qty) {
        const product = await Product.findById(id);

        product.stock -= qty;
        product.sold_out += qty;

        await product.save({ validateBeforeSave: false });
      }

      async function updateSellerInfo(amount) {
        const seller = await Shop.findById(req.seller.id);

        seller.availableBalance += amount;

        await seller.save();
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// give a refund ----- user
router.put(
  "/order-refund/:id",
  AsyncErrorHandler(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return next(new ErrorHandler("Order not found with this id", 400));
      }

      order.status = req.body.status;

      await order.save({ validateBeforeSave: false });

      res.status(200).json({
        success: true,
        order,
        message: "Order Refund Request successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// accept the refund ---- seller
router.put(
  "/order-refund-success/:id",
  isSeller,
  AsyncErrorHandler(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return next(new ErrorHandler("Order not found with this id", 400));
      }

      order.status = req.body.status;

      await order.save();

      res.status(200).json({
        success: true,
        message: "Order Refund successful!",
      });

      if (req.body.status === "Refund Success") {
        const sellerId = req.body.sellerId; // Assuming req.seller contains the seller info

        order.cart
          .filter((o) => o.product.shopId.toString() === sellerId.toString()) // Filter by sellerId
          .forEach(async (o) => {
            await updateOrder(o.product._id, o.quantity);
          });
         const serviceCharge = req.body.totalPrice * 0.2;
        await updateSellerInfoAgain(req.body.totalPrice-serviceCharge);
      }

      async function updateOrder(id, qty) {
        const product = await Product.findById(id);

        product.stock += qty;
        product.sold_out -= qty;

        await product.save({ validateBeforeSave: false });
      }

      async function updateSellerInfoAgain(amount) {
        const seller = await Shop.findById(req.seller.id);

        seller.availableBalance -= amount;

        await seller.save();
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);


export default router;
