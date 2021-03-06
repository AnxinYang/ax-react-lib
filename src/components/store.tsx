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
    defaultValues?: {
        [key: string]: any
    }
}) {
    const updateStore = async (key: string, value: any | Action) => {
        const oldValue = data.data.get(key);
        let newValue = value;
        if (props.reducers && props.reducers[key]) {
            if (value.type === undefined) throw new Error(`Error: Store key "${key}" has a reducer but don't receive an action type.`)
            newValue = await props.reducers[key](oldValue, value);
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
        data: props.defaultValues ? convertObjectToMap(props.defaultValues) : new Map(),
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

function convertObjectToMap(obj: { [key: string]: any }) {
    const map = new Map()
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            map.set(key, obj[key]);
        }
    }
    return map
}