import { useState, useEffect, useCallback, useRef } from 'react';

interface IdleState {
    isIdle: boolean;
    totalIdleTime: number;
}

const useIdleTimer = (timeout: number = 60000): IdleState => {
    const [idleState, setIdleState] = useState<IdleState>({ isIdle: false, totalIdleTime: 0 });
    const idleStartTime = useRef<number | null>(null);
    const timerRef = useRef<number | null>(null);

    const handleActivity = useCallback(() => {
        if (idleState.isIdle) {
            const now = Date.now();
            if (idleStartTime.current !== null) {
                const idleDuration = now - idleStartTime.current;
                setIdleState(prev => ({
                    isIdle: false,
                    totalIdleTime: prev.totalIdleTime + idleDuration
                }));
            }
            idleStartTime.current = null;
        }
        resetTimer();
    }, [idleState.isIdle]);

    const resetTimer = useCallback(() => {
        if (timerRef.current) {
            window.clearTimeout(timerRef.current);
        }
        timerRef.current = window.setTimeout(() => {
            setIdleState(prev => ({ ...prev, isIdle: true }));
            idleStartTime.current = Date.now();
        }, timeout);
    }, [timeout]);

    useEffect(() => {
        const events: string[] = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];

        events.forEach(event => document.addEventListener(event, handleActivity));
        resetTimer();

        return () => {
            events.forEach(event => document.removeEventListener(event, handleActivity));
            if (timerRef.current) {
                window.clearTimeout(timerRef.current);
            }
        };
    }, [handleActivity, resetTimer]);

    return idleState;
};

export default useIdleTimer;