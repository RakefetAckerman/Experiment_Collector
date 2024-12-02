import {useEffect, useState} from "react";
import {SerializedUser} from "../../utils/types/userTypes/userTypes.ts";
import researchersService from "../../services/researchersService.tsx";
import {cardUserOutputCreatedBy} from "./types.ts";



const useExperimentCreatedByResearcher = (user:SerializedUser) => {
    const [data, setData] = useState<cardUserOutputCreatedBy[] | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await researchersService.getExperimentCreatedByResearcher(user!);
                console.log(data);
                if (!data) {
                    setError(true);
                    setLoading(false);
                    return;
                }
                setData(data);
                setLoading(false);

            } catch (error) {
                console.error(error)
                setError(true);
                setLoading(false);
            }


        };

        fetchData();
    }, []);

    return {data, loading, error};
};

export default useExperimentCreatedByResearcher;