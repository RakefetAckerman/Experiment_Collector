import {SerializedUser} from "../utils/types/userTypes/userTypes.ts";
import api from "../api.ts";
import {cardUserOutputCreatedBy} from "../features/HomeScreenCards/types.ts";

const researchersService = {
    getExperimentCreatedByResearcher: async (user: SerializedUser): Promise<cardUserOutputCreatedBy[]> => {

        const {email , platform} = user.userId;
        const res = await api.get(`auth/researchers/${email}/${platform}/createdBy`);
        return res.data;
    },

}


export default researchersService;