import express, { response } from "express";
import userService from "../logic/serivces/UsersService.js";
import { verifyToken } from "../logic/middleware/auth.js";
import UserBoundary from "../boundaries/user/UserBoundary.js";

const router = express.Router();

// Route for user registration
router.post("/register", async (req, res) => {
  const userData = req.body; // Getting the body of the request containing the NewUserBoundary data
  try {
    const reqUserBoundary = new UserBoundary(
      userData.platform,
      userData.email,
      userData.role,
      userData.username,
      userData.userDetails);

    const resUserBoundary = await userService.createUser(reqUserBoundary);
    res.status(201).json(resUserBoundary);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message }); // Use "error.status" instead of "error.code"
  }
});

// Route for user login
router.post("/login", async (req, res) => {
  const userData = req.body; // Getting the body of the request containing the NewUserBoundary data
  try {
    const reqUserBoundary = new UserBoundary(
      userData.platform,
      userData.email,
      userData.role,
      userData.username,
      userData.userDetails);
    const DBResponse = await userService.login(reqUserBoundary);
    res.status(200).json(DBResponse);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message }); // Use "error.status" instead of "error.code"
  }
});


router.put("/:email/:platform", async (req, res) => {
  const userEmail = req.params.email;
  const userPlatform = req.params.platform;
  const userData = req.body; // Getting the body of the request containing the NewUserBoundary data
  try {
    const reqUserBoundary = new UserBoundary(
      userData.platform,
      userData.email,
      userData.role,
      userData.username,
      userData.userDetails);
    const DBResponse = await userService.updateUser(userEmail,userPlatform, reqUserBoundary);
    res.status(200).json(DBResponse);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message }); // Use "error.status" instead of "error.code"
  }
});


export default router;
