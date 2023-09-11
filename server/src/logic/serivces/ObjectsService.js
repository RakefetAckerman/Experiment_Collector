import mongoose from "mongoose";
import UserBoundary from "../../boundaries/user/UserBoundary.js";
import UserModel from "../../models/UserModel.js";
import userConverter from "../converters/UserConverter.js";
import createHttpError from 'http-errors';
import Roles from "../../utils/UserRole.js";
import ObjectModel from "../../models/ObjectModel.js";
import objectConverter from "../converters/ObjectBoundaryConverter.js";
import ObjectBoundary from "../../boundaries/object/ObjectBoundary.js";
const { Error } = mongoose;

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

        const objectModel = await objectConverter.toModel(reqObjectBoundary);

        const existingUser = userConverter.toBoundary(
            await UserModel.findOne({ _id: objectModel.createdBy }));

        if (!reqObjectBoundary.active && existingUser.role === Roles.PARTICIPANT)
            throw new createHttpError.Forbidden(`The user ${existingUser.username} not allowed to create this kind of objects`);

        return objectModel.validate()
            .then(() => objectModel.save())
            .catch((error) => {
                if (error instanceof Error.ValidationError) {
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
     * @returns {Promise<ObjectBoundary>} The updated user details.
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
            throw new createHttpError.Forbidden(`The user ${existingUser.username} not allowed to updat objects`);

        const existingObject = await ObjectModel.findOne({ _id: internalObjectId });
        // .then(async (objModel) => {
        //     return await objectConverter.toBoundary(objModel);
        // })
        // .then((objectBoundary) => {
        //     return objectBoundary;
        // });

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
     * Gets all users (only accessible to Admins).
     * @async
     * @function
     * @param {string} userEmail - The email of the user making the request.
     * @param {string} userPlatform - The platform of the user making the request.
     * @returns {Promise<UserModel[]>} An array of user models.
     * @throws {Error} Throws an error if the request encounters any issues.
     */
    getAllUsers: async (userEmail, userPlatform) => {
        const existingUserModel = await UserModel.findOne({
            'userId': userEmail + "$" + userPlatform
        });

        if (!existingUserModel)
            throw new createHttpError.NotFound("User does not exists");

        if (existingUserModel.role === Roles.ADMIN) {
            const usersArr = await UserModel.find();
            return usersArr;
        }
        else
            throw new createHttpError.Forbidden("You are not allowed to make this request");
    },
    /**
     * Deletes all users (only accessible to Admins).
     * @async
     * @function
     * @param {string} userEmail - The email of the user making the request.
     * @param {string} userPlatform - The platform of the user making the request.
     * @returns {Promise<{ n: number, deletedCount: number, ok: number }>} Deletion status.
     * @throws {Error} Throws an error if the request encounters any issues.
     */
    deleteAllUsers: async (userEmail, userPlatform) => {
        const existingUserModel = await UserModel.findOne({
            'userId': userEmail + "$" + userPlatform
        });

        if (!existingUserModel)
            throw new createHttpError.NotFound("User does not exists");

        if (existingUserModel.role === Roles.ADMIN) {
            const usersArr = await UserModel.deleteMany();
            return usersArr;
        }
        else
            throw new createHttpError.Forbidden("You are not allowed to make this request");
    }
};

/**
 * Exporting the userService object for further use by other modules if needed.
 * @type {Object}
 */
export default objectsService;