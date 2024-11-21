import {Experiment} from "../utils/types/experimentTypes/experimentsTypes.ts";
import {SerializedUser} from "../utils/types/userTypes/userTypes.ts";
import api from "../api.ts";
import {TrialTypeType} from "../features/TrialType/types.ts";

const experimentService = {
    getExperiment: async (experiment_name: string, user: SerializedUser): Promise<Experiment> => {
        if (!experiment_name) {
            throw new Error("Experiment name is required");
        }
        const res = await api.get(`/experiment/${experiment_name}`, {
            params: {
                email: user.userId.email,
                platform: user.userId.platform
            }
        });
        return res.data;
    },

    getTrialType: async (trialTypeId: string , user: SerializedUser): Promise<TrialTypeType> => {
        if (!trialTypeId) {
            throw new Error("Experiment name is required");
        }
        const res = await api.get(`/experiment/trailType/${trialTypeId}`, {
            params: {
                email: user.userId.email,
                platform: user.userId.platform
            }
        });
        return res.data;
    },

    setUserOutput: async (output:object , trialTypeId:string ,user :SerializedUser)=>{
        if (!trialTypeId || !output) {
            throw new Error("Trial type ID and output object required.");
        }
        const res = await api.post(`/experiment/setUserOutput`, {data:output}, {
            params: {
                email: user.userId.email,
                platform: user.userId.platform,
                trialTypeId:trialTypeId
            }
        });
        return res.data;
    }

}


export default experimentService;