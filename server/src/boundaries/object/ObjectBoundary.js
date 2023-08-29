import ObjectIdBoundary from "./ObjectIdBoundary";
import UserIdInvoker from "../../utils/Invokers/UserIdInvoker"

/**
 * Represents a ObjectBoundary that contains information about an object within the  platform.
 * @class
 */
class ObjectBoundary {
  /**
   * Create a ObjectBoundary.
   * @constructor
   * @param {ObjectIdBoundary} objectId - The ID of the object boundary.
   * @param {string} type - The type of the object boundary.
   * @param {string} alias - The alias of the object boundary.
   * @param {boolean} active - Whether the object boundary is active.
   * @param {Date} creationTimestamp - The creation timestamp of the object boundary.
   * @param {Location} location - The location of the object boundary.
   * @param {UserIdInvoker} createdBy - The user ID who created the object boundary.
   * @param {Object} objectDetails - Details of the object boundary as a JSON object.
   */
  constructor(objectId, type, alias, active, creationTimestamp, location, createdBy, objectDetails) {
    /**
     * The ID of the object boundary.
     * @type {ObjectIdBoundary}
     */
    this.objectId = objectId;

    /**
     * The type of the object boundary.
     * @type {string}
     */
    this.type = type;

    /**
     * The alias of the object boundary.
     * @type {string}
     */
    this.alias = alias;

    /**
     * Whether the object boundary is active.
     * @type {boolean}
     */
    this.active = active;

    /**
     * The creation timestamp of the object boundary.
     * @type {Date}
     */
    this.creationTimestamp = creationTimestamp;

    /**
     * The location of the object boundary.
     * @type {Location}
     */
    this.location = location;

    /**
     * The user ID who created the object boundary.
     * @type {UserIdInvoker}
     */
    this.createdBy = createdBy;

    /**
     * Details of the object boundary as a JSON object.
     * @type {Object}
     */
    this.objectDetails = objectDetails;
  }

  /**
   * Checks if this ObjectBoundary is equal to another object.
   * @param {ObjectBoundary} other - The object to compare with.
   * @returns {boolean} True if the objects are equal, false otherwise.
   */
  equals(other) {
    if (this === other) return true;
    if (other === null || this.constructor !== other.constructor) return false;
    return this.objectId.equals(other.objectId);
  }
}

/**
 * Exporting the ObjectBoundary class for further use by other modules if needed.
 * @type {ObjectBoundary}
 */
export default ObjectBoundary;
