import { useEffect, useState } from "react";

export function useAsync(fn: Function): [boolean, () => void] {
    const [stage, setStage] = useState(0);
    const [ts, setTs] = useState(Date.now());
    const run = async () => {
        setStage(1)
        await fn();
        setStage(2);
    }
    useEffect(() => {
        run();
    }, [ts]);

    return [stage === 2, () => {
        setStage(0);
        setTs(Date.now())
    }]
}