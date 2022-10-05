import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import shallow from 'zustand/shallow'
import { useStore } from '../../store'
import { ExplanationInput } from '../ExplanationInput'

interface Props {}

export const Explanations: FunctionComponent<Props> = () => {

  const {
    explanations,
    changeSelected,
    selectedExplanation,
    updateExplanation
  } = useStore((state) => ({
    explanations: state.explanations,
    changeSelected: state.changeSelected,
    selectedExplanation: state.selectedExplanation,
    updateExplanation: state.updateExplanation
  }), shallow)
  
  return (
    <Wrapper>
      <p>Explanations</p>
      { explanations.sort((a, b) => a.index - b.index) .map((e) => (
        <Explanation
          key={e.index}
          selected={e.index === selectedExplanation}
          onClick={() => {
            changeSelected(e.index)
          }}
        >
          <ExplanationInput 
            onUpdate={(text) => {
              updateExplanation(e.index, text)
            }}
            text={e.text}
          />
        </Explanation>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background: #eee;
  border-radius: 4px;
  margin-left: 8px;
  width: 30%;
  padding: 4px;
  > p {
    margin: 0;
    padding: 10px;
    font-weight: 600;
  }
`

interface StyledExplanation {
  selected: boolean;
}

const Explanation = styled.div<StyledExplanation>`
  border: 2px solid white;
  padding: 8px;
  border-radius: 4px; 
  background: white;
  margin-bottom: 4px;

  ${props => props.selected && `
    border: 2px solid #424242;
  `}
`
