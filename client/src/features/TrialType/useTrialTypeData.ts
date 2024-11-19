import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../states/store.ts";
import experimentService from "../../services/experimentService.ts";
import {TrialTypeType} from "./types.ts";

const useTrialType = (trailTypeId: string | undefined) => {
    const [trialType, setTrialType] = useState<TrialTypeType | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const user = useSelector((state: RootState) => (state.user.user))

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
                // Add a second delay before setting the trialType
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