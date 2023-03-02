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
      <div>
        <InputWithExplanation
          id='content-phone'
          name='sender-phone'
          placeholder='Phone number'
          required={true}
          onChange={(expl, value) => {
            onChange(expl, value, 'component-required-phone')
          }}
          isPhoneNumber={true}
        />
      </div>

      <div>
        <InputWithExplanation
          id='content-fullname'
          name='sender-fullname'
          placeholder='Name'
          required={true}
          onChange={(expl, value) => {
            onChange(expl, value, 'component-required-fullname')
          }}
        />
      </div>
    </div>
  )
}

const Separator = styled.div`
  padding-top: 12px;
`