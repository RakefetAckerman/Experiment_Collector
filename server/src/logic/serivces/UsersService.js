import mongoose from "mongoose";
import UserBoundary from "../../boundaries/user/UserBoundary.js";
import UserModel from "../../models/UserModel.js";
import userConverter from "../converters/UserConverter.js";
import createHttpError from 'http-errors';
import Roles from "../../utils/UserRole.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const { Error } = mongoose;

/**
 * @description User Service handles user-related operations like creating, updating, and deleting users.
 */
const userService = {
  /**
   * Creates a new user.
   * @async
   * @function
   * @param {UserBoundary} reqUserBoundary - The user details to create a new user.
   * @returns {Promise<UserBoundary>} The created user details after saving it within the database.
   * @throws {Error} Throws an error if the user creation process encounters any issues.
   */
  createUser: async (reqUserBoundary) => {
    if (!reqUserBoundary.userId || reqUserBoundary.userId.email.length === 0 || reqUserBoundary.userId.platform === 0)
      throw new createHttpError.BadRequest("Email or platform name cannot be an empty string");

    const existingUser = await UserModel.findOne({
      'userId': reqUserBoundary.userId.email + "$" + reqUserBoundary.userId.platform
    });

    if (existingUser) {
      return userService.login(reqUserBoundary);
    }

    const userModel = userConverter.toModel(reqUserBoundary);

    return userModel.validate()
      .then(async () => {
        /*In case the user is an Admin or Researcher the client will send thier password within the UserDetails */
        if (userModel.role !== Roles.PARTICIPANT) {
          const salt = await bcrypt.genSalt();
          if (!userModel.userDetails.hasOwnProperty('password')) {
            throw new Error.ValidationError();
          }
          userModel.userDetails.password = await bcrypt.hash(userModel.userDetails.password, salt);
        }
      })
      .then(() => userModel.save())
      .catch((error) => {
        if (error instanceof Error.ValidationError) {
          throw new createHttpError.BadRequest("Invalid input, some of the fields for creating new user are missing");
        }
        throw error;
      })
      .then(() => ({ body: userConverter.toBoundary(userModel) }));
  },
  /**
   * Logs in a user.
   * @async
   * @function
   * @param {UserBoundary} reqUserBoundary - The user details for login.
   * @returns {Promise<{ token: string, userBoundary: UserBoundary }>} The JWT token and user details.
   * @throws {Error} Throws an error if the login process encounters any issues.
   */
  login: async (reqUserBoundary) => {
    if (!reqUserBoundary.userId || reqUserBoundary.userId.email.length === 0 || reqUserBoundary.userId.platform === 0)
      throw new createHttpError.BadRequest("Email or platform name cannot be an empty string");

    const existingUserModel = await UserModel.findOne({
      'userId': reqUserBoundary.userId.email + "$" + reqUserBoundary.userId.platform
    });

    /* In case that none particpant with special authrizations tries to log in wihout signup first
    * The Client will have two seperate logins, one for authorized users with special premissions such
    * as Admin and Reseacher, which there users will have to go through signup and then login, the Particpants
    * in other case will have to go everytimy by signup, if they are exist the server will return them 
    */
    if (!existingUserModel)
      throw new createHttpError.NotFound("User does not exists");

    if (existingUserModel.role && existingUserModel.role !== Roles.PARTICIPANT) {
      let isMatch = false;
      if (reqUserBoundary.userDetails && reqUserBoundary.userDetails.password)
        isMatch = await bcrypt.compare(reqUserBoundary.userDetails.password, existingUserModel.userDetails.password);
      else
        throw new createHttpError.BadRequest("Invalid credentials, missing password");

      if (!isMatch)
        throw new createHttpError.BadRequest("Invalid credentials");

      const token = jwt.sign({ id: existingUserModel._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
      const userBoundary = userConverter.toBoundary(existingUserModel);
      // delete userBoundary.userDetails.password;
      const date = new Date();
      return {
        jwtToken: token,
        body: userBoundary,
        expirationCookie: new Date(date.getDate() + parseInt(process.env.JWT_EXPIRATION))// Adding the number of days to current date
      };
    }
    return { "body": userConverter.toBoundary(existingUserModel) };
  },
  /**
   * Updates a user's information.
   * @async
   * @function
   * @param {string} userEmail - The email of the user.
   * @param {string} userPlatform - The platform of the user.
   * @param {UserBoundary} updateUser - The user details to update.
   * @returns {Promise<UserBoundary>} The updated user details.
   * @throws {Error} Throws an error if the update process encounters any issues.
   */
  updateUser: async (userEmail, userPlatform, updateUser) => {
    if (userEmail.length === 0 || userPlatform.platform === 0)
    throw new createHttpError.BadRequest("Email or platform name cannot be an empty string");

    const existingUserModel = await UserModel.findOne({
      'userId': userEmail + "$" + userPlatform
    });

    if (!existingUserModel)
      throw new createHttpError.NotFound("User does not exists");

    if (updateUser.username)
      existingUserModel.username = updateUser.username;

    if (updateUser.userDetails) {
      const additionalDetails = updateUser.userDetails;
      if (additionalDetails.hasOwnProperty("password")) {
        const salt = await bcrypt.genSalt();
        additionalDetails.password = await bcrypt.hash(additionalDetails.password, salt);
      }
      existingUserModel.userDetails = {
        ...existingUserModel.userDetails,
        ...additionalDetails
      };
    }
    existingUserModel.save();
    return userConverter.toBoundary(existingUserModel);
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

    if (existingUserModel.role && existingUserModel.role === Roles.ADMIN) {
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
export default userService;