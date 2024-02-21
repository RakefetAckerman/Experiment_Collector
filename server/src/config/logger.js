/**
 * Module: logger.js
 * Description: Configures a logger using Winston library for logging.
 * Author: Shoval Shabi
 */

// Import required modules from Winston
import { createLogger, format, transports } from 'winston';
import strftime from 'strftime'; // Import strftime for custom date formatting

// Destructure format object
const { combine, timestamp, printf } = format;

/**
 * Function: logFormat
 * Description: Define the log format.
 * @param {string} level - The log level.
 * @param {string} message - The log message.
 * @param {Date} timestamp - The timestamp of the log message.
 * @param {string} moduleFilename - The filename of the module where the log originated.
 * @returns {string} - The formatted log message.
 */
const logFormat = printf(({ level, message, timestamp, moduleFilename }) => {
    const formattedTimestamp = strftime('%d/%b/%Y:%H:%M:%S %z', new Date(timestamp)); // Format the timestamp
    return `[${moduleFilename}] [${formattedTimestamp}] ${level.toUpperCase()}: ${message}`; // Format the log message
});

/**
 * Function: createCustomLogger
 * Description: Create a custom logger.
 * @param {string} moduleFilename - The filename of the module where the logger is created.
 * @param {string} [loggingFileName='logfile.log'] - The filename for logging to a file (optional).
 * @param {string} [logLevel='trace'] - The logging level that designated to the logging file if supplied (optional). Possible values are:
 *                                      - error
 *                                      - warn
 *                                      - info
 *                                      - http
 *                                      - verbose
 *                                      - debug
 *                                      - silly
 * @returns {Object} - The configured logger object.
 */
const createCustomLogger = ({ moduleFilename, loggingFileName = undefined, logLevel = 'info' }) => {
    const transportsArray = [
        // Log to the console
        new transports.Console({
            level: logLevel
        })
    ];

    // Add file transport if loggingFileName is supplied
    if (loggingFileName) {
        transportsArray.push(
            new transports.File({
                filename: loggingFileName,
                level: 'error' // Log only error levels and more severe levels to the file
            })
        );
    }

    return createLogger({
        level: logLevel, // Set the minimum logging level
        format: combine(
            timestamp(), // Add timestamp to logs
            format((info) => { info.moduleFilename = moduleFilename; return info })(), // Add filename to logs
            logFormat // Apply custom log format
        ),
        transports: transportsArray
    });
};

// Export the createCustomLogger function
export default createCustomLogger;
