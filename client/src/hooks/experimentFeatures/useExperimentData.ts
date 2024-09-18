import { useState, useEffect } from 'react';
import { Experiment } from '../../utils/types/experimentTypes/experimentsTypes.ts';
import {getExperimentData} from "../../services/experemntService.ts";

const useExperimentData = (experimentName: string | undefined) => {
    const [experimentData, setExperimentData] = useState<Experiment | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (!experimentName) {
                setError(true);
                setLoading(false);
                return;
            }

            const data = await getExperimentData(experimentName);
            if (!data) {
                setError(true);
                setLoading(false);
                return;
            }

            setExperimentData(data);
            setLoading(false);
        };

        fetchData();
    }, [experimentName]);

    return { experimentData, loading, error };
};

export default useExperimentData;