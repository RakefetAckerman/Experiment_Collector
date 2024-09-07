import {ExperimentsDate} from "../../utils/types/ExperimentsDate.ts";
import ListElementExperiment from "./ListElementExperiment.tsx";

type CardHomeScreenProps = {
    className?: string,
    title: string,
    experimentsNamesAndDates: ExperimentsDate[],
}


function CardHomeScreen({className, experimentsNamesAndDates, title}: CardHomeScreenProps) {
    return (
        <div className={`${className} flex gap-4 flex-col w-max min-w-[25dvw] bg-white drop-shadow-2xl p-10 rounded-[50px] min-h-[40dvh] `}>
            <h2 className={"text-lg font-light font-exo text-black-half uppercase "}>{title}</h2>
            <div className={" gap-4 flex items-center justify-start flex-col  overflow-x-hidden max-h-[90%] w-full"}>
                {experimentsNamesAndDates.map(((value, index) =>
                        <ListElementExperiment className={"p-3 rounded-2xl"} experimentsNameAndDate={value} key={index}/>
                ))}
            </div>
        </div>
    );
}

export default CardHomeScreen;