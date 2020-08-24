import { useLayoutEffect, useRef, useCallback } from 'react';

const debounce = (callback, wait = 66) => {
    let timeout = null;

    return (...args) => {
        const next = () => callback(...args);

        clearTimeout(timeout);
        timeout = setTimeout(next, wait);
    };
};

const useCancelIdleCallback = () => useCallback((idleId) => clearTimeout(idleId.current), []);

const useIdleCallback = (callback, {idleTimeout = 3000, debounceTimeout = 66} = {}) => {
    const idleId = useRef(null)
    const cancelIdle = useCancelIdleCallback();

    useLayoutEffect(() => {

        const resetTimer = debounce(() => {
            cancelIdle(idleId);
            idleId.current = setTimeout(callback, idleTimeout);
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
}
