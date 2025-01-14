import React, {Dispatch, SetStateAction} from 'react';
type Props={
    headline: string,
    setText: Dispatch<SetStateAction<string>>,
    initialValue: string,
}
function InputEditor({headline,setText , initialValue}: Props) {

    return (
        <div
            className={"w-[90%] flex flex-col justify-center items-center bg-background-grey min-h-16 border p-5 rounded-2xl transition-all duration-500"}>
            <div className={"w-full flex flex-row items-center justify-between"}>
                <h2 className={"text-left text-clamping-sm font-exo font-extralight w-full"}>{headline}</h2>
                <input className={"font-exo text-clamping-sm border-2 border-gray-200 rounded-xl p-3"} required={true} type="text"
                       autoComplete="off" onChange={(e) => setText(e.target.value) } placeholder={initialValue}/>
            </div>
        </div>
    );
}

export default InputEditor;