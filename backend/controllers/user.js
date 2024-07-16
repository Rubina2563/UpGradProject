import express from "express";
import path from "path";
import upload from "../multer.js";
import User from "../model/user.js";
import ErrorHandler from "../utils/ErrorHandler.js";

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

router.post("/create-user", upload.single("file"), async(req, res, next) =>{
    const { name, email, password } = req.body;
const userEmail=await User.findOne({ email });
    if (userEmail) {
        return next(new ErrorHandler("User exist already!!", 400))
    }
    const filename = req.file.filename;
    const fileUrl = path.join(filename);

    const user = {
        name: name,
        email: email,
        password: password,
        avatar: fileUrl,
    };

    console.log(user);

      res.status(201).json({
        success: true,
        message: "User created successfully",
        user,
      });
})

export default router;