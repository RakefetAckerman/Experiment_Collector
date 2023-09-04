/**
 * Represents a NewUserBoundary object that is designated to be a new user of the Collector platform.
 * @class
 */
class NewUserBoundary {
    /**
     * Create a NewUserBoundary.
     * @constructor
     * @param {string} platform - The platform of the new user.
     * @param {string} outerIdentifier - The outerIdentifier that belongs to the user (in case of Researcher the outerIdentifier will be email,
     *  for Participant it will be Prolific ID)
     * @param {string} role - The role of the user.
     * @param {string} username - The username of the user.
     * @param {object} userDetails - Additional information of the user.
     */
    constructor(platform, outerIdentifier, role, username, userDetails) {
        /**
         * The outerIdentifier of the new user.
         * @type {string}
         */
        this.platform = platform;

        /**
         * The outerIdentifier of the new user.
         * @type {string}
         */
        this.outerIdentifier = outerIdentifier;

        /**
         * The role of the user.
         * @type {string}
         */
        this.role = role;

        /**
         * The username of the user.
         * @type {string}
         */
        this.username = username;

        /**
         * Additional information of the user.
         * @type {object}
         */
        this.userDetails = userDetails;
    }

    /**
     * Checks if this NewUserBoundary is equal to another object.
     * @param {NewUserBoundary} other - The object to compare with.
     * @returns {boolean} True if the objects are equal, false otherwise.
     */
    equals(other) {
        if (this === other) return true;
        if (other === null || this.constructor !== other.constructor) return false;
        return this.outerIdentifier === other.outerIdentifier;
    }
}

/**
 * Exporting the NewUserBoundary class for further use by other modules if needed.
 * @type {NewUserBoundary}
 */
export default NewUserBoundary;