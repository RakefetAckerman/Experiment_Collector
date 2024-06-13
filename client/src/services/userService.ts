import { UserBoundary } from "../bounderies/user/UserBoundary";

/**
 * Interface representing a User Service with various user-related operations.
 */
interface UserService {
  /**
   * Creates a new user.
   * @param newUserBoundary The user data to create.
   * @returns A Promise resolving to the created UserBoundary.
   * @throws {Error} If there is an error during the user creation process.
   */
  createUser(newUserBoundary: UserBoundary): Promise<UserBoundary>;

  /**
   * Logs in an existing user.
   * @param existingUserBoundary The user data to log in.
   * @returns A Promise resolving to an object containing user body.
   * @throws {Error} If login fails due to incorrect credentials or other errors.
   */
  login(existingUserBoundary: UserBoundary): Promise<UserBoundary>;

  /**
   * Updates an existing user.
   * @param userToUpdate The updated user data.
   * @returns A Promise as void.
   * @throws {Error} If there is an error during the user update process.
   */
  updateUser(userToUpdate: UserBoundary): Promise<void>;

  /**
   * Retrieves all users based on specified criteria.
   * @param existingUserBoundary The user data.
   * @returns A Promise resolving to an array of UserBoundary objects.
   * @throws {Error} If there is an error retrieving the users.
   */
  getAllUsers(existingUserBoundary: UserBoundary): Promise<UserBoundary[]>;

  /**
   * Deletes all users based on specified criteria.
   * @param existingUserBoundary The user data.
   * @returns A Promise resolving to an object containing deletion statistics.
   * @throws {Error} If there is an error deleting the users.
   */
  deleteAllUsers(
    existingUserBoundary: UserBoundary
  ): Promise<{ n: number; deletedCount: number; ok: number }>;
}

export default UserService;
