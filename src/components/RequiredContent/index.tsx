import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { useStore } from '../../store';
import { EmailContent } from './components/EmailContent';
import { MessagingContent } from './components/MessagingContent';

interface Props {
  type: string;
}

export const RequiredContent: FunctionComponent<Props> = ({
  type
}) => {

  const setRequiredContent = useStore((state) => (state.setRequiredContent))

  const parseHtml = (expl, value, id) => {
    const explanation = expl ? ` data-explanation='${expl}' ` : ''  
    setRequiredContent(id, `<span ${explanation} id='${id}'>${value}</span>`)
  }

  return (
    <div>
      { type === 'email' && (
        <EmailContent onChange={parseHtml}/>
      )}
      { type === 'messaging' && (
        <MessagingContent onChange={parseHtml}/>
      )}
    </div>
  )
}