/**
 * Represents a NewUserBoundary object that is designated to be a new user of the Collector platform.
 * @class
 */
class NewUserBoundary {
    /**
     * Create a NewUserBoundary.
     * @constructor
     * @param {string} platform - The platform of the new user.
     * @param {string} email - The email of the new user.
     * @param {string} role - The role of the user.
     * @param {string} username - The username of the user.
     * @param {object} userDetails - Additional information of the user.
     */
    constructor(platform, email, role, username, userDetails) {
        /**
         * The email of the new user.
         * @type {string}
         */
        this.platform = platform;

        /**
         * The email of the new user.
         * @type {string}
         */
        this.email = email;

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
        return this.email === other.email;
    }
}

/**
 * Exporting the NewUserBoundary class for further use by other modules if needed.
 * @type {NewUserBoundary}
 */
export default NewUserBoundary;