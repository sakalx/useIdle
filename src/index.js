import { useLayoutEffect, useRef, useCallback } from 'react';

const debounce = (callback, wait = 66) => {
    let timeout = null;

    return (...args) => {
        const next = () => callback(...args);

        clearTimeout(timeout);
        timeout = window.setTimeout(next, wait);
    };
};

export const useCancelIdleCallback = () => useCallback(idleId => window.clearTimeout(idleId.current), []);

export const useIdleCallback = (callback, { idleTimeout = 300000, debounceTimeout = 66 } = {}) => {
    const idleId = useRef(null);
    const cancelIdle = useCancelIdleCallback();

    useLayoutEffect(() => {
        const resetTimer = debounce(() => {
            cancelIdle(idleId);
            idleId.current = window.setTimeout(callback, idleTimeout);
        }, debounceTimeout);

        window.onclick = resetTimer;
        window.onkeypress = resetTimer;
        window.onmousedown = resetTimer;
        window.onmousemove = resetTimer;
        window.ontouchstart = resetTimer;

        return () => {
            cancelIdle(idleId);

            window.onclick = null;
            window.onkeypress = null;
            window.onmousedown = null;
            window.onmousemove = null;
            window.ontouchstart = null;
        };
    }, []);

    return idleId;
};
