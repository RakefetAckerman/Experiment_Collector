import ImagesContainer from "./ImagesContainer.tsx";
import {TrialType, UiObjects} from "../../utils/types/experimentTypes/experimentsTypes.ts";
import right_arrow from "../../assets/right_arrow.svg"
import ButtonIcon from "../common/ButtonIcon.tsx";
import {BUTTONS, HEADLINE, IMAGES, SUBMIT} from "../../utils/constants.ts";
import {useState} from "react";

type TrailTypeProps = {
    trailType: TrialType,
    features?: object,
    setNextSlide: React.Dispatch<React.SetStateAction<number>>,
}

function TrailType({trailType, setNextSlide}: TrailTypeProps) {
    const [isAnswered , setIsAnswered] = useState(false);
    if (!trailType) {
        return undefined;
    }

    function moveToNextSlide() {
        setNextSlide((prevState) => (prevState + 1));
    }

    function renderTrailType(object: UiObjects, index: number) {
        if (object.type === IMAGES) {
            return <ImagesContainer images={object} key={index} />
        }
        if (object.type === HEADLINE) {
            return <h2 className={"font-exo text-clamping-lg"} key={index} > {object.text!}</h2>
        }
        if (object.type === SUBMIT) {
            const buttonCSS =`${isAnswered ? "" :"hidden" } bg-buttons-blue hover:border-black transition-all duration-200 hover:bg-button-grey`
            return <ButtonIcon text={"next"} onClick={moveToNextSlide} icon={right_arrow} key={index} className={buttonCSS}/>
        }
        if (object.type === BUTTONS) {
            return(
            <div className="flex laptop:flex-row gap-4 max-laptop:flex-col w-3/4">
                {object.buttons!.map(
                    (value , index)=> <button className={"p-4 grow transition-all truncate bg-white border border-gray-300 drop-shadow-xl duration-300  hover:bg-buttons-blue rounded-xl"} key={index}>{value}</button>)}
            </div>
            );
        }
        return undefined;
    }

    return (
        <div
            className={"w-[90%] flex flex-auto flex-col items-center justify-center gap-8 h-full m-5 p-10 bg-white drop-shadow-xl rounded-3xl overflow-x-hidden relative"}>
            <h2 className={"center-absolute-vertical mt-10 font-exo text-2xl"}> {trailType.id}</h2>
            {trailType.children.map((value, index) => renderTrailType(value, index))}

        </div>
    );
}

export default TrailType;