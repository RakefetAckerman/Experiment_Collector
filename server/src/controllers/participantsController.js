import userService from "../logic/serivces/UsersService.js";
import objectsService from "../logic/serivces/ObjectsService.js"
import UserBoundary from "../boundaries/user/UserBoundary.js";

const participantsController = {
  /**
   * Controller function for user registration.
   * @param {Object} req - Express request object formed as UserBoundary.
   * @param {Object} res - Express response object.
   * @returns {Promise<void>} Promise representing the registration process.
   */
  registerUser: async (req, res) => {
    const userData = req.body;// Getting the body of the request containing the NewUserBoundary data
    try {
      const reqUserBoundary = new UserBoundary(
        userData.platform,
        userData.email,
        userData.role,
        userData.username,
        userData.userDetails
      );
      const DBResponse = await userService.createUser(reqUserBoundary);
      res.status(201).json(DBResponse.body);
    } catch (error) {
      const errorMessage = process.env.NODE_ENV !== 'prod' ? error.message : 'An error occurred during user registration.';
      res.status(error.status || 500).json({ error: errorMessage });
    }
  },

  /**
   * Controller function for user login.
   * @param {Object} req - Express request object formed as UserBoundary.
   * @param {Object} res - Express response object.
   * @returns {Promise<void>} Promise representing the login process.
   */
  loginUser: async (req, res) => {
    const userData = req.body;// Getting the body of the request containing the NewUserBoundary data
    try {
      const reqUserBoundary = new UserBoundary(
        userData.platform,
        userData.email,
        userData.role,
        userData.username,
        userData.userDetails
      );
      const DBResponse = await userService.login(reqUserBoundary);
      res.status(200).json(DBResponse.body);
    } catch (error) {
      const errorMessage = process.env.NODE_ENV !== 'prod' ? error.message : 'An error occurred during user login.';
      res.status(error.status || 500).json({ error: errorMessage });
    }
  },
  /**
   * Controller function for creating a new object
   * @param {Object} req - Express request object formed as UserBoundary.
   * @param {Object} res - Express response object.
   */
  createObject: async (req, res) => {
    try {
      const reqObjectBoundary = new ObjectBoundary();

      /*Getting the body of the request containing the ObjectBoundary data and assigning it to the ObjectBoundary instance*/
      Object.assign(reqObjectBoundary, req.body);
      const resUserBoundary = await objectsService.createObject(reqObjectBoundary);
      res.status(201).json(resUserBoundary);
    } catch (error) {
      const errorMessage = process.env.NODE_ENV !== 'prod' ? error.message : 'An error occurred during object creation.';
      res.status(error.status || 500).json({ error: errorMessage });
    }
  },

  /**
   * Controller function for getting a specific object.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  getObject: async (req, res) => {
    try {
      const internalObjectId = req.params.internalObjectId;
      const userEmail = req.query.email;
      const userPlatform = req.query.platform;
      const DBResponse = await objectsService.getObject(internalObjectId, userEmail, userPlatform);
      res.status(200).json(DBResponse);
    } catch (error) {
      const errorMessage = process.env.NODE_ENV !== 'prod' ? error.message : 'An error occurred during object retrieval.';
      res.status(error.status || 500).json({ error: errorMessage });
    }
  },

  /**
   * Controller function for getting all objects by certain type, the retrieval depends on the permissions of the user.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   */
  getAllObjectsByType: async (req, res) => {
    try {
      const userEmail = req.query.email;
      const userPlatform = req.query.platform;
      const targetType = req.params.targetType;
      const DBResponse = await objectsService.getAllObjectsByType(targetType, userEmail, userPlatform);
      res.status(200).json(DBResponse);
    } catch (error) {
      const errorMessage = process.env.NODE_ENV !== 'prod' ? error.message : 'An error occurred during type-based retrieval.';
      res.status(error.status || 500).json({ error: errorMessage });
    }
  }
};

export default participantsController;
