import {UiObjects} from "../../utils/types/experimentTypes/experimentsTypes.ts";
import {ErrorType} from "../../error/errorType.ts";
import Error from "../../error/Error.tsx";
import {Dispatch, SetStateAction, useState} from "react";


type LikertProp = {
    uiObject: UiObjects,
    likertsValue: LikertOutput[],
    setLikertsValue: Dispatch<SetStateAction<LikertOutput[]>>,
}
export type LikertOutput = {
    headline: string,
    id: string,
    output: number | null,
}

function getLikertError({id, headline, semiHeadlines, scalePoints}: UiObjects): ErrorType {
    if (!id) {
        return {isError: true, errorMessage: "No ID specified for Likert"};
    }
    if (!headline && headline !== "") {
        return {isError: true, errorMessage: "No Headline specified for Likert"};
    }
    if (!semiHeadlines && semiHeadlines!.length != 0) {
        return {isError: true, errorMessage: "No Semi Headline specified for Likert"};
    }
    if (!scalePoints && scalePoints !== 0) {
        return {isError: true, errorMessage: "No Scale Points specified for Likert"};
    }
    if (scalePoints > 100) {
        return {isError: true, errorMessage: "Scale Points can't be larger then 100"};
    }

    return {isError: false, errorMessage: ""}
}

function getLikertCurrentIndex(prevState: LikertOutput[], id: string): number | null {
    if (!prevState) {
        return null;
    }
    for (let i = 0; i < prevState.length; i++) {
        const current = prevState[i];
        if (current.id === id) {
            return i;
        }
    }
    return null;
}

function Likert({uiObject, setLikertsValue}: LikertProp) {
    const error = getLikertError(uiObject);
    const arrayOfNums = Array.from({length: uiObject.scalePoints!}, (_, index) => index + 1);
    const [likertInput, setLikertInput] = useState<number | null>(null);
    if (error.isError) {
        return <Error error={error}/>;
    }

    function handleClick(value: number) {
        setLikertInput(value);
        setLikertsValue(prevState => {
            const currentIndex = getLikertCurrentIndex(prevState, uiObject.id!)
            const newOutput = prevState.map((item, index) =>
                index === currentIndex
                    ? { ...item, output: value }
                    : item
            );
            return newOutput;
        })
    }

    return (
        <div
            className={"bg-white w-full p-10 flex flex-col justify-center items-center"}>
            <h2 className={"font-exo text-center text-clamping-mid"}> {uiObject.headline!}</h2>
            <div className={"w-full flex justify-between mt-10 max-w-4xl"}>
                {uiObject.semiHeadlines!.map(value => (
                    <h2 className={"text-clamping-sm font-exo font-light text-gray-700"}>{value}</h2>
                ))}
            </div>
            <div
                className={`flex flex-row justify-center items-center shadow-md w-full flex-wrap rounded-3xl max-w-4xl  border border-gray-300 ${uiObject.scalePoints! > 30 ? "overflow-y-scroll" : "overflow-hidden"} mt-5`}>
                {
                    arrayOfNums.map((value, index) =>
                        <h2
                            className={`duration-300 transition-all text-clamping-mid font-light font-exo text-center flex-1 cursor-pointer p-2 ${likertInput === value ? "bg-blue-300" : "hover:bg-blue-100"}`}
                            key={`index-${index}`}
                            onClick={() => {
                                handleClick(value)
                            }}
                        >{value}</h2>)
                }
            </div>
        </div>
    );
}

export default Likert;