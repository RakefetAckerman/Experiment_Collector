import React, {Dispatch, SetStateAction, useState} from 'react';
import back_icon from "../../../assets/back_icon.svg";
import {UiObjects} from "../../../utils/types/experimentTypes/experimentsTypes.ts";

type Props = {
    options: string[];
    currentUiObject: UiObjects ;
    setCurrentUiObject: Dispatch<SetStateAction<UiObjects | undefined>>;
}

function DropDownType({options, currentUiObject , setCurrentUiObject}: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | undefined>(undefined);

    const handleSelect = (option: string) => {
        setSelectedOption(option);
        const newUiObject:UiObjects = {
            type:option,
            id:currentUiObject.id
        }
        setCurrentUiObject(newUiObject);
        setIsOpen(false);
    };

    return (
        <div className={"w-full justify-between flex items-center"}>
            <h2 className={"font-exo text-clamping-sm"}> Current Type:</h2>
            <div className="relative inline-block w-64">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full px-4 py-2 text-clamping-sm font-exo text-left  capitalize bg-white border rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {selectedOption || currentUiObject.type}
                    <span className="absolute capitalize inset-y-0 right-0 flex items-center pr-2">
          <img src={back_icon}
               className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-90' : '-rotate-90'}`}
          />
        </span>
                </button>

                {isOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
                        <ul className="py-1 overflow-auto max-h-60">
                            {options.map((option, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleSelect(option)}
                                    className="px-4 py-2 text-clamping-sm font-exo text-gray-700 capitalize  hover:bg-blue-50 cursor-pointer"
                                >
                                    {option}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>);
}

export default DropDownType;
