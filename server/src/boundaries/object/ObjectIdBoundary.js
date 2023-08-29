/**
 * Represents an ObjectIdBoundary.
 * @class
 */
class ObjectIdBoundary {
  /**
   * Constructs an ObjectIdBoundary instance.
   * @constructor
   * @param {string} platform - The platform of the object.
   * @param {string} internalObjectId - The internal object ID.
   */
  constructor(platform, internalObjectId) {
    /**
     * The platform of the object.
     * @type {string}
     */
    this.platform = platform;

    /**
     * The internal object ID.
     * @type {string}
     */
    this.internalObjectId = internalObjectId;
  }

  /**
   * Checks if this ObjectIdBoundary is equal to another object.
   * @param {ObjectIdBoundary} other - The object to compare with.
   * @returns {boolean} True if the objects are equal, false otherwise.
   */
  equals(other) {
    if (this === other) return true;
    if (other === null || this.constructor !== other.constructor) return false;
    return this.platform === other.platform && this.internalObjectId === other.internalObjectId;
  }
}

/**
 * Exporting the ObjectIdBoundary class for further use by other modules if needed.
 * @type {ObjectIdBoundary}
 */
export default ObjectIdBoundary;