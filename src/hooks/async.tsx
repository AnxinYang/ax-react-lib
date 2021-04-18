import React, { useEffect, useState } from "react";

export function useAsync(fn: Function, cleanUp?: () => void, dependencyList?: React.DependencyList): [boolean, () => void] {
    const [isDone, setIsDone] = useState(false);
    const [ts, setTs] = useState(Date.now());
    const run = async () => {
        await fn();
        setIsDone(true)
    }
    useEffect(() => {
        run();
        return cleanUp
    }, [ts, ...(dependencyList ?? [])]);

    return [isDone, () => {
        setIsDone(false);
        setTs(Date.now())
    }]
}