import { FunctionComponent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { renderToString } from 'react-dom/server'
import styled from 'styled-components'
import shallow from "zustand/shallow";
import { useStore } from "../../../store";
import { ExplanationButton } from "../../Explanations/components/ExplanationButton";
import { Input } from "../../Input";
import { InputWithExplanation } from "../../InputWithExplanation";

interface Props {
  componentId?: string;
  componentPosition?: string;
}

export const Attachment: FunctionComponent<Props> = ({ componentId, componentPosition }) => {

  const {
    setContent
  } = useStore((state) => ({
    setContent: state.setContent
  }), shallow)
    
  useEffect(() => {
    parseHtml()
  }, [componentPosition])

  const inputRef = useRef<HTMLInputElement>()
  const componentFinalId = `component-attachment-${componentId}`

  const parseHtml = () => {
    const attachmentExplanation = inputRef.current.getAttribute('data-explanation')
    const explanation = attachmentExplanation ? ` data-explanation='${attachmentExplanation}' ` : ''  
    const position = ` data-position=${componentPosition} `
    setContent(componentFinalId, `<span ${explanation}${position}id='${componentFinalId}'>${inputRef.current.value}</span>`)
  }

  // here use input with explanation 

  return (
    <Wrapper>
      <Separator>
        <InputWrapper>
        
          <InputWithExplanation 
            id={componentFinalId} 
            name='sender-name'
            customRef={inputRef}
            placeholder={'Attachment name'}
            required={true}
            onChange={(expl, value) => {
              // onChange(expl, value, 'component-required-sender-name')
              parseHtml()
            }}
          />

          {/* <Input
            id={`component-attachment-${componentId}`} 
            ref={inputRef}
            placeholder={'Attachment name'}
            onChange={(e) => { 
              parseHtml()
             }}
            onFocus={() => {
              const isSelected = inputRef.current.getAttribute('data-explanation')
              if (isSelected) {
                changeSelected(parseInt(isSelected))
              }
            }}
          /> */}
        </InputWrapper>
        {/* <ExplanationButton
          active={inputRef.current && selectedExplanationIndex + '' == inputRef.current.getAttribute('data-explanation')}
          onClick={() => { 
            const index = explanationIndex + 1
            inputRef.current.setAttribute('data-explanation', index + '')
            addExplanation(index)
            parseHtml()
          }}
        /> */}
      </Separator>
    </Wrapper>
  )
}

const Wrapper = styled.div`
`

const Separator = styled.div`
  padding: 0 ;
  display: flex;
  align-items: center;
`

const InputWrapper = styled.div`
  border-radius: 4px;
  padding: 6px;
  background: #eee;
  display: inline-block;

  > div {
    background: white;
    border-radius: 4px;
    padding: 4px 8px;
  }
`