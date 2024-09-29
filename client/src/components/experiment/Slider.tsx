import {UiObjects} from "../../utils/types/experimentTypes/experimentsTypes.ts";
import "./slider.css"
import {handleSliderError} from "../../error/uiErrorHandling.ts";
import Error from "../../error/Error.tsx"
type SliderProps = {
    sliderObj: UiObjects,
    disabled?: boolean,
    value: number,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>, obj: UiObjects) => void,
    className?: string,

}

function Slider({sliderObj, value, handleChange, className, disabled = false}: SliderProps) {
    const error = handleSliderError(sliderObj);
    if(error.isError){
        return <Error error={error}/>;
    }
    
    
    const THUMB_SIZE = 64;
    const KNOB_SIZE = 22;
    const min = sliderObj.min!;
    const max = sliderObj.max!;

    const total_range = max - min;
    const value_position = value - min;
    const percentage = (value_position / total_range) * 100;
    const drift = (-KNOB_SIZE / 100) * percentage + KNOB_SIZE / 2;
    return (
        <>
            <h2 className={`${className} font-exo text-clamping-sm max-w-[80%] mt-[40px]`}> {sliderObj.textCenter!}</h2>
            <div className={`${className} gap-8 flex-col items-center justify-center w-[80%] relative mb-[80px]`}>
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={value}
                    onChange={(e) => handleChange(e, sliderObj)}
                    className="w-full cursor-pointer rs-range"
                    disabled={disabled}
                />
                <div
                    id="thumb_value"
                    className={`${disabled ? "opacity-15" : "opacity-100"} rounded-3xl mt-5 absolute flex justify-center items-center bg-white border-gray-200  drop-shadow-lg border-2`}
                    style={{
                        width: `${THUMB_SIZE}px`,
                        height: `${THUMB_SIZE}px`,
                        left: `calc(${percentage}% - ${THUMB_SIZE / 2}px + ${drift}px)`,
                    }}
                >
                    <h2 className="text-clamping-mid">{value}</h2>
                </div>
                <h2 className={"absolute -top-[150%] left-0 font-exo text-clamping-sm max-w-[80%]"}> {sliderObj.textLeft!}</h2>
                <h2 className={"absolute -top-[150%] right-0 font-exo text-clamping-sm max-w-[80%]"}> {sliderObj.textRight!}</h2>
            </div>
        </>
    );
}

export default Slider;