import React, { FunctionComponent, useState } from 'react'
import styled from 'styled-components'
import { Input } from '../../../Input'
import { InputWithExplanation } from '../../../InputWithExplanation'

interface Props {
  onChange: (expl, value, name) => void
}

export const EmailContent: FunctionComponent<Props> = ({ onChange }) => {

  return (
    <div>      
      <InputWithExplanation
        id='content-sender-name'
        name='sender-name'
        placeholder='Sender name'
        required={true}
        onChange={(expl, value) => {
          onChange(expl, value, 'component-required-sender-name')
        }}
      />
      <InputWithExplanation
        id='content-sender-email'
        required={true}
        name='sender-email'
        placeholder='Sender email'
        onChange={(expl, value) => {
          onChange(expl, value, 'component-required-sender-email')
        }}
      />
    </div>
  )
}
