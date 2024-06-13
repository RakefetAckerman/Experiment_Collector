import axios from "axios";
import { UserBoundary } from "../bounderies/user/UserBoundary";
import UserService from "./userService";
import getEnvVariables from "../etc/loadVariables";

// Load environment variables from .env files
const envVariables = getEnvVariables();
const { backendURL } = envVariables;

// Define base URLs for different API endpoints
const entryBaseUrl = backendURL + "/entry";
const authResearchersBaseUrl = backendURL + "/auth/researchers";

/**
 * Implementation of UserService interface that interacts with backend APIs.
 */
const userService: UserService = {
  /**
   * Creates a new user by sending a POST request to the registration endpoint.
   * @param newUserBoundary - User data to be registered.
   * @returns Promise<UserBoundary> - User data returned from the backend.
   */
  createUser: async function (
    newUserBoundary: UserBoundary
  ): Promise<UserBoundary> {
    const res = await axios.post(entryBaseUrl + "/register", newUserBoundary);
    const data: UserBoundary = res.data;
    return data;
  },

  /**
   * Logs in an existing user by sending a POST request to the login endpoint.
   * @param existingUserBoundary - User data for logging in.
   * @returns Promise<UserBoundary> - User data returned from the backend.
   */
  login: async function (
    existingUserBoundary: UserBoundary
  ): Promise<UserBoundary> {
    const res = await axios.post(entryBaseUrl + "/login", existingUserBoundary);
    const data: UserBoundary = res.data;
    return data;
  },

  /**
   * Updates user information by sending a PUT request to the update endpoint.
   * @param userToUpdate - Updated user data.
   * @returns Promise<void>
   */
  updateUser: async function (userToUpdate: UserBoundary): Promise<void> {
    await axios.put(
      authResearchersBaseUrl +
        `/${userToUpdate.userId.email}/${userToUpdate.userId.email}`,
      userToUpdate
    );
  },

  /**
   * Retrieves all users by sending a GET request to the users endpoint.
   * @param existingUserBoundary - User data to identify the requesting user.
   * @returns Promise<UserBoundary[]> - Array of user data returned from the backend.
   */
  getAllUsers: async function (
    existingUserBoundary: UserBoundary
  ): Promise<UserBoundary[]> {
    const res = await axios.get(
      authResearchersBaseUrl +
        `/${existingUserBoundary.userId.email}/${existingUserBoundary.userId.email}`
    );
    return res.data as UserBoundary[];
  },

  /**
   * Deletes all users by sending a DELETE request to the users endpoint.
   * @param existingUserBoundary - User data to identify the requesting user.
   * @returns Promise<{ n: number; deletedCount: number; ok: number }>
   */
  deleteAllUsers: async function (
    existingUserBoundary: UserBoundary
  ): Promise<{ n: number; deletedCount: number; ok: number }> {
    const res = await axios.delete(
      authResearchersBaseUrl +
        `/${existingUserBoundary.userId.email}/${existingUserBoundary.userId.email}`
    );
    return res.data;
  },
};

// Export the userService object as default
export default userService;
