import {useState, useEffect, useRef, useCallback} from 'react';

/**
 * A focus hook the hook returns the amount of time the user was not in focus on the page.
 */
const useFocusTime = () => {
    const [unFocusTime, setUnFocusTime] = useState(0);
    const timeLeftRef = useRef(Date.now());

    const focusChanged = useCallback(() => {
        if (!document.hidden) {
            setUnFocusTime(prevState => prevState + (Date.now() - timeLeftRef.current));
        } else {
            timeLeftRef.current = Date.now();
        }
    }, []);

    useEffect(() => {
        timeLeftRef.current = Date.now();

        document.addEventListener("visibilitychange", focusChanged);
        return () => {
            document.removeEventListener("visibilitychange", focusChanged);
        };
    }, []);

    return { unFocusTime};
};

export default useFocusTime;