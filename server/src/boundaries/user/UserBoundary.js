import UserIdBoundary from "./UserIdBoundary";
/**
 * Represents a UserBoundary object of the Collector's users.
 * @class
 */
class UserBoundary {
    /**
     * Create a UserBoundary.
     * @constructor
     * @param {UserIdBoundary} userId - The UserIdBoundary instance of the user.
     * @param {string} role - The role of the user.
     * @param {string} username - The username of the user.
     */
    constructor(userId, role, username) {
        /**
         * The UserIdBoundary instance of the user.
         * @type {UserIdBoundary}
         */
        this.userId = userId;

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
    }

    /**
     * Checks if this UserBoundary is equal to another object.
     * @param {UserBoundary} other - The object to compare with.
     * @returns {boolean} True if the objects are equal, false otherwise.
     */
    equals(other) {
        if (this === other) return true;
        if (other === null || this.constructor !== other.constructor) return false;
        return (
            this.userId.equals(other.userId) &&
            this.role === other.role &&
            this.username === other.username
        );
    }
}

/**
 * Exporting the UserBoundary class for further use by other modules if needed.
 * @type {UserBoundary}
 */
export default UserBoundary;