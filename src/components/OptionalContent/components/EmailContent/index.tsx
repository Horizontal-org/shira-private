import React, { FunctionComponent, useRef, useState } from 'react'
import styled from 'styled-components'
import shallow from 'zustand/shallow'
import { useStore } from '../../../../store'
import { ExplanationButton } from '../../../ExplanationButton'
import { Input } from '../../../Input'
import { InputWithExplanation } from '../../../InputWithExplanation'

interface Props {
  onChange: (expl, value, name) => void
}

export const EmailContent: FunctionComponent<Props> = ({ onChange }) => {


  return (
    <div>
      <Separator>
        <InputWithExplanation 
          id='content-subject'
          name='subject'
          placeholder='Subject'
          onChange={(expl, value) => {
            onChange(expl, value, 'component-optional-subject')
          }}
        />
      </Separator>
    </div>
  )
}

const Separator = styled.div`
  padding-bottom: 12px;
  display: flex;
  align-items: center;
`