import mongoose from 'mongoose';
import UserModel from './UserModel.js';
/**
 * Mongoose schema for representing an ObjectBoundary object.
 * @class
 */
const ObjectBoundarySchema = new mongoose.Schema({
    /**
     * The platform of the object.
     * @type {String}
     */
    platform: {
        type: String,
        required: true,
    },
    /**
     * The type of the object boundary.
     * @type {String}
     */
    type: {
        type: String,
        required: true,
    },
    /**
     * The alias of the object boundary.
     * @type {String}
     */
    alias: {
        type: String,
        required: true,
    },
    /**
     * Whether the object boundary is active.
     * @type {Boolean}
     */
    active: {
        type: Boolean,
        required: true,
    },
    /**
     * The creation timestamp of the object boundary.
     * @type {Date}
     */
    creationTimestamp: {
        type: Date,
        required: true,
    },
    /**
     * The location of the object boundary.
     * @type {Location}
     */
    location: {
        /**
         * The latitude of the object.
         * @type {Number}
         */
        lat: {
            type: Number,
            required: true,
        },
        /**
         * The longtitude of the object.
         * @type {Number}
         */
        lng: {
            type: Number,
            required: true,
        },
        required: true,
    },
    /**
     * A reference to the user who created the object boundary.
     * @type {mongoose.Schema}
     */
    createdBy: {
        type: UserModel,
        ref: 'User',
        required: true,
    },
    /**
     * Details of the object boundary as a JSON object.
     * @type {Object}
     */
    objectDetails: {
        type: Object,
        required: true,
    },
    /**
     * An array of references to children object boundaries.
     * @type {Array}
     */
    children: [
        {
            type: ObjectBoundarySchema,
            ref: "ObjectBoundary",
        }
    ],
    /**
     * An array of references to parent object boundaries.
     * @type {Array}
     */
    parents: [
        {
            type: ObjectBoundarySchema,
            ref: "ObjectBoundary",
        }
    ]
},
    /**
     * Additional options for the schema.
     */
    { timestamps: true }
);

/**
 * Mongoose model based on the ObjectBoundarySchema schema.
 * @type {Model}
 */
const ObjectBoundaryModel = mongoose.model('ObjectBoundary', ObjectBoundarySchema);

/**
 * Exporting the ObjectBoundaryModel for further use by other modules if needed.
 * @type {Model}
 */
export default ObjectBoundaryModel;
