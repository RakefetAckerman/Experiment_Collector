import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {MouseTrackingObject} from "./types.ts";

function updateMouseTrackingObject(setMouseTracking: Dispatch<SetStateAction<MouseTrackingObject[]>>,currentObj:MouseTrackingObject , inputInterval:number) {
    setMouseTracking(prevState => {
        const newObj = [...prevState]
        if (newObj.length === 0){
            newObj.push(currentObj)
            return newObj;
        }

        if (inputInterval > currentObj.time - newObj[newObj.length - 1].time) {
            return prevState;
        }
        newObj.push(currentObj)
        return newObj;
    })
}
const useMouseTracking = (startTime: number, inputInterval: number) => {
    const [mouseTracking, setMouseTracking] = useState<MouseTrackingObject[]>([]);

    const handleMouseMove = (event: MouseEvent) => {
        const currentObj: MouseTrackingObject = {
            x: event.clientX,
            y: event.clientY,
            action: "mousemove",
            time: Date.now() - startTime
        }
        updateMouseTrackingObject(setMouseTracking , currentObj , inputInterval);
    };
    const handleMouseClick = (event: MouseEvent) => {
        const currentObj: MouseTrackingObject = {
            x: event.clientX,
            y: event.clientY,
            action: "click",
            time: Date.now() - startTime
        }
        updateMouseTrackingObject(setMouseTracking , currentObj , inputInterval);
    }
    const handleMouseWheel = (event: MouseEvent) => {
        const currentObj: MouseTrackingObject = {
            x: event.clientX,
            y: event.clientY,
            action: "wheel",
            time: Date.now() - startTime
        }
        updateMouseTrackingObject(setMouseTracking , currentObj , inputInterval);
    }

    useEffect(() => {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("click", handleMouseClick);
        document.addEventListener("wheel", handleMouseWheel);


        return () => {
            document.removeEventListener('click', handleMouseClick);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener("wheel", handleMouseWheel);
        };

    }, [])
    return {mouseTracking}

}

export default useMouseTracking;