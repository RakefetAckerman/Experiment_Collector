import express from "express";
import userService from "../logic/serivces/UsersService.js";
import UserBoundary from "../boundaries/user/UserBoundary.js";
import ObjectBoundary from "../boundaries/object/ObjectBoundary.js";
import objectsService from "../logic/serivces/ObjectsService.js";


const router = express.Router();

/**
 * Route for creating new object
 * @name POST objects/
 * @function
 * @param {Object} req - Express request object formed as UserBoundary.
 * @param {Object} res - Express response object.
 * @returns {Object<ObjectBoundary>} JSON response as UserBoundary structure containing user details.
 * @throws {import("http-errors").HttpError} JSON response containing Http error message.
 */
router.post("/", async (req, res) => {
  try {
    const reqObjectBoundary = new ObjectBoundary();

    /*Getting the body of the request containing the ObjectBoundary data and assigning it to the ObjectBoundaryInstance*/
    Object.assign(reqObjectBoundary, req.body); 

    const resUserBoundary = await objectsService.createObject(reqObjectBoundary);
    res.status(201).json(resUserBoundary);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message }); // Use "error.status" instead of "error.code"
  }
});

/**
 * Route for updating an object.
 * @note Except Participnats, any user can update any objects.
 * @name PUT objects/:email/:platform
 * @function
 * @param {Object} req - Express request object formed as UserBoundary.
 * @param {Object} res - Express response object.
 * @returns {Object} An empty JSON reposne.
 * @throws {import("http-errors").HttpError} JSON response containing Http error message.
 */
router.put("/:email/:platform", async (req, res) => {
  try {
    const userEmail = req.params.email;
    const userPlatform = req.params.platform;
    const internalObjectid = req.query.objectId;

    /*Getting the body of the request containing the ObjectBoundary data and assigning it to the ObjectBoundaryInstance*/
    const reqObjectBoundary = new ObjectBoundary();
    Object.assign(reqObjectBoundary,req.body);
    
    await objectsService.updateObject(userEmail, userPlatform, internalObjectid, reqObjectBoundary);
    res.status(200).send();
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message }); // Use "error.status" instead of "error.code"
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
    res.status(error.status || 500).json({ error: error.message }); // Use "error.status" instead of "error.code"
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
    res.status(error.status || 500).json({ error: error.message }); // Use "error.status" instead of "error.code"
  }
});


export default router;
