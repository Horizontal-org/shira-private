import React, { FunctionComponent, useEffect, useState } from 'react'
import styled from 'styled-components'
import { TextEditor } from '../DynamicComponents/TextEditor'
import { Explanations } from '../Explanations'
import { AppsSelector } from '../AppsSelector'
import { Button } from '../Button'
import { submit } from '../../fetch/question'
import { RequiredContent } from '../RequiredContent'
import { OptionalContent } from '../OptionalContent'
import { QuestionContent } from '../QuestionContent'
import { Input } from '../Input'
import { useStore } from '../../store'
import shallow from 'zustand/shallow'
import { Link } from 'react-router-dom'

interface Props {}

export const Question: FunctionComponent<Props> = () => {

  const { 
    clearQuestion,
    clearApps,
    clearExplanations,
    selectedApps
  } = useStore((state) => ({
    clearQuestion: state.clearQuestion,
    clearApps: state.clearSelectedApps,
    clearExplanations: state.clearExplanations,
    selectedApps: state.selectedApps
  }), shallow)

  const [appType, handleAppType] = useState(null)
  const [name, handleName] = useState('')
  const [phising, handlePhising] = useState(false)

  const clear = () => {
    clearQuestion()
    clearApps()
    clearExplanations()
  }

  useEffect(() => {
    return clear
  }, []) 

  return (
    <div>
      <div>
        <div>
          <Link to='/'>{`<- back home`}</Link>
        </div>
        <h2>Shira - New Question</h2>
        
        <SceneStructure>
          <ContentWrapper onSubmit={(e) => {
            e.preventDefault()
            submit(name, phising)
          }}>

            <h3>
              Question name
            </h3>
            <Input 
              required={true}
              placeholder={'Name'}
              onChange={(e) => { 
                handleName(e.target.value)
              }}
            />

            <h3>
              Is Phising ?
            </h3>
            <AppTypes>
            <AppType
                selected={phising}
                onClick={() => { handlePhising(true) }}
              >
                Yes
              </AppType>
              <AppType
                selected={!phising}
                onClick={() => { handlePhising(false) }}
              >
                No
              </AppType>
            </AppTypes>

            <h3>
              Select app type
            </h3>
            <AppTypes>
              <AppType 
                selected={appType === 'email'}
                onClick={() => {
                  if (appType && appType !== 'email') {
                    if (window.confirm('Change type? all progress will be lost')) {
                      clear()
                      handleAppType('email')
                    }
                  } else {
                    handleAppType('email')
                  }
                }}
              >
                Mail
              </AppType>
              <AppType
                selected={appType === 'messaging'}
                onClick={() => {
                  if (appType && appType !== 'messaging') {
                    if (window.confirm('Change type? all progress will be lost')) {
                      clear()
                      handleAppType('messaging')
                    }
                  } else {
                    handleAppType('messaging')
                  }
                }}
              >
                Messaging
              </AppType>
            </AppTypes>

            { appType && (
              <>
              <h3>
                Selected apps
              </h3>
              <div>
                <AppsSelector type={appType} />
              </div>
              </>
            )}
            
            
            { selectedApps.length > 0 && (
              <>                
                <h3>
                  Required content
                </h3>
                
                <RequiredContent 
                  type={appType}
                />

                <h3>
                  Optional content
                </h3>
                
                <OptionalContent 
                  type={appType}
                />

                <QuestionContent 
                  appType={appType}
                />

                <div>
                  <Button 
                    text="Submit"
                  />
                </div>
              </>
            )}

          </ContentWrapper>

          <ExplanationsWrapper>
            <Explanations />
          </ExplanationsWrapper>
        </SceneStructure>
        
       
      </div>
    </div>
  )
}

const SceneStructure = styled.div`
  display: flex;
`


const ExplanationsWrapper = styled.div`
  width: 30%;
`

const ContentWrapper = styled.form`
  width: 70%;
`

interface StyledAppType {
  selected: boolean
}

const AppType = styled.div<StyledAppType>`
  border: 2px solid #eee;
  background: #eee;
  border-radius: 4px;
  padding: 10px 16px;
  cursor: pointer;
  margin-right: 4px;

  ${props => props.selected && `
    border: 2px solid #424242;
  `}
`

const AppTypes = styled.div`
  display: flex;
`