//Logger configuration fo the ObjectService module
import UserIdBoundary from "../../boundaries/user/UserIdBoundary.js";
import UserIdInvoker from "../../utils/Invokers/UserIdInvoker.js";
import ObjectIdBoundary from "../../boundaries/object/ObjectIdBoundary.js";
import Location from "../../utils/Location.js";
import objectsService from "./ObjectsService.js";
import ObjectBoundary from "../../boundaries/object/ObjectBoundary.js";


const experimentService = {
    /**
     *
     * @param mockup {object}
     * @param userEmail
     * @param userPlatform
     */
    createExperimentFromEditor: async (mockup, userEmail, userPlatform) => {
        const userIdBoundary = new UserIdBoundary(userPlatform, userEmail);
        const createdBy = new UserIdInvoker(userIdBoundary);
        await createElementsToDB(mockup, createdBy, [], userPlatform, userEmail);
    },


}

/**
 * A recursive function that get the template for an experiment and creates it in the DB.
 * @param uiObject {object} the object.
 * @param createdBy {UserIdInvoker} the user created the experiment.
 * @param childIdArray {string[]} should be empty. helper for the recursion.
 * @param userPlatform the user created the experiment platform.
 * @param userEmail the user created the experiment email.
 */
async function createElementsToDB(uiObject, createdBy, childIdArray, userPlatform, userEmail) {
    const objectId = new ObjectIdBoundary("website", "");
    const location = new Location(0, 0);
    const type = `${uiObject.type}`;
    let objectDetails = {time:Date.now()};
    for (const element of iterateObject(uiObject)) {
        const {key, value} = element;
        if (key === "children" || key === "trialTypes") {
            for (const child of value) {
                childIdArray.push(await createElementsToDB(child, createdBy, [], userPlatform, userEmail));
            }
            continue;
        }
        if (key === "id" || key === "type" || key === "userDetails") {
            continue;
        }
        objectDetails = {...objectDetails, [key]: value};
    }
    const objectBoundary = new ObjectBoundary(objectId, type, "-", true, null, null, location, createdBy, objectDetails);

    const objectModel = await objectsService.createObject(objectBoundary);
    const elementInternalId = objectModel.objectId.internalObjectId;
    for (const childId of childIdArray) {
        const childBoundary = new ObjectIdBoundary(userPlatform, childId);
        try {
            await objectsService.bindNewChild(elementInternalId, userEmail, userPlatform, childBoundary);
        } catch (error){
            console.log("error occurred")
        }
    }

    return elementInternalId;

}


function iterateObject(obj) {
    return Object.keys(obj).map(key => ({key, value: obj[key]}));
}

export default experimentService;