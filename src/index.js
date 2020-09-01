import { useLayoutEffect, useRef, useCallback } from 'react';

const DEFAULT_IDLE_TIMEOUT = 300000; // 5min
const DEFAULT_DEBOUNCE_TIMEOUT = 20;
const DEFAULT_TRACK_EVENTS = ['click', 'keydown', 'mousedown', 'mousemove', 'touchstart', 'scroll'];

const debounce = (callback, wait) => {
    let timeout = null;

    return (...args) => {
        const next = () => callback(...args);

        window.clearTimeout(timeout);
        timeout = window.setTimeout(next, wait);
    };
};

const useIdleCallback = ({
    callback,
    debounceTimeout = DEFAULT_DEBOUNCE_TIMEOUT,
    idleTimeout = DEFAULT_IDLE_TIMEOUT,
    trackEvents = DEFAULT_TRACK_EVENTS
} = {}) => {
    const idleId = useRef(null);

    const runIdleCallback = useCallback(() => {
        if (typeof callback !== 'function') throw `idle-callback is not a function. ${callback}`
        callback();
    }, []);

    const resetTimer = useCallback(debounce(() => {
        window.clearTimeout(idleId.current);
        idleId.current = window.setTimeout(runIdleCallback, idleTimeout);
    }, debounceTimeout), [idleTimeout, debounceTimeout]);

    const addEvents = useCallback(() => {
        trackEvents.forEach(eventType => window.addEventListener(eventType, resetTimer));
    }, [trackEvents, resetTimer]);

    const removeEvents = useCallback(() => {
        trackEvents.forEach(eventType => window.removeEventListener(eventType, resetTimer));
    }, [trackEvents, resetTimer]);

    const cancelIdle = useCallback(() => {
        removeEvents();
        window.clearTimeout(idleId.current);
    }, [trackEvents, resetTimer]);

    useLayoutEffect(() => {
        return cancelIdle;
    }, [trackEvents, resetTimer]);

    return ({
        cancelIdle,
        resetIdle: addEvents,
    });
};

export default useIdleCallback;
