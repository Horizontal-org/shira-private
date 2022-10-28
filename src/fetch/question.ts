import axios from 'axios'
import { useStore } from '../store'
import { App } from './app';

interface SubmitPayload {
  question: {
    content: string;
    isPhishing: number;
    apps: App[],
  }
  explanations: {
    position: string;
    text: string;
  }
}

export interface Question {
  id: string;
  name: string;
  isPhising: number;
}

export const fetchQuestions = async() => {
  try {
    const res = await axios.get<Question[]>(`${process.env.REACT_APP_API_URL}/question`) 
    console.log("🚀 ~ file: question.ts ~ line 46 ~ submit ~ res", res)
    return res.data
  } catch (err) {
    console.log("🚀 ~ file: question.ts ~ line 20 ~ submit ~ err", err)    
  }
}

export const deleteQuestion = async(id) => {
  try {
    const res = await axios.delete(`${process.env.REACT_APP_API_URL}/question/${id}`) 
    console.log("🚀 ~ file: question.ts ~ line 46 ~ submit ~ res", res)
    return res.data
  } catch (err) {
    console.log("🚀 ~ file: question.ts ~ line 20 ~ submit ~ err", err)    
  }
}

export const submit = async(name, phising) => {

  const {
    explanations,
    selectedApps,
    content,
    optionalContent,
    requiredContent
  } = useStore.getState()
  
  console.log("🚀 ~ SUBMIT", content)
  console.log("🚀 ~ SUBMIT", optionalContent)
  console.log("🚀 ~ SUBMIT", requiredContent)
  console.log("🚀 ~ SUBMIT", explanations)
  console.log("🚀 ~ SUBMIT", selectedApps)

  const requiredHTML = Object.keys(requiredContent).reduce((prev, current) => {
    return prev + requiredContent[current]
  }, `<div id='required-content'>`) + '</div>'
  
  const optionalHTML = Object.keys(optionalContent).reduce((prev, current) => {
    return prev + optionalContent[current]
  }, `<div id='optional-content'>`) + '</div>'

  const dynamicHTML = Object.keys(content).reduce((prev, current) => {
    return prev + content[current]
  }, `<div id='dynamic-content'>`) + '</div>'

  const finalContent = `<div>${requiredHTML}${optionalHTML}${dynamicHTML}</div>`

  const payload = {
    question: {
      name: name,
      content: finalContent,
      isPhishing: phising,
      apps: selectedApps
    },
    explanations: explanations.map((e) => {
      return {
        position: e.index + '',
        text: e.text
      }
    })
  }

  try {
    const res = await axios.post<SubmitPayload[]>(`${process.env.REACT_APP_API_URL}/question`, payload)
    alert('Question created')
    console.log("🚀 ~ file: question.ts ~ line 46 ~ submit ~ res", res)
  } catch (err) {
    console.log("🚀 ~ file: question.ts ~ line 20 ~ submit ~ err", err)    
  }
}