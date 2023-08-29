import express from "express";
import userService from "../logic/serivces/UsersService"; // Make sure the path is correct
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Route for user registration
router.post("/register", (req, res) => {
  const userData = req.body; // Assuming you have the user data in the request body
  try {
    const newUser = userService.createUser(userData);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route for user login
router.post("/login", (req, res) => {
  const { userSuperApp, userEmail } = req.body;
  try {
    const user = userService.login(userSuperApp, userEmail);
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

// Example of a protected route using token verification middleware
router.get("/profile", verifyToken, (req, res) => {
  const userId = req.user.id; // Assuming you have the user ID in the request
  try {
    const userData = userService.getUserData(userId);
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// ... Other routes

export default router;
