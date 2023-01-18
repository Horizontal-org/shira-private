import React, { FunctionComponent, useRef, useState } from 'react'
import styled from 'styled-components'
import shallow from 'zustand/shallow'
import { useStore } from '../../store'
import { ExplanationButton } from '../Explanations/components/ExplanationButton'
import { Input } from '../Input'

interface Props {
  placeholder?: string;
  name: string;
  id: string;
  onChange?: (expl, value) => void
  required?: boolean;
  customRef?: React.MutableRefObject<HTMLInputElement>
}

export const InputWithExplanation: FunctionComponent<Props> = ({
  placeholder,
  name,
  id,
  onChange,
  required,
  customRef
}) => {

  const {
    addExplanation,
    explanationIndex,
    selectedExplanationIndex,
    changeSelected
  } = useStore((state) => ({
    addExplanation: state.addExplanation,
    explanationIndex: state.explanationIndex,
    selectedExplanationIndex: state.selectedExplanation,
    changeSelected: state.changeSelected
  }), shallow)

  const inputRef = useRef<HTMLInputElement>()
  const ref = customRef || inputRef

  return (
    <div>
      <Separator>
        <Input
          id={id}
          name={name}
          required={required}
          ref={ref}
          placeholder={placeholder}
          onChange={() => { 
            onChange(
              ref.current.getAttribute('data-explanation'),
              ref.current.value,
            )
          }}
          onBlur={(e) => {
            const hasExplanation = ref.current.getAttribute('data-explanation')
            if (hasExplanation) {
              changeSelected(null)
            }
          }}
          onFocus={() => {
            const hasExplanation = ref.current.getAttribute('data-explanation')
            if (hasExplanation) {
              changeSelected(parseInt(hasExplanation))
            }
          }}
        />
        
        <ExplanationButton
          active={ref.current && selectedExplanationIndex + '' == ref.current.getAttribute('data-explanation')}
          onClick={() => {
            const hasExplanation = ref.current.getAttribute('data-explanation')
            if (hasExplanation) {
              changeSelected(parseInt(hasExplanation))
            } else {
              const index = explanationIndex + 1
              ref.current.setAttribute('data-explanation', index + '')
              addExplanation(index)
              onChange(
                index,
                ref.current.value,
              )
            }
          }}
        />
      </Separator>
    </div>
  )
}

const Separator = styled.div`
  padding: 8px 0;
  display: flex;
  align-items: center;
`