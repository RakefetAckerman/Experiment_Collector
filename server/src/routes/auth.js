// authRoutes.js
import express from "express";
import { verifyToken } from "../logic/middleware/auth.js";
import userRoutes from "./users.js";

const router = express.Router();

router.use("/users",userRoutes);//Letting the auth router know the users' router

// Redirect route to the updateUser method with query parameters after token validation
router.put("/users/:email/:platform", verifyToken, (req, res) => {
  // Pass the query parameters to the user router
  return userRoutes(req,res);
});

export default router;
