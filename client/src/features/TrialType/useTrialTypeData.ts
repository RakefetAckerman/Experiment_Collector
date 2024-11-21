import {useEffect, useState} from "react";
import experimentService from "../../services/experimentService.ts";
import {TrialTypeType} from "./types.ts";
import {SerializedUser} from "../../utils/types/userTypes/userTypes.ts";

const useTrialType = (trailTypeId: string | undefined , user:SerializedUser) => {
    const [trialType, setTrialType] = useState<TrialTypeType | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            if (!trailTypeId) {
                setError(true);
                setLoading(false);
                return;
            }
            try {
                const data = await experimentService.getTrialType(trailTypeId, user!);
                if (!data) {
                    setError(true);
                    setLoading(false);
                    return;
                }
                setTrialType(data);
                setLoading(false);

            } catch (error) {
                console.log(error)
                setError(true);
                setLoading(false);
            }


        };

        fetchData();
    }, [trailTypeId]);

    return {trialType, loading, error};
};

export default useTrialType;