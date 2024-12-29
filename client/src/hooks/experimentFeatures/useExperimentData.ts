import {useState, useEffect} from 'react';
import {Experiment} from '../../utils/types/experimentTypes/experimentsTypes.ts';
import experimentService from "../../services/experimentService.ts";
import {useSelector} from "react-redux";
import {RootState} from "../../states/globalStore.ts";

const useExperimentData = (experimentName: string | undefined) => {
    const [experimentData, setExperimentData] = useState<Experiment | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const user = useSelector((state: RootState) => (state.user.user))

    useEffect(() => {
        const fetchData = async () => {

            try {
                if (!experimentName) {
                    setError(true);
                    setLoading(false);
                    return;
                }
                const data = await experimentService.getExperiment(experimentName , user!);
                if (!data) {
                    setError(true);
                    setLoading(false);
                    return;
                }
                setExperimentData(data);
                setLoading(false);
            }catch (error){
                console.log(error)
                setError(true);
                setLoading(false);
            }


        };

        fetchData();
    }, [experimentName]);

    return {experimentData, loading, error};
};

export default useExperimentData;