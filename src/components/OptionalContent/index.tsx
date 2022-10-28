import { FunctionComponent } from "react";
import styled from 'styled-components'
import { useStore } from "../../store";
import { EmailContent } from "./components/EmailContent";

interface Props {
  type: string;
}

export const OptionalContent: FunctionComponent<Props> = ({ type }) => {
  const setOptionalContent = useStore((state) => (state.setOptionalContent))

  const parseHtml = (expl, value, id) => {
    const explanation = expl ? ` data-explanation='${expl}' ` : ''  
    setOptionalContent(id, `<span ${explanation} id='${id}'>${value}</span>`)
  }

  return (
    <div>
      { type === 'email' && (
        <EmailContent 
          onChange={parseHtml}
        />
      )}
    </div>
  )
}