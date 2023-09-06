import mongoose from "mongoose";
import UserBoundary from "../../boundaries/user/UserBoundary.js";
import UserModel from "../../models/UserModel.js";
import userConverter from "../converters/UserConverter.js";
import createHttpError from 'http-errors';
import Roles from "../../utils/UserRole.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const { Error } = mongoose;

const userService = {

  createUser: async (reqUserBoundary) => {
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
      .then(() => userConverter.toBoundary(userModel));
  },

  login: async (reqUserBoundary) => {
    const existingUserModel = await UserModel.findOne({
      'userId': reqUserBoundary.userId.email + "$" + reqUserBoundary.userId.platform
    });

    /* In case that none particpant with special authrizations tries to log in wihout signup first
    * The Client will have two seperate logins, one for authorized users with special premissions such
    * as Admin and Reseacher, which there users will have to go through signup and then login, the Particpants
    * in other case will have to go everytimy by signup, if they are exist the server will return them 
    */
    if (!existingUserModel && reqUserBoundary.role !== Roles.PARTICIPANT)
      throw new createHttpError.NotFound("User does not exists");

    if (existingUserModel.role !== Roles.PARTICIPANT) {
      const isMatch = await bcrypt.compare(reqUserBoundary.userDetails.password, existingUserModel.userDetails.password);
      if (!isMatch)
        throw new createHttpError.BadRequest("Invalid credentials");

      const token = jwt.sign({ id: existingUserModel._id }, process.env.JWT_SECRET, { expiresIn: 9999999 });
      const userBoundary = userConverter.toBoundary(existingUserModel);
      delete userBoundary.userDetails.password;
      return { token, userBoundary };
    }
    return userConverter.toBoundary(existingUserModel);
  },

  updateUser: async (userEmail, userPlatform, updateUser) => {
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
      existingUserModel.userDetails = {...additionalDetails};
    }
    existingUserModel.save();
    return userConverter.toBoundary(existingUserModel);
  },

  getAllUsers: (userSuperApp, userEmail, size, page) => {
    console.log("Getting all UserBoundary objects");
    // Implement logic here
  },

  deleteAllUsers: (userSuperApp, userEmail) => {
    console.log("Deleting all UserBoundary objects");
    // Implement logic here
  }
};

export default userService;