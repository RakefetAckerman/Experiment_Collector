import express from "express";
import userService from "../logic/serivces/UsersService.js";
import UserBoundary from "../boundaries/user/UserBoundary.js";
import { setCookieIfNeeded } from "../logic/middleware/auth.js";


const router = express.Router();

/**
 * Route for user registration.
 * @name POST users/register
 * @function
 * @param {Object} req - Express request object formed as UserBoundary.
 * @param {Object} res - Express response object.
 * @returns {Object<UserBoundary>} JSON response as UserBoundary structure containing user details.
 * @throws {import("http-errors").HttpError} JSON response containing Http error message.
 */
router.post("/register", async (req, res) => {
  const userData = req.body; // Getting the body of the request containing the NewUserBoundary data
  try {
    const reqUserBoundary = new UserBoundary(
      userData.platform,
      userData.email,
      userData.role,
      userData.username,
      userData.userDetails);

    const DBResponse = await userService.createUser(reqUserBoundary);
    if (DBResponse.hasOwnProperty('jwtToken')) {
      setCookieIfNeeded(req,res,DBResponse.jwtToken,DBResponse.expirationCookie)
    }
    res.status(201).json(DBResponse.body);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

/**
 * Route for user login.
 * @name POST users/login
 * @function
 * @param {Object} req - Express request object formed as UserBoundary.
 * @param {Object} res - Express response object.
 * @returns {Object<UserBoundary>} JSON response of token and UserBoundary structure for the
 * user details in case the user is not Particpant, otherwise there will be no JWT token.
 * @throws {import("http-errors").HttpError} JSON response containing Http error message.
 */
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
    if (DBResponse.hasOwnProperty('jwtToken')) {
      setCookieIfNeeded(req,res,DBResponse.jwtToken,DBResponse.expirationCookie)
    }
    res.status(200).json(DBResponse.body);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

/**
 * Route for updating user information.
 * @name PUT users/:email/:platform
 * @function
 * @param {Object} req - Express request object formed as UserBoundary.
 * @param {Object} res - Express response object.
 * @returns {Object} An empty JSON reposne.
 * @throws {import("http-errors").HttpError} JSON response containing Http error message.
 */
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
    const DBResponse = await userService.updateUser(userEmail, userPlatform, reqUserBoundary);
    res.status(200).json(DBResponse);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

/**
 * Route for getting user information.
 * @name GET users/:email/:platform
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {[Object]} An Array of JSON object structured as UserBoundary form.
 * @throws {import("http-errors").HttpError} JSON response containing Http error message.
 */
router.get("/:email/:platform", async (req, res) => {
  const userEmail = req.params.email;
  const userPlatform = req.params.platform;
  try {
    const DBResponse = await userService.getAllUsers(userEmail, userPlatform);
    res.status(200).json(DBResponse);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

/**
 * Route for deleting all users (only accessible to Admins).
 * @name DELETE users/:email/:platform
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response containing deletion status.
 * @throws {import("http-errors").HttpError} JSON response containing Http error message.
 */
router.delete("/:email/:platform", async (req, res) => {
  const userEmail = req.params.email;
  const userPlatform = req.params.platform;
  try {
    const DBResponse = await userService.deleteAllUsers(userEmail, userPlatform);
    res.status(200).json(DBResponse);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});


export default router;
