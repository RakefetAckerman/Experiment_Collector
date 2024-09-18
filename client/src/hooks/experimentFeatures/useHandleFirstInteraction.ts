import React, {useEffect, useState} from "react";

const useHandleFirstInteraction = (startTime:number , setOutput : React.Dispatch<React.SetStateAction<object>> ) => {
    const [hasInteracted, setHasInteracted] = useState(false);
    useEffect(() => {
        const handleInteraction = () => {
            if (!hasInteracted) {
                setOutput((prev) => {return {...prev, ResponseTimeFirst: Date.now() - startTime }});
            }
            setHasInteracted(true);
            // Remove both event listeners after the first interaction
            document.removeEventListener('click', handleInteraction);
            document.removeEventListener('mousemove', handleInteraction);
        };

        // Add the event listeners
        document.addEventListener('click', handleInteraction);
        document.addEventListener('mousemove', handleInteraction);

        // Cleanup function to remove the event listeners if the component unmounts
        return () => {
            document.removeEventListener('click', handleInteraction);
            document.removeEventListener('mousemove', handleInteraction);
        };
    }, []); // Empty dependency array means this effect runs once on mount
};

export default useHandleFirstInteraction;