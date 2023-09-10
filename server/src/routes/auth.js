// authRoutes.js
import express from "express";
import { verifyToken } from "../logic/middleware/auth.js";
import userRoutes from "./users.js";

const router = express.Router();

router.use("/users", verifyToken, userRoutes);//Letting the auth router know the users' router

export default router;
