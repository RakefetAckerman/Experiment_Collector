import React, {useState} from 'react';
import useExperimentCreatedByResearcher from "./useExperimentCreatedByResearcher.ts";
import {useSelector} from "react-redux";
import {RootState} from "../../states/globalStore.ts";
import LoadingSpinner from "../Loding/LoadingSpinner.tsx";
import GetExperimentOutputAsCsv from "../CSVoutput/GetExperimentOutputAsCSV.tsx";
import PopOver from "../PopOver/PopOver.tsx";

type CardExperimentCreatedProps = {
    className?: string;
    title: string;
}

function CardExperimentCreated({title, className}: CardExperimentCreatedProps) {
    const [experimentId, setExperimentId] = useState("");
    const [isPopOverOpen, setIsPopOverOpen] = useState(false);

    const user = useSelector((state: RootState) => (state.user.user))
    const {loading, error, data} = useExperimentCreatedByResearcher(user!)
    if (loading) {
        return <div
            className={`${className} flex gap-4 flex-col w-max min-w-[25dvw] bg-white drop-shadow-2xl p-10 rounded-[50px] min-h-[40dvh] `}>
            <h2 className={"text-lg font-light font-exo text-black-half uppercase "}>{title}</h2>
            <div
                className={" gap-4 p-4 rounded-2xl flex items-center justify-start flex-col  overflow-x-hidden max-h-[90%] w-full bg-button-light-blue min-h-[60px]"}>
                <LoadingSpinner/>
            </div>
        </div>
    }
    if (error || data === undefined) {
        return <div>{error}</div>
    }
    return (
        <>
            <div
                className={`${className} flex gap-4 flex-col min-w-[35dvw] bg-white drop-shadow-2xl p-10 rounded-[50px] min-h-[40dvh] w-max`}>
                <h2 className={"text-lg font-light font-exo text-black-half uppercase "}>{title}</h2>
                <div
                    className={" gap-4 flex items-center justify-start flex-col  overflow-x-hidden max-h-[90%] w-[80]%"}>
                    {data!.map(((value, index) =>
                            <div key={`${index}-${value.objectId}`} onClick={() => {
                                setIsPopOverOpen(prev => !prev)
                                setExperimentId(value.objectId)
                            }}
                                 className={`p-4 w-full hover:cursor-pointer hover:bg-gray-200 active:bg-gray-500 transition-all duration-300 rounded-2xl flex flex-wrap justify-between gap-5 items-center bg-button-light-blue min-h-[60px]`}>
                                <h2 className={"text-clamping-mid font-light font-exo"}><span
                                    className={"opacity-30"}>Name: </span>{value.name}</h2>
                                <h2 className={"text-clamping-sm font-light font-exo mr-3"}><span
                                    className={"opacity-30"}>Trial Types: </span>{value.trialTypeAmount}
                                </h2>
                            </div>
                    ))}
                </div>
            </div>
            <PopOver isOpen={isPopOverOpen} setIsOpen={setIsPopOverOpen}>
                <GetExperimentOutputAsCsv experimentID={experimentId}/>
            </PopOver>
        </>

    );
}

export default CardExperimentCreated;