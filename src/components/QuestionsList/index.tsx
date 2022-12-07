import { FunctionComponent } from "react";
import styled from 'styled-components'
import { deleteQuestion, Question } from "../../fetch/question";
import { useStore } from "../../store";
import { Button } from "../Button";

interface Props {
  questions: Question[]
}

export const QuestionsList = ({ questions }) => {

  const fetchQuestions = useStore((state) => (state.fetchQuestions))
  return (
    <Wrapper>
      {questions.map((q) => (
        <QuestionWrapper key={q.id}>
          <Info>
            {`${q.id} • ${q.name}`}
          </Info>
          <Right>
            <Phishing 
              is={q.isPhising}
            >{q.isPhising ? 'Phising' : 'Legitimate'}</Phishing>  
            <Button text="Delete" onClick={async() => {
              if(window.confirm('Sure you want to delete this question?')){
                await deleteQuestion(q.id)
                fetchQuestions()
              }
            }}/>
          </Right>
        </QuestionWrapper>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
`

const QuestionWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background: #f9f9f9;
  border-radius: 4px;
  float: left;
  margin: 4px 0;
`

const Info = styled.div`
  font-size: 20px;
  font-weight: 400;
  width: 300px;
`

const Phishing = styled.div`
  background: ${props => props.is ? '#F99C93' : '#9FB747'};
  border-radius: 4px;
  margin-right: 12px;
  padding: 11px 16px;
`

const Right = styled.div`
  display: flex; 
  > div {
    width: 100px;
  }
`