import {useEffect, useState} from "react";
import {ItemTypeEditor, TrialTypeType} from "../../features/TrialType/types.ts";

const useHandleFirstInteraction = (startTime: number, trailType: TrialTypeType | ItemTypeEditor) => {

    const [responseTimeFirst, setResponseTimeFirst] = useState<number | null>(null);

    useEffect(() => {
        const handleInteraction = () => {
            setResponseTimeFirst(Date.now() - startTime);
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
    }, [trailType]);
    return {responseTimeFirst}
};

export default useHandleFirstInteraction;