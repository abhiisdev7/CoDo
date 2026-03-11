import { Children } from "react"
import { If } from "./If"

import { type ReactNode } from "react"

type Props = {
  children: ReactNode & {
    props: {
      isTrue?: boolean
    }
  }
}

type ElseProps = {
  render?: () => ReactNode
  children?: ReactNode
}

export const Show = ({ children }: Props) => {
  let when: ReactNode | null = null
  let otherwise: ReactNode | null = null

  Children.forEach(children, (child) => {
    if (child.props.isTrue === undefined) {
      otherwise = child
    } else if (!when && child.props.isTrue === true) {
      when = child
    }
  })

  return (when || otherwise) as ReactNode
}

Show.When = If
Show.Else = ({ render, children }: ElseProps) => (render ? render() : children)

/*
- Example use case

import { useState } from 'react';
import { Show } from 'react-haiku';

export const Component = () => {
    const [number, setNumber] = useState(6);

    return (
        <Show>
            <Show.When isTrue={number === 6}>
                <b>Number is 6!</b>
                <button onClick={() => setNumber(number + 1)}>Increment</button>
            </Show.When>

            <Show.When isTrue={number === 7}>
                <b>Number is 7!</b>
                <button onClick={() => setNumber(number + 1)}>Increment</button>
            </Show.When>

            <Show.Else>
                <b>No valid number found!</b>
                <button onClick={() => setNumber(6)}>Reset</button>
            </Show.Else>
        </Show>
    );
}
*/
