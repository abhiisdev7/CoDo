import { ReactNode } from "react"

type Props = {
  isTrue: boolean
  children: ReactNode
}

export const If = ({ isTrue, children }: Props) => (isTrue ? children : null)

/*
Example use case -

import { useState } from 'react';
import { If } from 'react-haiku';

export const Component = () => {
    const [number, setNumber] = useState(6);

    return(
        <>
            <b>Click to update state!</b>
            <If isTrue={number === 6}>
                <button onClick={() => setNumber(7)}>I like the number 6!</button>
            </If>
            <If isTrue={number === 7}>
                <button onClick={() => setNumber(6)}>7 is way better!</button>
            </If>
        </>
    );
}
    
*/
