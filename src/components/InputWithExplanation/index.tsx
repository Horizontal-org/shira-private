import React, { FunctionComponent, useRef, useState } from 'react'
import styled from 'styled-components'
import shallow from 'zustand/shallow'
import { useStore } from '../../store'
import { ExplanationButton } from '../ExplanationButton'
import { Input } from '../Input'

interface Props {
  placeholder?: string;
  name: string;
  id: string;
  onChange?: (expl, value) => void
  required?: boolean
}

export const InputWithExplanation: FunctionComponent<Props> = ({
  placeholder,
  name,
  id,
  onChange,
  required
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

  return (
    <div>
      <Separator>
        <Input
          id={id}
          name={name}
          required={required}
          ref={inputRef}
          placeholder={placeholder}
          onChange={() => { 
            onChange(
              inputRef.current.getAttribute('data-explanation'),
              inputRef.current.value,
            )
          }}
          onFocus={() => {
            const isSelected = inputRef.current.getAttribute('data-explanation')
            if (isSelected) {
              changeSelected(parseInt(isSelected))
            }
          }}
        />
        <ExplanationButton
          active={inputRef.current && selectedExplanationIndex + '' == inputRef.current.getAttribute('data-explanation')}
          onClick={() => { 
            const index = explanationIndex + 1
            inputRef.current.setAttribute('data-explanation', index + '')
            addExplanation(index)
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