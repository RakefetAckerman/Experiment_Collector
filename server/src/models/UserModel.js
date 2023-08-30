import mongoose from "mongoose";

/**
 * Mongoose schema for representing a UserBoundaryObject.
 * @type
 */
const UserBoundarySchema = new mongoose.Schema(
  {
    /**
     * The userId field containing platform and email information.
     * @type {Object}
     */
    userId: {
      /**
       * The platform of the user.
       * @type {String}
       */
      platform: {
        type: String,
        required: true
      },
      /**
       * The email of the user.
       * @type {String}
       */
      email: {
        type: String,
        required: true,
        unique: true
      },
    },
    /**
     * The role of the user.
     * @type {String}
     */
    role: {
      type: String,
      required: true
    },
    /**
     * The username of the user.
     * @type {String}
     */
    username: {
      type: String,
      required: true,
      min: 3,
      max: 50
    },
    /**
     * Additional details of the user as a JSON object.
     * @type {Object}
     */
    userDetails: {
      type: Object
    }
  },
  /**
   * Additional options for the schema.
   */
  { timestamps: true }
);

/**
 * Mongoose model based on the UserBoundarySchema.
 * @type {Model}
 */
const UserModel = mongoose.model("User", UserBoundarySchema);

/**
 * Exporting the UserModel for further use by other modules if needed.
 * @type {Model}
 */
export default UserModel;
