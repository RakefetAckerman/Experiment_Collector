import {NavLink, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getExperimentData} from "../services/experemntService.ts";
import Spinner from "../components/common/Spinner.tsx";
import {Experiment} from "../utils/types/experimentTypes/experimentsTypes.ts";
import TrailType from "../components/experiment/TrailType.tsx";


function ExperimentPage() {
    const {experiment_name} = useParams();
    const [experimentData, setExperimentData] = useState<Experiment | undefined>(undefined);
    const [Loading, setLoading] = useState(true);
    const [Error, setError] = useState(false);
    const [currentTrailType, setCurrentTrailType] = useState(0);
    useEffect(() => {
        const data = getExperimentData(experiment_name);
        if (!data) {
            setError(true);
            setLoading(false);
            return;
        }
        setExperimentData(data)
        setLoading(false);
    }, [])


    if (Loading) {
        return <div className={"w-full h-full flex justify-center items-center"}>
            <Spinner/>
        </div>
    }

    if (Error || !experimentData) {
        const navLinkStyle = "w-96 h-52 m-auto drop-shadow-lg uppercase items-center justify-center flex rounded-3xl";
        return <div className={"w-full h-full flex justify-center items-center"}>
            <NavLink to={"/"} className={navLinkStyle}> No Data Found Return Home</NavLink>
        </div>

    }
    return (
        <div className={`relative gap 3px flex-col w-full h-full flex items-center p-5`}>
            <h2 className={"font-exo text-center text-3xl"}>{experimentData.name}</h2>
            {experimentData.trailTypes.map((trailType,index) =>
                index === currentTrailType && <TrailType setNextSlide={setCurrentTrailType} key={index} trailType={trailType} features={experimentData.objectDetails} />
            )}
        </div>
    );
}

export default ExperimentPage;