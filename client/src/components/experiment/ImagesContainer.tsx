import {UiObjects} from "../../utils/types/experimentTypes/experimentsTypes.ts";

type ImagesContainerProps = {
    className?: string;
    images: UiObjects;
}
function ImagesContainer({className, images}: ImagesContainerProps) {
    return (
        <div className={`flex justify-center w-full ${className} ${images.objectDetails!.order === "h" ?"flex-row" : "flex-col"}`}>
            {images.urls!.map((url, index) => (
                <img src={url} className={"min-w-[25%] max-w-[50%]"} alt="exprement image" key={index} />
            ))}
        </div>
    );
}

export default ImagesContainer;