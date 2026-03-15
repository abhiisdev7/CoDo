import { Children, type ReactNode } from "react"

type RenderFn<T> = (item: T, index?: number) => ReactNode

export const For = <T,>({ render, each = [] }: { render: RenderFn<T>; each?: T[] }) =>
    Children.toArray(each.map((item, index) => render(item, index)))

/*
- Example use case:

import { For } from 'react-haiku';

export const Component = () => {
    const data = [{name: 'React'}, {name: 'Haiku'}];

    return(
        <For each={data} render={(item, index) => 
            <b>{`${index}: ${item.name}`}</b>
        }/>
    );
}

*/
