// authRoutes.js
import express from "express";
import { verifyToken } from "../logic/middleware/auth.js";
import userRoutes from "./users.js";
import objectRoutes from "./objects.js";

const router = express.Router();

router.use("/users", verifyToken, userRoutes);//Letting the auth router know the users' router
router.use("/objects", verifyToken, objectRoutes);//Letting the auth router know the objects' router


export default router;
