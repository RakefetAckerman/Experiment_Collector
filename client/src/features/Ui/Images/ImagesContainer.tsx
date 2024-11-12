import {UiObjects} from "../../../utils/types/experimentTypes/experimentsTypes.ts";
import {Dispatch, SetStateAction} from "react";
import {ZoomType} from "../../Zoom/types.ts";

type ImagesContainerProps = {
    className?: string;
    setCurrentImageZoom: Dispatch<SetStateAction<ZoomType>>;
    images: UiObjects;
}

function ImagesContainer({className, images, setCurrentImageZoom}: ImagesContainerProps) {
    return (
        <div
            className={`flex justify-center w-full ${className} flex-row items-center flex-wrap`}>
            {images.urls!.map((url, index) => (
                <img onClick={() => setCurrentImageZoom(prevState => {
                    const array = [...prevState.zoomOutput];
                    array.push({time: Date.now() - prevState.startTime, action: "open",});
                    return {...prevState, image: url, isOpen: !prevState.isOpen, zoomOutput: array}
                })} src={url} className={"min-w-[175px] max-w-[50%]"} alt="exprement image" key={index}/>
            ))}
        </div>
    );
}

export default ImagesContainer;