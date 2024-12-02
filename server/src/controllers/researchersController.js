import userService from "../logic/serivces/UsersService.js";
import UserBoundary from "../boundaries/user/UserBoundary.js";
import { setCookieIfNeeded } from "../logic/middleware/auth.js";
import experimentService from "../logic/serivces/ExperimentService.js";
import objectsController from "./objectsController.js";
import objectsService from "../logic/serivces/ObjectsService.js";

const researchersController = {
  /**
   * Controller function for getting researcher information.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @returns {Promise<void>} Promise representing the process of getting user information.
   */
  getAllUsers: async (req, res) => {
    const userEmail = req.params.email;
    const userPlatform = req.params.platform;
    try {
      const DBResponse = await userService.getAllUsers(userEmail, userPlatform);
      res.status(200).json(DBResponse);
    } catch (error) {
      const errorMessage =
        process.env.NODE_ENV !== "prod"
          ? error.message
          : "An error occurred during user retrieval.";
      res.status(error.status || 500).json({ error: errorMessage });
    }
  },

  /**
   * Controller function for deleting all users (only accessible to Admins).
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @returns {Promise<void>} Promise representing the user deletion process.
   */
  deleteAllUsers: async (req, res) => {
    const userEmail = req.params.email;
    const userPlatform = req.params.platform;
    try {
      const DBResponse = await userService.deleteAllUsers(
        userEmail,
        userPlatform
      );
      return res.status(200).json(DBResponse);

    } catch (error) {
      const errorMessage =
        process.env.NODE_ENV !== "prod"
          ? error.message
          : "An error occurred during user deletion.";
      return res.status(error.status || 500).json({ error: errorMessage });
    }
  },

  getExperimentCreatedByResearcher: async (req, res) => {
    const userEmail = req.params.email;
    const userPlatform = req.params.platform;
    try {
      const experiments  = await objectsService.getExperimentCreatedByResearcher(userEmail, userPlatform);
      return res.status(200).json(experiments);
    }catch (error) {
      const errorMessage =
          process.env.NODE_ENV !== "prod"
              ? error.message
              : "An error occurred during user retrieval.";
      return res.status(error.status || 500).json({ error: errorMessage });
    }
  },
  /**
   * create the objects for the database from the ui experiment element.
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  createExperimentFromEditor: async (req, res) => {
    const email = req.query.email;
    const platform = req.query.platform;
    const data = req.body.data;
    if (!platform || !email) {
      res.status(400).send({error: "User Email and Platform is required"});
      return;
    }
    if (!data) {
      res.status(400).send({error: "No experiment received"});
      return;
    }
    try {
      await experimentService.createExperimentFromEditor(data, email, platform);
      res.status(200).send("output");
    } catch (err) {
      res.status(500).send(err);
    }
  },
};

export default researchersController;
