import {Experiment} from "../utils/types/experimentTypes/experimentsTypes.ts";
import {SerializedUser} from "../utils/types/userTypes/userTypes.ts";
import testUi from "../assets/testUiObject.json"
import api from "../api.ts";
import {TrialTypeType} from "../features/TrialType/types.ts";

const experimentService = {
    getExperiment: async (experiment_name: string, user: SerializedUser): Promise<Experiment> => {
        //TODO MUST BE REMOVED FOR PRODUCTION
        if (experiment_name === "test") {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            return testUi;
        }
        if (!experiment_name) {
            throw new Error("Experiment name is required");
        }
        const res = await api.get(`/auth/experiment/${experiment_name}`, {
            params: {
                email: user.userId.email,
                platform: user.userId.platform
            }
        });
        const data = res.data;
        return data;
    },

    getTrialType: async (trialTypeId: string , user: SerializedUser): Promise<TrialTypeType> => {
        if (!trialTypeId) {
            throw new Error("Experiment name is required");
        }
        const res = await api.get(`/auth/experiment/trailType/${trialTypeId}`, {
            params: {
                email: user.userId.email,
                platform: user.userId.platform
            }
        });
        return res.data;
    }

}


export default experimentService;