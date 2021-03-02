import React, { createContext, ReactNode, useContext, useState } from "react"

export interface Action {
    type: string
    [key: string]: any
}
export type Reducer = (state: any, action: Action) => any

export const storeContext = createContext({ ts: Date.now(), data: new Map(), updateStore: (key: string, value: any) => { } })

export function Store(props: {
    children: ReactNode,
    reducers?: {
        [key: string]: Reducer
    }
}) {
    const updateStore = (key: string, value: any | Action) => {
        const oldValue = data.data.get(key);
        let newValue = value;
        if (props.reducers && props.reducers[key]) {
            if (value.type === undefined) throw new Error(`Error: Store key "${key}" has a reducer but don't receive an action type.`)
            newValue = props.reducers[key](oldValue, value);
        }
        data.data.set(key, newValue);
        if (oldValue !== newValue)
            setData({
                ts: Date.now(),
                data: data.data,
            })
    }
    const [data, setData] = useState({
        ts: Date.now(),
        data: new Map(),
    })
    return (
        <storeContext.Provider value={{
            ...data,
            updateStore
        }}>
            {props.children}
        </storeContext.Provider>
    )
}