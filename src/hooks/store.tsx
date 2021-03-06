import { useContext } from "react";
import { Action, storeContext } from "../components";

export function useStore<T>(key: string, defaultValue?: T): [T, (value: T | Action) => void] {
    const context = useContext(storeContext);
    const value = context.data.get(key)
    return [
        value === undefined ? defaultValue : value,
        (value: T | Action) => {
            context.updateStore(key, value)
        }
    ]
}