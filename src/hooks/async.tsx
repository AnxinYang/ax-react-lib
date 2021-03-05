import { useEffect, useState } from "react";

export function useAsync(fn: Function): [boolean, () => void] {
    const [stage, setStage] = useState(0);
    const run = async () => {
        setStage(1)
        await fn();
        setStage(2);
    }
    useEffect(() => {
        if (stage !== 0) return;
        run();
    }, [stage]);

    return [stage === 2, () => setStage(0)]
}