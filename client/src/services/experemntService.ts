import mockup from "../assets/mockup.json"
import testUI from "../assets/testUiObject.json"

import {Experiment} from "../utils/types/experimentTypes/experimentsTypes.ts";

/**
 * TODO Create functionality that gets the data from the server
 * TODO Validate the data and return errors as needed
 * @param experiment_name
 */
export async function getExperimentData(experiment_name: string | undefined) : Promise<Experiment | undefined> {
    const data = mockup;//TODO SHOULD BE THE THE EXPERIMENT OBJECT FROM THE SERVER USING FETCH
    if (!experiment_name){
        return undefined;
    }

    //TODO MUST BE REMOVED FOR PRODUCTION
    if (experiment_name === "test" ){
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return testUI;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return data;
}
