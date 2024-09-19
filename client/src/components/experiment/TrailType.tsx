import ImagesContainer from "./ImagesContainer.tsx";
import {TrialType, UiObjects} from "../../utils/types/experimentTypes/experimentsTypes.ts";
import right_arrow from "../../assets/right_arrow.svg"
import ButtonIcon from "./ButtonIcon.tsx";
import {BUTTONS, HALF_MINUTE, HEADLINE, IMAGES, SLIDER, SUBMIT, TEXT} from "../../utils/constants.ts";
import {useEffect, useState} from "react";
import Button from "./Button.tsx";
import {isOnlySubmitButton} from "../../utils/helperMethods.ts";
import useHandleFirstInteraction from "../../hooks/experimentFeatures/useHandleFirstInteraction.ts";
import useIdleTimer from "../../hooks/experimentFeatures/useHandleIdle.ts";
import ToastIdle from "./ToastIdle.tsx";
import Slider from "./Slider.tsx";

type TrailTypeProps = {
    trailType: TrialType,
    setNextSlide: React.Dispatch<React.SetStateAction<number>>,
    startTime: number,
    setUserOutput: React.Dispatch<React.SetStateAction<object[]>>,
}

/**
 * A single TrailTypeElement - A single way to show every trail type.
 * Features to add to page:
 * TODO reading from the object details the features need to be set to true.
 * TODO create a implementation of the RESPONSE TIME.
 * TODO create a implementation of the IDLE.
 * TODO create a implementation of the ACURERCY.
 * TODO create a implementation of the IDLE.
 * TODO create a implementation of the IDLE.
 * TODO create a implementation of the IDLE.
 * @param trailType
 * @param currentSlide
 * @param setNextSlide
 * @param startTime
 * @param setUserOutput
 * @constructor
 */
function TrailType({trailType, setNextSlide, startTime, setUserOutput}: TrailTypeProps) {
    const [answer, setAnswer] = useState("");
    const [output, setOutput] = useState<object>({});
    const [isMoveToNext, setIsMoveToNextTrail] = useState<boolean>(false);
    const {isIdle, totalIdleTime} = useIdleTimer(HALF_MINUTE);

    useHandleFirstInteraction(startTime, setOutput);
    useEffect(() => {
        if (isMoveToNext){
            setUserOutput(prevState => [...prevState, output]);
            setNextSlide((prevState) => (prevState + 1));
        }
    }, [output]);

    function moveToNextSlide() {
        setIsMoveToNextTrail(true);
        setOutput({...output, ResponseTimeLast: Date.now() - startTime, idle: totalIdleTime});
    }

    function handleAnswerSet({answerClicked, object}: { answerClicked?: string, object: UiObjects }) {
        if (answerClicked) {
            setAnswer((answerClicked));
        }
        if (object.type === BUTTONS) {
            const correct = answerClicked === object.correct ? 100 : 0;
            setOutput({...output, Response: answerClicked, Accuracy: correct, ResponseTime: Date.now() - startTime});
        }
    }

    function renderTrailType(object: UiObjects, index: number) {
        const key = `${object.type}-${index}`;
        if (object.type === IMAGES) {
            return <ImagesContainer images={object} key={index}/>
        }
        if (object.type === HEADLINE) {
            return <h2 className={"font-exo text-center text-clamping-mid max-w-[90%]"} key={key}> {object.text!}</h2>
        }
        if (object.type === TEXT) {
            return <h2 className={"font-exo text-clamping-sm max-w-[80%]"} key={key}> {object.text!}</h2>
        }
        if (object.type === SUBMIT) {
            const buttonCSSActions = `bg-white transition-all duration-200 hover:bg-buttons-blue`
            const buttonCSSLocation = `mt-10`
            if (isOnlySubmitButton(trailType)) {
                return <ButtonIcon text={object.text} onClick={moveToNextSlide} icon={right_arrow} key={key}
                                   className={buttonCSSActions}/>
            }
            return <ButtonIcon text={object.text} onClick={moveToNextSlide} icon={right_arrow} disabled={answer === ""}
                               key={key}
                               className={`${buttonCSSLocation} ${answer !== "" ? buttonCSSActions : "opacity-30"}`}/>
        }
        if (object.type === BUTTONS) {
            return (
                <div key={key}
                     className="flex justify-center max-laptop:items-center laptop:flex-row gap-4 max-laptop:flex-col w-3/4 ">
                    {object.buttons!.map(
                        (value, buttonIndex) => <Button
                            disabled={answer !== ""}
                            className={(answer !== "" ? (value !== answer ? "opacity-30" : "bg-blue-300") : "bg-white hover:bg-buttons-blue")}
                            onClick={() => handleAnswerSet({answerClicked: value, object: object})}
                            key={`${key}-button-${buttonIndex}`}>{value}</Button>)}
                </div>
            );
        }
        if (object.type === SLIDER) {
            return (
                <Slider object={object} key={key}/>
            );
        }
        return undefined;
    }

    const trailTypeCss = "min-w-[90%] flex flex-auto flex-col items-center justify-start gap-8 h-full m-5 p-10 pt-16 bg-white drop-shadow-xl rounded-3xl overflow-x-hidden relative"
    return (
        <>
            {isIdle && <ToastIdle/>}
            <div className={trailTypeCss}>
                {trailType.children.map((value, index) => renderTrailType(value, index))}
            </div>
        </>
    );
}

export default TrailType;