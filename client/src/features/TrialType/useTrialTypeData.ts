import {useEffect, useState} from "react";
import experimentService from "../../services/experimentService.ts";
import {TrialTypeType} from "./types.ts";
import {SerializedUser} from "../../utils/types/userTypes/userTypes.ts";

const useTrialType = (trialTypeId: string, user: SerializedUser, nextTrialTypeId: string | null) => {
    const [trialType, setTrialType] = useState<TrialTypeType | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [nextTrialType, setNextTrialType] = useState<TrialTypeType | undefined>(undefined);

    useEffect(() => {
        const fetchData = async () => {
            console.log({trialType , trialTypeId ,nextTrialType ,nextTrialTypeId} );
            if (nextTrialType) {
                setTrialType(nextTrialType);
                if (nextTrialTypeId) {
                    experimentService.getTrialType(nextTrialTypeId, user!).then((data) => {
                        console.log(data , "next");
                        setNextTrialType(data);
                    });
                }
                return;
            }
            setLoading(true);
            if (!trialTypeId) {
                setError(true);
                setLoading(false);
                return;
            }
            try {
                const data = await experimentService.getTrialType(trialTypeId, user!);
                if (!data) {
                    setError(true);
                    setLoading(false);
                    return;
                }
                setTrialType(data);
                setLoading(false);
                if (nextTrialTypeId) {
                    experimentService.getTrialType(nextTrialTypeId, user!).then((data) => {
                        console.log(data , "next");
                        setNextTrialType(data);
                    });
                }

            } catch (error) {
                console.log(error)
                setError(true);
                setLoading(false);
            }


        };

        fetchData();
    }, [trialTypeId]);

    return {trialType, loading, error};
};

export default useTrialType;