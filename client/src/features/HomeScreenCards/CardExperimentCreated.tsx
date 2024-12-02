import React from 'react';
import useExperimentCreatedByResearcher from "./useExperimentCreatedByResearcher.ts";
import {useSelector} from "react-redux";
import {RootState} from "../../states/store.ts";
import LoadingSpinner from "../Loding/LoadingSpinner.tsx";

type CardExperimentCreatedProps = {
    className?: string;
    title: string;
}

function CardExperimentCreated({title, className}: CardExperimentCreatedProps) {
    const user = useSelector((state: RootState) => (state.user.user))

    const {loading, error, data} = useExperimentCreatedByResearcher(user!)

    if (error){
        return <div>{error}</div>
    }
    if (loading) {
        return <div
            className={`${className} flex gap-4 flex-col w-max min-w-[25dvw] bg-white drop-shadow-2xl p-10 rounded-[50px] min-h-[40dvh] `}>
            <h2 className={"text-lg font-light font-exo text-black-half uppercase "}>{title}</h2>
            <div className={" gap-4 p-4 rounded-2xl flex items-center justify-start flex-col  overflow-x-hidden max-h-[90%] w-full bg-button-light-blue min-h-[60px]"}>
                <LoadingSpinner/>
            </div>
        </div>
    }
    return (
        <div
            className={`${className} flex gap-4 flex-col min-w-[25dvw] bg-white drop-shadow-2xl p-10 rounded-[50px] min-h-[40dvh] w-max`}>
            <h2 className={"text-lg font-light font-exo text-black-half uppercase "}>{title}</h2>
            <div className={" gap-4 flex items-center justify-start flex-col  overflow-x-hidden max-h-[90%] w-[80]%"}>
                {data!.map(((value, index) =>
                        <div
                            key={`${index}-${value.objectId}`}
                            className={`p-4 rounded-2xl flex flex-wrap justify-center gap-5 items-center bg-button-light-blue min-h-[60px]`}>
                            <h2 className={"text-clamping-mid font-light font-exo "}>{`Name: ${value.name}`}</h2>
                            <h2 className={"text-clamping-sm font-light font-exo text-black-half mr-3"}>{`TrialType amount: ${value.trialTypeAmount}`}</h2>
                        </div>
                ))}
            </div>
        </div>
    )
        ;
}

export default CardExperimentCreated;