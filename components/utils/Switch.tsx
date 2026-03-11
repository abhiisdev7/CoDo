import { ComponentType, FC, ReactNode } from "react"

type CaseComponent = ReactNode | ComponentType

export interface SwitchProps {
  /** List of case components to be rendered when case matches */
  components: Record<string | number, CaseComponent>
  /** Default component to be rendered if the value does not match any of the given cases */
  defaultComponent: CaseComponent
  /** Value to check with the cases to render the corresponding component */
  value: string | number
}

/**
 * A component that renders one of the provided case components based on the value.
 */
export const Switch: FC<SwitchProps> = ({ components, defaultComponent, value }) => {
  const RenderedComponent = (components[value] || defaultComponent) as CaseComponent

  if (typeof RenderedComponent === "function") {
    return <RenderedComponent />
  }

  return <>{RenderedComponent}</>
}

/*
- Example use case:

import { useState } from 'react';
import { Switch } from 'react-haiku';

const reactions = {
  'LIKE': 'like',
  'FIRE': 'fire',
  'LOVE': 'love'
}

const CaseReactionLike = () => <h1>👍</h1>
const CaseReactionFire = () => <h1>🔥</h1>
const CaseReactionLove = () => <h1>❤️</h1>
const CaseDefault      = () => <h1>🚀</h1>

export const Component = () => {
  const [reaction, setReaction] = useState();

const handleReact = (e) => {
    const reactionSelected = e.target.value;
    setReaction({
      [reactions.LIKE]: reactions.LIKE,
      [reactions.FIRE]: reactions.FIRE,
      [reactions.LOVE]: reactions.LOVE
    }[reactionSelected]);
  }

  return (
    <>
        <select value={reaction} onChange={handleReact}>
            <option value={'default'}>Default</option>
            <option value={reactions.LIKE}>👍 Like</option>
            <option value={reactions.FIRE}>🔥 Fire</option>
            <option value={reactions.LOVE}>❤️ Love</option>
        </select>
        
        <Switch
            value={reaction}
            components={{
                [reactions.LIKE]: CaseReactionLike,
                [reactions.FIRE]: CaseReactionFire,
                [reactions.LOVE]: CaseReactionLove,
            }}
            defaultComponent={CaseDefault}
        />
    </>
  )
};

*/
