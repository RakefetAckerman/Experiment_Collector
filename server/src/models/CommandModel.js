import mongoose from 'mongoose';
import ObjectBoundaryModel from './ObjectModel';
import UserModel from './UserModel';

/**
 * Mongoose schema for representing a CommandBoundary object.
 * @class
 */
const CommandBoundarySchema = new mongoose.Schema({
    /**
     * The platform of the object.
     * @type {String}
     */
    platform: {
        type: String,
        required: true,
    },
    /**
     * The command string.
     * @type {String}
     */
    command: {
        type: String,
        required: true,
    },
    /**
     * A reference to the target object.
     * @type {mongoose.Schema.Model}
     */
    targetObject: {
        type: ObjectBoundaryModel,
        ref: "ObjectBoundary",
    },
    /**
     * The time when the command was invoked.
     * @type {Date}
     */
    invocationTimestamp: {
        type: Date,
        required: true,
    },
    /**
     * A reference to the user who invoked the command.
     * @type {mongoose.Schema.Model}
     */
    invokedBy: {
        type: UserModel,
        required: true,
    },
    /**
     * The attributes of the command.
     * @type {Object}
     */
    commandAttributes: {
        type: Object,
        required: true,
    }
},
/**
 * Additional options for the schema.
 */
{ timestamps: true }
);

/**
 * Mongoose model based on the CommandBoundarySchema schema.
 * @type {Model}
 */
const CommandBoundaryModel = mongoose.model('CommandBoundary', CommandBoundarySchema);

/**
 * Exporting the CommandBoundaryModel for further use by other modules if needed.
 * @type {Model}
 */
export default CommandBoundaryModel;
