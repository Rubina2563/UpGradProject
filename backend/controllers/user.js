import express from "express";
import path from "path";
import upload from "../multer.js";
import User from "../model/user.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import jwt from "jsonwebtoken";
import sendMail from "../utils/sendMail.js";
import dotenv from "dotenv";
import asyncErrorHandler from '../middlewares/asyncErrorHandler.js';
import sendToken from "../utils/jwtToken.js";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();
// Dummy route to create a user
router.post("/create-user2", (req, res) => {
  const { name, email, password } = req.body;

  // Simulate saving user data
  const user = {
    name,
    email,
    password,
  };

  console.log(user);

  res.status(201).json({
    success: true,
    message: "User created successfully",
    user,
  });
});

router.post("/create-user", upload.single("file"), async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const userEmail = await User.findOne({ email });
    if (userEmail) {
      const filename = req.file.filename;
      const filePath = path.join(__dirname, "../uploads", filename);

      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "Error while deleting file" });
        } else {
          res.json({ message: "File deleted" });
        }
      });

      return next(new ErrorHandler("User exists already!!", 400));
    }

    const filename = req.file.filename;
    const fileUrl = path.join("/uploads", filename);

    const user = {
      name: name,
      email: email,
      password: password,
      avatar: {
        public_id: filename,
        url: fileUrl,
      },
    };

    console.log(user);

    const activationToken = createActivationToken(user);
   

    const activationUrl = `https://localhost:3000/activation/${activationToken}`;

    try {
      console.log("two")
      const mailResponse = await sendMail({
        email: user.email,
        subject: "Activate your account",
        message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
      });
     
      console.log("Mail response: ", mailResponse);
      res.status(201).json({
        success: true,
        message: `please check your email:- ${user.email} to activate your account!`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    // If there was an error after the file was uploaded, delete the uploaded file
    if (req.file) {
      const filePath = path.join(__dirname, "../uploads", req.file.filename);
      fs.unlink(filePath, (unlinkError) => {
        if (unlinkError) {
          console.error(`Failed to delete file: ${filePath}`, unlinkError);
        }
      });
    }
    // Ensure the response is sent only once
    if (!res.headersSent) {
      next(error);
    }
  }
});

// create activation token
const createActivationToken = (user) => {
 
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

router.post(
  "/activation", asyncErrorHandler(async (req, res, next) => {
    try {
      const { activation_token } = req.body;

      const newUser = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!newUser) {
        return next(new ErrorHandler("Invalid token", 400));
      }
      const { name, email, password, avatar } = newUser;

      let user = await User.findOne({ email });

      if (user) {
        return next(new ErrorHandler("User already exists", 400));
      }
      user = await User.create({
        name,
        email,
        avatar,
        password,
      });

      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

export default router;
