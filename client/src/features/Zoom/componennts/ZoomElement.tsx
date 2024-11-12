import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from 'react';
import closeIcon from "../../../assets/close.svg"
import {ZoomElementType, ZoomType} from "../types.ts";

type ZoomElementProps = {
    currentImageZoom: ZoomType,
    setCurrentImageZoom: Dispatch<SetStateAction<ZoomType>>;
}

/**
 * TODO ADD DOCUMENTATION
 * @param currentImageZoom
 * @param setCurrentImageZoom
 * @constructor
 */
function ZoomElement({currentImageZoom, setCurrentImageZoom}: ZoomElementProps) {
    const [zoom, setZoom] = useState<number>(100);
    const [origin, setOrigin] = useState<string>("center center"); // Set default origin to center
    const overlayRef = useRef<HTMLImageElement>(null);
    const maxZoom = 300;
    const minZoom = 50;

    function handleClose() {
        const time = Date.now() - currentImageZoom.startTime;
        const zoomElement: ZoomElementType = {
            time: time,
            action: "closed"
        }
        const array = [...currentImageZoom.zoomOutput];
        array.push(zoomElement)
        // Update zoom output array
        setCurrentImageZoom(prevState => {
                const array = [...prevState.zoomOutput];
                array.push(zoomElement)
                return {...prevState, zoomOutput: array, isOpen: false}
            }
        )
    }

    function handleScroll(event: WheelEvent) {
        event.preventDefault();
        const zoomFactor = event.deltaY < 0 ? 10 : -10;

        if (!overlayRef.current) {
            console.error("Failed to zoom Bounding Rect wasn't found");
            return;
        }

        const rect = overlayRef.current.getBoundingClientRect();

        // Calculate the mouse position as a percentage of the image dimensions
        const mouseXPercent = ((event.clientX - rect.left) / rect.width) * 100;
        const mouseYPercent = ((event.clientY - rect.top) / rect.height) * 100;

        setOrigin(`${mouseXPercent}% ${mouseYPercent}%`);
        setZoom(prevState => {
            if (prevState + zoomFactor > maxZoom) {
                return prevState;
            }
            if (prevState + zoomFactor < minZoom) {
                return prevState
            }
            return prevState + zoomFactor
        });

        // Logging:
        const zoomElement: ZoomElementType = {
            time: Date.now() - currentImageZoom.startTime,
            action: event.deltaY < 0 ? "zoom-in" : "zoom-out",
        }
        setCurrentImageZoom(prevState => {
                const timeDiff = zoomElement.time - prevState.zoomOutput[prevState.zoomOutput.length - 1].time;
                if (timeDiff < 300) {
                    return prevState;
                }
                const array = [...prevState.zoomOutput];
                array.push(zoomElement)
                return {...prevState, zoomOutput: array}
            }
        )


    }

    function handleClick(event: MouseEvent) {
        if (!overlayRef.current) return;

        const rect = overlayRef.current.getBoundingClientRect();

        // Create and start the animation
        // Calculate the mouse position as a percentage of the image dimensions
        const mouseXPercent = ((event.clientX - rect.left) / rect.width) * 100;
        const mouseYPercent = ((event.clientY - rect.top) / rect.height) * 100;

        setOrigin(`${mouseXPercent}% ${mouseYPercent}%`);


        // Log the event
        const time = Date.now() - currentImageZoom.startTime;
        const zoomElement: ZoomElementType = {
            time: time,
            action: "relocate"
        };

        // Update zoom output array
        setCurrentImageZoom(prevState => {
                return {...prevState, zoomOutput:  [...prevState.zoomOutput , zoomElement]}
            }
        )
    }

    useEffect(() => {
        const options: AddEventListenerOptions = {passive: false};
        document.addEventListener('wheel', handleScroll, options);
        document.addEventListener('click', handleClick, options);

        return () => {
            document.removeEventListener('wheel', handleScroll, options);
            document.removeEventListener('click', handleClick, options);
        }
    }, []);

    return (
        <div
            id={"overlayContent"}
            className={"absolute overflow-hidden flex items-center justify-center top-0 left-0 z-10 w-full h-full border-4 border-black background-glass "}
        >
            <img className={"object-cover w-[95%] p-0 m-0 duration-500 transition-all"}
                 ref={overlayRef}
                 src={currentImageZoom.image}
                 style={{scale: `${zoom / 100}`, transformOrigin: origin, willChange: 'transform'}}
                 alt={"image zoomed"}
            />
            <img alt={"Close"}
                 id={"close_button"}
                 src={closeIcon}
                 className={"transition-all duration-300 absolute top-4 right-4 opacity-50 hover:opacity-100 active:scale-110 z-10"}
                 width={40}
                 height={40}
                 onClick={handleClose}/>
        </div>
    );
}

export default ZoomElement;