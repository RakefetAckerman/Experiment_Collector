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
    if (error || !experimentData) {
        return <div className={"w-full h-full flex justify-center items-center flex-col gap-0 "}>
            <div className={"bg-white p-10 rounded-3xl drop-shadow-lg border gap-3 border-red-400 flex justify-center items-center flex-col"}>
                <h2 className={"text-clamping-mid font-exo text-center"}>Error occurred while getting Data</h2>
                <NavLink to={"/"} className={"text-clamping-sm text-center hover:opacity-100 opacity-30 duration-200 transition-all"}>Return Home</NavLink>
            </div>
        </div>
    }
    if (experimentData && !experimentData!.trialTypes[currentTrailType]){
        return <div className={"w-full h-full flex justify-center items-center flex-col gap-0 "}>
            <div
                className="p-10 rounded-3xl drop-shadow-lg border gap-3 border-gray-400 flex justify-center items-center flex-col
  bg-gradient-to-r from-red-400 via-blue-400 to-green-400 bg-[length:200%_200%]"
            >
                <h2 className="text-white text-clamping-mid font-exo text-center">Thank You for participating in the experiment</h2>
                <NavLink
                    to="/"
                    className="text-white text-clamping-sm text-center hover:opacity-100 opacity-30 duration-200 transition-all"
                >
                    Return Home
                </NavLink>
            </div>
        </div>
    }
    console.log(experimentData.trialTypes);
    const nextTrialId = currentTrailType >= experimentData.trialTypes.length ? null : experimentData.trialTypes[currentTrailType + 1];
    return (
        <div
            className={`relative gap 3px flex-col w-full h-full flex items-center p-5 transition-all duration-1000 ease-in-out`}>
            <h2 className={"font-exo text-center text-3xl uppercase"}>{experimentData.name}</h2>
            <TrialType setNextSlide={setCurrentTrailType} startTime={Date.now()}
                       trialTypeId={experimentData.trialTypes[currentTrailType]} nextTrialTypeId={nextTrialId}/>
        </div>
    );
}

export default ExperimentPage;