import express from "express";
import userService from "../logic/serivces/UsersService.js";
import { verifyToken } from "../logic/middleware/auth.js";
import NewUserBoundary from "../boundaries/user/NewUserBoundary.js";
import UserBoundary from "../boundaries/user/UserBoundary.js";

const router = express.Router();

// Route for user registration
router.post("/register", async (req, res) => {
  const userData = req.body; // Getting the body of the request containing the NewUserBoundary data
  try {
    const newUserBoundary = new NewUserBoundary(
      userData.platform,
      userData.email,
      userData.role,
      userData.username,
      userData.userDetails);

    const userBoundary = await userService.createUser(newUserBoundary);
    res.status(201).json(userBoundary);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message }); // Use "error.status" instead of "error.code"
  }
});

// Route for user login
router.get("/login", (req, res) => {
  const { userSuperApp, userEmail } = req.body;
  try {
    const user = userService.login(userSuperApp, userEmail);
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});


export default router;
