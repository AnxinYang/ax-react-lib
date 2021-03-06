import { useEffect, useState } from "react";

export function useAsync(fn: Function): [boolean, () => void] {
    const [isDone, setIsDone] = useState(false);
    const [ts, setTs] = useState(Date.now());
    const run = async () => {
        await fn();
        setIsDone(true)
    }
    useEffect(() => {
        run();
    }, [ts]);

    return [isDone, () => {
        setIsDone(false);
        setTs(Date.now())
    }]
}