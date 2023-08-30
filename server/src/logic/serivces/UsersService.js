import UserBoundary from "../../boundaries/user/UserBoundary.js";
import UserModel from "../../models/UserModel.js";
import userConverter from "../converters/UserConverter.js";
import createHttpError from 'http-errors';

const userService = {

  createUser: async (newUser) => {
    const existingUser = await UserModel.findOne({ 'userId.email': newUser.email });

    if (existingUser)
      throw new createHttpError.BadRequest("User already exists")

    const userModel = userConverter.toModel(new UserBoundary(
      newUser.platform,
      newUser.email,
      newUser.role,
      newUser.username,
      newUser.userDetails));

    userModel.save()

    return userConverter.toBoundary(userModel);
  },

  login: (userSuperApp, userEmail) => {
    console.log("Trying to login");
    // Implement logic here
  },

  updateUser: (userSuperApp, userEmail, update) => {
    console.log("Updating a UserBoundary object");
    // Implement logic here
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