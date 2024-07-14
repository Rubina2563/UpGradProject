import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, "../config/.env") });


const connectDatabase = () => {
    console.log(`DB_URL: ${process.env.DB_URL}`);
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`MongoDB connected with server: ${data.connection.host}`);
    })
    .catch((error) => {
      console.error("MongoDB connection error:", error);
      process.exit(1); // Exit the process with failure
    });
};

export default connectDatabase;
