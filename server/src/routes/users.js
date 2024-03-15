import express from "express";
import researchersController from "../controllers/researchersController.js"

//TODO: this router will turn to reasercher route and participants will be seprated to other route
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
  researchersController.registerUser(req,res);
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
  researchersController.loginUser(req,res);
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
  researchersController.updateUser(req,res);
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
  researchersController.getUser(req,res);
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
  researchersController.deleteAllUsers(req,res);
});


export default router;
