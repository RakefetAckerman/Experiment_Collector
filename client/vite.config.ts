import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv"; // Import the dotenv-flow package for loading environment variables

// Load environment variables from .env files
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: Number(process.env.VITE_PORT || 3001), // Use the PORT environment variable or default to 3001
  },
});
