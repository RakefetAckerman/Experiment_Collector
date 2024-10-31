import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from 'react';
import closeIcon from "../../assets/close.svg"
import imagesContainer from "./ImagesContainer.tsx";

type ZoomElementType = {
    currentImageZoom: ZoomType,
    setCurrentImageZoom: Dispatch<SetStateAction<ZoomType>>;
}

export type ZoomType = {
    image: string;
    isOpen: boolean;
    zoomOutput: ZoomElement[];
    startTime: number;
}

export type ZoomElement = {
    action: string;
    time: number;
}

function ZoomElement({currentImageZoom, setCurrentImageZoom}: ZoomElementType) {
    const [zoom, setZoom] = useState<number>(100);
    const [origin, setOrigin] = useState<string>("center center"); // Set default origin to center
    const overlayRef = useRef<HTMLImageElement>(null);
    const maxZoom = 300;
    const minZoom = 50;

    function handleClose() {
        const time = Date.now() - currentImageZoom.startTime;
        const zoomElement: ZoomElement = {
            time: time,
            action: "closed"
        }
        const array = [...currentImageZoom.zoomOutput];
        array.push(zoomElement)
        setCurrentImageZoom(prevState => (
            {...prevState, zoomOutput: array, isOpen: false})
        )
    }

    function handleScroll(event: WheelEvent) {
        event.preventDefault();
        const zoomFactor = event.deltaY < 0 ? 10 : -10;

        if (!overlayRef.current) {
            console.log("Failed to zoom Bounding Rect wasn't found");
            return;
        }

        const rect = overlayRef.current.getBoundingClientRect();

        // Calculate the mouse position as a percentage of the image dimensions
        const mouseXPercent = ((event.clientX - rect.left) / rect.width) * 100;
        const mouseYPercent = ((event.clientY - rect.top) / rect.height) * 100;

        setOrigin(`${mouseXPercent}% ${mouseYPercent}%`);
        setZoom(prevState => prevState + zoomFactor);

        // Logging:
        const zoomElement: ZoomElement = {
            time: Date.now() - currentImageZoom.startTime,
            action: event.deltaY < 0 ? "zoom-in" : "zoom-out",
        }
        const timeDiff = zoomElement.time - currentImageZoom.zoomOutput[currentImageZoom.zoomOutput.length - 1].time
        if (timeDiff > 300) {
            const array = [...currentImageZoom.zoomOutput];
            array.push(zoomElement)
            setCurrentImageZoom(prevState => (
                {...prevState, zoomOutput: array})
            )
        }


    }

    function handleClick(event: React.MouseEvent) {
        if (!overlayRef.current) return;

        const rect = overlayRef.current.getBoundingClientRect();
        const targetX = event.clientX - rect.left;
        const targetY = event.clientY - rect.top;

        // Create and start the animation

        setOrigin(`${targetX}px ${targetY}px`);


        // Log the event
        const time = Date.now() - currentImageZoom.startTime;
        const zoomElement: ZoomElement = {
            time: time,
            action: "relocate"
        };

        //Position clicked is on where the close button located,
        const closeButton = document.querySelector('#close_button');
        if (!closeButton) return;
        if (inCloseButton(closeButton,event)) {
            return;
        }

        // Update zoom output array
        const array = [...currentImageZoom.zoomOutput];
        array.push(zoomElement);
        setCurrentImageZoom(prevState => ({
            ...prevState,
            zoomOutput: array
        }));
    }

    function inCloseButton(closeButton :Element, event: React.MouseEvent) {
        // Get close button bounds
        const closeButtonRect = closeButton.getBoundingClientRect();

        // Check if click is within close button bounds
        return event.clientX >= closeButtonRect.left &&
            event.clientX <= closeButtonRect.right &&
            event.clientY >= closeButtonRect.top &&
            event.clientY <= closeButtonRect.bottom;

    }

    useEffect(() => {
        const options: AddEventListenerOptions = {passive: false};
        document.addEventListener('wheel', handleScroll, options);

        return () => {
            document.removeEventListener('wheel', handleScroll, options);
        }
    }, []);

    if (zoom > maxZoom) {
        setZoom(maxZoom)
    }
    if (zoom < minZoom) {
        setZoom(minZoom)
    }

    return (
        <div
            id={"overlayContent"}
            className={"absolute overflow-hidden flex items-center justify-center top-0 left-0 z-10 w-full h-full border-4 border-black background-glass "}
            onClick={handleClick}

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