import express from "express";
import experimentController from "../controllers/experimentController.js";

const router = express.Router();

/**
 * Route for getting experiment by name.
 * @name GET /:experimentName
 * @function
 * @param {Object} req - Express request object formed as UserBoundary.
 * @param {Object} res - Express response object.
 * @returns {Object<ObjectBoundary>} returns the experiment and the TrialType id array.
 * @throws {import("http-errors").HttpError} JSON response containing Http error message.
 */
router.get("/:experimentName", async (req, res) => {
    await experimentController.getExperimentByName(req, res);
});

/**
 * Route for getting TrialType in the Ui format from object id.
 * @name GET /trailType/:trialType
 * @function
 * @param {Object} req - Express request object formed as UserBoundary.
 * @param {Object} res - Express response object.
 * @returns {Object<ObjectBoundary>} returns the TrialType including his children element ready for Ui rendering in the client.
 * @throws {import("http-errors").HttpError} JSON response containing Http error message.
 */
router.get("/trailType/:trialType", async (req, res) => {
    await experimentController.getTrialType(req, res);
});

/**
 * Route for setting the output from the Users in a TrialType.
 * @name POST /setUserOutput
 * @function
 * @param {Object} req - Express request object formed as UserBoundary.
 * @param {Object} res - Express response object.
 * @throws {import("http-errors").HttpError} JSON response containing Http error message.
 */
router.post("/setUserOutput", async (req, res) => {
    await experimentController.addUserOutputObject(req, res);
});

router.get("/getUsersOutput/:experimentId/:email/:platform", async (req, res) => {
    await experimentController.getUsersOutput(req, res);
});

export default router;
