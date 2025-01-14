import React, {Dispatch, SetStateAction, useState} from 'react';
import iconPlus from "../../../assets/plus_icon_solar_bold.svg"

type InputItem = {
    id: string;
    value: string;
};
type WrapperProps = {
    headline: string,
    initialValues: string[],
    handleInputChange: (id: string, newValue: string) => void,
    inputs: InputItem[],
    setInputs: Dispatch<SetStateAction<InputItem[]>>,
};
export const InputEditorArray = ({
                                     headline,
                                     initialValues,
                                     handleInputChange,
                                     inputs,
                                     setInputs
                                 }: WrapperProps) => {


    const addNewInput = () => {
        const newId = String(inputs.length);
        setInputs([...inputs, {id: newId, value: ''}]);
    };

    return (
        <div className="w-full space-y-4">
            {inputs.map((input) => (
                <div key={input.id} className="relative">
                    <div
                        className={"w-[90%] flex flex-col justify-center items-center bg-background-grey min-h-16 border p-5 rounded-2xl transition-all duration-500"}>
                        <div className={"w-full flex flex-row items-center justify-between"}>
                            <h2 className={"text-left text-clamping-sm font-exo font-extralight w-full"}>{headline}</h2>
                            <input className={"font-exo text-clamping-sm border-2 border-gray-200 rounded-xl p-3"}
                                   required={true} type="text"
                                   autoComplete="off" onChange={(e) => handleInputChange(input.id, e.target.value)}
                                   placeholder={initialValues[parseInt(input.id)] || ''}/>
                        </div>
                    </div>

                    {input.id === inputs[inputs.length - 1].id && (
                        <img
                            src={iconPlus}
                            onClick={addNewInput}
                            className="absolute w-8 h-8 right-0 bottom-0 opacity-55 hover:opacity-100 active:scale-125 transition-all duration-200"
                        />
                    )}
                </div>
            ))}
        </div>
    );
};