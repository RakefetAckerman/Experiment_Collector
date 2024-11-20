// Import necessary route modules
import entryRoutes from "./entry.js";
import authRoutes from "./auth.js";
import participantRoutes from "./participants.js";
import {verifyToken} from "../logic/middleware/auth.js";
import experimentRoutes from "./experiment.js";
import router from "./auth.js";

/**
 * Mounts routes to the Express application.
 * @param {Object} app - Express application instance.
 */
export function mountRoutes(app) {
  // Mount routes under their respective base paths
  app.use("/auth", authRoutes);
  app.use("/entry", entryRoutes);
  app.use("/participants", participantRoutes);
  app.use("/experiment" ,experimentRoutes);


}
