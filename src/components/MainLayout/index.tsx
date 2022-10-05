import React, { FunctionComponent } from 'react'
import TextEditor from '../TextEditor'
import styled from 'styled-components'
import { Explanations } from '../Explanations'
import { AppsSelector } from '../AppsSelector'
import { Button } from '../Button'
import { submit } from '../../fetch/question'

interface Props {}

export const MainLayout: FunctionComponent<Props> = () => {

  return (
    <Wrapper>
      
      <div>
        <h2>Shira - New Question</h2>
        
        <h3>
          Selected apps
        </h3>
        <div>
          <AppsSelector />
        </div>

        <h3>
          Content
        </h3>
        <Content>
          <TextEditor />
          <Explanations />
        </Content>

        <h3></h3>
        <div>
          <Button 
            text="Submit"
            onClick={() => {
              console.log('do something')
              submit()
            }}
          />
        </div>
      </div>
    </Wrapper>
  )
}


const Wrapper = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: center;

  > div {
    width: 1024px;
  }
`

const Content = styled.div`
  display: flex;
`