import express from "express";
import researchersController from "../controllers/researchersController.js";

const router = express.Router();

/**
 * Route for getting users information.
 * @name GET researchers/:email/:platform
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {[UserBoundary]} An Array of JSON object structured as UserBoundary form.
 * @throws {import("http-errors").HttpError} JSON response containing Http error message.
 */
router.get("/:email/:platform", async (req, res) => {
    researchersController.getAllUsers(req, res);
});

/**
 * Route for deleting all users (only accessible to Admins).
 * @name DELETE researchers/:email/:platform
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response containing deletion status.
 * @throws {import("http-errors").HttpError} JSON response containing Http error message.
 */
router.delete("/:email/:platform", async (req, res) => {
    researchersController.deleteAllUsers(req, res);
});

/**
 *  Route for creating new experiment from the Ui format.
 * @name POST /experiment/editor
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} JSON response containing deletion status.
 * @throws {import("http-errors").HttpError} JSON response containing Http error message.*
 */
router.post("/experiment/editor", async (req, res) => {
    await researchersController.createExperimentFromEditor(req, res);
});

export default router;
