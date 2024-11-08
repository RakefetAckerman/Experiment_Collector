import {PageFlowOutput, UiObjects} from "../../../utils/types/experimentTypes/experimentsTypes.ts";
import {handleUnderstandingInstructionError} from "./errors.ts";
import Error from "../../../error/Error.tsx";
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {getCurrentIndex} from "../../../utils/helperMethods.ts";

type understandingInstructionProps = {
    uiObject: UiObjects
    setPageFlow: Dispatch<SetStateAction<PageFlowOutput[]>>,
    pageFlow: PageFlowOutput[],
    startTime: number;
}

function UnderstandingInstruction({uiObject , startTime , setPageFlow , pageFlow}: understandingInstructionProps) {
    const error = handleUnderstandingInstructionError(uiObject);
    const [isVerify, setIsVerify] = useState<boolean>(false);
    const [id, setId] = useState<string>(uiObject.children![0].id!);
    const [isVerifyDisabled, setIsVerifyDisabled] = useState<boolean>(false);
    const currentIndex = getCurrentIndex(pageFlow, uiObject);
    const [output , setOutput] = useState<string>("");
    if (error.isError) {
        return <Error error={error}/>;
    }

    if (!isVerify) {
        const disableCSS = isVerifyDisabled ? "opacity-30" : "active:scale-110 hover:bg-buttons-blue opacity-100";
        return <button
            onClick={() => {
                setIsVerify(true);
            }}
            disabled={isVerifyDisabled}
            className={`${disableCSS} text-clamping-sm p-4 border border-gray-300 drop-shadow-xl transition-all duration-300 rounded-xl`}>
            {uiObject.verifyButtonText}
        </button>
    }

    function handleClick(child: UiObjects,value:string){
        const isCorrect = child.correct === value;
        if (isCorrect && !child.nextIfCorrect){
            setIsVerify(false);
            setIsVerifyDisabled(true);
            setPageFlow(prevState => {
                let updatedElement: PageFlowOutput = prevState[currentIndex!];
                if (!updatedElement.responseTimeFirst) {
                    updatedElement = {...updatedElement, responseTimeFirst: Date.now() - startTime}
                }
                updatedElement = {...updatedElement, output:output }
                return prevState.map((item, index) =>
                    index === currentIndex ? updatedElement : item
                );
            })
            return;
        }
        if (isCorrect) {
            setId(child.nextIfCorrect);
            setOutput(prevState => (`${prevState} ${value}`))
            return;
        }
        if (!isCorrect && !child.nextIfWrong){
            setIsVerify(false);
            setIsVerifyDisabled(true);
            setPageFlow(prevState => {
                let updatedElement: PageFlowOutput = prevState[currentIndex!];
                if (!updatedElement.responseTimeFirst) {
                    updatedElement = {...updatedElement, responseTimeFirst: Date.now() - startTime}
                }
                updatedElement = {...updatedElement, output:output }
                return prevState.map((item, index) =>
                    index === currentIndex ? updatedElement : item
                );
            })
            return;
        }
        if (!isCorrect) {
            setId(child.nextIfWrong);
            setOutput(prevState => (`${prevState} ${value}`))
            return;
        }
    }

    const ElementExpended = ({child}: { child: UiObjects }) => {
        return (
            <>
                <h2 className={"font-exo text-clamping-sm  text-pretty max-w-full mb-10"}> {child.question!}</h2>
                {child.buttons?.map((button, index) => (
                    <button
                        key={`${button}-${index}`}
                        className={`bg-white active:scale-110 hover:bg-buttons-blue text-clamping-sm p-4 min-w-[300px] mt-2 border border-gray-300 drop-shadow-xl transition-all duration-300 rounded-xl`}
                        onClick={() => handleClick(child,button)}
                    >
                        {button}
                    </button>
                ))}
            </>
        )

    }
    return (
        <div
            className={`flex flex-col transition-all duration-1000 items-center p-10 center-absolute w-[85%] h-[85%] rounded-3xl bg-gray-100 overflow-y-scroll z-10 border-4`}>
            {
                uiObject.children?.map((child, index) => {
                    return id === child.id! ? <ElementExpended key={`${child.id}-${index}`} child={child}/> : <></>;
                })

            }

        </div>
    );
}

export default UnderstandingInstruction;