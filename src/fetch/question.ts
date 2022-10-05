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

export const submit = async() => {

  const {
    explanations,
    selectedApps,
    content
  } = useStore.getState()
  console.log("🚀 ~ file: question.ts ~ line 25 ~ submit ~ selectedApps", selectedApps)

  const payload = {
    question: {
      content: content,
      isPhishing: 0,
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
    console.log("🚀 ~ file: question.ts ~ line 46 ~ submit ~ res", res)
  } catch (err) {
    console.log("🚀 ~ file: question.ts ~ line 20 ~ submit ~ err", err)    
  }
}