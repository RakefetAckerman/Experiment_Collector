import objectsService from "../logic/serivces/ObjectsService.js";
import experimentService from "../logic/serivces/ExperimentService.js";
import UserIdBoundary from "../boundaries/user/UserIdBoundary.js";
import UserIdInvoker from "../utils/Invokers/UserIdInvoker.js";
import ObjectIdBoundary from "../boundaries/object/ObjectIdBoundary.js";
import Location from "../utils/Location.js";
import ObjectBoundary from "../boundaries/object/ObjectBoundary.js";


const experimentController = {
    getExperimentByName: async (req, res) => {
        const email = req.query.email;
        const platform = req.query.platform;
        const experimentName = req.params.experimentName;
        if (!email || !platform) {
            res.status(400).send({error: "User Email and Platform is required"});
            return;
        }
        if (!experimentName) {
            res.status(400).send({error: "experiment name is required"});
            return;
        }
        let experimentObject = {
            name: experimentName,
        };
        try {
            const element = await objectsService.getSpecificObjectByTypeAndName("experiment", experimentName, email, platform);
            const childrenArray = await objectsService.getChildrenArray(element.objectId.internalObjectId, email, platform);

            //Checking if there is any randomization need to be done and if so randomizing it.
            const childrenArrayAfterRandom = randomizeExperimentTrialType(childrenArray, element);
            experimentObject = {...experimentObject, trialTypes: childrenArrayAfterRandom};
            res.status(200).send(experimentObject);
            return experimentObject;

        } catch (error) {
            res.status(400).send({error: error});
            return error;
        }

    },

    getTrialType: async function (req, res) {
        const email = req.query.email;
        const platform = req.query.platform;
        const trialTypeInternalId = req.params.trialType;
        if (!platform || !email) {
            res.status(400).send({error: "User Email and Platform is required"});
            return;
        }
        if (!trialTypeInternalId) {
            res.status(400).send({error: "trialTypeInternalId is required"});
            return;
        }
        try {
            let trialType = {
                type: "trialType",
                id: trialTypeInternalId
            };
            const trialTypeObject = await objectsService.getObject(trialTypeInternalId, email, platform);
            if (!trialTypeObject.objectDetails.objectDetails) {
                trialType = {...trialType, objectDetails: {}};
            } else {
                trialType = {...trialType, objectDetails: trialTypeObject.objectDetails.objectDetails};
            }

            let uiChildrenArray = [];
            const childes = await objectsService.getAllChildren(trialTypeInternalId, email, platform);
            for (const child of childes) {
                let formatedChild = {
                    type: child.type,
                    id: child.objectId.internalObjectId,
                }
                if (child.objectDetails.objectDetails) {
                    formatedChild = {...formatedChild, objectDetails: child.objectDetails.objectDetails};
                }
                uiChildrenArray.push(getUiDetailsFromObject(formatedChild, child.objectDetails));
            }
            trialType = {...trialType, children: uiChildrenArray};
            res.status(200).json(trialType);

        } catch (error) {
            res.status(200).send(error.message);
        }
    },

    addUserOutputObject: async (req, res) => {
        try {
            const email = req.query.email;
            const trialTypeId = req.query.trialTypeId;
            const platform = req.query.platform;
            const data = req.body.data;
            console.log({data, platform, trialTypeId, email})
            if (!platform || !email) {
                res.status(400).send({error: "User Email and Platform is required"});
                return;
            }
            if (!data || !trialTypeId) {
                res.status(400).send({error: "Trail Type is required and output is required"});
                return;
            }
            const trialType = await objectsService.getObject(trialTypeId, email, platform);
            if (!trialType) {
                res.status(500).send("Trail Type ID received is invalid");
            }
            const userIdBoundary = new UserIdBoundary(platform, email);
            const createdBy = new UserIdInvoker(userIdBoundary);
            const objectId = new ObjectIdBoundary("website", "");
            const location = new Location(0, 0);
            const type = `output`;
            let objectDetails = {output: data, trailType: trialTypeId};
            const objectBoundary = new ObjectBoundary(objectId, type, "-", true, null, null, location, createdBy, objectDetails);
            await objectsService.createObject(objectBoundary);
            return res.status(200).send("Added successfully");
        } catch (err) {
            return res.status(500).send(err);
        }


    }
}

function iterateObject(obj) {
    return Object.keys(obj).map(key => ({key, value: obj[key]}));
}

function getUiDetailsFromObject(objectToAdd, objectDetails) {
    for (const element of iterateObject(objectDetails)) {
        const {key, value} = element;
        if (key === "objectDetails" || key === "time") {
            continue;
        }
        objectToAdd = {...objectToAdd, [key]: value};
    }
    return objectToAdd
}

function randomizeExperimentTrialType(trailTypeArray, experiment) {
    if (!experiment || !experiment.objectDetails.objectDetails || !experiment.objectDetails.objectDetails.random) {
        return trailTypeArray;
    }
    const randomArray = experiment.objectDetails.objectDetails.random;
    let outputArray = [...trailTypeArray];
    for (const random of randomArray) {
        outputArray = randomizeArray(trailTypeArray, random.start, random.end);
    }
    return outputArray;
}

function randomizeArray(arr, startIndex, endIndex) {
    if (!arr) {
        throw new Error("Expected an array of objects");
    }
    // Create a copy of the original array to avoid modifying the input directly
    const outputArray = [...arr];

    // Validate indices
    if (startIndex < 0 || startIndex > endIndex || endIndex >= arr.length) {
        throw new Error("Error Occurred while randomizing");
    }


    // Fisher-Yates (Knuth) shuffle algorithm for the specified range
    for (let i = endIndex; i > startIndex; i--) {
        // Generate a random index between startIndex and the current index (inclusive)
        const j = Math.floor(Math.random() * (i - startIndex + 1)) + startIndex;

        // Swap elements
        [outputArray[i], outputArray[j]] = [outputArray[j], outputArray[i]];
    }

    return outputArray;
}

export default experimentController