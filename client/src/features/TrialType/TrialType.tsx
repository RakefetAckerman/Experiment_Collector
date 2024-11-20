import ImagesContainer from "../Ui/Images/ImagesContainer.tsx";
import {
    UiObjects
} from "../../utils/types/experimentTypes/experimentsTypes.ts";
import {
    ElementsKeys,
    HALF_MINUTE,
} from "../../utils/constants.ts";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
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
import {ZoomType} from "../Zoom/types.ts";
import {getInitialZoom} from "../Zoom/helpers.ts";
import TextInput from "../Ui/TextInput/TextInput.tsx";
import HeadLine from "../Ui/HeadLine/HeadLine.tsx";
import Text from "../Ui/Text/Text";
import SubmitButton from "../Ui/Submit/SubmitButton.tsx";
import useHandlePageFlow from "../PageFlow/usePageFlow.ts";
import useTrialType from "./useTrialTypeData.ts";
import Spinner from "../Spinner/Spinner.tsx";

type TrialTypeProps = {
    setNextSlide: Dispatch<SetStateAction<number>>,
    trailTypeId: string;
    startTime: number,
}

/**
 * A single TrialTypeElement - A single way to render every trial type.
 * Features to add to page:
 * @param setNextSlide state to move between slides
 * @param startTime the time the that the trail type started at.
 * @param trailTypeId
 */
function TrialType({setNextSlide, startTime, trailTypeId}: TrialTypeProps) {
    const {error, loading, trialType} = useTrialType(trailTypeId)
    // // Page Flow (Output for each Ui element):
    const [pageFlow, setPageFlow] = useState(getPageFlowOutput(trialType?.children));
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


    useEffect(() => {
        if (!trialType) {
            return;
        }
        setPageFlow(getPageFlowOutput(trialType?.children))
    }, [trialType]);
    // Updating the First Reaction time
    useHandleFirstInteraction(startTime, setOutput);
    useHandlePageFlow({pageFlow, setPageFlow});

    const features = getFeatures(trialType);
    const errorUI = handleTrialTypeErrors(trialType);

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
                return <Slider key={key} startTime={startTime} pageFlow={pageFlow}
                               setPageFlow={setPageFlow} uiObject={currentObj}/>
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
                return <SubmitButton key={key} currentObj={currentObj} pageFlow={pageFlow}
                                     onClickMethod={UpdateOutputAncContinueToNextTrialType}/>
        }

        return undefined;
    }

    const trialTypeCss = "flex flex-auto flex-col items-center justify-start gap-8 w-full h-full overflow-x-hidden relative m-2"


    if (loading && !trialType) {
        return <div className={`${trialTypeCss} justify-center bg-white rounded-3xl m-5 p-10 pt-16  drop-shadow-xl`}>
            <Spinner/>
        </div>
    }
    //Rendering error if needed
    if (error) {
        return <div className={trialTypeCss}>
            <h1 className={"font-exo text-clamping-lg text-xl border border-red-400 p-5"}>Error retrieving data</h1>
        </div>
    }

    if (errorUI.isError) {
        return <div className={trialTypeCss}>
            <Error error={errorUI}/>
        </div>
    }

    return (
        <>
            {features.zoom && currentImageZoom.isOpen &&
                <ZoomElement setCurrentImageZoom={setCurrentImageZoom} currentImageZoom={currentImageZoom}/>}
            {features.idle && isIdle && <ToastIdle/>}
            <div className={`w-full h-full bg-white rounded-3xl m-5 p-10 pt-16  drop-shadow-xl overflow-y-hidden overflow-x-hidden`}>

                {loading &&
                    <div className={"center-absolute z-10"}>
                        <Spinner/>
                    </div>
                }
                <div
                    className={`${trialTypeCss} pb-5 duration-200 transition-all ease-in ${loading ? "opacity-10" : "opacity-100"}`}>
                    {trialType!.children.map((uiObject, index) => renderUi(uiObject, index))}
                </div>
            </div>

        </>
    );
}

export default TrialType;