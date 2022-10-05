import React, { FunctionComponent, useRef, useEffect, useState } from 'react'
import styled from 'styled-components'

interface Props {
  onUpdate: (text: string) => void;
  text: string;
}

export const ExplanationInput: FunctionComponent<Props> = ({
  text,
  onUpdate
}) => {

  // const [val, setVal] = useState("");
  const textAreaRef = useRef(null);

  const resizeTextArea = () => {
    textAreaRef.current.style.height = "auto";
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
  };

  useEffect(resizeTextArea, [text]);


  return (
    <div>
      <StyledTextArea 
        ref={textAreaRef}
        placeholder="New explanation"
        rows={1}
        value={text}
        onChange={(e) => {
          onUpdate(e.target.value)
        }}
      />
      {/* <button 
        onClick={onDelete}
      >
        delete
      </button> */}
    </div>
  )
}

const StyledTextArea = styled.textarea`
  min-height: 38px;
  resize: none;
  overflow-y: hidden;
  border: none;
  width: 100%;

  &:focus {
    border: none;
    outline: none;
  }
`