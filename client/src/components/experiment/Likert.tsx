import {LikertOutput, PageFlowOutput, UiObjects} from "../../utils/types/experimentTypes/experimentsTypes.ts";
import Error from "../../error/Error.tsx";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {handleLikertError} from "../../error/uiErrorHandling.ts";
import {getCurrentIndex} from "../../utils/helperMethods.ts";

type LikertProp = {
    uiObject: UiObjects,
    setPageFlow: Dispatch<SetStateAction<PageFlowOutput[]>>,
    pageFlow: PageFlowOutput[],
    startTime: number;
}

function getIsLikertDisabled(pageFlow: PageFlowOutput[], currentIndex: number | null): boolean {
    if (!currentIndex || currentIndex === 0) {
        return false;
    }
    return !(pageFlow[currentIndex - 1].output);
}


function Likert({uiObject, pageFlow, setPageFlow, startTime}: LikertProp) {
    const error = handleLikertError(uiObject);
    const arrayOfNums = Array.from({length: uiObject.scalePoints!}, (_, index) => index + 1);
    const [likertInput, setLikertInput] = useState<number | null>(null);
    const currentIndex = getCurrentIndex(pageFlow, uiObject);
    const [isDisabled, setIsDisabled] = useState(getIsLikertDisabled(pageFlow, currentIndex!));

    useEffect(() => {
        if (!currentIndex) {
            return;
        }
        setIsDisabled(getIsLikertDisabled(pageFlow, currentIndex));
    }, [pageFlow])

    if (error.isError) {
        return <Error error={error}/>;
    }


    function handleClick(value: number) {
        setLikertInput(value);
        // Updating the state of the response
        setPageFlow((prevState) => {
            let updatedElement: PageFlowOutput = prevState[currentIndex!];
            if (!updatedElement.responseTimeFirst) {
                updatedElement = {...updatedElement, responseTimeFirst: Date.now() - startTime}
            }
            updatedElement = {...updatedElement, output: value, scalePoints: uiObject.scalePoints}
            return prevState.map((item, index) =>
                index === currentIndex ? updatedElement : item
            );
        })
    }

    return (
        <div
            className={`bg-white w-full p-10 flex flex-col justify-center items-center ${isDisabled ? "opacity-30" : "opacity-100"}`}>
            <h2 className={"font-exo text-center text-clamping-mid  text-pretty max-w-full]"}> {uiObject.headline!}</h2>
            <div className={"w-full flex justify-between mt-10 max-w-4xl"}>
                {uiObject.semiHeadlines!.map((value, index) => (
                    <h2 key={`${uiObject.headline}-${uiObject.id}-${index}`}
                        className={"text-clamping-sm font-exo font-light text-gray-700"}>{value}</h2>
                ))}
            </div>
            <div
                className={`flex flex-row justify-center items-center shadow-md w-full flex-wrap rounded-3xl max-w-4xl border border-gray-300 ${uiObject.scalePoints! > 30 ? "overflow-y-scroll" : "overflow-hidden"} mt-5`}>
                {
                    arrayOfNums.map((value, index) =>
                        <button
                            className={`duration-300 transition-all text-clamping-mid font-light font-exo text-center flex-1
                             p-2 ${likertInput === value ? "bg-blue-300" : `${isDisabled ? "" : "hover:bg-blue-100"}`}`}
                            key={`index-${index}`}
                            onClick={() => {
                                handleClick(value)
                            }}
                            disabled={isDisabled}
                        >{value}</button>)
                }
            </div>
        </div>
    );
}

export default Likert;