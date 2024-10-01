import {NavLink, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Spinner from "../components/common/Spinner.tsx";
import TrialType from "../components/experiment/TrialType.tsx";
import useExperimentData from "../hooks/experimentFeatures/useExperimentData.ts";


function ExperimentPage() {
    const {experiment_name} = useParams();
    const [currentTrailType, setCurrentTrailType] = useState(0);
    const {experimentData, loading, error} = useExperimentData(experiment_name);
    const [userOutput, setUserOutput] = useState<object[]>([]);

    useEffect(() => {
        if (userOutput.length > 0)
            console.log(userOutput)
    } , [userOutput]);

    if (loading) {
        return <div className={"w-full h-full flex justify-center items-center"}>
            <Spinner/>
        </div>
    }

    if (error || !experimentData) {
        const navLinkStyle = "w-96 h-52 m-auto drop-shadow-lg uppercase items-center justify-center flex rounded-3xl";
        return <div className={"w-full h-full flex justify-center items-center"}>
            <NavLink to={"/"} className={navLinkStyle}> No Data Found Return Home</NavLink>
        </div>

    }
    return (
        <div className={`relative gap 3px flex-col w-full h-full flex items-center p-5`}>
            <h2 className={"font-exo text-center text-3xl"}>{experimentData.name}</h2>
            {experimentData.trailTypes.map((trailType, index) =>
                index === currentTrailType &&
                <TrialType setUserOutput={setUserOutput} startTime={Date.now()} setNextSlide={setCurrentTrailType}
                           key={`trail-type-${index}`} trialType={trailType}/>
            )}
        </div>
    );
}

export default ExperimentPage;