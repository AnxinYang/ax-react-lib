import React, { ReactNode } from 'react';

export function If(props: {
    children: ReactNode,
    condition: boolean | (() => boolean)
}) {
    if (!props.condition) return null;
    if (typeof props.condition === 'function' && props.condition() === false) return null
    return (
        <>
            {props.children}
        </>
    )
}