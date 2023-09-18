import express from "express";
import ObjectBoundary from "../boundaries/object/ObjectBoundary.js";
import objectsService from "../logic/serivces/ObjectsService.js";
import ObjectIdBoundary from "../boundaries/object/ObjectIdBoundary.js";


const router = express.Router();

/**
 * Route for creating new object
 * @name POST objects/
 * @function
 * @param {Object} req - Express request object formed as UserBoundary.
 * @param {Object} res - Express response object.
 * @returns {Object<ObjectBoundary>} JSON response as ObjectBoundary structure containing user details.
 * @throws {import("http-errors").HttpError} JSON response containing Http error message.
 */
router.post("/", async (req, res) => {
  try {
    const reqObjectBoundary = new ObjectBoundary();

    /*Getting the body of the request containing the ObjectBoundary data and assigning it to the ObjectBoundary instance*/
    Object.assign(reqObjectBoundary, req.body);

    const resUserBoundary = await objectsService.createObject(reqObjectBoundary);
    res.status(201).json(resUserBoundary);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

/**
 * Route for getting object details.
 * @name GET objects/:internalObjectId
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {ObjectBoundary} An Array of JSON object structured as ObjectBoundary form.
 * @throws {import("http-errors").HttpError} JSON response containing Http error message.
 */
router.get("/:internalObjectId", async (req, res) => {
  try {
    const internalObjectId = req.params.internalObjectId;
    const userEmail = req.query.email;
    const userPlatform = req.query.platform;

    const DBResponse = await objectsService.getObject(internalObjectId, userEmail, userPlatform);
    res.status(200).json(DBResponse);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

/**
 * Route for getting all objects, the retrieval is depened the presmissions of the user.
 * @name GET objects?email=example@org.com&platform=userPlatform
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {[Object]} An Array of JSON object structured as ObjectBoundary form.
 * @throws {import("http-errors").HttpError} JSON response containing Http error message.
 */
router.get("/", async (req, res) => {
  try {
    const userEmail = req.query.email;
    const userPlatform = req.query.platform;

    const DBResponse = await objectsService.getAllObjects(userEmail, userPlatform);
    res.status(200).json(DBResponse);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

/**
 * Route for deleting all objects (only accessible to Admins).
 * @name DELETE objects/:email/:platform
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
    const DBResponse = await objectsService.deleteAllObjects(userEmail, userPlatform);
    res.status(200).json(DBResponse);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
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
router.put("/:internalObjectId/bind", async (req, res) => {
  try {
    const internalObjectid = req.params.internalObjectId;
    const userEmail = req.query.email;
    const userPlatform = req.query.platform;

    /*Getting the body of the request containing the ObjectBoundary data and assigning it to the ObjectBoundary instance*/
    const reqObjectIdBoundary = new ObjectIdBoundary();
    Object.assign(reqObjectIdBoundary, req.body.objectId);

    await objectsService.bindNewChild(internalObjectid, userEmail, userPlatform, reqObjectIdBoundary);
    res.status(200).send();
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});


/**
 * Route for unbinding two objects one to another.
 * @note Except Participnats, any user can us this API.
 * @name PUT objects/internalObjectId/unbind?email=example@demo.org&platform=userPlatform
 * @function
 * @param {Object} req - Express request object formed as UserBoundary.
 * @param {Object} res - Express response object.
 * @returns {Object} An empty JSON reposne.
 * @throws {import("http-errors").HttpError} JSON response containing Http error message.
 */
router.put("/:internalObjectId/unbind", async (req, res) => {
  try {
    const internalObjectid = req.params.internalObjectId;
    const userEmail = req.query.email;
    const userPlatform = req.query.platform;

    /*Getting the body of the request containing the ObjectBoundary data and assigning it to the ObjectBoundary instance*/
    const reqObjectIdBoundary = new ObjectIdBoundary();
    Object.assign(reqObjectIdBoundary, req.body.objectId);

    await objectsService.unbindChild(internalObjectid, userEmail, userPlatform, reqObjectIdBoundary);
    res.status(200).send();
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
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

    /*Getting the body of the request containing the ObjectBoundary data and assigning it to the ObjectBoundary instance*/
    const reqObjectBoundary = new ObjectBoundary();
    Object.assign(reqObjectBoundary, req.body);

    await objectsService.updateObject(userEmail, userPlatform, internalObjectid, reqObjectBoundary);
    res.status(200).send();
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
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
router.get("/:internalObjectId/children", async (req, res) => {
  try {
    const internalObjectId = req.params.internalObjectId;
    const userEmail = req.query.email;
    const userPlatform = req.query.platform;

    const DBResponse = await objectsService.getAllChildren(internalObjectId, userEmail, userPlatform);
    res.status(200).json(DBResponse);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
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
router.get("/:internalObjectId/parents", async (req, res) => {
  try {
    const internalObjectId = req.params.internalObjectId;
    const userEmail = req.query.email;
    const userPlatform = req.query.platform;

    const DBResponse = await objectsService.getAllParents(internalObjectId, userEmail, userPlatform);
    res.status(200).json(DBResponse);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

/**
 * Route for getting all objects by certain type, the retrieval is depened the presmissions of the user.
 * @name GET objects?email=example@org.com&platform=userPlatform&type=someType
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {[Object]} An Array of JSON object structured as UserBoundary form.
 * @throws {import("http-errors").HttpError} JSON response containing Http error message.
 */
router.get("/type/:targetType", async (req, res) => {
  try {
    const userEmail = req.query.email;
    const userPlatform = req.query.platform;
    const targetType = req.params.targetType;

    console.log("query",req.query,"\nparams:",req.params);

    const DBResponse = await objectsService.getAllObjectsByType(targetType, userEmail, userPlatform);
    res.status(200).json(DBResponse);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

export default router;
