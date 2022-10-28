import React, { FunctionComponent, useState } from 'react'
import styled from 'styled-components'
import { Input } from '../../../Input'
import { InputWithExplanation } from '../../../InputWithExplanation'

interface Props {
  onChange: (expl, value, name) => void
}

export const MessagingContent: FunctionComponent<Props> = ({ onChange }) => {

  return (
    <div>
      <InputWithExplanation
        id='content-phone'
        name='sender-phone'
        placeholder='Phone number'
        required={true}
        onChange={(expl, value) => {
          onChange(expl, value, 'component-required-phone')
        }}
      />
    </div>
  )
}

const Separator = styled.div`
  padding-top: 12px;
`