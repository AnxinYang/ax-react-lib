import { CSSProperties, ReactNode, ComponentType, useState, useRef, useEffect, MutableRefObject } from "react";
import { useIntersectionObserver } from "../hooks";


interface LazyLoadProps {
    tag?: ComponentType | keyof JSX.IntrinsicElements
    children: ReactNode
    style?: CSSProperties
    className?: string
    root?: Element | Document | null
    threshold?: number | number[]
    rootMargin?: string
    forward?: boolean
}

export function LazyLoad(props: LazyLoadProps) {
    const { tag = 'div', children, style, className } = props;
    const Tag: any = tag;   //Expression produces a union type that is too complex to represent if not parse as any
    const ref = useRef<Element>(null)
    const isIntersecting = useIntersectionObserver(ref, {
        root: props.root ?? null,
        threshold: props.threshold ?? 0,
        rootMargin: props.rootMargin
    }, props.forward);

    return (
        <Tag
            ref={ref}
            style={style}
            className={className}
            children={isIntersecting ? children : null}
        />
    )
}

