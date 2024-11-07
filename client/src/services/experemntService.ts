import mockup from "../assets/mockup.json"
import testUI from "../assets/testUiObject.json"

import {Experiment} from "../utils/types/experimentTypes/experimentsTypes.ts";

/**
 * TODO Create functionality that gets the data from the server
 * TODO Validate the data and return errors as needed
 * @param experiment_name
 */
export async function getExperimentData(experiment_name: string | undefined) : Promise<Experiment | undefined> {
    const data = testUI;
    if (!experiment_name){
        return undefined;
    }
    return data;
}
