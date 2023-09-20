import express from "express";
import CommandBoundary from "../boundaries/object/ObjectIdBoundary.js";
import commandsService from "../logic/serivces/CommandsService.js"


const router = express.Router();

/**
 * Route for creating new command, after the creation found out as successful the command will be executed and will be stord within the database.
 * @name POST objects/
 * @function
 * @param {Object} req - Express request object formed as UserBoundary.
 * @param {Object} res - Express response object.
 * @returns {Object<CommandBoundary>} JSON response as ObjectBoundary structure containing user details.
 * @throws {import("http-errors").HttpError} JSON response containing Http error message.
 */
router.post("/", async (req, res) => {
  try {
    const reqCommandBoundary = new CommandBoundary();

    /*Getting the body of the request containing the ObjectBoundary data and assigning it to the ObjectBoundary instance*/
    Object.assign(reqCommandBoundary, req.body);

    const resCommandBoundary = await commandsService.invokeCommand(reqCommandBoundary);
    res.status(201).json(resCommandBoundary);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

/**
 * Route for getting all commands, the retrieval is depened the presmissions of the user.
 * @name GET commands?email=example@org.com&platform=userPlatform
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {[CommandBoundary]} An Array of JSON object structured as ObjectBoundary form.
 * @throws {import("http-errors").HttpError} JSON response containing Http error message.
 */
router.get("/", async (req, res) => {
  try {
    const userEmail = req.query.email;
    const userPlatform = req.query.platform;

    const DBResponse = await commandsService.getAllCommands(userEmail, userPlatform);
    res.status(200).json(DBResponse);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

/**
 * Route for deleting all commands (only accessible to Admins).
 * @name DELETE commands?email=example@org.com&platform=userPlatform
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response containing deletion status.
 * @throws {import("http-errors").HttpError} JSON response containing Http error message.
 */
router.delete("/", async (req, res) => {
  const userEmail = req.query.email;
  const userPlatform = req.query.platform;
  try {
    const DBResponse = await commandsService.deleteAllCommands(userEmail, userPlatform);
    res.status(200).json(DBResponse);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

export default router;
