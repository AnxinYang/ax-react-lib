import React, { ReactNode, useEffect } from 'react';

export function Loader(props: {
    load: () => any
    callback: (result: any) => void
}) {
    useEffect(() => {
        const load = async () => {
            const res = await props.load();
            props.callback(res);
        }
        load()
    }, [props.load, props.callback])
}