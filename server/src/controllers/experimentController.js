import objectsService from "../logic/serivces/ObjectsService.js";
import experimentService from "../logic/serivces/ExperimentService.js";


const experimentController = {
    getExperimentByName: async (req, res) => {
        const email = req.body.email;
        const platform = req.body.platform;
        const experimentName = req.params.experimentName;
        if (!email || !platform) {
            res.status(400).send({error: "User Email and Platform is required"});
        }
        if (!experimentName) {
            res.status(400).send({error: "experiment name is required"});
        }
        let experimentObject = {
            name: experimentName,
        };
        try {
            const element = await objectsService.getSpecificObjectByTypeAndName("experiment", experimentName, email, platform);
            const childrenArray = await objectsService.getChildrenArray(element.objectId.internalObjectId, email, platform);
            experimentObject = {...experimentObject, trialTypes: childrenArray};
            console.log(childrenArray);
            res.status(200).send(experimentObject);
            return experimentObject;

        } catch (error) {
            res.status(400).send({error: error});
            return error;
        }

    },
    /**
     *
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    createExperimentFromEditor: async (req, res) => {
        const email = req.body.email;
        const platform = req.body.platform;
        const data = req.body.data;
        if (!platform || !email) {
            res.status(400).send({error: "User Email and Platform is required"});
        }
        if (!data) {
            res.status(400).send({error: "No experiment received"});
        }
        try {
            await experimentService.createExperimentFromEditor(data, email, platform);
            res.status(200).send("output");
        } catch (err) {
            res.status(500).send(err);
        }
    },

    getTrialType: async function (req, res) {
        const email = req.body.email;
        const platform = req.body.platform;
        const trialTypeInternalId = req.params.trialType;
        if (!platform || !email) {
            res.status(400).send({error: "User Email and Platform is required"});
        }
        if (!trialTypeInternalId) {
            res.status(400).send({error: "trialTypeInternalId is required"});
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
                if (child.objectDetails.objectDetails){
                    formatedChild = {...formatedChild, objectDetails: child.objectDetails.objectDetails};
                }
                uiChildrenArray.push(getUiDetailsFromObject(formatedChild,child.objectDetails));
            }
            trialType = {...trialType , children: uiChildrenArray};
            res.status(200).json(trialType);

        } catch (error) {
            res.status(200).send(error.message);
        }
    }
}
function iterateObject(obj) {
    return Object.keys(obj).map(key => ({key, value: obj[key]}));
}

function getUiDetailsFromObject(objectToAdd , objectDetails ) {
    for (const element of iterateObject(objectDetails)) {
        const {key, value} = element;
        if (key === "objectDetails" || key === "time") {
            continue;
        }
        objectToAdd = {...objectToAdd, [key]: value};
    }
    return objectToAdd
}

export default experimentController