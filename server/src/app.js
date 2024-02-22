/**
 * Module: app.js
 * Description: Configures and initializes the Express application.
 * Author: Shoval Shabi
 */

// Import required modules
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { PORT } from "./config/env.js";
import createCustomLogger from "./config/logger.js"; // Import the configured logger
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import objectRoutes from "./routes/objects.js";
import { connectToDatabase } from "./config/database.js"; // Import the function to connect to the database
import path from 'path';// Import the path identification for logging purposes

// Create an instance of Express application
const app = express();

//Logger configuration fo the app module
const logger = createCustomLogger({
  moduleFilename: path.parse(new URL(import.meta.url).pathname).name,
  logToFile: true,
  logLevel: process.env.INFO_LOG,
  logRotation: true
});

// Configure middleware
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cookieParser());
app.use(cors());

// Define routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/objects", objectRoutes);

// Connect to the MongoDB database
connectToDatabase()
  .then(() => {
    // Start the server
    app.listen(PORT, () => {
      // Log a message indicating server startup
      logger.info(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    // Log an error if database connection fails
    logger.error(`MongoDB connection error: ${error}`);
    // Exit the process with failure status
    process.exit(1);
  });

// Export the Express application
export default app;
