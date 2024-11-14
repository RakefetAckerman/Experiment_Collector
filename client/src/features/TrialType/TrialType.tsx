import ImagesContainer from "../Ui/Images/ImagesContainer.tsx";
import {
    UiObjects
} from "../../utils/types/experimentTypes/experimentsTypes.ts";
import {
    ElementsKeys,
    HALF_MINUTE,
} from "../../utils/constants.ts";
import {Dispatch, SetStateAction, useState} from "react";
import useHandleFirstInteraction from "../../hooks/experimentFeatures/useHandleFirstInteraction.ts";
import useIdleTimer from "../Idle/hooks/useHandleIdle.ts";
import ToastIdle from "../Idle/components/ToastIdle.tsx";
import Slider from "../Ui/Slider/Slider.tsx";
import 'react-toastify/dist/ReactToastify.css';
import getFeatures, {FeaturesDataType, updateByFeatures, updateResponseTimeLast} from "../../utils/features.ts";
import useFocusTime from "../../hooks/experimentFeatures/useHandleFocus.ts";
import ZoomElement from "../Zoom/componennts/ZoomElement.tsx";
import Error from "../../error/Error.tsx";
import Likert from "../Ui/Likert/Likert.tsx";
import Buttons from "../Ui/Buttons/Buttons.tsx";
import useMouseTracking from "../MouseTracking/useMouseTracking.ts";
import UnderstandingInstruction from "../Ui/UnderstandingInstruction/UnderstandingInstruction.tsx";
import {handleTrialTypeErrors} from "./errors.ts";
import {getPageFlowOutput, updateOutputFromPageFlow} from "../PageFlow/pageFlow.ts";
import {TrialTypeType} from "./types.ts";
import {ZoomType} from "../Zoom/types.ts";
import {getInitialZoom} from "../Zoom/helpers.ts";
import TextInput from "../Ui/TextInput/TextInput.tsx";
import HeadLine from "../Ui/HeadLine/HeadLine.tsx";
import Text from "../Ui/Text/Text";
import SubmitButton from "../Ui/Submit/SubmitButton.tsx";
import useHandlePageFlow from "../PageFlow/usePageFlow.ts";

type TrialTypeProps = {
    trialType: TrialTypeType,
    setNextSlide: Dispatch<SetStateAction<number>>,
    startTime: number,
}

/**
 * A single TrialTypeElement - A single way to render every trial type.
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
    const [currentImageZoom, setCurrentImageZoom] = useState<ZoomType>(getInitialZoom(startTime));
    // For Mouse Tracking feature
    const {mouseTracking} = useMouseTracking(startTime, 350);

    // Updating the First Reaction time
    useHandleFirstInteraction(startTime, setOutput);
    useHandlePageFlow({pageFlow, setPageFlow});

    const features = getFeatures(trialType);
    const error = handleTrialTypeErrors(trialType);

    /**
     * The Method update the output and set the next slide to move forward to the next element.
     * @constructor
     */
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
        switch (currentObj.type) {
            case ElementsKeys.IMAGES:
                return <ImagesContainer setCurrentImageZoom={setCurrentImageZoom} images={currentObj} key={index}/>
            case ElementsKeys.HEADLINE:
                return <HeadLine key={key} currentObj={currentObj}/>
            case ElementsKeys.TEXT:
                return <Text key={key} currentObj={currentObj}/>
            case ElementsKeys.BUTTONS:
                return <Buttons key={key} startTime={startTime} pageFlow={pageFlow}
                                setPageFlow={setPageFlow} uiObject={currentObj}/>;
            case ElementsKeys.SLIDER:
                return (
                    <Slider key={key} startTime={startTime} pageFlow={pageFlow}
                            setPageFlow={setPageFlow} uiObject={currentObj}/>
                );
            case ElementsKeys.LIKERT:
                return <Likert key={key} startTime={startTime} pageFlow={pageFlow} setPageFlow={setPageFlow}
                               uiObject={currentObj}/>
            case ElementsKeys.UNDERSTANDING_INSTRUCTION:
                return <UnderstandingInstruction startTime={startTime} pageFlow={pageFlow} setPageFlow={setPageFlow}
                                                 uiObject={currentObj} key={key}/>
            case ElementsKeys.TEXT_INPUT:
                return <TextInput key={key} startTime={startTime} pageFlow={pageFlow} setPageFlow={setPageFlow}
                                  uiObject={currentObj}/>
            case ElementsKeys.SUBMIT:
                return <SubmitButton  key={key} currentObj={currentObj} pageFlow={pageFlow} onClickMethod={UpdateOutputAncContinueToNextTrialType}/>
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