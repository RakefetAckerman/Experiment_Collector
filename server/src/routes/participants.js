import express from "express";
import participantsController from "../controllers/participantsController.js";

const router = express.Router();

/**
 * Route for participants registration.
 * @name POST participants/register
 * @function
 * @param {Object} req - Express request object formed as UserBoundary.
 * @param {Object} res - Express response object.
 * @returns {Object<UserBoundary>} JSON response as UserBoundary structure containing user details.
 * @throws {import("http-errors").HttpError} JSON response containing Http error message.
 */
router.post("/register", async (req, res) => {
  participantsController.registerUser(req,res);
});

/**
 * Route for participants login.
 * @name POST participants/login
 * @function
 * @param {Object} req - Express request object formed as UserBoundary.
 * @param {Object} res - Express response object.
 * @returns {Object<UserBoundary>} JSON response of token and UserBoundary structure for the
 * user details in case the user is not Particpant, otherwise there will be no JWT token.
 * @throws {import("http-errors").HttpError} JSON response containing Http error message.
 */
router.post("/login", async (req, res) => {
  participantsController.loginUser(req,res);
});

/**
 * Route for creating new object
 * @name POST participants/objects/
 * @function
 * @param {Object} req - Express request object formed as UserBoundary.
 * @param {Object} res - Express response object.
 * @returns {Object<ObjectBoundary>} JSON response as ObjectBoundary structure containing user details.
 * @throws {import("http-errors").HttpError} JSON response containing Http error message.
 */
router.post("/objects", async (req, res) => {
    participantsController.createObject(req,res);
  });
  
  /**
   * Route for getting specific object.
   * @name GET participants/objects/:internalObjectId
   * @function
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @returns {ObjectBoundary} An Array of JSON object structured as ObjectBoundary form.
   * @throws {import("http-errors").HttpError} JSON response containing Http error message.
   */
  router.get("/objects/:internalObjectId", async (req, res) => {
    participantsController.getObject(req,res);
  });

  /**
   * Route for getting all objects by certain type, the retrieval is depened the presmissions of the user.
   * @name GET participants/objects?email=example@org.com&platform=userPlatform&type=someType
   * @function
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @returns {[Object]} An Array of JSON object structured as UserBoundary form.
   * @throws {import("http-errors").HttpError} JSON response containing Http error message.
   */
  router.get("/objects/type/:targetType", async (req, res) => {
    participantsController.getAllObjectsByType(req,res);
  });

export default router;
