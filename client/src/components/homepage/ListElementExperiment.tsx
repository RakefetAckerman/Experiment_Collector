import {ExperimentsDate} from "../../utils/types/ExperimentsDate.ts";
type ListElementExperimentProps = {
    experimentsNameAndDate: ExperimentsDate,
    className?: string
}

function ListElementExperiment({className,experimentsNameAndDate} : ListElementExperimentProps) {
    return (
        <div className={`${className} flex justify-between items-center bg-button-light-blue w-[98%] min-h-[60px]`}>
            <h2 className={"text-2xl font-light font-exo ml-3"}>{experimentsNameAndDate.name}</h2>
            <h2 className={"text-lg font-light font-exo text-black-half mr-3"}>{experimentsNameAndDate.date}</h2>
        </div>
    );
}

export default ListElementExperiment;