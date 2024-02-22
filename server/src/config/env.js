/**
 * Module: env.js
 * Description: Loads environment variables from .env files using dotenv-flow.
 * Provides access to environment variables such as PORT and MONGO_URL.
 * Author: Shoval Shabi
 */

import dotenv from "dotenv-flow";// Import the dotenv-flow package for loading environment variables
import createCustomLogger from './logger.js';// Import the logger module
import path from 'path';// Import the path identification for logging purposes


// Load environment variables from .env files
dotenv.config();

//Creating tailored logger for environment variables setup
const logger = createCustomLogger({
  moduleFilename: path.parse(new URL(import.meta.url).pathname).name,
  loggingFileName: true,
  logLevel: process.env.INFO_LOG,
  logRotation: true
});

// Log a message indicating that environment variables are being loaded
logger.info("Loading environment variables");

/**
 * Constant: PORT
 * Description: Represents the port number on which the server will listen.
 * Defaults to 6001 if not specified in the environment variables.
 * @type {number}
 */
export const PORT = process.env.PORT || 6001;

// Log the port number being used by the server
logger.info(`Server Port: ${PORT}`);

/**
 * Constant: MONGO_URL
 * Description: Represents the MongoDB connection URL.
 * Retrieved from the environment variables.
 * @type {string}
 */
export const MONGO_URL = process.env.MONGO_URL;

// Log the MongoDB connection URL being used
logger.info(`MongoDB URL: ${MONGO_URL}`);
