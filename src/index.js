import { useLayoutEffect, useRef, useCallback } from 'react';

const debounce = (callback, wait = 66) => {
    let timeout = null;

    return (...args) => {
        const next = () => callback(...args);

        window.clearTimeout(timeout);
        timeout = window.setTimeout(next, wait);
    };
};

export const useCancelIdleCallback = () => useCallback(idleId => window.clearTimeout(idleId.current), []);

export const useIdleCallback = (callback, { idleTimeout = 300000, debounceTimeout = 66 } = {}) => {
    const idleId = useRef(null);
    const cancelIdle = useCancelIdleCallback();

    const runIdleCallback = useCallback(() => {
        if (typeof callback !== 'function') throw `idle-callback is not a function. ${callback}`
        callback();
    }, []);

    const resetTimer = useCallback(debounce(() => {
        cancelIdle(idleId);
        idleId.current = window.setTimeout(runIdleCallback, idleTimeout);
    }, debounceTimeout), [idleTimeout, debounceTimeout]);

    const cleanup = useCallback(() => {
        cancelIdle(idleId);

        window.onclick = null;
        window.onkeypress = null;
        window.onmousedown = null;
        window.onmousemove = null;
        window.ontouchstart = null;
    }, []);

    const trackActivity = useCallback(() => {
        window.onclick = resetTimer;
        window.onkeypress = resetTimer;
        window.onmousedown = resetTimer;
        window.onmousemove = resetTimer;
        window.ontouchstart = resetTimer;

        return cleanup;
    }, []);

    useLayoutEffect(trackActivity, []);

    return idleId;
};
