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
import experimentService from "../../services/experimentService.ts";
import {toast, ToastContainer} from "react-toastify";
import {useSelector} from "react-redux";
import {RootState} from "../../states/store.ts";

type TrialTypeProps = {
    setNextSlide: Dispatch<SetStateAction<number>>,
    trialTypeId: string;
    nextTrialTypeId: string |null;
    startTime: number,
}

/**
 * A single TrialTypeElement - A single way to render every trial type.
 * Features to add to page:
 * @param setNextSlide state to move between slides
 * @param startTime the time the that the trial type started at.
 * @param trialTypeId
 * @param nextTrialTypeId
 */
function TrialType({setNextSlide, startTime, trialTypeId , nextTrialTypeId}: TrialTypeProps) {
    const user = useSelector((state: RootState) => (state.user.user))
    const {error, loading, trialType} = useTrialType(trialTypeId, user! , nextTrialTypeId);
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
    // For the submit animation
    const [submitButtonLoading, setSubmitButtonLoading] = useState<boolean>(false);

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
    async function UpdateOutputAncContinueToNextTrialType() {
        setSubmitButtonLoading(true);
        const responseTimeLast = Date.now() - startTime;
        let newOutput = {...output};

        const featuresData: FeaturesDataType = {totalIdleTime, unFocusTime, responseTimeLast}
        if (!("ResponseTimeLast" in newOutput)) {
            // Updating the output with the necessary features for the current trial type
            newOutput = updateByFeatures(features, featuresData, newOutput, currentImageZoom.zoomOutput, mouseTracking);
            newOutput = updateResponseTimeLast(newOutput, featuresData.responseTimeLast);

            //Setting the output to fit each ui element criteria
            newOutput = updateOutputFromPageFlow(newOutput, pageFlow);
            setOutput(newOutput);
        }

        console.log(newOutput)
        try {
            await experimentService.setUserOutput(newOutput, trialTypeId, user!);
            setSubmitButtonLoading(false);
            setNextSlide((prevState) => (prevState + 1));
        } catch (error) {
            setSubmitButtonLoading(false);
            toast.error("Error occurred while data was sent please try again");
            console.error(error);
        }

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
                                     onClickMethod={UpdateOutputAncContinueToNextTrialType}
                                     loadingSubmitButton={submitButtonLoading}/>

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
    if (error || !user) {
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
            <div
                className={`w-full h-full bg-white rounded-3xl m-5 p-10 pt-16  drop-shadow-xl overflow-y-hidden overflow-x-hidden`}>
                <ToastContainer autoClose={3000}/>

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