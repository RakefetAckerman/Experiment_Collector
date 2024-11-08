import ImagesContainer from "./ImagesContainer.tsx";
import {
    PageFlowOutput,
    TrialTypeType,
    UiObjects
} from "../../utils/types/experimentTypes/experimentsTypes.ts";
import right_arrow from "../../assets/right_arrow.svg"
import ButtonIcon from "./ButtonIcon.tsx";
import {
    BUTTONS,
    HALF_MINUTE,
    HEADLINE,
    IMAGES, LIKERT,
    SLIDER,
    SUBMIT,
    TEXT, UNDERSTANDING_INSTRUCTION
} from "../../utils/constants.ts";
import {Dispatch, SetStateAction, useState} from "react";
import {
    isSubmitButton,
    getCurrentIndex,
    getIsSubmitDisabled
} from "../../utils/helperMethods.ts";
import useHandleFirstInteraction from "../../hooks/experimentFeatures/useHandleFirstInteraction.ts";
import useIdleTimer from "../../hooks/experimentFeatures/useHandleIdle.ts";
import ToastIdle from "./ToastIdle.tsx";
import Slider from "./Slider.tsx";
import 'react-toastify/dist/ReactToastify.css';
import getFeatures, {FeaturesDataType, updateByFeatures, updateResponseTimeLast} from "../../utils/features.ts";
import useFocusTime from "../../hooks/experimentFeatures/useHandleFocus.ts";
import ZoomElement, {ZoomType} from "./ZoomElement.tsx";
import Error from "../../error/Error.tsx";
import Likert from "./Likert.tsx";
import Buttons from "./Buttons.tsx";
import {ErrorType} from "../../error/errorType.ts";
import useMouseTracking from "../../features/MouseTracking/useMouseTracking.ts";
import UnderstandingInstruction from "../../features/Ui/UnderstandingInstruction/UnderstandingInstruction.tsx";

type TrialTypeProps = {
    trialType: TrialTypeType,
    setNextSlide: Dispatch<SetStateAction<number>>,
    startTime: number,
}

function getPageFlowOutput(uiObjects: UiObjects[]): PageFlowOutput[] {
    const output: PageFlowOutput[] = [];
    uiObjects.forEach((value) => {
        if (value.type === SLIDER || value.type === LIKERT || value.type === BUTTONS || value.type === SUBMIT
            || value.type === UNDERSTANDING_INSTRUCTION) {
            const currentElement: PageFlowOutput = {
                id: value.id!,
                type: value.type,
                responseTimeFirst: null,
                output: null
            };
            output.push(currentElement);
        }
    })
    return output;
}

function isUiElementsWithTheSameId(children: UiObjects[]) {
    for(const child of children){
        let isAlready = false;
        for (const child2 of children){
            if (child.id == child2.id && isAlready){
                return true
            }
            if (child.id == child2.id){
                isAlready = true;
            }
        }
    }
    return false;
}

function handleTrialTypeErrors(trialType: TrialTypeType): ErrorType {
    if (!trialType.id) {
        return {isError: true, errorMessage: "No ID specified for Trial type"};
    }
    if (!trialType.children) {
        return {isError: true, errorMessage: "No ui objects are mentioned for the current Trial type"};
    }

    if (!isSubmitButton(trialType)) {
        return {isError: true, errorMessage: "No submit button specified for Trial type"};
    }
    if(isUiElementsWithTheSameId(trialType.children)){
        return {isError: true, errorMessage: "Two or more of ui objects in the trail type have the same id"};
    }

    return {isError: false, errorMessage: ""}
}

function updateOutputForButton(updatedOutput: object, currentElement: PageFlowOutput) {
    return {
        ...updatedOutput,
        [`Response-${currentElement.id}`]: {
            Response: currentElement.output,
            ResponseTimeFirst: currentElement.responseTimeFirst,
            Accuracy: currentElement.accuracy
        }
    }
}

function updateOutputForSlider(updatedOutput: object, currentElement: PageFlowOutput) {
    return {
        ...updatedOutput,
        [`Judgment-${currentElement.id}`]: {
            Judgment: currentElement.output,
            ResponseTimeFirstJudgment: currentElement.responseTimeFirst,
        }
    }
}

function updateOutputForLikert(updatedOutput: object, currentElement: PageFlowOutput) {
    return {
        ...updatedOutput,
        [`Likert-${currentElement.id}`]: {
            Value: currentElement.output,
            ResponseTimeFirstLikert: currentElement.responseTimeFirst,
            ScalePoint: currentElement.scalePoints
        }
    }
}

function updateOutputForVerifyInstruction(updatedOutput: object, currentElement: PageFlowOutput) {
    return {
        ...updatedOutput,
        [`VerifyUnderstanding-${currentElement.id}`]: currentElement.flowInstruction,
    }
}

function updateOutputFromPageFlow(output: object, pageFlow: PageFlowOutput[]) {
    let updatedOutput: object = {...output};
    for (let i = 0; i < pageFlow.length; i++) {
        const currentElement: PageFlowOutput = pageFlow[i];
        if (currentElement.type === BUTTONS) {
            updatedOutput = updateOutputForButton(updatedOutput, currentElement);
        }
        if (currentElement.type === SLIDER) {
            updatedOutput = updateOutputForSlider(updatedOutput, currentElement);
        }
        if (currentElement.type === LIKERT) {
            updatedOutput = updateOutputForLikert(updatedOutput, currentElement);
        }
        if (currentElement.type === UNDERSTANDING_INSTRUCTION){
            updatedOutput = updateOutputForVerifyInstruction(updatedOutput, currentElement);
        }
    }
    return updatedOutput;
}

/**
 * A single TrialTypeElement - A single way to show every trial type.
 * Features to add to page:
 * @param trialType the current trial type
 * @param setNextSlide state to move between slides
 * @param startTime the time the that the trail type started at.
 * @param setUserOutput the output from the user.
 */
function TrialType({trialType, setNextSlide, startTime}: TrialTypeProps) {
    // Page Flow (Output for each Ui element):
    const [pageFlow, setPageFlow] = useState(getPageFlowOutput(trialType.children));
    // Trial Type Final Output:
    const [output, setOutput] = useState<object>({});
    // For Idle
    const {isIdle, totalIdleTime} = useIdleTimer(HALF_MINUTE);
    // For Focus
    const {unFocusTime} = useFocusTime();
    // For Zoom
    const [currentImageZoom, setCurrentImageZoom] = useState<ZoomType>({
        image: "",
        isOpen: false,
        zoomOutput: [],
        startTime: startTime
    });
    // For Mouse Tracking feature
    const {mouseTracking} = useMouseTracking(startTime, 350);

    // Updating the First Reaction time
    useHandleFirstInteraction(startTime, setOutput);

    const features = getFeatures(trialType);
    const error = handleTrialTypeErrors(trialType);

    function UpdateOutputAncContinueToNextTrialType() {
        const responseTimeLast = Date.now() - startTime;
        let newOutput = {...output};

        const featuresData: FeaturesDataType = {totalIdleTime, unFocusTime, responseTimeLast}

        // Updating the output with the necessary features for the current trial type
        newOutput = updateByFeatures(features, featuresData, newOutput, currentImageZoom.zoomOutput, mouseTracking);
        newOutput = updateResponseTimeLast(newOutput, featuresData.responseTimeLast);

        //Setting the output to fit each ui element criteria
        newOutput = updateOutputFromPageFlow(newOutput, pageFlow);
        console.log(newOutput)

        setOutput(newOutput);
        setNextSlide((prevState) => (prevState + 1));

    }


    function renderUi(currentObj: UiObjects, index: number) {
        const key = `${currentObj.id}-${currentObj.type}-${index}`;
        if (currentObj.type === IMAGES) {
            return <ImagesContainer setCurrentImageZoom={setCurrentImageZoom} images={currentObj} key={index}/>
        }
        if (currentObj.type === HEADLINE) {
            return <h2 className={"font-exo text-center text-clamping-mid max-w-[90%]"}
                       key={key}> {currentObj.text!}</h2>
        }
        if (currentObj.type === TEXT) {
            return <h2 className={"font-exo text-clamping-sm max-w-[80%]"} key={key}> {currentObj.text!}</h2>
        }
        if (currentObj.type === SUBMIT) {
            const buttonCSSActions = `bg-white transition-all duration-200 hover:bg-buttons-blue`;
            const buttonCSSLocation = `mt-10`;
            const currentIndex = getCurrentIndex(pageFlow, currentObj);
            const isDisabled = getIsSubmitDisabled(pageFlow, currentIndex);

            return <ButtonIcon text={currentObj.text} onClick={UpdateOutputAncContinueToNextTrialType}
                               icon={right_arrow}
                               disabled={isDisabled}
                               key={key}
                               className={`${buttonCSSLocation} ${isDisabled ? "opacity-30" : buttonCSSActions}`}/>
        }
        if (currentObj.type === BUTTONS) {
            return <Buttons key={key} startTime={startTime} pageFlow={pageFlow}
                            setPageFlow={setPageFlow} uiObject={currentObj}/>;
        }
        if (currentObj.type === SLIDER) {
            return (
                <Slider key={key} startTime={startTime} pageFlow={pageFlow}
                        setPageFlow={setPageFlow} uiObject={currentObj}/>
            );
        }
        if (currentObj.type === LIKERT) {
            return <Likert key={key} startTime={startTime} pageFlow={pageFlow} setPageFlow={setPageFlow}
                           uiObject={currentObj}/>
        }
        if (currentObj.type === UNDERSTANDING_INSTRUCTION) {
            return <UnderstandingInstruction startTime={startTime} pageFlow={pageFlow} setPageFlow={setPageFlow}
                                             uiObject={currentObj} key={key}/>
        }
        return undefined;
    }

    const trialTypeCss = "min-w-[90%] flex flex-auto flex-col items-center justify-start gap-8 h-full m-5 p-10 pt-16 bg-white drop-shadow-xl rounded-3xl overflow-x-hidden relative"

    //Rendering error if needed
    if (error.isError) {
        return <div className={trialTypeCss}>
            <Error error={error}/>
        </div>
    }

    return (
        <>
            {features.zoom && currentImageZoom.isOpen &&
                <ZoomElement setCurrentImageZoom={setCurrentImageZoom} currentImageZoom={currentImageZoom}/>}
            {features.idle && isIdle && <ToastIdle/>}
            <div className={trialTypeCss}>
                {trialType.children.map((uiObject, index) => renderUi(uiObject, index))}
            </div>
        </>
    );
}

export default TrialType;