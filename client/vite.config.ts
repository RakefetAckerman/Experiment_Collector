import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import getEnvVariables from "./src/etc/loadVariables"; // Import the dotenv-flow package for loading environment variables
import dotenv from "dotenv"; // Import dotenv and call config to load variables into process.env
dotenv.config();

// Load environment variables from .env files
const envVariables = getEnvVariables();
const { port } = envVariables;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port, // Use the PORT environment variable
  },
  define: { "process.env": process.env },
});
