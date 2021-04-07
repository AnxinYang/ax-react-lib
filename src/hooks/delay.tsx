import React, { useEffect, useRef } from "react";

export function useDelay(fn: () => void, ms: number, deps?: React.DependencyList | undefined) {
    const handler = useRef<null | number>(null);

    useEffect(() => {
        if (handler.current) cancelAnimationFrame(handler.current);
        const startTime = performance.now();
        const wait = (ts: number) => {
            if (ts - startTime >= ms) fn();
            else requestAnimationFrame(wait);
        }
        requestAnimationFrame(wait);
        return () => {
            if (handler.current) cancelAnimationFrame(handler.current);
        }
    }, deps)
}