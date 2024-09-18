import {NavLink, useParams} from "react-router-dom";
import {useState} from "react";
import Spinner from "../components/common/Spinner.tsx";
import TrailType from "../components/experiment/TrailType.tsx";
import useExperimentData from "../hooks/experimentFeatures/useExperimentData.ts";


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
                <TrailType startTime={Date.now()} setNextSlide={setCurrentTrailType}
                           key={`trail-type-${index}`} trailType={trailType}/>
            )}
        </div>
    );
}

export default ExperimentPage;