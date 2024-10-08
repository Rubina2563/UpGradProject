import cloudinary from "cloudinary";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import app from "./app.js";
import connectDatabase from "./db/database.js";

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// config
dotenv.config({ path: path.resolve(__dirname, ".env") });

if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({
    path: ".env",
  });
}

//create DB
connectDatabase();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server for handling uncaught exception");
  process.exit(1);
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server started on PORT:${process.env.PORT}.`);
});

process.on("unhandledRejection", (err) => {
  console.log(`Shutting down the server for ${err.message}`);
  console.log("Shutting down the server for unhandled promise rejection");

  server.close(() => {
    process.exit(1);
  });
});
