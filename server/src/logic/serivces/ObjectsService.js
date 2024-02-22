/**
 * Module: ObjectService.js
 * Description: Handles object-related operations like creating, updating, and deleting objects, and also attaching objects
 * Author: Shoval Shabi
 */
import mongoose from "mongoose";// Import mongoose for interacting with MongoDB
import UserModel from "../../models/UserModel.js";// Import the UserModel for database operations related to users
import userConverter from "../converters/UserConverter.js";// Import the userConverter for converting user objects between different formats
import createHttpError from 'http-errors';// Import createHttpError for creating HTTP error objects
import Roles from "../../utils/UserRole.js";// Import Roles for defining user roles and permissions
import ObjectModel from "../../models/ObjectModel.js";// Import ObjectModel for database operations related to objects
import objectConverter from "../converters/ObjectBoundaryConverter.js";// Import the objectConverter for converting object objects between different formats
import ObjectBoundary from "../../boundaries/object/ObjectBoundary.js";// Import ObjectBoundary for defining the structure of object objects
import createCustomLogger from "../../config/logger.js";// Import the configured logger for logging user-related activities
import path from 'path';// Import path for identifying file paths, used for logging purposes


const { Error } = mongoose;// Import the Error class from mongoose for handling database errors

//Logger configuration fo the ObjectService module
const logger = createCustomLogger({
    moduleFilename: path.parse(new URL(import.meta.url).pathname).name,
    logToFile: true,
    logLevel: process.env.INFO_LOG,
    logRotation: true
});

/**
 * @description Object Service handles object-related operations like creating, updating, and deleting objects, and also attaching objects
 * one to another.
 */
const objectsService = {
    /**
     * Creates a new object.
     * @async
     * @function
     * @param {UserBoundary} reqUserBoundary - The user details to create a new user.
     * @returns {Promise<ObjectBoundary>} The created user details after saving it within the database.
     * @throws {Error} Throws an error if the user creation process encounters any issues.
     */
    createObject: async (reqObjectBoundary) => {
        if (!reqObjectBoundary) {
            logger.error("There is no object to create")
            throw new createHttpError.BadRequest("There is no object to create");
        }

        //Checking for undefined properties, alias, creationTimestamp,modificationTimestamp and location are optional
        if (!reqObjectBoundary.type ||
            !reqObjectBoundary.active === undefined ||
            !reqObjectBoundary.createdBy ||
            !reqObjectBoundary.createdBy.userId.platform ||
            !reqObjectBoundary.createdBy.userId.email ||
            !reqObjectBoundary.objectDetails) {
            logger.error("Some of the objects properties are undefined")
            throw new createHttpError.BadRequest("Some of the objects properties are undefined");
        }

        const objectModel = await objectConverter.toModel(reqObjectBoundary);

        const existingUser = userConverter.toBoundary(
            await UserModel.findOne({ _id: objectModel.createdBy._id }));

        if (!existingUser) {
            logger.error(`User with userId ${reqObjectBoundary.createdBy.userId.email + "$" + reqObjectBoundary.createdBy.userId.platform} does not exists`);
            throw new createHttpError.NotFound("User not found");
        }

        if (!reqObjectBoundary.active && existingUser.role === Roles.PARTICIPANT) {
            logger.warn(`User with userId ${reqObjectBoundary.createdBy.userId.email + "$" + reqObjectBoundary.createdBy.userId.platform} tried to create inactive object`);
            throw new createHttpError.Forbidden(`The user ${existingUser.username} does not allowed to create this kind of objects`);
        }

        return objectModel.validate()
            .then(() => {
                objectModel.save();
                logger.info(`The user ${reqObjectBoundary.createdBy.userId.email + "$" + reqObjectBoundary.createdBy.userId.platform} successfully created an object`)
            })
            .catch((error) => {
                if (error instanceof Error.ValidationError) {
                    logger.error(`Invalid input, some of the fields for creating new object are missing`);
                    throw new createHttpError.BadRequest("Invalid input, some of the fields for creating new object are missing");
                }
                throw error;
            })
            .then(() => objectConverter.toBoundary(objectModel));
    },
    /**
     * Updates an object.
     * @async
     * @function
     * @param {string} internalObjectId - The internal object id of the object.
     * @param {string} userEmail - The email of the user making the request.
     * @param {string} userPlatform - The platform of the user.
     * @param {ObjectBoundary} objectToUpdate - The fields that user provide to update.
     * @returns {undefined}
     * @throws {Error} Throws an error if the update process encounters any issues.
     */
    updateObject: async (userEmail, userPlatform, internalObjectId, objectToUpdate) => {
        //TODO: need to fix the creation of a new document as well for users maybe happens when converted!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        const existingUser = userConverter.toBoundary(
            await UserModel.findOne({
                'userId': userEmail + "$" + userPlatform
            }));

        if (!existingUser)
            throw new createHttpError.NotFound("User does not exists");

        if (existingUser.role === Roles.PARTICIPANT)
            throw new createHttpError.Forbidden(`The user ${existingUser.username} not allowed to update objects`);

        const existingObject = await ObjectModel.findOne({ _id: internalObjectId });

        if (!existingObject)
            throw new createHttpError.NotFound("Object does not exists");

        if (objectToUpdate.type) {
            if (objectToUpdate.type.length === 0)
                throw new createHttpError.Forbidden("Object type should not be an empty string");
            existingObject.type = objectToUpdate.type;
        }

        if (objectToUpdate.alias) {
            if (objectToUpdate.alias.length === 0)
                throw new createHttpError.Forbidden("Object alias should not be an empty string");
            existingObject.alias = objectToUpdate.alias;
        }

        if (objectToUpdate.active !== undefined)
            existingObject.active = objectToUpdate.active;

        if (objectToUpdate.creationTimestamp)
            throw new createHttpError.Forbidden("Creation timestamp cannot be changed");

        if (objectToUpdate.location) {
            if (objectToUpdate.location.lat)
                existingObject.location.lat = objectToUpdate.location.lat;

            if (objectToUpdate.location.lng)
                existingObject.location.lng = objectToUpdate.location.lng;
        }

        if (objectToUpdate.objectDetails) {
            existingObject.objectDetails = {
                ...existingObject.objectDetails,
                ...objectToUpdate.objectDetails
            };
        }

        existingObject.validate()
            .then(() => existingObject.save())
            .catch((error) => {
                if (error instanceof Error.ValidationError) {
                    throw new createHttpError.BadRequest("Invalid input, some of the fields for updating new object are missing");
                }
                throw error;
            });

    },
    /**
     * Get the designated object.
     * @async
     * @function
     * @param {String} internalObjectId - The internal object id.
     * @param {String} userEmail - The user email.
     * @param {String} userPlatform - The user platform.
     * @returns {Promise<ObjectBoundary>} An object boundary.
     * @throws {Error} Throws an error if the retrieval process encounters any issues.
     */
    getObject: async (internalObjectId, userEmail, userPlatform) => {
        const existingUser = await UserModel.findOne({
            'userId': userEmail + "$" + userPlatform
        });

        if (!existingUser)
            throw new createHttpError.NotFound("User does not exists");

        const existingObject = await ObjectModel.findOne({ _id: internalObjectId });

        if (!existingObject)
            throw new createHttpError.NotFound("Object does not exists");


        if (existingUser.role === Roles.PARTICIPANT && !existingObject.active)
            throw new createHttpError.Forbidden(`The user ${existingUser.username} is not allowed to retrieve this object`);

        return objectConverter.toBoundary(existingObject);
    },
    /**
     * Gets all objects, accessible to any user.
     * Researcher and Admin are allowed to retrieve all the objects without any activation restriction, differently from 
     * Paraticipant that allowed to retrieve only active objects.
     * @async
     * @function
     * @param {string} userEmail - The email of the user making the request.
     * @param {string} userPlatform - The platform of the user making the request.
     * @returns {Promise<ObjectBoundary[]>} An array of user models.
     * @throws {Error} Throws an error if the request encounters any issues.
     */
    getAllObjects: async (userEmail, userPlatform) => {
        const existingUser = await UserModel.findOne({
            'userId': userEmail + "$" + userPlatform
        });

        /*if (!existingUser)
            throw new createHttpError.NotFound("User does not exists");*/

        if (existingUser.role !== Roles.PARTICIPANT) {
            const allObjectsArr = await ObjectModel.find();
            //console.log("hereeeeeeeeeee ",userEmail," ", userPlatform);
            return Promise.all(allObjectsArr.map(object => objectConverter.toBoundary(object)));
        }
    },
    /**
     * Deletes all objects (only accessible to Admins).
     * @async
     * @function
     * @param {string} userEmail - The email of the user making the request.
     * @param {string} userPlatform - The platform of the user making the request.
     * @returns {Promise<{ n: number, deletedCount: number, ok: number }>} Deletion status.
     * @throws {Error} Throws an error if the request encounters any issues.
     */
    deleteAllObjects: async (userEmail, userPlatform) => {
        const existingUser = await UserModel.findOne({
            'userId': userEmail + "$" + userPlatform
        });

        if (!existingUser)
            throw new createHttpError.NotFound("User does not exists");

        if (existingUser.role === Roles.ADMIN) {
            const allObjectsArr = await ObjectModel.deleteMany();
            return allObjectsArr;
        }
        else
            throw new createHttpError.Forbidden("You are not allowed to make this request");
    },
    /**
    * Binds between two objects (accessible to any user except Participant).
    * @async
    * @function
    * @param {string} internalObjectId - The internal objectId of the parent object
    * @param {string} userEmail - The email of the user making the request.
    * @param {string} userPlatform - The platform of the user making the request.
    * @param {string} objectIdBoundary - The object id boundary of the child object.
    * @returns {undefined}
    * @throws {Error} Throws an error if the request encounters any issues.
    */
    bindNewChild: async (internalObjectId, userEmail, userPlatform, objectIdBoundary) => {

        const existingUser = await UserModel.findOne({
            'userId': userEmail + "$" + userPlatform
        });

        if (!existingUser)
            throw new createHttpError.NotFound("User does not exists");

        if (existingUser.role === Roles.PARTICIPANT)
            throw new createHttpError.Forbidden("You are not allowed to make this request");

        const childObj = await ObjectModel.findOne({ _id: objectIdBoundary.internalObjectId });

        if (!childObj)
            throw new createHttpError.NotFound("Child object does not exists");

        const parentObj = await ObjectModel.findOne({ _id: internalObjectId });

        if (!parentObj)
            throw new createHttpError.NotFound("Parent object does not exists");

        parentObj.children.push(childObj);
        childObj.parents.push(parentObj);

        childObj.save();
        parentObj.save();
    },
    /**
     * Unbinds between two objects (accessible to any user except Participant).
    * @async
    * @function
    * @param {string} internalObjectId - The internal objectId of the parent object
    * @param {string} userEmail - The email of the user making the request.
    * @param {string} userPlatform - The platform of the user making the request.
    * @param {string} objectIdBoundary - The object id boundary of the child object.
    * @returns {undefined}
    * @throws {Error} Throws an error if the request encounters any issues.
    */
    unbindChild: async (internalObjectId, userEmail, userPlatform, objectIdBoundary) => {

        const existingUser = await UserModel.findOne({
            'userId': userEmail + "$" + userPlatform
        });

        if (!existingUser)
            throw new createHttpError.NotFound("User does not exists");

        if (existingUser.role === Roles.PARTICIPANT)
            throw new createHttpError.Forbidden("You are not allowed to make this request");

        const childObj = await ObjectModel.findOne({ _id: objectIdBoundary.internalObjectId });

        if (!childObj)
            throw new createHttpError.NotFound("Child object does not exists");

        const parentObj = await ObjectModel.findOne({ _id: internalObjectId });

        if (!parentObj)
            throw new createHttpError.NotFound("Parent object does not exists");

        parentObj.children = parentObj.
            children.
            filter(internalId => internalId._id.toString() !== objectIdBoundary.internalObjectId);

        childObj.parents = childObj.
            parents.
            filter(internalId => internalId._id.toString() !== parentObj._id.toString());;

        childObj.save();
        parentObj.save();
    },
    /**
     * Gets all the children objects of certain object, accessible to any user.
     * Researcher and Admin are allowed to retrieve all the objects without any activation restriction, differently from 
     * Paraticipant that allowed to retrieve only active objects.
     * @async
     * @function
     * @param {string} internalObjectId - The internal objectId of the parent object
     * @param {string} userEmail - The email of the user making the request.
     * @param {string} userPlatform - The platform of the user making the request.
     * @returns {Promise<ObjectBoundary[]>} An array of user models.
     * @throws {Error} Throws an error if the request encounters any issues.
     */
    getAllChildren: async (internalObjectId, userEmail, userPlatform) => {
        const existingUser = await UserModel.findOne({
            'userId': userEmail + "$" + userPlatform
        });

        if (!existingUser)
            throw new createHttpError.NotFound("User does not exists");

        const parentObj = await ObjectModel.findOne({ _id: internalObjectId });

        if (!parentObj)
            throw new createHttpError.NotFound("Object does not exists");

        if (existingUser.role === Roles.PARTICIPANT) {
            return Promise.all(parentObj.children
                .map(async objectId => {
                    const childObj = await ObjectModel.findOne({ _id: objectId, active: true });
                    return childObj;
                }))
                .then(async (objects) => {
                    const filteredObjects = objects.filter(object => object !== null); // Filtering the objects that didn't matched the requirements in this case it is active flag
                    return Promise.all(filteredObjects.map(async object => await objectConverter.toBoundary(object)));
                });
        }
        else {
            return Promise.all(parentObj.children.
                map(async objectId => {
                    const childObj = await ObjectModel.findOne({ _id: objectId })
                    return childObj;
                }).
                map(async object => objectConverter.toBoundary(await object)));// Awaiting the object to be retrieved by mongoose 
        }
    },
    /**
     * Gets all the parents objects of certain object, accessible to any user.
     * Researcher and Admin are allowed to retrieve all the objects without any activation restriction, differently from 
     * Paraticipant that allowed to retrieve only active objects.
     * @async
     * @function
     * @param {string} internalObjectId - The internal objectId of the child object
     * @param {string} userEmail - The email of the user making the request.
     * @param {string} userPlatform - The platform of the user making the request.
     * @returns {Promise<ObjectBoundary[]>} An array of user models.
     * @throws {Error} Throws an error if the request encounters any issues.
     */
    getAllParents: async (internalObjectId, userEmail, userPlatform) => {
        const existingUser = await UserModel.findOne({
            'userId': userEmail + "$" + userPlatform
        });

        if (!existingUser)
            throw new createHttpError.NotFound("User does not exists");

        const childObj = await ObjectModel.findOne({ _id: internalObjectId });

        if (!childObj)
            throw new createHttpError.NotFound("Object does not exists");

        if (existingUser.role === Roles.PARTICIPANT) {
            return Promise.all(childObj.parents
                .map(async objectId => {
                    const parentObj = await ObjectModel.findOne({ _id: objectId, active: true });
                    return parentObj;
                }))
                .then(async (objects) => {
                    const filteredObjects = objects.filter(object => object !== null); // Filtering the objects that didn't matched the requirements in this case it is active flag
                    return Promise.all(filteredObjects.map(async object => await objectConverter.toBoundary(object)));
                });
        }
        else {
            return Promise.all(childObj.parents.
                map(async objectId => {
                    const parentObj = await ObjectModel.findOne({ _id: objectId })
                    return parentObj;
                }).
                map(async object => objectConverter.toBoundary(await object)));// Awaiting the object to be retrieved by mongoose 
        }
    },
    /**
     * Gets all the objects of certain type, accessible to any user.
     * Researcher and Admin are allowed to retrieve all the objects without any activation restriction, differently from 
     * Paraticipant that allowed to retrieve only active objects.
     * @async
     * @function
     * @param {string} targetType - The desired type of the objects
     * @param {string} userEmail - The email of the user making the request.
     * @param {string} userPlatform - The platform of the user making the request.
     * @returns {Promise<ObjectBoundary[]>} An array of user models.
     * @throws {Error} Throws an error if the request encounters any issues.
    */
    getAllObjectsByType: async (targetType, userEmail, userPlatform) => {
        const existingUser = await UserModel.findOne({
            'userId': userEmail + "$" + userPlatform
        });

        if (!existingUser)
            throw new createHttpError.NotFound("User does not exists");

        if (existingUser.role === Roles.PARTICIPANT) {
            const allObjType = await ObjectModel.find({ type: targetType, active: true });
            return Promise.all(allObjType.map(async object => objectConverter.toBoundary(await object)));
        }
        const allObjType = await ObjectModel.find({ type: targetType });
        return Promise.all(allObjType.map(async object => objectConverter.toBoundary(await object)));
    }
};

/**
 * Exporting the userService object for further use by other modules if needed.
 * @type {Object}
 */
export default objectsService;