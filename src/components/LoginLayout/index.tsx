import { FunctionComponent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import shallow from 'zustand/shallow'
import { useStore } from '../../store'
import { Button } from '../Button'
import { Input } from '../Input'

interface Props {}

export const LoginLayout: FunctionComponent<Props> = () => {
  const navigate = useNavigate()

  const {
    user,
    login
  } = useStore((state) => ({
    user: state.user,
    login: state.login
  }), shallow)

  const [email, handleEmail] = useState('')
  const [pass, handlePass] = useState('')

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user])
  return (
    <Wrapper>
      <Box onSubmit={(e) => {
        e.preventDefault()
        login(email, pass)
      }}>
        <div>
          <p>
            Login
          </p>
          <InputWrapper>
            <Input 
              placeholder='Email'
              type='email'
              required
              onChange={(e) => { handleEmail(e.target.value) }}
            />
          </InputWrapper>
          <InputWrapper>
            <Input 
              required
              placeholder='Password'
              type='password'
              onChange={(e) => { handlePass(e.target.value) }}
            />
          </InputWrapper>
        </div>
        <Footer>
          <Button 
            text='Submit'
          />
        </Footer>
      </Box>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`

const Box = styled.form`
  border: 2px solid #ddd;
  border-radius: 4px;
  padding: 30px;
`

const Footer = styled.div`
  padding-top: 20px;
  float: right;
`

const InputWrapper = styled.div`
  padding: 8px 0;
`