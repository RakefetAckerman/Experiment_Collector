import ImagesContainer from "./ImagesContainer.tsx";
import {TrialTypeType, UiObjects} from "../../utils/types/experimentTypes/experimentsTypes.ts";
import right_arrow from "../../assets/right_arrow.svg"
import ButtonIcon from "./ButtonIcon.tsx";
import {
    BUTTONS,
    EMPTY_STRING,
    HALF_MINUTE,
    HEADLINE,
    IMAGES,
    SLIDER,
    SUBMIT,
    TEXT
} from "../../utils/constants.ts";
import {useEffect, useState} from "react";
import Button from "./Button.tsx";
import {
    getAnswerIndex,
    getAnswersNeededBeforeSubmit,
    getInitialConfidence,
    isConfidenceTrialType
} from "../../utils/helperMethods.ts";
import useHandleFirstInteraction from "../../hooks/experimentFeatures/useHandleFirstInteraction.ts";
import useIdleTimer from "../../hooks/experimentFeatures/useHandleIdle.ts";
import ToastIdle from "./ToastIdle.tsx";
import Slider from "./Slider.tsx";
import 'react-toastify/dist/ReactToastify.css';
import getFeatures, {FeaturesDataType, updateByFeatures} from "../../utils/features.ts";
import useFocusTime from "../../hooks/experimentFeatures/useHandleFocus.ts";

type TrialTypeProps = {
    trialType: TrialTypeType,
    setNextSlide: React.Dispatch<React.SetStateAction<number>>,
    startTime: number,
    setUserOutput: React.Dispatch<React.SetStateAction<object[]>>,
}

/**
 * A single TrialTypeElement - A single way to show every trial type.
 * Features to add to page:
 * TODO reading from the object details the features need to be set to true.
 * TODO create a implementation of the IDLE.
 * TODO create a implementation of the judgment.
 * @param trialType
 * @param currentSlide
 * @param setNextSlide
 * @param startTime
 * @param setUserOutput
 * @constructor
 */
function TrialType({trialType, setNextSlide, startTime, setUserOutput}: TrialTypeProps) {
    const [answer, setAnswer] = useState(getAnswersNeededBeforeSubmit(trialType));
    const [output, setOutput] = useState<object>({});
    const [isMoveToNext, setIsMoveToNextTrial] = useState<boolean>(false);
    const {isIdle, totalIdleTime} = useIdleTimer(HALF_MINUTE);
    const initialConfidence = getInitialConfidence(trialType)
    const [confidence, setConfidence] = useState<number>(initialConfidence);
    const { unFocusTime } = useFocusTime();

    useHandleFirstInteraction(startTime, setOutput);

    //todo NEED TO BE DELETED ONLY FOR TESTING TO SEE THE OUTPUT AS PRINTED
    useEffect(() => {
        if (isMoveToNext) {
            setUserOutput(prevState => [...prevState, output]);
            setNextSlide((prevState) => (prevState + 1));
        }
    }, [output]);

    const features  = getFeatures(trialType);


    function moveToNextTrialType() {
        const isTheTrialTypeContainsSlider = isConfidenceTrialType(trialType);
        const responseTimeLast = Date.now() - startTime;
        let newOutput = {...output};

        const featuresData :FeaturesDataType = {totalIdleTime , unFocusTime , responseTimeLast }

        // Updating the output with the necessary features
        newOutput = updateByFeatures(features,featuresData ,newOutput );

        if (isTheTrialTypeContainsSlider) {
            newOutput = {...newOutput, Judgment: confidence};
        }
        setIsMoveToNextTrial(true);
        setOutput(newOutput);
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, sliderObject: UiObjects) => {
        setConfidence(Number(event.target.value));
        const answerIndex = getAnswerIndex(sliderObject, trialType);
        if (answer[answerIndex] === EMPTY_STRING) {
            setOutput({...output, ResponseTimeFirstJudgment: Date.now() - startTime});
        }
        if (Number(event.target.value) === initialConfidence) {
            setAnswer(prevArray => {
                const newArray = [...prevArray];
                newArray[answerIndex!] = EMPTY_STRING;
                return newArray;
            });
            return;
        }
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

    function renderTrialType(currentObj: UiObjects, index: number) {
        const key = `${currentObj.type}-${index}`;
        if (currentObj.type === IMAGES) {
            return <ImagesContainer images={currentObj} key={index}/>
        }
        if (currentObj.type === HEADLINE) {
            return <h2 className={"font-exo text-center text-clamping-mid max-w-[90%]"} key={key}> {currentObj.text!}</h2>
        }
        if (currentObj.type === TEXT) {
            return <h2 className={"font-exo text-clamping-sm max-w-[80%]"} key={key}> {currentObj.text!}</h2>
        }
        if (currentObj.type === SUBMIT) {
            const buttonCSSActions = `bg-white transition-all duration-200 hover:bg-buttons-blue`;
            const buttonCSSLocation = `mt-10`;
            const isDisabled = (answer.length !== 0 && answer[answer.length - 1] === EMPTY_STRING);

            return <ButtonIcon text={currentObj.text} onClick={moveToNextTrialType} icon={right_arrow} disabled={isDisabled}
                               key={key}
                               className={`${buttonCSSLocation} ${isDisabled ? "opacity-30" : buttonCSSActions}`}/>
        }
        if (currentObj.type === BUTTONS) {
            const buttonContainerCSS = "flex justify-center items-stretch max-laptop:items-center laptop:flex-row gap-4 max-laptop:flex-col w-3/4";
            const answerIndex = getAnswerIndex(currentObj, trialType);
            const isDisabled = (answer[answerIndex] !== EMPTY_STRING) || (answer[answerIndex - 1] == EMPTY_STRING);
            return (
                <div key={key} className={buttonContainerCSS }>
                    {currentObj.buttons!.map(
                        (value, buttonIndex) => <Button
                            disabled={isDisabled}
                            className={isDisabled ? (value !== answer[answerIndex] ? "opacity-30" : "bg-blue-300") : "bg-white hover:bg-buttons-blue"}
                            onClick={() => handleAnswerSet({
                                answerClicked: value,
                                answerIndex: answerIndex,
                                object: currentObj
                            })}
                            key={`${key}-button-${buttonIndex}`}>{value}</Button>)}
                </div>
            );
        }
        if (currentObj.type === SLIDER) {
            const answerIndex = getAnswerIndex(currentObj, trialType);
            const isDisabled = (answer[answerIndex - 1] == EMPTY_STRING);
            return (
                <Slider handleChange={handleChange} className={isDisabled ? "opacity-30" : ""} value={confidence}
                        disabled={isDisabled} sliderObj={currentObj} key={key}/>
            );
        }
        return undefined;
    }

    const trialTypeCss = "min-w-[90%] flex flex-auto flex-col items-center justify-start gap-8 h-full m-5 p-10 pt-16 bg-white drop-shadow-xl rounded-3xl overflow-x-hidden relative"
    return (
        <>
            {features.idle && isIdle && <ToastIdle/>}
            <div className={trialTypeCss}>
                {trialType.children.map((value, index) => renderTrialType(value, index))}
            </div>
        </>
    );
}

export default TrialType;