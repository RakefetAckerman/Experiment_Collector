import express from "express";
import participantsController from "../controllers/participantsController.js";

const router = express.Router();

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
  participantsController.createObject(req, res);
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
  participantsController.getObject(req, res);
});

/**
* Route for binding two objects one to another.
* @note Except Participnats, any user can us this API.
* @name PUT objects/internalObjectId/bind?email=example@demo.org&platform=userPlatform
* @function
* @param {Object} req - Express request object formed as UserBoundary.
* @param {Object} res - Express response object.
* @returns {Object} An empty JSON reposne.
* @throws {import("http-errors").HttpError} JSON response containing Http error message.
*/
router.put("/objects/:internalObjectId/bind", async (req, res) => {
  participantsController.bindNewChild(req, res);
});


/**
 * Route for getting all children objects of specific object, the retrieval is depened the presmissions of the user.
 * @name GET objects/internalObjectId/children?email=example@org.com&platform=userPlatform
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {[ObjectBoundary]} An Array of JSON object structured as ObjectBoundary form.
 * @throws {import("http-errors").HttpError} JSON response containing Http error message.
 */
router.get("/objects/:internalObjectId/children", async (req, res) => {
  participantsController.getAllChildren(req, res);
});


/**
 * Route for getting all parents objects of specific object, the retrieval is depened the presmissions of the user.
 * @name GET objects/internalObjectId/parents?email=example@org.com&platform=userPlatform
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {[ObjectBoundary]} An Array of JSON object structured as ObjectBoundary form.
 * @throws {import("http-errors").HttpError} JSON response containing Http error message.
 */
router.get("/objects/:internalObjectId/parents", async (req, res) => {
  participantsController.getAllParents(req, res);
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
  participantsController.getAllObjectsByType(req, res);
});

export default router;
