import mongoose from "mongoose";
import UserModel from "../../models/UserModel.js";
import userConverter from "../converters/UserConverter.js";
import createHttpError from 'http-errors';
import Roles from "../../utils/UserRole.js";
import CommandBoundary from "../../boundaries/command/CommandBoundary.js";
import CommandModel from "../../models/CommandModel.js";
import commandConverter from "../converters/CommandConverter.js"
const { Error } = mongoose;

/**
 * @description Command Service handles executing operations that require more complex requests or algorithmic solutions.
 */
const objectsService = {
    /**
     * Creates a new command and executes it.
     * @note Only Researcher and Admin are allowed to perfoem this method.
     * @async
     * @function
     * @param {CommandBoundary} reqCommandBoundary - The command details to for creation and execution.
     * @returns {Promise<CommandBoundary>} The created command details after saving it within the database and fulfilling it.
     * @throws {Error} Throws an error if the user creation process encounters any issues.
     */
    createCommand: async (reqCommandBoundary) => {

        const commandModel = await commandConverter.toModel(reqCommandBoundary);

        const existingUser = userConverter.toBoundary(
            await UserModel.findOne({ _id: commandModel.invokedBy }));

        if (existingUser.role === Roles.PARTICIPANT)
            throw new createHttpError.Forbidden(`The user ${existingUser.username} not allowed to create this request`);

        return commandModel.validate()
            .then(commandHandler.runCommand(commandModel.command))
            .then(() => commandModel.save())
            .catch((error) => {
                if (error instanceof Error.ValidationError) {
                    throw new createHttpError.BadRequest("Invalid input, some of the fields for invoking command are missing");
                }
                throw error;
            })
            .then(() => commandConverter.toBoundary(commandModel));
    },
    /**
     * Gets all commands, accessible to Admin and Researcher.
     * Researcher and Admin are allowed to retrieve all the objects without any activation restriction, differently from 
     * Paraticipant that allowed to retrieve only active objects.
     * @async
     * @function
     * @param {string} userEmail - The email of the user making the request.
     * @param {string} userPlatform - The platform of the user making the request.
     * @returns {Promise<CommandBoundary[]>} An array of user models.
     * @throws {Error} Throws an error if the request encounters any issues.
     */
    getAllCommands: async (userEmail, userPlatform) => {
        const existingUser = await UserModel.findOne({
            'userId': userEmail + "$" + userPlatform
        });

        if (!existingUser)
            throw new createHttpError.NotFound("User does not exists");

        if (existingUser.role !== Roles.PARTICIPANT) {
            const allObjectsArr = await CommandModel.find();
            return Promise.all(allObjectsArr.map(object => commandConverter.toBoundary(object)));
        }
        throw new createHttpError.Forbidden("User is not allowed to perform this command");

    },
    /**
     * Deletes all Commands (only accessible to Admins).
     * @async
     * @function
     * @param {string} userEmail - The email of the user making the request.
     * @param {string} userPlatform - The platform of the user making the request.
     * @returns {Promise<{ n: number, deletedCount: number, ok: number }>} Deletion status.
     * @throws {Error} Throws an error if the request encounters any issues.
     */
    deleteAllCommands: async (userEmail, userPlatform) => {
        const existingUser = await UserModel.findOne({
            'userId': userEmail + "$" + userPlatform
        });

        if (!existingUser)
            throw new createHttpError.NotFound("User does not exists");

        if (existingUser.role === Roles.ADMIN) {
            const allCommandsArr = await CommandModel.deleteMany();
            return allCommandsArr;
        }
        throw new createHttpError.Forbidden("You are not allowed to make this request");
    }
};


const commandHandler = {
    runCommand: async (commandToExec) => {
        switch (commandToExec){
            case "ExportToCSV" :
                console.log("Converting objects to csv");
                break;
            case "ImportFromCSV":
                console.log("Converting csv files to objects");
                break;
            case "SendDateToDP":
                console.log("Sending data to DP");
                break;                  
        }
    }
}

/**
 * Exporting the userService object for further use by other modules if needed.
 * @type {Object}
 */
export default objectsService;