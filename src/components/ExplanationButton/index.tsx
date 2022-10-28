import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { HiOutlineChatBubbleBottomCenter } from 'react-icons/hi2'

interface Props {
  onClick: () => void
  active: boolean
}

export const ExplanationButton: FunctionComponent<Props> = ({ onClick, active }) => {
  return (
    <SvgWrapper 
      onClick={onClick}
      active={active}
    >
      <HiOutlineChatBubbleBottomCenter 
        size={20}       
      /> 
    </SvgWrapper>

  )
}

interface StyledSvgWrapper {
  active: boolean;
}

const SvgWrapper = styled.div<StyledSvgWrapper>`
  cursor: pointer;
  margin-left: 12px;  
  border-radius: 50%;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  
  transition: 0.2s all;
  > svg {
    stroke: #ddd;
  }

  &:hover {
    stroke: #6a707c;
    background: #f1f2f4;
  }
  
  ${props =>  props.active && `
    > svg {
      stroke: #FCC934;
    }
  `
}
`