import ImagesContainer from "./ImagesContainer.tsx";
import {TrialType, UiObjects} from "../../utils/types/experimentTypes/experimentsTypes.ts";
import right_arrow from "../../assets/right_arrow.svg"
import ButtonIcon from "./ButtonIcon.tsx";
import {
    BUTTONS, EMPTY_STRING,
    ERROR_SLIDER_INCORRECT,
    HALF_MINUTE,
    HEADLINE,
    IMAGES, INITIAL_CONFIDENCE,
    SLIDER,
    SUBMIT,
    TEXT
} from "../../utils/constants.ts";
import {useEffect, useState} from "react";
import Button from "./Button.tsx";
import {getAnswerIndex, getAnswersNeededBeforeSubmit, isConfidenceTrailType} from "../../utils/helperMethods.ts";
import useHandleFirstInteraction from "../../hooks/experimentFeatures/useHandleFirstInteraction.ts";
import useIdleTimer from "../../hooks/experimentFeatures/useHandleIdle.ts";
import ToastIdle from "./ToastIdle.tsx";
import Slider from "./Slider.tsx";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
 * TODO create a implementation of the IDLE.
 * TODO create a implementation of the judgment.
 * @param trailType
 * @param currentSlide
 * @param setNextSlide
 * @param startTime
 * @param setUserOutput
 * @constructor
 */
function TrailType({trailType, setNextSlide, startTime, setUserOutput}: TrailTypeProps) {
    const [answer, setAnswer] = useState(getAnswersNeededBeforeSubmit(trailType));
    const [output, setOutput] = useState<object>({});
    const [isMoveToNext, setIsMoveToNextTrail] = useState<boolean>(false);
    const {isIdle, totalIdleTime} = useIdleTimer(HALF_MINUTE);
    const [confidence, setConfidence] = useState<number>(INITIAL_CONFIDENCE);

    useHandleFirstInteraction(startTime, setOutput);

    //todo NEED TO BE DELETED ONLY FOR TESTING TO SEE THE OUTPUT AS PRINTED
    useEffect(() => {
        if (isMoveToNext) {
            setUserOutput(prevState => [...prevState, output]);
            setNextSlide((prevState) => (prevState + 1));
        }
    }, [output]);

    function moveToNextSlide() {
        const isTheTrailTypeContainsSlide = isConfidenceTrailType(trailType);
        let newOutput = {...output};
        if (confidence === INITIAL_CONFIDENCE && isTheTrailTypeContainsSlide) {
            toast.error(ERROR_SLIDER_INCORRECT);
            return;
        }
        if (isTheTrailTypeContainsSlide) {
            newOutput = {...newOutput, Judgment: confidence};
        }
        newOutput = {...newOutput, ResponseTimeLast: Date.now() - startTime, Idle: totalIdleTime};
        setIsMoveToNextTrail(true);
        setOutput(newOutput);
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, sliderObject: UiObjects) => {
        setConfidence(Number(event.target.value));
        const answerIndex = getAnswerIndex(sliderObject, trailType);
        if (answer[answerIndex] === EMPTY_STRING) {
            setOutput({...output, ResponseTimeFirstJudgment: Date.now() - startTime});
        }
        // if (Number(event.target.value) === INITIAL_CONFIDENCE) {
        //     setAnswer(prevArray => {
        //         const newArray = [...prevArray];
        //         newArray[answerIndex!] = EMPTY_STRING;
        //         return newArray;
        //     });
        //     return;
        // }
        setAnswer(prevArray => {
            const newArray = [...prevArray];
            newArray[answerIndex!] = (event.target.value);
            return newArray;
        });
    };

    function handleAnswerSet({answerClicked, answerIndex, object}: {
        answerClicked?: string,
        answerIndex?: number,
        object: UiObjects
    }) {
        if (answerClicked) {
            setAnswer(prevArray => {
                const newArray = [...prevArray];
                newArray[answerIndex!] = answerClicked;
                return newArray;
            });
        }
        if (object.type === BUTTONS) {
            const correct = answerClicked === object.correct ? 100 : 0;
            setOutput({
                ...output,
                [`Response${answerIndex}`]: answerClicked,
                [`Accuracy${answerIndex}`]: correct,
                [`ResponseTime${answerIndex}`]: Date.now() - startTime
            });
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
            const buttonCSSActions = `bg-white transition-all duration-200 hover:bg-buttons-blue`;
            const buttonCSSLocation = `mt-10`;
            const isDisabled = (answer.length !== 0 && answer[answer.length - 1] === EMPTY_STRING);

            return <ButtonIcon text={object.text} onClick={moveToNextSlide} icon={right_arrow} disabled={isDisabled}
                               key={key}
                               className={`${buttonCSSLocation} ${isDisabled ? "opacity-30" : buttonCSSActions}`}/>
        }
        if (object.type === BUTTONS) {
            const buttonContainerCSS = "flex justify-center max-laptop:items-center laptop:flex-row gap-4 max-laptop:flex-col w-3/4";
            const answerIndex = getAnswerIndex(object, trailType);
            const isDisabled = (answer[answerIndex] !== EMPTY_STRING) || (answer[answerIndex - 1] == EMPTY_STRING);
            return (
                <div key={key} className={buttonContainerCSS}>
                    {object.buttons!.map(
                        (value, buttonIndex) => <Button
                            disabled={isDisabled}
                            className={isDisabled ? (value !== answer[answerIndex] ? "opacity-30" : "bg-blue-300") : "bg-white hover:bg-buttons-blue"}
                            onClick={() => handleAnswerSet({
                                answerClicked: value,
                                answerIndex: answerIndex,
                                object: object
                            })}
                            key={`${key}-button-${buttonIndex}`}>{value}</Button>)}
                </div>
            );
        }
        if (object.type === SLIDER) {
            const answerIndex = getAnswerIndex(object, trailType);
            const isDisabled = (answer[answerIndex - 1] == EMPTY_STRING);
            return (
                <Slider handleChange={handleChange} className={isDisabled ? "opacity-30" : ""} value={confidence}
                        disabled={isDisabled} object={object} key={key}/>
            );
        }
        return undefined;
    }

    const trailTypeCss = "min-w-[90%] flex flex-auto flex-col items-center justify-start gap-8 h-full m-5 p-10 pt-16 bg-white drop-shadow-xl rounded-3xl overflow-x-hidden relative"
    return (
        <>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false}
                            draggable={false} theme="light"/>
            {isIdle && <ToastIdle/>}
            <div className={trailTypeCss}>
                {trailType.children.map((value, index) => renderTrailType(value, index))}
            </div>
        </>
    );
}

export default TrailType;