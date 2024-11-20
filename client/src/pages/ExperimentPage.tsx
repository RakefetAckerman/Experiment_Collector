import {NavLink, useParams} from "react-router-dom";
import { useState} from "react";
import Spinner from "../features/Spinner/Spinner.tsx";
import TrialType from "../features/TrialType/TrialType.tsx";
import useExperimentData from "../hooks/experimentFeatures/useExperimentData.ts";

/**
 * The Experiment page react component.
 */
function ExperimentPage() {
    const {experiment_name} = useParams();
    const [currentTrailType, setCurrentTrailType] = useState(0);
    const {experimentData, loading, error} = useExperimentData(experiment_name);


    if (loading) {
        return <div className={"w-full h-full flex justify-center items-center"}>
            <Spinner/>
        </div>
    }

    if (error || !experimentData || !experimentData.trialTypes[currentTrailType]) {
        return <div className={"w-full h-full flex justify-center items-center flex-col gap-0 "}>
            <div className={"bg-white p-10 rounded-3xl drop-shadow-lg border gap-3 border-red-400 flex justify-center items-center flex-col"}>
                <h2 className={"text-clamping-mid font-exo text-center"}>Error occurred while getting Data</h2>
                <NavLink to={"/"} className={"text-clamping-sm text-center hover:opacity-100 opacity-30 duration-200 transition-all"}>Return Home</NavLink>
            </div>
        </div>
    }

    return (
        <div className={`relative gap 3px flex-col w-full h-full flex items-center p-5 transition-all duration-1000 ease-in-out`}>
            <h2 className={"font-exo text-center text-3xl uppercase"}>{experimentData.name}</h2>
            <TrialType setNextSlide={setCurrentTrailType} startTime={Date.now()}
                       trailTypeId={experimentData.trialTypes[currentTrailType]}/>
        </div>
    );
}

export default ExperimentPage;