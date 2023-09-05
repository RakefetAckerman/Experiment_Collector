// authRoutes.js
import express from "express";
import { verifyToken } from "../logic/middleware/auth.js";
import userRoutes from "./users.js";

const router = express.Router();

// Redirect to the user login route with query parameters
router.patch("/users", verifyToken, (req, res) => {
  // Pass the query parameters to the user router
  return userRoutes(req, res);
});

export default router;
