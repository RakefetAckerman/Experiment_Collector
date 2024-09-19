import {useState} from "react";
import {UiObjects} from "../../utils/types/experimentTypes/experimentsTypes.ts";
import "./slider.css"

type SliderProps = {
    object: UiObjects,
    disabled?: boolean,
}

function Slider({object, disabled = false}: SliderProps) {
    const [value, setValue] = useState<number>(50);
    const THUMB_SIZE = 64;
    const KNOB_SIZE = 22;
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(Number(event.target.value));
    };

    return (
        <>
            <h2 className={"font-exo text-clamping-sm max-w-[80%] mt-[40px]"}> {object.text!}</h2>
            <div className="gap-8 flex-col items-center justify-center w-[80%] relative mb-[80px]">
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={value}
                    onChange={handleChange}
                    className="w-full cursor-pointer rs-range disabled:opacity-15"
                    disabled={disabled}
                />
                <div
                    id="thumb_value"
                    className={`${disabled ? "opacity-15" : "opacity-100"} rounded-3xl mt-5 absolute flex justify-center items-center bg-white border-gray-200 drop-shadow-lg border-2`}
                    style={{
                        width: `${THUMB_SIZE}px`,
                        height: `${THUMB_SIZE}px`,
                        left: `calc(${value}% - ${value / 50}% - ${THUMB_SIZE / 2}px + ${KNOB_SIZE / 2}px)`,
                    }}
                >
                    <h2 className="text-clamping-mid">{value}</h2>
                </div>
                <h2 className={"absolute -top-[150%] left-0 font-exo text-clamping-sm max-w-[80%]"}> {object.textLeft!}</h2>
                <h2 className={"absolute -top-[150%] right-0 font-exo text-clamping-sm max-w-[80%]"}> {object.textRight!}</h2>
            </div>
        </>
    );
}

export default Slider;