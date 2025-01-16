import ImagesContainer from "../Ui/Images/ImagesContainer.tsx";
import {
    UiObjects
} from "../../utils/types/experimentTypes/experimentsTypes.ts";
import {
    ElementsKeys,
    HALF_MINUTE,
} from "../../utils/constants.ts";
import {useEffect, useState} from "react";
import useHandleFirstInteraction from "../../hooks/experimentFeatures/useHandleFirstInteraction.ts";
import useIdleTimer from "../Idle/hooks/useHandleIdle.ts";
import ToastIdle from "../Idle/components/ToastIdle.tsx";
import Slider from "../Ui/Slider/Slider.tsx";
import 'react-toastify/dist/ReactToastify.css';
import getFeatures, {
    FeaturesDataType,
    updateByFeatures,
    updateImages, updateResponseTimeFirst,
    updateResponseTimeLast
} from "../../utils/features.ts";
import useFocusTime from "../../hooks/experimentFeatures/useHandleFocus.ts";
import ZoomElement from "../Zoom/componennts/ZoomElement.tsx";
import Error from "../../error/Error.tsx";
import Likert from "../Ui/Likert/Likert.tsx";
import Buttons from "../Ui/Buttons/Buttons.tsx";
import useMouseTracking from "../MouseTracking/useMouseTracking.ts";
import UnderstandingInstruction from "../Ui/UnderstandingInstruction/UnderstandingInstruction.tsx";
import {handleTrialTypeErrors} from "../TrialType/errors.ts";
import {getPageFlowOutput, updateOutputFromPageFlow} from "../PageFlow/pageFlow.ts";
import {ZoomType} from "../Zoom/types.ts";
import {getInitialZoom} from "../Zoom/helpers.ts";
import TextInput from "../Ui/TextInput/TextInput.tsx";
import HeadLine from "../Ui/HeadLine/HeadLine.tsx";
import Text from "../Ui/Text/Text.tsx";
import SubmitButton from "../Ui/Submit/SubmitButton.tsx";
import useHandlePageFlow from "../PageFlow/usePageFlow.ts";
import {toast, ToastContainer} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {EditorState} from "../../states/editor/editorStore.ts";
import {setCurrentItem} from "../../states/editor/editorSlice.ts";
import {ItemTypeEditor} from "../TrialType/types.ts";

type ItemProps = {
    startTime: number,
    Item: ItemTypeEditor;
}

/**
 * A single TrialTypeElement - A single way to render every trial type.
 * Features to add to page:
 * @param startTime the time the that the trial type started at.
 * @param item the trial type to render and interact with
 */
function EditorItems({startTime, item}: ItemProps) {
    const experimentData = useSelector((state: EditorState) => (state.editor.editorPreview));
    const currentUiObject = useSelector((state: EditorState) => (state.editor.currentUiObject));
    const dispatch = useDispatch();

    // // Page Flow (Output for each Ui element):
    const [pageFlow, setPageFlow] = useState(getPageFlowOutput(item?.children));
    // For Idle
    const {isIdle, totalIdleTime} = useIdleTimer(HALF_MINUTE);
    // For Focus
    const {unFocusTime} = useFocusTime();
    // For Zoom
    const [currentImageZoom, setCurrentImageZoom] = useState<ZoomType>(getInitialZoom(startTime));
    // For Mouse Tracking feature
    const {mouseTracking} = useMouseTracking(startTime, 350);

    useEffect(() => {
        if (!item) {
            return;
        }
        setPageFlow(getPageFlowOutput(item?.children));
    }, [item]);
    // Updating the First Reaction time
    const {responseTimeFirst} = useHandleFirstInteraction(startTime, item!);
    useHandlePageFlow({pageFlow, setPageFlow});
    const features = getFeatures(item);
    const errorUI = handleTrialTypeErrors(item);

    /**
     * The Method update the output and set the next slide to move forward to the next element.
     * @constructor
     */
    async function UpdateOutputAncContinueToNextTrialType() {
        const responseTimeLast = Date.now() - startTime;
        let newOutput = {};
        const featuresData: FeaturesDataType = {totalIdleTime, unFocusTime, responseTimeLast}
        // Updating the output with the necessary features for the current trial type
        newOutput = updateByFeatures(features, featuresData, newOutput, currentImageZoom.zoomOutput, mouseTracking);
        newOutput = updateResponseTimeFirst(newOutput, responseTimeFirst);
        newOutput = updateResponseTimeLast(newOutput, featuresData.responseTimeLast);
        newOutput = updateImages(newOutput, item!.children);
        //Setting the output to fit each ui element criteria
        newOutput = updateOutputFromPageFlow(newOutput, pageFlow);

        toast(JSON.stringify(newOutput));
        moveToNextTrialType();
    }

    function moveToNextTrialType() {
        if (!experimentData || !item) {
            return;
        }
        for (let i: number = 0; i < experimentData.items.length; i++) {
            const currentTrialType = experimentData.items[i];
            if (currentTrialType.id === item.id) {
                dispatch(setCurrentItem(experimentData.items[i + 1]));
            }
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
                                     loadingSubmitButton={false}/>

        }

        return undefined;
    }

    const trialTypeCss = "flex flex-auto flex-col items-center justify-start gap-8 w-full h-full overflow-x-hidden relative m-2"


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
                <div
                    className={`${trialTypeCss} pb-5 duration-200 transition-all ease-in`}>
                    {item!.children.map((uiObject, index) => <div key={`${uiObject.id}-${uiObject.type}-${index}`}
                                                                  className={`w-full h-max flex justify-center items-start rounded-xl p-2 ${currentUiObject && currentUiObject.id === uiObject.id ? "border border-red-600" : "border-none"}`}>{renderUi(uiObject, index)}</div>)}
                </div>
            </div>

        </>
    );
}

export default EditorItems;